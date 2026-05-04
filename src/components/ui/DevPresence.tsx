"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { Tooltip } from "react-tooltip";
import { Coffee, Dumbbell, Moon, Tv } from "lucide-react";
import { siteConfig } from "@/data/site.config";

const IDLE_TOOLTIP_ID = "devpresence-idle-tooltip";
const RECENT_LIVE_SIGNAL_MS = 75_000;

const DEVSTATS_API =
  process.env.NEXT_PUBLIC_DEVSTATS_API_URL ||
  "https://devstats-zruar.ondigitalocean.app";
const DEVSTATS_STATUS_API = `${DEVSTATS_API}/status`;
const LOCAL_AGENT_API = process.env.NEXT_PUBLIC_DEVSTATS_LOCAL_AGENT_URL;
const socket = io(DEVSTATS_API, { autoConnect: false });

type PresenceStatus = {
  status?: string;
  isActive?: boolean;
  editor?: string;
  activeEditor?: string;
  project?: string | { [key: string]: unknown };
  projectName?: string;
  project_name?: string;
  currentProject?: string;
  workspace?: string;
  workspaceName?: string;
  repo?: string;
  repoName?: string;
  repository?: string;
  title?: string;
  windowTitle?: string;
  details?: string;
  activity?: string;
  cwd?: string;
  filePath?: string;
  file?: string;
  language?: string;
  sessionDuration?: number | string;
  duration?: number | string;
  durationMs?: number | string;
  elapsed?: number | string;
  elapsedMs?: number | string;
  totalActiveMs?: number | string;
  activeSince?: number | string;
  startedAt?: number | string;
  sessionStart?: number | string;
  lastSeen?: number | string;
  stale?: boolean;
  ageMs?: number;
  receivedAt?: number | string;
  timestamp?: number | string;
  sessionId?: string;
  [key: string]: unknown;
};

function parseTimestamp(value: unknown): number | null {
  if (typeof value === "number") {
    return value < 1_000_000_000_000 ? value * 1000 : value;
  }

  if (typeof value === "string") {
    const numeric = Number(value);
    if (!Number.isNaN(numeric)) {
      return numeric < 1_000_000_000_000 ? numeric * 1000 : numeric;
    }

    const parsed = Date.parse(value);
    return Number.isNaN(parsed) ? null : parsed;
  }

  return null;
}

function parseDurationMs(value: unknown): number | null {
  if (typeof value === "number") {
    if (value <= 0) return null;
    return value < 10_000 ? value * 1000 : value;
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return null;

    if (trimmed.includes(":")) {
      const parts = trimmed.split(":").map((part) => Number(part));
      if (parts.some((part) => Number.isNaN(part))) return null;
      const [h = 0, m = 0, s = 0] =
        parts.length === 3 ? parts : [0, parts[0], parts[1]];
      return (h * 3600 + m * 60 + s) * 1000;
    }

    let totalMs = 0;
    let hasUnit = false;
    const unitPattern =
      /(\d+(?:\.\d+)?)\s*(hours?|hrs?|hr|h|minutes?|mins?|min|m|seconds?|secs?|sec|s)\b/gi;
    let match: RegExpExecArray | null;

    while ((match = unitPattern.exec(trimmed)) !== null) {
      const amount = Number(match[1]);
      if (Number.isNaN(amount)) continue;
      const unit = match[2].toLowerCase();

      if (unit.startsWith("h")) {
        totalMs += amount * 3600 * 1000;
      } else if (unit.startsWith("m")) {
        totalMs += amount * 60 * 1000;
      } else {
        totalMs += amount * 1000;
      }
      hasUnit = true;
    }

    if (hasUnit && totalMs > 0) {
      return Math.floor(totalMs);
    }

    const numeric = Number(trimmed);
    if (Number.isNaN(numeric)) return null;
    return parseDurationMs(numeric);
  }

  return null;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function formatDuration(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));

  if (totalSeconds < 60) {
    return `${totalSeconds}s`;
  }

  if (totalSeconds < 3600) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return seconds > 0 ? `${minutes}m ${seconds}s` : `${minutes}m`;
  }

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
}

function formatLastActiveTooltip(
  lastActiveMs: number | null,
  nowMs: number,
): string {
  if (typeof lastActiveMs !== "number") {
    return "Last active: unknown";
  }

  const ageSeconds = Math.max(0, Math.floor((nowMs - lastActiveMs) / 1000));
  const relative =
    ageSeconds < 60
      ? `${ageSeconds} sec ago`
      : ageSeconds < 3600
        ? `${Math.floor(ageSeconds / 60)} min ago`
        : ageSeconds < 86_400
          ? `${Math.floor(ageSeconds / 3600)} hr ago`
          : `${Math.floor(ageSeconds / 86_400)} day ago`;

  const absolute = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: siteConfig.timezone,
  }).format(new Date(lastActiveMs));

  return `Last active ${relative} (${absolute})`;
}

function extractNamedDurationMs(value: unknown, label: string): number | null {
  const extracted = extractNamedField(value, label);
  return extracted ? parseDurationMs(extracted) : null;
}

function extractNamedField(value: unknown, label: string): string | null {
  if (typeof value !== "string") return null;
  const escapedLabel = escapeRegExp(label);
  const pattern = new RegExp(
    `(?:^|\\n|\\b)${escapedLabel}\\s*:\\s*([^\\n\\r]+?)(?=\\s+\\w+\\s*:|$)`,
    "i",
  );
  const match = value.match(pattern);
  const extracted = match?.[1]?.trim();
  return extracted ? extracted : null;
}

function getStatusDurationMs(status: PresenceStatus | null): number | null {
  if (!status) return null;

  return (
    parseDurationMs(status.durationMs) ||
    parseDurationMs(status.elapsedMs) ||
    parseDurationMs(status.duration) ||
    parseDurationMs(status.elapsed) ||
    parseDurationMs(status.sessionDuration) ||
    extractNamedDurationMs(status.status, "active") ||
    extractNamedDurationMs(status.details, "active") ||
    extractNamedDurationMs(status.activity, "active") ||
    extractNamedDurationMs(status.title, "active") ||
    extractNamedDurationMs(status.windowTitle, "active")
  );
}

function getStatusField(
  status: PresenceStatus | null,
  label: string,
): string | null {
  if (!status) return null;

  return (
    extractNamedField(status.status, label) ||
    extractNamedField(status.details, label) ||
    extractNamedField(status.activity, label) ||
    extractNamedField(status.title, label) ||
    extractNamedField(status.windowTitle, label)
  );
}

function parseLocalAgentStatus(text: string): PresenceStatus | null {
  const raw = text.trim();
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    if (parsed && typeof parsed === "object") {
      const now = Date.now();
      const statusValue =
        typeof parsed.status === "string" ? parsed.status : "active";
      const parsedDurationMs =
        parseDurationMs(parsed.totalActiveMs) ||
        parseDurationMs(parsed.durationMs) ||
        parseDurationMs(parsed.elapsedMs) ||
        parseDurationMs(parsed.duration) ||
        parseDurationMs(parsed.elapsed) ||
        parseDurationMs(parsed.sessionDuration);
      const parsedStartedAt =
        parseTimestamp(parsed.startedAt) ||
        parseTimestamp(parsed.sessionStart) ||
        parseTimestamp(parsed.activeSince);
      const parsedLastSeen =
        parseTimestamp(parsed.lastSeen) ||
        parseTimestamp(parsed.receivedAt) ||
        parseTimestamp(parsed.timestamp) ||
        now;

      return {
        status: statusValue,
        isActive:
          Boolean(parsed.isActive) ||
          /\b(active|online|coding)\b/.test(statusValue.toLowerCase()) ||
          typeof parsedDurationMs === "number",
        editor: typeof parsed.editor === "string" ? parsed.editor : undefined,
        activeEditor:
          typeof parsed.activeEditor === "string"
            ? parsed.activeEditor
            : undefined,
        project:
          typeof parsed.project === "string" ||
          (typeof parsed.project === "object" && parsed.project !== null)
            ? (parsed.project as PresenceStatus["project"])
            : undefined,
        projectName:
          typeof parsed.projectName === "string"
            ? parsed.projectName
            : typeof parsed.project === "string"
              ? parsed.project
              : undefined,
        filePath:
          typeof parsed.filePath === "string"
            ? parsed.filePath
            : typeof parsed.file === "string"
              ? parsed.file
              : undefined,
        file: typeof parsed.file === "string" ? parsed.file : undefined,
        language:
          typeof parsed.language === "string" ? parsed.language : undefined,
        activity:
          typeof parsed.activity === "string"
            ? parsed.activity
            : typeof parsed.language === "string"
              ? `language: ${parsed.language}`
              : undefined,
        durationMs: parsedDurationMs || undefined,
        totalActiveMs:
          typeof parsed.totalActiveMs === "number" ||
          typeof parsed.totalActiveMs === "string"
            ? (parsed.totalActiveMs as number | string)
            : undefined,
        startedAt: parsedStartedAt || undefined,
        activeSince:
          parsedStartedAt ||
          (typeof parsedDurationMs === "number" && parsedDurationMs < now
            ? now - parsedDurationMs
            : undefined),
        lastSeen: parsedLastSeen,
        sessionId:
          typeof parsed.sessionId === "string" ? parsed.sessionId : undefined,
        timestamp:
          typeof parsed.timestamp === "number" ||
          typeof parsed.timestamp === "string"
            ? (parsed.timestamp as number | string)
            : undefined,
        stale: false,
        receivedAt: parsedLastSeen,
      };
    }
  } catch {
    // Non-JSON payloads are parsed below.
  }

  const now = Date.now();
  const header = raw.split(/\r?\n/)[0]?.toLowerCase() || "";
  const editor = extractNamedField(raw, "editor");
  const project = extractNamedField(raw, "project");
  const file = extractNamedField(raw, "file");
  const language = extractNamedField(raw, "language");
  const activeValue = extractNamedField(raw, "active");
  const activeDurationMs = parseDurationMs(activeValue);
  const hasActiveHeader = /\b(active|online|coding)\b/.test(header);
  const isActive = hasActiveHeader || typeof activeDurationMs === "number";

  return {
    status: raw,
    isActive,
    editor: editor || undefined,
    projectName: project || undefined,
    filePath: file || undefined,
    activity: language ? `language: ${language}` : undefined,
    durationMs: activeDurationMs || undefined,
    activeSince:
      typeof activeDurationMs === "number" && activeDurationMs < now
        ? now - activeDurationMs
        : undefined,
    lastSeen: now,
  };
}

function getProjectDetails(status: PresenceStatus | null): {
  name: string | null;
  hasRealProject: boolean;
} {
  if (!status) {
    return { name: null, hasRealProject: false };
  }

  const extractProjectFromRichText = (value: string): string | null => {
    const match = value.match(/project:\s*([^\n\r]+?)(?=\s+\w+\s*:|$)/i);
    if (!match?.[1]) return null;

    const project =
      match[1].trim().split(/[\\/]/).filter(Boolean).pop() || null;
    return project && project !== "-" ? project : null;
  };

  const cleanCandidate = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return null;

    const fromRichText = extractProjectFromRichText(trimmed);
    if (fromRichText) return fromRichText;

    if (/^(idle|active|online|offline|away|afk|dev presence)$/i.test(trimmed)) {
      return null;
    }

    const parts = trimmed
      .split(/[\u2014\u2013|•]+| - /g)
      .map((part) => part.trim())
      .filter(Boolean)
      .filter(
        (part) =>
          !/^(visual studio code|vs code|vscode|cursor|code|zed})$/i.test(part),
      );

    const likelyProject =
      parts.find((part) => !/\.[a-z0-9]{1,5}$/i.test(part)) ||
      parts[0] ||
      trimmed;

    const basename =
      likelyProject.split(/[\\/]/).filter(Boolean).pop() || likelyProject;
    if (
      /^(idle|active|online|offline|away|afk|dev presence)$/i.test(basename)
    ) {
      return null;
    }
    return basename.trim() || null;
  };

  if (typeof status.project === "string") {
    const project = cleanCandidate(status.project);
    if (project) return { name: project, hasRealProject: true };
  }

  if (typeof status.project === "object" && status.project) {
    const projectObjKeys = ["name", "title", "repo", "repoName", "workspace"];
    for (const key of projectObjKeys) {
      const value = status.project[key];
      if (typeof value === "string") {
        const project = cleanCandidate(value);
        if (project) return { name: project, hasRealProject: true };
      }
    }
  }

  const candidateKeys = [
    "projectName",
    "project_name",
    "currentProject",
    "workspace",
    "workspaceName",
    "repo",
    "repoName",
    "repository",
    "cwd",
    "filePath",
    "status",
    "windowTitle",
    "title",
    "details",
    "activity",
  ] as const;

  for (const key of candidateKeys) {
    const value = status[key];
    if (typeof value === "string") {
      const project = cleanCandidate(value);
      if (project) return { name: project, hasRealProject: true };
    }
  }

  return { name: null, hasRealProject: false };
}

function getEditorName(status: PresenceStatus | null): string | null {
  if (!status) return null;

  const directEditor =
    (typeof status.editor === "string" && status.editor.trim()) ||
    (typeof status.activeEditor === "string" && status.activeEditor.trim());

  if (directEditor) return directEditor;

  const textSources = [
    status.details,
    status.activity,
    status.title,
    status.windowTitle,
    status.status,
  ];
  for (const source of textSources) {
    if (typeof source !== "string") continue;
    const match = source.match(/editor:\s*([^\n\r]+?)(?=\s+\w+\s*:|$)/i);
    if (match?.[1]) return match[1].trim();
  }

  return null;
}

function getEditorIcon(editorName: string | null): {
  src: string;
  alt: string;
} {
  const normalized = editorName?.toLowerCase() || "";

  if (normalized.includes("cursor")) {
    return { src: "/icons/cursor.webp", alt: "Cursor" };
  }

  if (normalized.includes("zed")) {
    return { src: "/icons/zed.png", alt: "Zed" };
  }

  if (
    normalized.includes("vscode") ||
    normalized.includes("vs code") ||
    normalized.includes("visual studio code") ||
    normalized === "code"
  ) {
    return { src: "/icons/vscode.jpeg", alt: "VS Code" };
  }

  return { src: "/icons/vscode.jpeg", alt: editorName || "Editor" };
}

function formatEditorName(editorName: string | null): string | null {
  if (!editorName) return null;
  const normalized = editorName.trim().toLowerCase();
  if (
    normalized.includes("vscode") ||
    normalized.includes("vs code") ||
    normalized.includes("visual studio code") ||
    normalized === "code"
  ) {
    return "VS Code";
  }
  if (normalized.includes("cursor")) {
    return "Cursor";
  }
  return editorName.trim();
}

function getIdleText(hour: number): string {
  if (hour < 6) return "Sleeping";
  if (hour < 8) return "Hitting the gym";
  if (hour < 18) return "Taking a short break";
  if (hour < 23) return "Watching anime";
  return "Winding down";
}

function getIdleIcon(hour: number) {
  if (hour < 6) return <Moon size={14} className="text-text-tertiary" />;
  if (hour < 8) return <Dumbbell size={14} className="text-text-tertiary" />;
  if (hour < 18) return <Coffee size={14} className="text-text-tertiary" />;
  if (hour < 23) return <Tv size={14} className="text-text-tertiary" />;
  return <Moon size={14} className="text-text-tertiary" />;
}

export default function DevPresence() {
  const [status, setStatus] = useState<PresenceStatus | null>(null);
  const [now, setNow] = useState<number | null>(null);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [lastLiveSignalAt, setLastLiveSignalAt] = useState<number | null>(null);
  const [localSessionStart, setLocalSessionStart] = useState<number | null>(
    null,
  );
  const latestStatusRef = useRef<PresenceStatus | null>(null);
  const lastLiveSignalRef = useRef<number | null>(null);

  useEffect(() => {
    const getPresenceState = (data: PresenceStatus, currentTime: number) => {
      const text = data.status?.toLowerCase() || "";
      const explicitIdle = /\b(idle|away|offline|afk)\b/.test(text);
      const explicitLive = /\b(active|coding|online)\b/.test(text);
      const durationMs = getStatusDurationMs(data);
      const seenAt =
        parseTimestamp(data.lastSeen) ||
        parseTimestamp(data.receivedAt) ||
        parseTimestamp(data.timestamp);
      const seenRecently =
        typeof seenAt === "number" ? currentTime - seenAt < 300_000 : false;

      if (explicitIdle) return "idle";
      if (
        explicitLive ||
        Boolean(data.isActive) ||
        Boolean(durationMs) ||
        seenRecently
      ) {
        return "coding";
      }
      return "unknown";
    };

    const isLikelyLivePayload = (data: PresenceStatus, currentTime: number) => {
      return getPresenceState(data, currentTime) === "coding";
    };

    const shouldFallbackToLocalAgent = (data: PresenceStatus) => {
      const staleByFlag = data.stale === true;
      const staleByAge = typeof data.ageMs === "number" && data.ageMs > 120_000;
      return staleByFlag || staleByAge;
    };

    const fetchLocalAgentStatus = async (): Promise<PresenceStatus | null> => {
      if (!LOCAL_AGENT_API) return null;

      try {
        const res = await fetch(LOCAL_AGENT_API, { cache: "no-store" });
        if (!res.ok) return null;
        const text = await res.text();
        return parseLocalAgentStatus(text);
      } catch {
        return null;
      }
    };

    const isWeakPayload = (data: PresenceStatus) => {
      const statusString = typeof data.status === "string" ? data.status : "";
      const hasInlineDetails = /project:|editor:|file:|agent:/i.test(
        statusString,
      );
      const hasProject = getProjectDetails(data).hasRealProject;
      const hasEditor = Boolean(getEditorName(data));
      const hasTiming =
        Boolean(parseTimestamp(data.lastSeen)) ||
        Boolean(parseTimestamp(data.startedAt)) ||
        Boolean(parseTimestamp(data.sessionStart)) ||
        Boolean(parseTimestamp(data.activeSince)) ||
        Boolean(getStatusDurationMs(data));

      return (
        !Boolean(data.isActive) &&
        !hasInlineDetails &&
        !hasProject &&
        !hasEditor &&
        !hasTiming
      );
    };

    const shouldIgnoreWeakPollUpdate = (
      data: PresenceStatus,
      currentTime: number,
    ) => {
      if (!isWeakPayload(data) || !latestStatusRef.current) return false;

      const current = latestStatusRef.current;
      const currentIsWeak = isWeakPayload(current);
      const nextState = getPresenceState(data, currentTime);
      const currentState = getPresenceState(current, currentTime);
      const hasRecentLiveSignal =
        typeof lastLiveSignalRef.current === "number" &&
        currentTime - lastLiveSignalRef.current < RECENT_LIVE_SIGNAL_MS;

      if (nextState === "idle" && hasRecentLiveSignal) {
        return true;
      }

      return !currentIsWeak && currentState === nextState;
    };

    const isReliablyIdle = (data: PresenceStatus, currentTime: number) => {
      const text = data.status?.toLowerCase() || "";
      const lastSeen = parseTimestamp(data.lastSeen);
      if (!/\b(idle|away|offline|afk)\b/.test(text)) return false;
      if (typeof lastSeen !== "number") return false;
      return currentTime - lastSeen > 120_000;
    };

    const shouldTreatAsCoding = (data: PresenceStatus, currentTime: number) => {
      const text = data.status?.toLowerCase() || "";
      const explicitIdle = /\b(idle|away|offline|afk)\b/.test(text);
      const explicitCoding = /\b(active|coding|online)\b/.test(text);
      const seen = parseTimestamp(data.lastSeen);
      const seenRecently =
        typeof seen === "number" ? currentTime - seen < 300_000 : false;
      return (
        !explicitIdle &&
        (explicitCoding || Boolean(data.isActive) || seenRecently)
      );
    };

    const getPayloadStart = (data: PresenceStatus, currentTime: number) => {
      const backendStart =
        parseTimestamp(data.startedAt) ||
        parseTimestamp(data.sessionStart) ||
        parseTimestamp(data.activeSince);

      const durationMs = getStatusDurationMs(data);

      const fromDuration =
        typeof durationMs === "number" && durationMs < currentTime
          ? currentTime - durationMs
          : null;

      return backendStart || fromDuration || parseTimestamp(data.lastSeen);
    };

    const applyIncomingStatus = (
      data: PresenceStatus,
      source: "poll" | "socket",
    ) => {
      const currentTime = Date.now();
      if (source === "poll" && shouldIgnoreWeakPollUpdate(data, currentTime)) {
        return;
      }

      latestStatusRef.current = data;
      setStatus(data);

      if (shouldTreatAsCoding(data, currentTime)) {
        lastLiveSignalRef.current = currentTime;
        setLastLiveSignalAt(currentTime);
        const payloadStart = getPayloadStart(data, currentTime);
        setLocalSessionStart((prev) => {
          if (typeof payloadStart === "number") {
            if (typeof prev === "number") {
              // Keep the earliest known session start so the timer remains monotonic.
              return Math.min(prev, payloadStart);
            }
            return payloadStart;
          }

          return prev || currentTime;
        });
      } else if (isReliablyIdle(data, currentTime)) {
        setLocalSessionStart(null);
      }
    };

    async function loadStatus() {
      try {
        const currentTime = Date.now();
        const localData = await fetchLocalAgentStatus();
        const res = await fetch(DEVSTATS_STATUS_API, { cache: "no-store" });
        if (!res.ok) {
          if (localData) applyIncomingStatus(localData, "poll");
          return;
        }
        const data = (await res.json()) as PresenceStatus;
        if (
          localData &&
          isLikelyLivePayload(localData, currentTime) &&
          shouldFallbackToLocalAgent(data)
        ) {
          applyIncomingStatus(localData, "poll");
          return;
        }

        applyIncomingStatus(data, "poll");
      } catch {
        const localData = await fetchLocalAgentStatus();
        if (localData) {
          applyIncomingStatus(localData, "poll");
        }
      }
    }

    loadStatus();
    const poll = setInterval(loadStatus, 15_000);

    const onActivity = (data: PresenceStatus) => {
      applyIncomingStatus(data, "socket");
    };
    const onStatus = (data: PresenceStatus) =>
      applyIncomingStatus(data, "socket");

    socket.connect();
    socket.on("connect", () => setIsSocketConnected(true));
    socket.on("disconnect", () => setIsSocketConnected(false));
    socket.on("activity", onActivity);
    socket.on("status", onStatus);

    return () => {
      clearInterval(poll);
      socket.off("connect");
      socket.off("disconnect");
      socket.off("activity", onActivity);
      socket.off("status", onStatus);
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const { name: projectName, hasRealProject } = getProjectDetails(status);
  const editorName = getEditorName(status);
  const formattedEditorName = formatEditorName(editorName);
  const statusText = status?.status?.toLowerCase() || "";
  const statusFile = getStatusField(status, "file");
  const statusLanguage = getStatusField(status, "language");
  const lastSeen = parseTimestamp(status?.lastSeen);
  const backendStart =
    parseTimestamp(status?.startedAt) ||
    parseTimestamp(status?.sessionStart) ||
    parseTimestamp(status?.activeSince);
  const payloadDurationMs = getStatusDurationMs(status);
  const fromDuration =
    typeof now === "number" && typeof payloadDurationMs === "number"
      ? now - payloadDurationMs
      : null;
  const startedAt = backendStart || fromDuration || lastSeen;

  const isExplicitIdle = /\b(idle|away|offline|afk)\b/.test(statusText);
  const isExplicitCoding = /\b(active|coding|online)\b/.test(statusText);
  const hasReliableLastSeen = typeof lastSeen === "number";
  const idleFor =
    hasReliableLastSeen && typeof now === "number" ? now - lastSeen : null;
  const seenRecently = idleFor !== null ? idleFor < 300_000 : false;
  const hasRecentLiveSignal =
    typeof now === "number" &&
    typeof lastLiveSignalAt === "number" &&
    now - lastLiveSignalAt < RECENT_LIVE_SIGNAL_MS;
  const hasAgentActiveDuration =
    typeof payloadDurationMs === "number" && payloadDurationMs > 0;
  const hasLiveSignal =
    isExplicitCoding ||
    Boolean(status?.isActive) ||
    seenRecently ||
    hasRecentLiveSignal ||
    hasAgentActiveDuration;
  const isStrongIdle =
    isExplicitIdle &&
    idleFor !== null &&
    idleFor > 120_000 &&
    !hasAgentActiveDuration;
  const isCoding =
    !isStrongIdle &&
    (hasLiveSignal ||
      (!isExplicitIdle &&
        isSocketConnected &&
        (hasRealProject || !hasReliableLastSeen)));
  const hasFileContext =
    (typeof status?.filePath === "string" &&
      status.filePath.trim().length > 0) ||
    (typeof status?.file === "string" && status.file.trim().length > 0) ||
    (typeof status?.language === "string" &&
      status.language.trim().length > 0) ||
    Boolean(statusFile) ||
    Boolean(statusLanguage);
  const isThinkingMode =
    isCoding && Boolean(editorName) && !hasRealProject && !hasFileContext;

  const codingDuration =
    isCoding && now !== null && (localSessionStart || startedAt)
      ? Math.max(0, now - (localSessionStart || startedAt || now))
      : 0;

  if (!status || now === null) return null;

  const localHour = Number(
    new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      hour12: false,
      timeZone: siteConfig.timezone,
    }).format(new Date(now)),
  );

  const shouldShowDeepIdle =
    isStrongIdle && !hasLiveSignal && !isSocketConnected;
  const isStaleStatus =
    status?.stale === true ||
    (typeof status?.ageMs === "number" && status.ageMs > 120_000);
  const shouldShowOffline = isStaleStatus && !hasLiveSignal;
  const lastActiveMs =
    parseTimestamp(status?.lastSeen) ||
    parseTimestamp(status?.receivedAt) ||
    parseTimestamp(status?.timestamp);
  const idleTooltip =
    !isCoding && typeof lastActiveMs === "number"
      ? formatLastActiveTooltip(lastActiveMs, now)
      : undefined;
  const idleText = shouldShowOffline
    ? "Offline"
    : shouldShowDeepIdle
      ? getIdleText(localHour)
      : "Taking a short break";
  const editorIcon = getEditorIcon(editorName);

  const icon = isCoding ? (
    <Image
      src={editorIcon.src}
      alt={editorIcon.alt}
      width={20}
      height={20}
      className="shrink-0 rounded-sm"
    />
  ) : (
    <span className="flex size-5 shrink-0 items-center justify-center [&>svg]:size-[14px]">
      {getIdleIcon(localHour)}
    </span>
  );

  return (
    <div className="inline-flex items-center gap-2 text-sm text-text-secondary">
      {icon}
      {isCoding ? (
        <span>
          {isThinkingMode ? (
            <>
              Actively thinking in{" "}
              <strong className="font-semibold text-text-primary">
                {formattedEditorName || "editor"}
              </strong>{" "}
              for {formatDuration(codingDuration)}
            </>
          ) : (
            <>
              Coding on{" "}
              {hasRealProject && projectName ? (
                <strong className="font-semibold text-text-primary">
                  {projectName}
                </strong>
              ) : (
                <strong className="font-semibold text-text-primary">
                  current workspace
                </strong>
              )}
              {formattedEditorName ? ` in ${formattedEditorName}` : ""} for{" "}
              {formatDuration(codingDuration)}
            </>
          )}
        </span>
      ) : (
        <>
          <span
            data-tooltip-id={idleTooltip ? IDLE_TOOLTIP_ID : undefined}
            data-tooltip-content={idleTooltip ?? undefined}
            className={idleTooltip ? "cursor-help" : undefined}
          >
            {idleText}
          </span>
          {idleTooltip && (
            <Tooltip
              id={IDLE_TOOLTIP_ID}
              place="top"
              className="max-w-xs! rounded-md! px-3! py-2! text-sm! font-medium!"
            />
          )}
        </>
      )}
    </div>
  );
}
