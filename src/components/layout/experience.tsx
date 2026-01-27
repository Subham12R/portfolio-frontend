'use client'
import { useRef, useState, useEffect } from "react"
import gsap from "gsap"
import Image from "next/image"
import { ChevronDown, Link, LinkIcon } from "lucide-react"
import type { Experience } from "@/data/experience"
import { getTechIcon } from "@/data/tech-icons"

interface ExperienceCardProps {
  experience: Experience
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

export function ExperienceCard({ experience }: ExperienceCardProps) {
  const [open, setOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return
    gsap.set(contentRef.current, {
      height: 0,
      opacity: 0,
    })
  }, [])

  const toggle = () => {
    if (!contentRef.current || !iconRef.current) return

    if (!open) {
      gsap.to(contentRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
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
    <div className="w-full rounded-2xl">
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
            <h2 className="text-lg font-semibold text-white">
              {experience.role}
            </h2>
            <p className="text-sm text-white/70">
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
              className="p-2 rounded-lg transition hover:bg-white/5"
              aria-label={`Visit ${experience.company} website`}
            >
              <LinkIcon size={18} className="text-white" />
            </a>
          )}

          {/* TOGGLE BUTTON */}
          <button
            onClick={toggle}
            className="p-2 rounded-lg transition hover:bg-white/5"
            aria-label={open ? "Collapse details" : "Expand details"}
          >
            <div ref={iconRef}>
              <ChevronDown size={18} className="text-white" />
            </div>
          </button>
        </div>
      </div>

      {/* EXPANDABLE CONTENT */}
      <div ref={contentRef} className="overflow-hidden">
        <div className="pt-4 pb-1 px-1">
          <p className="text-sm text-white/80 leading-relaxed mb-4 max-w-4xl">
            {experience.description}
          </p>

          {/* RESPONSIBILITIES (if available) */}
          {experience.responsibilities && experience.responsibilities.length > 0 && (
            <ul className="text-sm text-white/70 leading-relaxed mb-4 space-y-1 list-disc list-inside">
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
                  className="p-1.5 rounded-xl bg-neutral-800 border border-white/10 outline-2 outline-offset-2 outline-white/20"
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
                  className="px-3 py-1.5 text-xs font-medium rounded-xl bg-neutral-800 border border-white/10 outline-2 outline-offset-2 outline-white/20 text-white/80"
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
