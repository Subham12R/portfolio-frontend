"use client";

import { ExternalLink, GitBranch } from "lucide-react";
import type { Project } from "@/data/project";
import { VideoHoverBanner } from "@/components/projects/VideoHoverBanner";

interface PlainProjectCardProps {
  project: Project;
  onOpen: () => void;
}

export default function PlainProjectCard({ project, onOpen }: PlainProjectCardProps) {
  const category = project.tags[0] || "PROJECT";
  const thumbnailUrl = project.bannerImage;

  return (
    <div
      className="group cursor-pointer p-2 -m-4 border-2 shadow-[inset_0px_0px_2px_2px_rgba(0,0,0,0.08)] dark:shadow-[inset_0px_0px_4px_4px_rgba(255,255,255,0.04)] border-border-primary rounded-md hover:bg-bg-elevated/50 transition-colors duration-200"
      onClick={onOpen}
    >
      {/* Thumbnail */}
      <VideoHoverBanner
        bannerImage={thumbnailUrl}
        youtubeId={project.youtubeId}
        videoUrl={project.videoUrl}
        title={project.title}
        className="aspect-4/3 rounded-md mb-4"
      />

      {/* Content */}
      <div className="space-y-1">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-xl font-medium text-text-primary group-hover:text-text-secondary transition-colors">
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
                <GitBranch size={16} />
              </a>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-text-muted">
            {project.completedDate
              ? project.completedDate.split("-").reverse().join(".")
              : "Present"}
          </p>
          <span className="text-xs text-text-tertiary uppercase tracking-wider whitespace-nowrap">
            {category}
          </span>
        </div>
      </div>
    </div>
  );
}
