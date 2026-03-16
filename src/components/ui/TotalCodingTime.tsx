"use client";

import { Clock3 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const DEVSTATS_API =
  process.env.NEXT_PUBLIC_DEVSTATS_API_URL || "https://devstats-zruar.ondigitalocean.app";
const STATUS_SOURCES = [
  `${DEVSTATS_API}/status`,
  process.env.NEXT_PUBLIC_DEVSTATS_LOCAL_AGENT_URL,
].filter((source): source is string => Boolean(source));

type PresencePayload = {
  status?: string;
  isActive?: boolean;
  totalActiveMs?: number | string;
  durationMs?: number | string;
  elapsedMs?: number | string;
  duration?: number | string;
  elapsed?: number | string;
  sessionDuration?: number | string;
};

function parseDurationMs(value: unknown): number | null {
  if (typeof value === "number") {
    if (value <= 0) return null;
    return value < 10_000 ? value * 1000 : value;
  }
  if (typeof value === "string") {
    const numeric = Number(value.trim());
    if (Number.isNaN(numeric) || numeric <= 0) return null;
    return numeric < 10_000 ? numeric * 1000 : numeric;
  }
  return null;
}

function readTotalMs(payload: PresencePayload): number | null {
  return (
    parseDurationMs(payload.totalActiveMs) ||
    parseDurationMs(payload.durationMs) ||
    parseDurationMs(payload.elapsedMs) ||
    parseDurationMs(payload.duration) ||
    parseDurationMs(payload.elapsed) ||
    parseDurationMs(payload.sessionDuration)
  );
}

function isActivePayload(payload: PresencePayload): boolean {
  const text = (payload.status || "").toLowerCase();
  const explicitIdle = /\b(idle|away|offline|afk)\b/.test(text);
  const explicitActive = /\b(active|coding|online)\b/.test(text);
  return !explicitIdle && (Boolean(payload.isActive) || explicitActive);
}

function formatTotal(ms: number | null): string {
  if (typeof ms !== "number") return "--";
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}

async function fetchStatusPayload(): Promise<PresencePayload | null> {
  for (const source of STATUS_SOURCES) {
    try {
      const res = await fetch(source, { cache: "no-store" });
      if (!res.ok) continue;
      const data = (await res.json()) as PresencePayload;
      return data;
    } catch {
      // Continue to next source.
    }
  }
  return null;
}

export default function TotalCodingTime({
  className = "",
}: {
  className?: string;
}) {
  const [totalMs, setTotalMs] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false);

  const lastLiveTotalRef = useRef<number | null>(null);
  const frozenOfflineTotalRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const payload = await fetchStatusPayload();
      if (!payload || cancelled) return;

      const active = isActivePayload(payload);
      const fetchedTotalMs = readTotalMs(payload);

      if (active) {
        if (typeof fetchedTotalMs === "number") {
          lastLiveTotalRef.current = fetchedTotalMs;
        }
        frozenOfflineTotalRef.current = null;

        setIsActive(true);
        setTotalMs(lastLiveTotalRef.current ?? fetchedTotalMs);
        return;
      }

      if (frozenOfflineTotalRef.current === null) {
        frozenOfflineTotalRef.current =
          lastLiveTotalRef.current ?? fetchedTotalMs ?? null;
      }

      setIsActive(false);
      setTotalMs(frozenOfflineTotalRef.current);
    }

    load();
    const interval = setInterval(load, 10_000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={`min-w-0 ${className}`.trim()}>
      <div className="inline-flex items-center gap-1 text-[10px]  tracking-wider text-text-tertiary">
        <Clock3 size={12} />
        Total time:
      </div>
      <div className="text-sm font-semibold text-text-primary">
        {" "}
        {formatTotal(totalMs)}
      </div>
    </div>
  );
}
