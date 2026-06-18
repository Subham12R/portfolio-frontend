"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  GithubIcon,
  Globe02Icon,
  NpmIcon,
  BookOpen01Icon,
  ArrowLeft01Icon,
} from "@hugeicons/core-free-icons";
import { useLenis } from "@/components/providers/SmoothScroll";
import type { Project } from "@/data/project";

interface ProjectDrawerProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

function formatDate(dateString: string): string {
  const [year, month] = dateString.split("-");
  return new Date(Number(year), Number(month) - 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

const statusLabel: Record<string, string> = {
  maintained: "Actively Maintained",
  "in-progress": "In Progress",
  completed: "Completed",
};

const TRANSITION_MS = 400;

export default function ProjectDrawer({ project, isOpen, onClose }: ProjectDrawerProps) {
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { lenis } = useLenis();

  // Enter: paint first frame invisible, then transition in
  useEffect(() => {
    if (isOpen) {
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }
  }, [isOpen]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    if (isOpen) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [isOpen, lenis]);

  // Smooth close: animate out, then fire onClose
  const handleClose = () => {
    setVisible(false);
    setPlaying(false);
    closeTimer.current = setTimeout(() => {
      onClose();
    }, TRANSITION_MS);
  };

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!project && !isOpen) return null;
  if (!project) return null;

  const hasLinks =
    project.links.github || project.links.live || project.links.npm || project.links.docs;

  return (
    <div
      className={`fixed inset-0 z-50 bg-bg-primary flex flex-col transition-all ease-[cubic-bezier(0.32,0.72,0,1)] ${
        visible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-4 opacity-0 pointer-events-none"
      }`}
      style={{ transitionDuration: `${TRANSITION_MS}ms` }}
      aria-modal="true"
      role="dialog"
      aria-label={project.title}
    >
      {/* Scrollable body */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 md:px-0 py-10 pb-24">

          {/* Back — inline, no bar */}
          <button
            onClick={handleClose}
            className="inline-flex items-center gap-1.5 text-text-muted hover:text-text-primary transition-colors mb-8"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={14} />
            <span className="text-sm">Back</span>
          </button>

          {/* Banner */}
          <div className="w-full aspect-video rounded-xl overflow-hidden bg-bg-elevated mb-8">
            {project.youtubeId && playing ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${project.youtubeId}?autoplay=1&playsinline=1&rel=0&modestbranding=1`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                title={project.title}
              />
            ) : project.bannerImage ? (
              <button
                onClick={() => project.youtubeId && setPlaying(true)}
                className={`relative w-full h-full group/video ${project.youtubeId ? "cursor-pointer" : "cursor-default"}`}
              >
                <Image
                  src={project.bannerImage}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover/video:scale-105"
                />
                {project.youtubeId && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover/video:opacity-100 transition-opacity duration-200">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                      <Play size={28} className="text-black ml-1" fill="black" />
                    </div>
                  </div>
                )}
              </button>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-text-muted text-sm">
                No preview
              </div>
            )}
          </div>

          {/* Meta */}
          <div className="flex items-center gap-2 text-xs text-text-muted mb-3 flex-wrap">
            {project.completedDate && <span>{formatDate(project.completedDate)}</span>}
            {project.completedDate && project.status && (
              <span className="w-1 h-1 rounded-full bg-text-muted" />
            )}
            {project.status && <span>{statusLabel[project.status]}</span>}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-semibold text-text-primary leading-tight mb-4">
            {project.title}
          </h1>

          {/* Description */}
          <p className="text-text-secondary leading-relaxed mb-4 text-base">
            {project.description}
          </p>

          {/* Links — below description */}
          {hasLinks && (
            <div className="flex flex-wrap gap-x-6 gap-y-3 mb-10">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-text-secondary underline underline-offset-4 decoration-border-secondary hover:text-text-primary hover:decoration-text-muted transition-colors"
                >
                  <HugeiconsIcon icon={GithubIcon} size={15} />
                  GitHub
                </a>
              )}
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-text-secondary underline underline-offset-4 decoration-border-secondary hover:text-text-primary hover:decoration-text-muted transition-colors"
                >
                  <HugeiconsIcon icon={Globe02Icon} size={15} />
                  Live Site
                </a>
              )}
              {project.links.npm && (
                <a
                  href={project.links.npm}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-text-secondary underline underline-offset-4 decoration-border-secondary hover:text-text-primary hover:decoration-text-muted transition-colors"
                >
                  <HugeiconsIcon icon={NpmIcon} size={15} />
                  npm
                </a>
              )}
              {project.links.docs && (
                <a
                  href={project.links.docs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-text-secondary underline underline-offset-4 decoration-border-secondary hover:text-text-primary hover:decoration-text-muted transition-colors"
                >
                  <HugeiconsIcon icon={BookOpen01Icon} size={15} />
                  Docs
                </a>
              )}
            </div>
          )}

          {/* Features */}
          <section className="mb-10">
            <h2 className="text-xs font-medium text-text-muted uppercase tracking-widest mb-4">
              Features
            </h2>
            <ul className="space-y-2.5">
              {project.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-text-secondary text-sm leading-relaxed">
                  <span className="text-text-muted shrink-0 w-5 text-right">
                    {String(i + 1).padStart(2, "0")}.
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          {/* Case Study */}
          {project.caseStudy && (
            <section className="mb-10">
              <h2 className="text-xs font-medium text-text-muted uppercase tracking-widest mb-4">
                Case Study
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed">
                {project.caseStudy}
              </p>
            </section>
          )}

        </div>
      </div>
    </div>
  );
}
