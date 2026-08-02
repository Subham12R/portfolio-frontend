"use client";

import { useEffect, useState } from "react";
import type { AnalyticsStats } from "@/app/api/analytics/route";
import { VisitorModal } from "@/components/ui/VisitorModal";

export function VisitorBadge() {
  const [isOpen, setIsOpen] = useState(false);
  const [stats, setStats] = useState<AnalyticsStats | null>(null);

  useEffect(() => {
    fetch("/api/analytics", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load visitor analytics");
        return response.json();
      })
      .then((data: AnalyticsStats) => setStats(data))
      .catch(() => {});
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => stats && setIsOpen(true)}
        disabled={!stats}
        className="inline-flex items-center gap-1.5 h-9 px-2 rounded-md underline underline-offset-4 underline-color-text-muted transition-colors hover:text-text-primary disabled:cursor-wait"
        aria-label="Open visitor insights"
      >
        <span className="text-sm font-medium text-text-secondary whitespace-nowrap">
          {stats ? `${stats.totalVisitors.toLocaleString()} visits` : "···"}
        </span>
      </button>

      {isOpen && stats && (
        <VisitorModal stats={stats} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
}
