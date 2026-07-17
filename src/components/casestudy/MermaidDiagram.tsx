"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface MermaidDiagramProps {
  chart: string;
  className?: string;
}

export function MermaidDiagram({ chart, className }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const reactId = useId().replace(/:/g, "");
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      if (!containerRef.current) return;
      setError(null);
      setReady(false);

      try {
        const mermaid = (await import("mermaid")).default;
        const isDark = resolvedTheme === "dark";

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "loose",
          theme: isDark ? "dark" : "neutral",
          fontFamily: "inherit",
          flowchart: {
            curve: "basis",
            padding: 16,
            htmlLabels: true,
            useMaxWidth: true,
          },
          themeVariables: isDark
            ? {
                primaryColor: "#1a1a1a",
                primaryTextColor: "#cfcfcf",
                primaryBorderColor: "rgba(255,255,255,0.15)",
                lineColor: "#71717a",
                secondaryColor: "#121212",
                tertiaryColor: "#0e0e0e",
                background: "transparent",
                mainBkg: "#171717",
                nodeBorder: "rgba(255,255,255,0.15)",
                clusterBkg: "#121212",
                titleColor: "#cfcfcf",
                edgeLabelBackground: "#0e0e0e",
              }
            : {
                primaryColor: "#f1f3f5",
                primaryTextColor: "#111111",
                primaryBorderColor: "#e2e8f0",
                lineColor: "#a0aec0",
                secondaryColor: "#ffffff",
                tertiaryColor: "#ffffff",
                background: "transparent",
                mainBkg: "#f1f3f5",
                nodeBorder: "#e2e8f0",
                clusterBkg: "#ffffff",
                titleColor: "#111111",
                edgeLabelBackground: "#ffffff",
              },
        });

        const id = `mermaid-${reactId}-${Date.now()}`;
        const { svg } = await mermaid.render(id, chart.trim());

        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
          const svgEl = containerRef.current.querySelector("svg");
          if (svgEl) {
            svgEl.setAttribute("width", "100%");
            svgEl.removeAttribute("height");
            svgEl.style.maxWidth = "100%";
            svgEl.style.height = "auto";
          }
          setReady(true);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to render diagram");
        }
      }
    }

    // Wait a tick so theme is resolved
    const t = window.setTimeout(render, 0);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, [chart, resolvedTheme, reactId]);

  return (
    <div
      className={cn(
        "w-full overflow-x-auto rounded-md bg-zinc-200/60 dark:bg-zinc-700/40 border border-bg-primary/50 shadow-[inset_0_0_4px_4px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_0_4px_4px_rgba(0,0,0,0.15)] p-4 sm:p-6",
        className
      )}
    >
      {!ready && !error && (
        <div className="flex items-center justify-center min-h-[180px] text-sm text-gray-500 dark:text-zinc-400">
          Loading diagram…
        </div>
      )}
      {error && (
        <pre className="text-xs text-red-500/90 whitespace-pre-wrap">{error}</pre>
      )}
      <div
        ref={containerRef}
        className={cn(
          "flex justify-center mermaid-diagram [&_svg]:max-w-full",
          !ready && "sr-only"
        )}
        aria-hidden={!ready}
      />
    </div>
  );
}
