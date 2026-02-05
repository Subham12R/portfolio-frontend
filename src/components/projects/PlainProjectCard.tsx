"use client"

import { useState } from "react"
import Image from "next/image"
import { ExternalLink, Github, Play } from "lucide-react"
import type { Project } from "@/data/project"
import ProjectDrawer from "./ProjectDrawer"

export default function PlainProjectCard({ project }: { project: Project }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const category = project.tags[0] || "PROJECT"

  // Get thumbnail - prefer bannerImage as primary
  const thumbnailUrl = project.bannerImage

  return (
    <>
      <div
        className="group cursor-pointer p-4 -m-4 rounded-xl hover:bg-bg-elevated/50 transition-colors duration-200"
        onClick={() => setIsDrawerOpen(true)}
      >
        {/* Thumbnail */}
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-bg-elevated mb-4">
          {thumbnailUrl ? (
            <>
              <Image
                src={thumbnailUrl}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Play button overlay for videos */}
              {project.youtubeId && (
                <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-2xl flex items-center justify-center shadow-lg">
                    <Play size={24} className="text-white" fill="white" />
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-text-muted">
              No preview
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-1">
          {/* Title row with icons */}
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-xl font-semibold text-text-primary group-hover:text-text-secondary transition-colors">
              {project.title}
            </h3>
            <div className="flex items-center gap-3">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-text-muted hover:text-text-primary transition-colors"
                >
                  <ExternalLink size={16} />
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-text-muted hover:text-text-primary transition-colors"
                >
                  <Github size={16} />
                </a>
              )}
            </div>
          </div>
          {/* Date row with category */}
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-text-muted">
              {project.period}
            </p>
            <span className="text-xs text-text-tertiary uppercase tracking-wider whitespace-nowrap">
              {category}
            </span>
          </div>
        </div>
      </div>

      {/* Drawer */}
      <ProjectDrawer
        project={project}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  )
}
