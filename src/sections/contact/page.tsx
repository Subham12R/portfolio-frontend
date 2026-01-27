"use client"

import { useState } from "react"
import ContactModal from "@/components/layout/contactmodal"

export default function ContactCTA() {
  const [open, setOpen] = useState(false)

  return (
    <div className="w-full  flex flex-col justify-center items-center bg-black py-20">
        <div className="flex flex-col justify-center items-center w-full max-w-4xl px-4 text-center bg-zinc-900 py-4 rounded-2xl border-2 border-white/10 shadow-[inset_0_4px_24px_0_rgba(255,255,255,0.10),inset_0_-4px_24px_0_rgba(0,0,0,0.8)]">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Contact / Schedule a Call</h1>
      <p className="text-white/70 mb-8 max-w-xl text-center">
        Interested in working together or have a question? Click below to schedule a call or send a message.
      </p>
      <button
        onClick={() => setOpen(true)}
        className="rounded-full border border-white/20 px-6 py-3 text-white/90 font-medium shadow-lg hover:bg-white/10 transition"
      >
        Contact / Schedule Call
      </button>
      <ContactModal open={open} onClose={() => setOpen(false)} />

        </div>
      
    </div>
  )
}
