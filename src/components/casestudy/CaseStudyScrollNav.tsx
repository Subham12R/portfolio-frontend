"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useLenis } from "@/components/providers/SmoothScroll";
import { cn } from "@/lib/utils";

export interface CaseStudySection {
  id: string;
  label: string;
}

interface CaseStudyScrollNavProps {
  sections: CaseStudySection[];
  className?: string;
}

export function CaseStudyScrollNav({
  sections,
  className,
}: CaseStudyScrollNavProps) {
  const { lenis } = useLenis();
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  // More ticks than sections for a dense ruler feel
  const tickCount = useMemo(
    () => Math.max(24, sections.length * 4),
    [sections.length]
  );

  const updateProgress = useCallback(() => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const p = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;
    setProgress(p);

    // Show after a short scroll so it doesn't compete with the hero
    setVisible(scrollY > 120);

    // Active section by nearest section top to viewport center
    if (sections.length === 0) return;
    const mid = window.innerHeight * 0.35;
    let best = 0;
    let bestDist = Infinity;
    sections.forEach((section, i) => {
      const el = document.getElementById(section.id);
      if (!el) return;
      const dist = Math.abs(el.getBoundingClientRect().top - mid);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setActiveIndex(best);
  }, [sections]);

  useEffect(() => {
    updateProgress();

    if (lenis) {
      const onScroll = () => updateProgress();
      lenis.on("scroll", onScroll);
      return () => {
        lenis.off("scroll", onScroll);
      };
    }

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [lenis, updateProgress]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { offset: -80 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    const sectionIndex = Math.min(
      sections.length - 1,
      Math.floor(ratio * sections.length)
    );
    const section = sections[sectionIndex];
    if (section) scrollToSection(section.id);
  };

  if (sections.length === 0) return null;

  const markerLeft = `${progress * 100}%`;
  const activeLabel = sections[activeIndex]?.label ?? sections[0].label;

  return (
    <div
      className={cn(
        "fixed bottom-8 left-3 right-3 z-[60] w-auto group sm:left-auto sm:right-22 sm:w-[22rem]",
        "transition-all duration-500 ease-out",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none",
        className
      )}
      role="navigation"
      aria-label="Case study scroll progress"
    >
      <div className="flex flex-col gap-2">
        <div className="absolute inset-x-0 bottom-full mb-2 max-h-0 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-20 group-hover:opacity-100">
          <div className="w-full rounded-2xl border border-black/10 bg-bg-elevated px-4 py-3.5 shadow-[inset_0px_0px_2px_2px_rgba(0,0,0,0.16)] dark:border-white/10 dark:shadow-[inset_0px_0px_4px_4px_rgba(255,255,255,0.04)]">
            <h2 className="text-2xl font-bold text-left text-text-primary">{activeLabel}</h2>
          </div>
        </div>

        {/* Scroll ruler */}
        <div
          className="h-11 w-full rounded-md border border-black/10 bg-bg-elevated px-3 py-3 shadow-[inset_0px_0px_2px_2px_rgba(0,0,0,0.16)] dark:border-white/10 dark:shadow-[inset_0px_0px_4px_4px_rgba(255,255,255,0.04)] hover:bg-hover-tint hover:border-border-secondary cursor-pointer select-none"
          onClick={handleTrackClick}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          aria-label="Scroll progress"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowDown") {
              e.preventDefault();
              const next = Math.min(sections.length - 1, activeIndex + 1);
              scrollToSection(sections[next].id);
            }
            if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
              e.preventDefault();
              const prev = Math.max(0, activeIndex - 1);
              scrollToSection(sections[prev].id);
            }
          }}
        >
          <div className="relative h-5 flex items-end">
            {/* Tick marks */}
            <div className="absolute inset-x-0 bottom-0 top-1 flex items-end justify-between pointer-events-none">
              {Array.from({ length: tickCount }).map((_, i) => {
                const ratio = i / (tickCount - 1);
                // Section boundary ticks are taller
                const sectionBoundary =
                  sections.length > 1 &&
                  Math.round(ratio * (sections.length - 1)) ===
                    ratio * (sections.length - 1) &&
                  Number.isInteger(ratio * (sections.length - 1));
                const isMajor =
                  i % Math.max(1, Math.round(tickCount / sections.length)) === 0;
                const activeSectionStart = activeIndex / sections.length;
                const activeSectionEnd = (activeIndex + 1) / sections.length;
                const isActiveSection =
                  ratio >= activeSectionStart && ratio < activeSectionEnd;

                return (
                  <span
                    key={i}
                    className={cn(
                      "w-px rounded-full transition-colors duration-150",
                      isMajor || sectionBoundary ? "h-3.5" : "h-2",
                      isActiveSection ? "bg-[#ff3b3b]" : "bg-zinc-300 dark:bg-zinc-600"
                    )}
                  />
                );
              })}
            </div>

            {/* Section hit targets (invisible, for a11y labels on hover) */}
            <div className="absolute inset-0 flex">
              {sections.map((section, i) => (
                <button
                  key={section.id}
                  type="button"
                  title={section.label}
                  aria-label={`Go to ${section.label}`}
                  aria-current={i === activeIndex ? "true" : undefined}
                  className="flex-1 h-full relative z-30 bg-transparent border-0 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollToSection(section.id);
                  }}
                />
              ))}
            </div>

            {/* Active red marker */}
            <div
              className="absolute bottom-0 z-20 pointer-events-none transition-[left] duration-150 ease-out"
              style={{ left: markerLeft }}
            >
              <div className="-translate-x-1/2 flex flex-col items-center">
                <span className="block w-[3px] h-5 rounded-full bg-[#ff3b3b] shadow-[0_0_10px_rgba(255,59,59,0.75)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
