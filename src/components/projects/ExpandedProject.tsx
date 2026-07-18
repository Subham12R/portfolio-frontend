"use client"

import Image from "next/image"
import { Project } from "@/data/project"
import { getTechIcon } from "@/data/tech-icons"
import { VideoHoverBanner } from "@/components/projects/VideoHoverBanner"
import { TooltipGlass } from "@/components/ui/tooltip"

function ExpandedProject({ project }: { project: Project }) {
  return (
    <div className="px-5 pb-6 space-y-6">

      {/* BANNER / VIDEO */}
      {(project.bannerImage || project.youtubeId || project.videoUrl || project.loomId) && (
        <VideoHoverBanner
          bannerImage={project.bannerImage}
          youtubeId={project.youtubeId}
          videoUrl={project.videoUrl}
          loomId={project.loomId}
          title={project.title}
          fit="cover"
          className="aspect-video w-full rounded-lg border border-border-primary"
          autoPlay
        />
      )}

      {/* DESCRIPTION */}
      <p className="text-text-secondary text-sm leading-relaxed">
        {project.description}
      </p>

      {/* FEATURES */}
      <ul className="space-y-2 text-sm text-text-secondary">
        {project.features.map((f, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-text-muted">•</span>
            {f}
          </li>
        ))}
      </ul>

      {/* TECH ICONS */}
      <div className="flex flex-wrap gap-2.5 items-center">
        {project.tags.map((tag) => {
          const iconPath = getTechIcon(tag)
          const tooltipId = `tech-expanded-tooltip-${project.id}`
          return iconPath ? (
            <div
              key={tag}
              data-tooltip-id={tooltipId}
              data-tooltip-content={tag}
              className="relative z-10 w-9 h-9 rounded-[8px] border border-border-primary bg-bg-card cursor-help transition-all duration-200 hover:scale-110 hover:-translate-y-0.5 hover:border-border-secondary shrink-0"
            >
              <Image
                src={iconPath}
                alt={tag}
                fill
                sizes="26px"
                className="object-cover rounded-[7px]"
              />
            </div>
          ) : (
            <span
              key={tag}
              className="h-9 px-3.5 inline-flex items-center rounded-[8px] border border-border-primary bg-bg-badge/10 text-text-secondary text-xs font-semibold"
            >
              {tag}
            </span>
          )
        })}
      </div>
      <TooltipGlass id={`tech-expanded-tooltip-${project.id}`} place="top" offset={8} />
    </div>
  )
}

export default ExpandedProject
