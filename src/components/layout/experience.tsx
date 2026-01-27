'use client'
import { useRef, useState, useEffect } from "react"
import gsap from "gsap"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import ryzeLogo from '../../../public/images/profile/ryze.jpeg'
export function ExperienceCard() {
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

    return (
    <div className="
      w-full rounded-2xl

    ">
      {/* HEADER */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <Image
            src={ryzeLogo}
            alt="Ryze AI"
            width={48}
            height={48}
            className="w-12 h-12 rounded-xl outline outline-offset-2 outline-orange-500/40"
          />

          <div>
            <h2 className="text-lg font-semibold text-white">
              Frontend Developer Intern
            </h2>
            <p className="text-sm text-white/70">
              Ryze AI Pvt. Ltd. · Jan 2026 – Present
            </p>
          </div>
        </div>

        {/* TOGGLE BUTTON */}
        <button
          onClick={toggle}
          className="
            p-2 rounded-lg
            transition
          "
        >
          <div ref={iconRef}>
            <ChevronDown size={18} className="text-white" />
          </div>
        </button>
      </div>

      {/* EXPANDABLE CONTENT */}
      <div
        ref={contentRef}
        className="overflow-hidden"
      >
        <div className="pt-4">
          <p className="text-sm text-white/80 leading-relaxed mb-4 max-w-4xl">
            Developed and maintained modern web applications using React and
            Next.js. Collaborated with backend teams to integrate REST APIs and
            build scalable UI components. Focused on performance, accessibility,
            and clean architecture.
          </p>

          {/* TECH STACK */}
          <div className="flex flex-wrap gap-2">
            {[
              "React",
              "Next.js",
              "TypeScript",
              "Tailwind CSS",
              "REST APIs",
              "Git",
            ].map((tech) => (
              <span
                key={tech}
                className="
                  px-3 py-1
                  text-xs font-medium
                  rounded-full
                  bg-white/5
                  border border-white/10
                  text-white/80
                "
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
