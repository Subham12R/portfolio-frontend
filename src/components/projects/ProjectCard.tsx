"use client"

import { useRef, useState } from "react"
import { gsap } from "gsap"
import { ChevronDown, ExternalLink, Github } from "lucide-react"
import type { Project } from "@/data/project"
import ExpandedProject from "./ExpandedProject"

export default function ProjectCard({ project }: { project: Project }) {
  const contentRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)

  const toggle = () => {
    if (!contentRef.current || !iconRef.current) return

    if (!open) {
      gsap.to(contentRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.45,
        ease: "power3.out",
      })
      gsap.to(iconRef.current, {
        rotate: 180,
        duration: 0.3,
        ease: "power2.out",
      })
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.35,
        ease: "power3.inOut",
      })
      gsap.to(iconRef.current, {
        rotate: 0,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    setOpen(!open)
  }

  return (
    <div className="rounded-xl bg-black/70 backdrop-blur">
      
      {/* HEADER */}
      <div
        onClick={toggle}
        className="flex items-center justify-between py-2 md:px-2 lg:px-0 cursor-pointer"
      >
  
        <div className="flex ">
        <div>
            <span className="text-white font-semibold text-sm">{project.numberId}</span>
        </div>
        <div className="ml-4 flex flex-col">
               <h3 className="text-lg font-semibold text-white">
            {project.title}
          </h3>
          <p className="text-sm text-zinc-400">{project.period}</p>

        </div>
       
        </div>

        <div className="flex items-center gap-4 text-zinc-400">
          {project.links.live && (
            <a href={project.links.live} onClick={e => e.stopPropagation()}>
              <ExternalLink size={18} />
            </a>
          )}
          {project.links.github && (
            <a href={project.links.github} onClick={e => e.stopPropagation()}>
              <Github size={18} />
            </a>
          )}
          <div ref={iconRef}>
            <ChevronDown size={20} />
          </div>
        </div>
      </div>

      {/* EXPANDABLE CONTENT */}
      <div
        ref={contentRef}
        style={{ height: 0, opacity: 0 }}
        className="overflow-hidden"
      >
        <ExpandedProject project={project} />
      </div>
    </div>
  )
}
