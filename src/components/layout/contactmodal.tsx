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
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-50 w-full max-w-3xl rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl shadow-black/70">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <h2 className="text-lg font-semibold text-white">
            Schedule a Call
          </h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition"
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
