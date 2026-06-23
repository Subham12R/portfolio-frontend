"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { AnalyticsStats } from "@/app/api/analytics/route";
import { VisitorModal } from "./VisitorModal";

function fmt(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}m`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
  return String(n);
}

export function VisitorBadge() {
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch("/api/analytics", { cache: "no-store" })
      .then((r) => r.json())
      .then((data: AnalyticsStats) => setStats(data))
      .catch(() => {});
  }, []);

  if (!mounted) {
    return <div className="h-9 w-[90px] rounded-md bg-bg-badge/10 border-2 shadow-[inset_0px_0px_2px_2px_rgba(0,0,0,0.08)] dark:shadow-[inset_0px_0px_4px_4px_rgba(255,255,255,0.04)] border-border-primary" />;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => stats && setOpen(true)}
        className="inline-flex items-center gap-1.5 h-9 px-2 rounded-md underline underline-offset-4 underline-color-text-muted cursor-pointer hover:opacity-70 transition-opacity duration-150 disabled:cursor-default disabled:hover:opacity-100"
        disabled={!stats}
      >
        <span className="text-sm font-medium text-text-secondary whitespace-nowrap">
          {stats ? `You are the ${fmt(stats.totalVisitors)}th visitor` : "···"}
        </span>
      </button>

      <AnimatePresence>
        {open && stats && (
          <VisitorModal stats={stats} onClose={() => setOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
