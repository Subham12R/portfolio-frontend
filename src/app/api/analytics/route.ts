import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

export const dynamic  = "force-dynamic";
export const revalidate = 0;

// ─── Shared types (imported by components) ───────────────────────────────────

export interface DailyPoint {
  date: string;       // "YYYY-MM-DD"
  visitors: number;
}

export interface TopPage {
  path: string;
  views: number;
  percentage: number;
}

export interface AnalyticsStats {
  totalVisitors: number;
  uniqueVisitors: number;
  todayVisitors: number;
  weekVisitors: number;
  timeseries: DailyPoint[];
  topPages: TopPage[];
  isDemo: boolean;
}

export interface PublicAnalyticsStats {
  totalVisitors: number;
  isDemo: boolean;
}

// ─── Redis client ─────────────────────────────────────────────────────────────

let _redis: Redis | null = null;

function getRedis(): Redis | null {
  if (_redis) return _redis;
  const url   = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) _redis = new Redis({ url, token });
  return _redis;
}

// ─── Demo data (deterministic per-day seed) ──────────────────────────────────

function lcgRandom(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = Math.imul(s, 1664525) + 1013904223;
    return (s >>> 0) / 0xffffffff;
  };
}

function buildDemoData(): AnalyticsStats {
  const today = new Date();
  const seed  = parseInt(today.toISOString().slice(0, 10).replace(/-/g, ""), 10);
  const rand  = lcgRandom(seed);

  const timeseries: DailyPoint[] = [];
  let total = 0, weekTotal = 0;

  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const isWeekend = d.getDay() === 0 || d.getDay() === 6;
    const base      = 80 + ((29 - i) / 29) * 260;
    const visitors  = Math.max(10, Math.round(base * (isWeekend ? 0.6 : 1) * (0.75 + rand() * 0.5)));
    timeseries.push({ date: d.toISOString().slice(0, 10), visitors });
    total += visitors;
    if (i < 7) weekTotal += visitors;
  }

  const topRaw = [
    { path: "/",             pct: 0.45 },
    { path: "/projects",    pct: 0.22 },
    { path: "/blog",        pct: 0.14 },
    { path: "/photography", pct: 0.11 },
    { path: "/hackathons",  pct: 0.08 },
  ];

  return {
    totalVisitors:  total,
    uniqueVisitors: Math.round(total * 0.72),
    todayVisitors:  timeseries[29].visitors,
    weekVisitors:   weekTotal,
    timeseries,
    topPages: topRaw.map((p, i) => ({
      path: p.path,
      views: Math.round(total * p.pct),
      percentage: i === 0 ? 100 : Math.round((p.pct / topRaw[0].pct) * 100),
    })),
    isDemo: true,
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function dateKey(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10).replace(/-/g, "");   // "YYYYMMDD"
}

function isoDate(key: string): string {
  return `${key.slice(0, 4)}-${key.slice(4, 6)}-${key.slice(6, 8)}`; // "YYYY-MM-DD"
}

// ─── GET handler ─────────────────────────────────────────────────────────────

export async function GET(): Promise<NextResponse<AnalyticsStats>> {
  const r = getRedis();

  if (!r) {
    const demo = buildDemoData();
    return NextResponse.json(demo, {
      headers: { "Cache-Control": "no-store" },
    });
  }

  try {
    const dateKeys = Array.from({ length: 30 }, (_, i) => dateKey(29 - i)); // oldest → newest
    const uvKeys   = dateKeys.map((k) => `uv:${k}`);

    // Build pipeline for per-day unique counts (pfcount on each uv key)
    const pipe = r.pipeline();
    uvKeys.forEach((k) => pipe.pfcount(k));

    const [dailyUniques, uniqueTotal, topRaw] = await Promise.all([
      pipe.exec<number[]>(),
      r.pfcount(...(uvKeys as [string, ...string[]])),
      r.zrange("pg", 0, 4, { rev: true, withScores: true }) as Promise<(string | number)[]>,
    ]);

    const timeseries: DailyPoint[] = dateKeys.map((k, i) => ({
      date: isoDate(k),
      visitors: Number(dailyUniques[i] ?? 0),
    }));

    const totalVisitors  = timeseries.reduce((s, d) => s + d.visitors, 0);
    const weekVisitors   = timeseries.slice(-7).reduce((s, d) => s + d.visitors, 0);
    const todayVisitors  = timeseries[timeseries.length - 1]?.visitors ?? 0;
 
    
    // Parse interleaved [member, score, member, score, ...] from zrange withScores
    const topPages: TopPage[] = [];
    for (let i = 0; i + 1 < topRaw.length; i += 2) {
      topPages.push({ path: String(topRaw[i]), views: Number(topRaw[i + 1]), percentage: 0 });
    }
    if (topPages.length > 0) {
      const maxViews = topPages[0].views;
      topPages.forEach((p, i) => {
        p.percentage = i === 0 ? 100 : Math.round((p.views / maxViews) * 100);
      });
    }

    // Fall back to demo top pages if no real page data yet
    const demo = totalVisitors === 0 ? buildDemoData() : null;

    return NextResponse.json(
      {
        totalVisitors: totalVisitors || demo?.totalVisitors || 0,
        uniqueVisitors: uniqueTotal || demo?.uniqueVisitors || 0,
        todayVisitors: todayVisitors || demo?.todayVisitors || 0,
        weekVisitors: weekVisitors || demo?.weekVisitors || 0,
        timeseries: totalVisitors === 0 ? demo!.timeseries : timeseries,
        topPages: topPages.length > 0 ? topPages : demo?.topPages || [],
        isDemo: totalVisitors === 0,
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    const demo = buildDemoData();
    return NextResponse.json(
      demo,
      { headers: { "Cache-Control": "no-store" } }
    );
  }
}
