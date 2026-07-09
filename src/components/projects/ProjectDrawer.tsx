"use client";

import { useEffect, useRef, useState, useContext } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { VideoHoverBanner } from "@/components/projects/VideoHoverBanner";
import { getTechIcon } from "@/data/tech-icons";
import {
  GithubIcon,
  Globe02Icon,
  NpmIcon,
  BookOpen01Icon,
  ArrowLeft01Icon,
} from "@hugeicons/core-free-icons";
import { useLenis } from "@/components/providers/SmoothScroll";
import type { Project } from "@/data/project";
import { TooltipGlass } from "@/components/ui/tooltip";
import { motion, AnimatePresence, Variants } from "framer-motion";

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

const drawerVariants: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(12px)",
    y: 12,
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1], // Custom premium ease-out
    },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 0.8,
    },
  },
};

export default function ProjectDrawer({ project, isOpen, onClose }: ProjectDrawerProps) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [mounted, setMounted] = useState(false);
  const { lenis } = useLenis();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync active project state to preserve details during exit animation
  useEffect(() => {
    if (project) {
      setActiveProject(project);
    }
  }, [project]);

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

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!mounted) return null;
  if (!activeProject) return null;

  const hasLinks =
    activeProject.links.github || activeProject.links.live || activeProject.links.npm || activeProject.links.docs;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={drawerVariants}
          className="fixed inset-0 z-[60] bg-bg-primary flex flex-col overflow-hidden"
          aria-modal="true"
          role="dialog"
          aria-label={activeProject.title}
        >
          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto overscroll-contain" data-lenis-prevent>
            <motion.div
              variants={containerVariants}
              className="max-w-2xl mx-auto px-4 md:px-0 py-10 pb-24"
            >
              {/* Back — inline, no bar */}
              <motion.div variants={itemVariants}>
                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 text-text-muted hover:text-text-primary transition-colors mb-8 cursor-pointer"
                >
                  <HugeiconsIcon icon={ArrowLeft01Icon} size={14} />
                  <span className="text-sm">Back</span>
                </button>
              </motion.div>

              {/* Banner */}
              <motion.div variants={itemVariants}>
                <VideoHoverBanner
                  key={activeProject.id}
                  bannerImage={activeProject.bannerImage}
                  youtubeId={activeProject.youtubeId}
                  videoUrl={activeProject.videoUrl}
                  loomId={activeProject.loomId}
                  title={activeProject.title}
                  className="aspect-video rounded-md mb-8"
                  autoPlay
                />
              </motion.div>

              {/* Meta */}
              <motion.div variants={itemVariants} className="flex items-center gap-2 text-xs text-text-muted mb-3 flex-wrap">
                {activeProject.completedDate && <span>{formatDate(activeProject.completedDate)}</span>}
                {activeProject.completedDate && activeProject.status && (
                  <span className="w-1 h-1 rounded-full bg-text-muted" />
                )}
                {activeProject.status && <span>{statusLabel[activeProject.status]}</span>}
              </motion.div>

              {/* Title */}
              <motion.h1 variants={itemVariants} className="text-3xl md:text-4xl font-semibold text-text-primary leading-tight mb-4 font-instrumentserif">
                {activeProject.title}
              </motion.h1>

              {/* Description */}
              <motion.p variants={itemVariants} className="text-text-secondary leading-relaxed mb-4 text-base font-light">
                {activeProject.description}
              </motion.p>

              {/* Links — below description */}
              {hasLinks && (
                <motion.div variants={itemVariants} className="flex flex-wrap gap-x-6 gap-y-3 mb-10">
                  {activeProject.links.github && (
                    <a
                      href={activeProject.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-text-secondary underline underline-offset-4 decoration-border-secondary hover:text-text-primary hover:decoration-text-muted transition-colors"
                    >
                      <HugeiconsIcon icon={GithubIcon} size={15} />
                      GitHub
                    </a>
                  )}
                  {activeProject.links.live && (
                    <a
                      href={activeProject.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-text-secondary underline underline-offset-4 decoration-border-secondary hover:text-text-primary hover:decoration-text-muted transition-colors"
                    >
                      <HugeiconsIcon icon={Globe02Icon} size={15} />
                      Live Site
                    </a>
                  )}
                  {activeProject.links.npm && (
                    <a
                      href={activeProject.links.npm}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-text-secondary underline underline-offset-4 decoration-border-secondary hover:text-text-primary hover:decoration-text-muted transition-colors"
                    >
                      <HugeiconsIcon icon={NpmIcon} size={15} />
                      npm
                    </a>
                  )}
                  {activeProject.links.docs && (
                    <a
                      href={activeProject.links.docs}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-text-secondary underline underline-offset-4 decoration-border-secondary hover:text-text-primary hover:decoration-text-muted transition-colors"
                    >
                      <HugeiconsIcon icon={BookOpen01Icon} size={15} />
                      Docs
                    </a>
                  )}
                </motion.div>
              )}

              {/* Features */}
              <motion.section variants={itemVariants} className="mb-10">
                <h2 className="text-xs font-medium text-text-muted uppercase tracking-widest mb-4">
                  Features
                </h2>
                <ul className="space-y-2.5">
                  {activeProject.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-text-secondary text-sm leading-relaxed font-light">
                      <span className="text-text-muted shrink-0 w-5 text-right">
                        {String(i + 1).padStart(2, "0")}.
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.section>

              {/* Tech Stack */}
              {activeProject.tags && activeProject.tags.length > 0 && (
                <motion.section variants={itemVariants} className="mb-10">
                  <h2 className="text-xs font-medium text-text-muted uppercase tracking-widest mb-4">
                    Tech Stack
                  </h2>
                  <div className="flex flex-wrap gap-2.5 items-center">
                    {activeProject.tags.map((tag) => {
                      const iconPath = getTechIcon(tag);
                      const tooltipId = `tech-drawer-tooltip-${activeProject.id}`;
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
                      );
                    })}
                  </div>
                  <TooltipGlass id={`tech-drawer-tooltip-${activeProject.id}`} place="top" offset={8} />
                </motion.section>
              )}

              {/* Case Study */}
              {activeProject.caseStudy && (
                <motion.section variants={itemVariants} className="mb-10">
                  <h2 className="text-xs font-medium text-text-muted uppercase tracking-widest mb-4">
                    Case Study
                  </h2>
                  <p className="text-text-secondary text-sm leading-relaxed font-light">
                    {activeProject.caseStudy}
                  </p>
                </motion.section>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
