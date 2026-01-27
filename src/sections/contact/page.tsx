"use client"

import { useState } from "react"
import ContactModal from "@/components/layout/contactmodal"
import { ScrollRevealText } from "@/components/ui/ScrollRevealText"
import { siteConfig } from "@/data"
import { ArrowRight } from "lucide-react"

export default function ContactCTA() {
  const [open, setOpen] = useState(false)
  const section = siteConfig.sections.contact

  return (
    <section id={section.id} className="w-full flex flex-col justify-center items-center bg-bg-primary py-20 px-4 lg:px-0 ">
      <div className="flex flex-col justify-center items-center w-full max-w-4xl text-center bg-bg-elevated/50 py-12 px-6 rounded-2xl border border-border-primary shadow-(--skills-card-shadow)">

        <ScrollRevealText as="h2" className="text-3xl md:text-4xl font-semibold mb-4" start="top 90%" end="top 70%">
          Let's work together
        </ScrollRevealText>

        <ScrollRevealText as="p" className="mb-8 max-w-lg text-center leading-relaxed" start="top 85%" end="top 65%">
          Have a project in mind or want to discuss opportunities?
          I'm always open to new conversations and collaborations.
        </ScrollRevealText>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => setOpen(true)}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-text-primary text-text-inverse px-6 py-3 font-medium hover:opacity-90 transition-all duration-200"
          >
            Schedule a Call
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </button>

          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border-secondary px-6 py-3 text-text-primary font-medium hover:bg-hover-tint hover:border-border-accent transition-all duration-200"
          >
            Send an Email
          </a>
        </div>

        <ContactModal open={open} onClose={() => setOpen(false)} />

      </div>
    </section>
  )
}
