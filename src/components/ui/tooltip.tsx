"use client";

import { Tooltip as ReactTooltip } from "react-tooltip";
import type { ComponentProps } from "react";

export function TooltipGlass(props: ComponentProps<typeof ReactTooltip>) {
  return (
    <ReactTooltip
      {...props}
      className="tooltip-glass z-[10000]"
      style={{
        backgroundColor: "var(--color-bg-card)",
        color: "var(--color-text-primary)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid var(--color-border-primary)",
        borderRadius: "8px",
        fontSize: "13px",
        fontWeight: "500",
        padding: "6px 12px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
      }}
    />
  );
}
