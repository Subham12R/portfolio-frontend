"use client";

import { useEffect, useRef, useState, useId } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import gsap from "gsap";
import { useTheme } from "next-themes";
import type { AnalyticsStats, DailyPoint } from "@/app/api/analytics/route";

// ─── Formatting ───────────────────────────────────────────────────────────────

function fmtLong(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}m`;
  return n.toLocaleString();
}

function fmtDay(iso: string): string {
  const [, m, d] = iso.split("-");
  return `${d}.${m}`;
}

function fmtHoverDate(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "short", month: "short", day: "numeric",
  });
}

// ─── Data smoothing (moving average, 2 passes) ────────────────────────────────

function smoothData(data: DailyPoint[], passes = 2): DailyPoint[] {
  let out = [...data];
  for (let p = 0; p < passes; p++) {
    out = out.map((d, i) => {
      if (i === 0 || i === out.length - 1) return d;
      return { ...d, visitors: Math.round((out[i - 1].visitors + d.visitors * 2 + out[i + 1].visitors) / 4) };
    });
  }
  return out;
}

// ─── Graph ────────────────────────────────────────────────────────────────────

const SVG_W = 520;
const SVG_H = 160;
const PAD   = { top: 14, right: 24, bottom: 14, left: 24 };
const PW    = SVG_W - PAD.left - PAD.right;
const PH    = SVG_H - PAD.top  - PAD.bottom;

interface Pt { x: number; y: number }

function toPoints(data: DailyPoint[], maxVal: number): Pt[] {
  return data.map((d, i) => ({
    x: PAD.left + (i / (data.length - 1)) * PW,
    y: PAD.top  + PH - (d.visitors / maxVal) * PH,
  }));
}

function buildPath(pts: Pt[]): string {
  if (pts.length < 2) return "";
  const tan = pts.map((_, i) => {
    if (i === 0)              return { x: pts[1].x   - pts[0].x,   y: pts[1].y   - pts[0].y };
    if (i === pts.length - 1) return { x: pts[i].x   - pts[i-1].x, y: pts[i].y   - pts[i-1].y };
    return { x: (pts[i+1].x - pts[i-1].x) / 2, y: (pts[i+1].y - pts[i-1].y) / 2 };
  });
  const T = 0.5;
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    d += ` C ${(pts[i].x   + (tan[i].x   * T) / 3).toFixed(1)} ${(pts[i].y   + (tan[i].y   * T) / 3).toFixed(1)},`
       + ` ${(pts[i+1].x - (tan[i+1].x * T) / 3).toFixed(1)} ${(pts[i+1].y - (tan[i+1].y * T) / 3).toFixed(1)},`
       + ` ${pts[i+1].x.toFixed(1)} ${pts[i+1].y.toFixed(1)}`;
  }
  return d;
}

interface GraphProps {
  timeseries: DailyPoint[];
  isDark: boolean;
  modalBg: string;
}

function Graph({ timeseries, isDark, modalBg }: GraphProps) {
  const ref1   = useRef<SVGPathElement>(null);
  const ref2   = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const uid    = useId().replace(/:/g, "");
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [scale, setScale] = useState(1);

  const smoothed  = smoothData(timeseries);
  const sessions  = smoothed.map((d) => ({ ...d, visitors: Math.round(d.visitors * 1.18) }));
  const maxVal    = Math.max(...sessions.map((d) => d.visitors), 1);
  const pts1      = toPoints(smoothed,  maxVal);
  const pts2      = toPoints(sessions,  maxVal);
  const line1     = buildPath(pts1);
  const line2     = buildPath(pts2);

  const bright = isDark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.72)";
  const dim    = isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.15)";
  const dotBg  = isDark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.72)";
  const dotDim = isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.20)";

  useEffect(() => {
    [ref1.current, ref2.current].forEach((el, i) => {
      if (!el) return;
      const len = el.getTotalLength();
      gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(el, { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut", delay: 0.05 + i * 0.12 });
    });
  }, [line1, line2]);

  useEffect(() => {
    const update = () => {
      const w = wrapRef.current?.clientWidth ?? SVG_W;
      setScale(w / SVG_W);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  function onMouseMove(e: React.MouseEvent<SVGSVGElement>) {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    setScale(rect.width / SVG_W);
    const svgX = ((e.clientX - rect.left) / rect.width) * SVG_W;
    setHoverIdx(Math.max(0, Math.min(timeseries.length - 1,
      Math.round(((svgX - PAD.left) / PW) * (timeseries.length - 1))
    )));
  }

  const hp1 = hoverIdx !== null ? pts1[hoverIdx] : null;
  const hp2 = hoverIdx !== null ? pts2[hoverIdx] : null;

  return (
    <div className="relative" ref={wrapRef}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full select-none"
        style={{ height: SVG_H }}
        onMouseMove={onMouseMove}
        onMouseLeave={() => setHoverIdx(null)}
      >
        <defs>
          {/* Fade mask: transparent at edges, opaque in the middle */}
          <linearGradient id={`fade-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="white" stopOpacity="0" />
            <stop offset="8%"   stopColor="white" stopOpacity="1" />
            <stop offset="92%"  stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id={`mask-${uid}`}>
            <rect x="0" y="0" width={SVG_W} height={SVG_H} fill={`url(#fade-${uid})`} />
          </mask>
        </defs>

        <g mask={`url(#mask-${uid})`}>
          {/* Sessions — dim */}
          <path ref={ref2} d={line2} fill="none"
            stroke={dim} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {/* Visitors — bright */}
          <path ref={ref1} d={line1} fill="none"
            stroke={bright} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Hover dots (outside mask so they're always fully visible) */}
        {hp2 && <circle cx={hp2.x} cy={hp2.y} r="3.5" fill={dotDim} />}
        {hp1 && <circle cx={hp1.x} cy={hp1.y} r="3.5" fill={dotBg} />}
      </svg>

      {/* Tooltip */}
      {hoverIdx !== null && hp1 && (
        <div
          className="absolute pointer-events-none"
          style={{
            left: hp1.x * scale,
            top: (Math.max(hp1.y, hp2?.y ?? hp1.y) + 10) * scale,
            transform: 'translateX(-50%)',
            zIndex: 10,
          }}
        >
          <div className="bg-white dark:bg-[#1a1a1a] text-zinc-900 dark:text-white text-[11px] font-medium px-3 py-1.5 rounded-full shadow-lg border border-black/10 dark:border-white/10 whitespace-nowrap">
            {fmtHoverDate(timeseries[hoverIdx].date)}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────

interface Props { stats: AnalyticsStats; onClose: () => void }

const backdrop = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.18 } },
  exit:    { opacity: 0, transition: { duration: 0.15 } },
};

const card = {
  hidden:  { opacity: 0, y: 20, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1,    transition: { duration: 0.26, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } },
  exit:    { opacity: 0, y: 12, scale: 0.97, transition: { duration: 0.16, ease: [0.4, 0, 1, 1]  as [number,number,number,number] } },
};

export function VisitorModal({ stats, onClose }: Props) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";
  const modalBg   = isDark ? "#111111" : "#ffffff";
  const titleCls  = isDark ? "text-white"     : "text-zinc-900";
  const labelCls  = "text-zinc-500";
  const valueCls  = isDark ? "text-white"     : "text-zinc-900";
  const divider   = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  const start = stats.timeseries[0]?.date;
  const end   = stats.timeseries[stats.timeseries.length - 1]?.date;
  const range = start && end ? `${fmtDay(start)} – ${fmtDay(end)}` : "";
  const topPage = stats.topPages[0];

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      variants={backdrop} initial="hidden" animate="visible" exit="exit"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <motion.div
        variants={card}
        className="relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: modalBg }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-0">
          <div className="flex items-start justify-between">
            <div className="flex items-baseline gap-2">
              <span className={`text-xl font-semibold tracking-tight ${titleCls}`}>Insights</span>
            
            </div>
            <button
              onClick={onClose}
              className={`p-1.5 rounded-md transition-colors duration-150 ${isDark ? "text-zinc-600 hover:text-white hover:bg-white/5" : "text-zinc-400 hover:text-zinc-900 hover:bg-black/5"}`}
            >
              <X size={16} />
            </button>
          </div>

          {/* Stats */}
          <div className="flex items-stretch mt-5 pt-5" style={{ borderTop: `1px solid ${divider}` }}>
            <div className="flex-1">
              <p className={`text-[11px] uppercase tracking-wider mb-1.5 ${labelCls}`}>Unique Visitors</p>
              <p className={`text-[22px] font-bold leading-none tracking-tight ${valueCls}`}>
                {fmtLong(stats.uniqueVisitors)}
              </p>
            </div>
            <div className="w-px mx-5" style={{ background: divider }} />
            <div className="flex-1">
              <p className={`text-[11px] uppercase tracking-wider mb-1.5 ${labelCls}`}>Sessions</p>
              <p className={`text-[22px] font-bold leading-none tracking-tight ${valueCls}`}>
                {fmtLong(stats.totalVisitors)}
              </p>
            </div>
            <div className="w-px mx-5" style={{ background: divider }} />
            <div className="flex-1">
              <p className={`text-[11px] uppercase tracking-wider mb-1.5 ${labelCls}`}>Today</p>
              <p className={`text-[22px] font-bold leading-none tracking-tight ${valueCls}`}>
                {fmtLong(stats.todayVisitors)}
              </p>
            </div>
          </div>
        </div>

        {/* Graph — edge to edge */}
        <div className="mt-4">
          <Graph timeseries={stats.timeseries} isDark={isDark} modalBg={modalBg} />
        </div>

        {/* Most visited page */}
        {topPage && (
          <div className="px-6">
            <div className="pb-5 pt-3" style={{ borderTop: `1px solid ${divider}` }}>
              <div className="flex items-center justify-between">
                <span className={`text-[11px] uppercase tracking-wider ${labelCls}`}>Most visited</span>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-mono font-medium ${valueCls}`}>{topPage.path}</span>
                  <span className={`text-xs ${labelCls}`}>{fmtLong(topPage.views)} views</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>,
    document.body
  );
}
