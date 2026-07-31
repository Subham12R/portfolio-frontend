"use client";

import { useEffect, useState } from "react";
import type { PublicAnalyticsStats } from "@/app/api/analytics/route";


export function VisitorBadge() {
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState<PublicAnalyticsStats | null>(null);

  useEffect(() => {
    setMounted(true);
    fetch("/api/analytics", { cache: "no-store" })
      .then((r) => r.json())
      .then((data: PublicAnalyticsStats) => setStats(data))
      .catch(() => {});
  }, []);

  if (!mounted) {
    return <div className="h-9 w-[90px] rounded-md bg-bg-badge/10 border-2 shadow-[inset_0px_0px_2px_2px_rgba(0,0,0,0.08)] dark:shadow-[inset_0px_0px_4px_4px_rgba(255,255,255,0.04)] border-border-primary" />;
  }

  return (
    <>
      <span className="inline-flex items-center gap-1.5 h-9 px-2 rounded-md underline underline-offset-4 underline-color-text-muted">
        <span className="text-sm font-medium text-text-secondary whitespace-nowrap">
          {stats ? `${stats.totalVisitors.toLocaleString()} visits ` : "···"}
        </span>
      </span>
    </>
  );
}
