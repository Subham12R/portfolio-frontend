'use client'
import { useRef, useState, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { ChevronDown, Link, LinkIcon } from "lucide-react"
import type { Experience } from "@/data/experience"
import { ScrollRevealText } from "@/components/ui/ScrollRevealText"
import { getTechIcon } from "@/data/tech-icons"

interface ExperienceCardProps {
  experience: Experience
  defaultExpanded?: boolean
}

// Logo outline color mapping
const logoColorMap: Record<string, string> = {
  orange: "outline-orange-500/40",
  blue: "outline-blue-500/40",
  green: "outline-green-500/40",
  purple: "outline-purple-500/40",
  red: "outline-red-500/40",
  white: "outline-white/40",
}

export function ExperienceCard({ experience, defaultExpanded = false }: ExperienceCardProps) {
  const [open, setOpen] = useState(defaultExpanded)
  const contentRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current || !iconRef.current) return
    if (defaultExpanded) {
      gsap.set(contentRef.current, {
        height: "auto",
        opacity: 1,
      })
      gsap.set(iconRef.current, {
        rotate: 180,
      })
    } else {
      gsap.set(contentRef.current, {
        height: 0,
        opacity: 0,
      })
    }
  }, [defaultExpanded])

  const toggle = () => {
    if (!contentRef.current || !iconRef.current) return

    if (!open) {
      gsap.to(contentRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => ScrollTrigger.refresh(),
      })
      gsap.to(iconRef.current, {
        rotate: 180,
        duration: 0.4,
        ease: "power2.out",
      })
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
      })
      gsap.to(iconRef.current, {
        rotate: 0,
        duration: 0.3,
        ease: "power2.inOut",
      })
    }
    setOpen(!open)
  }

  const outlineColor = logoColorMap[experience.logoColor || "white"] || "outline-white/40"

  return (
    <div className="w-full rounded-2xl bg-bg-elevated/50 border border-border-primary shadow-(--skills-card-shadow) p-4">
      {/* HEADER */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <Image
            src={experience.logo}
            alt={experience.company}
            width={48}
            height={48}
            className={`w-12 h-12 rounded-xl outline-2 outline-offset-2 ${outlineColor}`}
          />
          <div>
            <h2 className="text-lg font-semibold text-text-primary">
              {experience.role}
            </h2>
            <p className="text-sm text-text-secondary">
              {experience.company} · {experience.period}
            </p>
          </div>
        </div>


        <div className="flex items-center gap-1">
          {experience.links?.company && (
            <a
              href={experience.links.company}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg transition hover:bg-hover-tint"
              aria-label={`Visit ${experience.company} website`}
            >
              <LinkIcon size={18} className="text-text-primary" />
            </a>
          )}

          {/* TOGGLE BUTTON */}
          <button
            onClick={toggle}
            className="p-2 rounded-lg transition hover:bg-hover-tint"
            aria-label={open ? "Collapse details" : "Expand details"}
          >
            <div ref={iconRef}>
              <ChevronDown size={18} className="text-text-primary" />
            </div>
          </button>
        </div>
      </div>

      {/* EXPANDABLE CONTENT */}
      <div ref={contentRef} className="overflow-hidden">
        <div className="pt-4 pb-1 px-1">
          <ScrollRevealText as="p" className="text-sm leading-relaxed mb-4 max-w-4xl">
            {experience.description}
          </ScrollRevealText>

          {/* RESPONSIBILITIES (if available) */}
          {experience.responsibilities && experience.responsibilities.length > 0 && (
            <ul className="text-sm text-text-secondary leading-relaxed mb-4 space-y-1 list-disc list-inside">
              {experience.responsibilities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}

          {/* TECH STACK - Icons */}
          <div className="flex flex-wrap gap-3 p-1 -m-1">
            {experience.techStack.map((tech) => {
              const iconPath = getTechIcon(tech)
              return iconPath ? (
                <div
                  key={tech}
                  className="p-1.5 rounded-xl bg-bg-badge border border-border-primary outline-2 outline-offset-2 outline-border-secondary"
                  title={tech}
                >
                  <Image
                    src={iconPath}
                    alt={tech}
                    width={20}
                    height={20}
                    className="rounded-md"
                  />
                </div>
              ) : (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-xs font-bold tracking-tight rounded-xl bg-bg-badge border border-border-primary outline-2 outline-offset-2 outline-border-secondary text-text-secondary"
                >
                  {tech}
                </span>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
