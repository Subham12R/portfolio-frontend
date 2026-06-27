"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useLenis } from "@/components/providers/SmoothScroll";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useTheme } from "next-themes";
import type { AnalyticsStats } from "@/app/api/analytics/route";
import { AreaChart, Area, ChartTooltip, Grid } from "@/components/ui/area-chart";

// ─── Formatting ───────────────────────────────────────────────────────────────

function fmtLong(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}m`;
  return n.toLocaleString();
}

function fmtDay(iso: string): string {
  const [, m, d] = iso.split("-");
  return `${d}.${m}`;
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
  const { lenis } = useLenis();
  const isDark = resolvedTheme !== "light";
  const modalBg  = isDark ? "#111111" : "#ffffff";
  const titleCls = isDark ? "text-white"   : "text-zinc-900";
  const labelCls = "text-zinc-500";
  const valueCls = isDark ? "text-white"   : "text-zinc-900";
  const divider  = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    const origHtmlOverflow = html.style.overflow;
    const origBodyOverflow = body.style.overflow;

    // Prevent native scroll without position:fixed — Lenis holds its own scroll
    // position internally, so stop()/start() is enough to preserve position.
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    lenis?.stop();

    const preventTouch = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-modal-content]")) {
        e.preventDefault();
      }
    };
    document.addEventListener("touchmove", preventTouch, { passive: false });

    return () => {
      html.style.overflow = origHtmlOverflow;
      body.style.overflow = origBodyOverflow;
      lenis?.start();
      document.removeEventListener("touchmove", preventTouch);
    };
  }, [lenis]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  const start = stats.timeseries[0]?.date;
  const end   = stats.timeseries[stats.timeseries.length - 1]?.date;
  const range = start && end ? `${fmtDay(start)} – ${fmtDay(end)}` : "";
  const topPage = stats.topPages[0];

  const chartData = stats.timeseries.map((d) => ({
    date: d.date,
    visitors: d.visitors,
    sessions: Math.round(d.visitors * 1.18),
  }));

  return createPortal(
    <motion.div
      className="fixed inset-0 z-9999 flex items-center justify-center p-4"
      variants={backdrop} initial="hidden" animate="visible" exit="exit"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />

      <motion.div
        variants={card}
        data-modal-content
        className="relative w-full max-w-xl rounded-2xl overflow-hidden bg-white/80 dark:bg-zinc-950/60 border-2 border-border-primary backdrop-blur-xl shadow-[inset_0px_0px_2px_2px_rgba(0,0,0,0.08)] dark:shadow-[inset_0px_0px_4px_4px_rgba(255,255,255,0.04)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-0">
          <div className="flex items-start justify-between">
            <div className="flex items-baseline gap-2">
              <span className={`text-xl font-semibold tracking-tight ${titleCls}`}>Insights</span>
              {range && <span className={`text-xs ${labelCls}`}>{range}</span>}
            </div>
            <button
              onClick={onClose}
              className={`p-1.5 rounded-md transition-colors duration-150 ${isDark ? "text-zinc-600 hover:text-white hover:bg-white/5" : "text-zinc-400 hover:text-zinc-900 hover:bg-black/5"}`}
            >
              <X size={16} />
            </button>
          </div>

          {/* Stats */}
          <div className="flex items-stretch gap-6 mt-5 pt-5" >
            <div>
              <p className={`text-[11px] uppercase tracking-wider mb-1.5 ${labelCls}`}>Unique Visitors</p>
              <p className={`text-[22px] font-bold leading-none tracking-tight ${valueCls}`}>
                {fmtLong(stats.uniqueVisitors)}
              </p>
            </div>
            <div>
              <p className={`text-[11px] uppercase tracking-wider mb-1.5 ${labelCls}`}>Sessions</p>
              <p className={`text-[22px] font-bold leading-none tracking-tight ${valueCls}`}>
                {fmtLong(stats.totalVisitors)}
              </p>
            </div>
            <div>
              <p className={`text-[11px] uppercase tracking-wider mb-1.5 ${labelCls}`}>Today</p>
              <p className={`text-[22px] font-bold leading-none tracking-tight ${valueCls}`}>
                {fmtLong(stats.todayVisitors)}
              </p>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="mt-4 h-40">
          <AreaChart
            data={chartData}
            xKey="date"
            margin={{ top: 12, right: 0, bottom: 12, left: 0 }}
            yPadding={0.05}
          >
            <Grid
              horizontal
              numTicksRows={3}
              fadeHorizontal={false}
            />
            <Area
              dataKey="sessions"
              fillOpacity={0.35}
              strokeWidth={1.5}
              showHighlight={false}
              fadeEdges
            />
            <Area
              dataKey="visitors"
              fillOpacity={0.15}
              strokeWidth={2}
              fadeEdges
            />
            <ChartTooltip
              showDatePill={false}
              rows={(point) => [
                {
                  color: "var(--chart-line-primary)",
                  label: "Visitors",
                  value: (point.visitors as number) ?? 0,
                },
                {
                  color: "var(--chart-line-secondary)",
                  label: "Sessions",
                  value: (point.sessions as number) ?? 0,
                },
              ]}
            />
          </AreaChart>
        </div>

        {/* Most visited page */}
        {topPage && (
          <div className="px-6">
            <div className="pb-5 pt-3">
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
