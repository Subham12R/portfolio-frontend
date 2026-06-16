"use client";

import { useEffect } from "react";
import { useLenis } from "@/components/providers/SmoothScroll";

type ContactModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const { lenis } = useLenis();

  // Prevent background scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-bg-overlay backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-50 w-full max-w-4xl rounded-md border border-border-primary bg-bg-elevated shadow-2xl shadow-shadow-strong">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-primary px-6 py-4">
          <h2 className="text-lg font-medium text-text-primary">
            Schedule a Call
          </h2>
          <button
            onClick={onClose}
            className="text-text-tertiary hover:text-text-primary transition"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="h-[70vh] w-full ">
          <iframe
            src="https://cal.com/subham12r/15min"
            className="h-full w-full rounded-b-md p-4"
            frameBorder="1"
            allow="camera; microphone; fullscreen; autoplay"
          />
        </div>
      </div>
    </div>
  );
}
