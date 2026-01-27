"use client"

import { useState } from "react"
import ContactModal from "@/components/layout/contactmodal"
import { siteConfig } from "@/data"
import { ArrowRight } from "lucide-react"

export default function ContactCTA() {
  const [open, setOpen] = useState(false)
  const section = siteConfig.sections.contact

  return (
    <section id={section.id} className="w-full flex flex-col justify-center items-center bg-black py-20 px-4 lg:px-0">
      <div className="flex flex-col justify-center items-center w-full max-w-4xl text-center bg-zinc-900/50 py-12 px-6 rounded-2xl border border-white/10 shadow-[inset_0_4px_24px_0_rgba(255,255,255,0.06),inset_0_-4px_24px_0_rgba(0,0,0,0.6)]">

        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
          Let's work together
        </h2>

        <p className="text-white/60 mb-8 max-w-lg text-center leading-relaxed">
          Have a project in mind or want to discuss opportunities?
          I'm always open to new conversations and collaborations.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => setOpen(true)}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-white text-black px-6 py-3 font-medium hover:bg-white/90 transition-all duration-200"
          >
            Schedule a Call
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </button>

          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-white/90 font-medium hover:bg-white/5 hover:border-white/30 transition-all duration-200"
          >
            Send an Email
          </a>
        </div>

        <ContactModal open={open} onClose={() => setOpen(false)} />

      </div>
    </section>
  )
}
