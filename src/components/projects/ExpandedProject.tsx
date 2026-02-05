"use client"

import { useState } from "react"
import Image from "next/image"
import { Play } from "lucide-react"
import { Project } from "@/data/project"
import { getTechIcon } from "@/data/tech-icons"

function ExpandedProject({ project }: { project: Project }) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="px-5 pb-6 space-y-6">

      {/* BANNER / VIDEO */}
      {project.youtubeId && playing ? (
        <div className="aspect-video rounded-lg overflow-hidden border border-border-primary">
          <iframe
            src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : project.bannerImage ? (
        <button
          onClick={() => project.youtubeId && setPlaying(true)}
          className={`relative block w-full aspect-video rounded-lg overflow-hidden border border-border-primary group/video ${project.youtubeId ? 'cursor-pointer' : 'cursor-default'}`}
        >
          <Image
            src={project.bannerImage}
            alt={project.title}
            width={800}
            height={450}
            className="w-full h-full object-cover transition-transform duration-300 group-hover/video:scale-105"
          />
          {project.youtubeId && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover/video:opacity-100 transition-opacity duration-200">
              <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                <Play size={28} className="text-black ml-1" fill="black" />
              </div>
            </div>
          )}
        </button>
      ) : null}

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
      <div className="flex flex-wrap gap-3">
        {project.tags.map((tag) => {
          const iconPath = getTechIcon(tag)
          return iconPath ? (
            <div
              key={tag}
              className="p-1.5 rounded-xl bg-bg-badge border border-border-primary outline-2 outline-offset-2 outline-border-secondary"
              title={tag}
            >
              <Image
                src={iconPath}
                alt={tag}
                width={20}
                height={20}
                className="rounded-md"
              />
            </div>
          ) : (
            <span
              key={tag}
              className="px-3 py-1.5 text-xs font-bold tracking-tight rounded-xl bg-bg-badge border border-border-primary outline-2 outline-offset-2 outline-border-secondary text-text-secondary"
            >
              {tag}
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default ExpandedProject
