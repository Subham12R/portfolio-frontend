"use client"

import { Drawer } from "vaul"
import { X } from "lucide-react"
import type { Project } from "@/data/project"
import { getTechIcon } from "@/data/tech-icons"
import YouTubePlayer from "./YouTubePlayer"
import Image from "next/image"

interface ProjectDrawerProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export default function ProjectDrawer({ project, isOpen, onClose }: ProjectDrawerProps) {
  if (!project) return null

  return (
    <Drawer.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/60 z-50" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 mt-24 flex max-h-[94vh] flex-col rounded-t-[20px] bg-bg-primary border-t border-border-primary">
          {/* Handle + Close button */}
          <div className="relative flex items-center justify-center mt-4">
            <div className="h-1.5 w-12 shrink-0 rounded-full bg-border-secondary" />
            <button
              onClick={onClose}
              className="absolute right-4 p-2 rounded-full hover:bg-bg-elevated transition-colors"
              aria-label="Close drawer"
            >
              <X size={20} className="text-text-muted" />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-4 pb-16" data-vaul-no-drag>
            <div className="mx-auto max-w-4xl">
              {/* Video/Image Section */}
              <div className="mt-6 mb-10">
                {project.youtubeId ? (
                  <div className="w-full rounded-2xl overflow-hidden shadow-2xl">
                    <YouTubePlayer youtubeId={project.youtubeId} title={project.title} />
                  </div>
                ) : project.bannerImage ? (
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-bg-elevated shadow-2xl">
                    <Image
                      src={project.bannerImage}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-video rounded-2xl bg-bg-elevated flex items-center justify-center text-text-muted">
                    No preview available
                  </div>
                )}
              </div>

              {/* Details Section - Two Column Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pb-8">
                {/* Left - Main Info Stack */}
                <div className="flex flex-col">
                  {/* Number + Status */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm font-mono text-text-muted">
                      {project.numberId}
                    </span>
                    {project.status && (
                      <span className={`text-xs px-3 py-1 rounded-full border ${
                        project.status === "maintained"
                          ? "border-green-500/30 text-green-400"
                          : project.status === "in-progress"
                          ? "border-amber-500/30 text-amber-400"
                          : "border-border-secondary text-text-tertiary"
                      }`}>
                        {project.status === "maintained" ? "Actively Maintained" :
                         project.status === "in-progress" ? "In Progress" : "Completed"}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <Drawer.Title className="text-4xl font-semibold text-text-primary mb-2">
                    {project.title}
                  </Drawer.Title>

                  {/* Date */}
                  <p className="text-sm text-text-muted mb-6">{project.period}</p>

                  {/* Description */}
                  <Drawer.Description className="text-text-secondary leading-relaxed mb-8">
                    {project.description}
                  </Drawer.Description>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap items-center gap-4">
                    {project.tags.map((tag) => {
                      const iconPath = getTechIcon(tag)
                      return (
                        <div
                          key={tag}
                          className="group/icon relative"
                        >
                          {iconPath ? (
                            <Image
                              src={iconPath}
                              alt={tag}
                              width={32}
                              height={32}
                              className="rounded-md cursor-pointer hover:scale-110 transition-transform"
                            />
                          ) : (
                            <span className="text-sm text-text-tertiary cursor-pointer hover:text-text-secondary transition-colors">
                              {tag}
                            </span>
                          )}
                          {/* Tooltip */}
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md bg-bg-card border border-border-primary text-text-primary text-xs font-medium whitespace-nowrap opacity-0 group-hover/icon:opacity-100 transition-opacity pointer-events-none z-10">
                            {tag}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Right - Features */}
                <div>
                  <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">
                    Features
                  </h3>
                  <ul className="space-y-3">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-text-secondary leading-relaxed">
                        <span className="text-text-muted mt-1">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
