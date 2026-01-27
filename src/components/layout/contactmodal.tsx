"use client"

import { useEffect } from "react"

type ContactModalProps = {
  open: boolean
  onClose: () => void
}

export default function ContactModal({ open, onClose }: ContactModalProps) {
  // Prevent background scroll
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-bg-overlay backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-50 w-full max-w-3xl rounded-2xl border border-border-primary bg-bg-elevated shadow-2xl shadow-shadow-strong">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-primary px-6 py-4">
          <h2 className="text-lg font-semibold text-text-primary">
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
        <div className="h-[70vh] w-full">
          <iframe
            src="https://cal.com/subham12r"
            className="h-full w-full rounded-b-2xl"
            frameBorder="0"
            allow="camera; microphone; fullscreen; autoplay"
          />
        </div>
      </div>
    </div>
  )
}
