"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

export interface BlogSection {
  id: string;
  label: string;
}

export function BlogScrollNav({ sections }: { sections: BlogSection[] }) {
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [labelPinned, setLabelPinned] = useState(false);
  const showLabel = hovering || labelPinned;

  const updateNavigation = useCallback(() => {
    const scrollY = window.scrollY;
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    setProgress(scrollableHeight > 0 ? Math.min(1, Math.max(0, scrollY / scrollableHeight)) : 0);
    setVisible(scrollY > 120);

    const readingLine = window.innerHeight * 0.32;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    sections.forEach((section, index) => {
      const element = document.getElementById(section.id);
      if (!element) return;
      const distance = Math.abs(element.getBoundingClientRect().top - readingLine);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });
    setActiveIndex(closestIndex);
  }, [sections]);

  useEffect(() => {
    updateNavigation();
    window.addEventListener("scroll", updateNavigation, { passive: true });
    window.addEventListener("resize", updateNavigation);
    return () => {
      window.removeEventListener("scroll", updateNavigation);
      window.removeEventListener("resize", updateNavigation);
    };
  }, [updateNavigation]);

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 112;
    window.scrollTo({ top, behavior: "smooth" });
    window.history.replaceState(null, "", `#${id}`);
  };

  const ticks = useMemo(() => Math.max(24, sections.length * 4), [sections.length]);
  if (!sections.length) return null;

  return (
    <nav
      className={cn(
        "fixed bottom-8 left-3 right-3 z-[60] w-auto sm:left-auto sm:right-22 sm:w-[22rem]",
        "transition-all duration-500 ease-out",
        visible ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-4 opacity-0 pointer-events-none"
      )}
      aria-label="Blog section navigation"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocusCapture={() => setHovering(true)}
      onBlurCapture={() => setHovering(false)}
    >
      <div className="group relative">
        <div className={cn("absolute inset-x-0 bottom-full mb-2 overflow-hidden transition-all duration-300", showLabel ? "max-h-24 opacity-100" : "max-h-0 opacity-0")}>
          <div className="rounded-2xl border border-black/10 bg-bg-elevated px-4 py-3.5 shadow-[inset_0_0_2px_2px_rgba(0,0,0,0.16)] dark:border-white/10 dark:shadow-[inset_0_0_4px_4px_rgba(255,255,255,0.04)]">
            <p className="font-instrumentserif text-2xl font-light tracking-tight text-text-primary">{sections[activeIndex]?.label}</p>
          </div>
        </div>

        <div className="relative h-11 rounded-md border border-black/10 bg-bg-elevated px-3 py-3 shadow-[inset_0_0_2px_2px_rgba(0,0,0,0.16)] dark:border-white/10 dark:shadow-[inset_0_0_4px_4px_rgba(255,255,255,0.04)]">
          <div className="relative h-5">
            <div className="absolute inset-x-0 bottom-0 top-1 flex items-end justify-between pointer-events-none">
              {Array.from({ length: ticks }).map((_, index) => {
                const ratio = index / (ticks - 1);
                const activeStart = activeIndex / sections.length;
                const activeEnd = (activeIndex + 1) / sections.length;
                const isMajor = index % Math.max(1, Math.round(ticks / sections.length)) === 0;
                return <span key={index} className={cn("w-px rounded-full", isMajor ? "h-3.5" : "h-2", ratio >= activeStart && ratio < activeEnd ? "bg-[#ff3b3b]" : "bg-zinc-300 dark:bg-zinc-600")} />;
              })}
            </div>

            <div className="absolute inset-0 z-30 flex">
              {sections.map((section, index) => (
                <button key={section.id} type="button" title={section.label} aria-label={`Go to ${section.label}`} aria-current={index === activeIndex ? "true" : undefined} className="h-full flex-1 cursor-pointer border-0 bg-transparent" onClick={() => { setLabelPinned(true); scrollToSection(section.id); }} />
              ))}
            </div>

            <span className="absolute bottom-0 z-20 block h-5 w-[3px] -translate-x-1/2 rounded-full bg-[#ff3b3b] shadow-[0_0_10px_rgba(255,59,59,0.75)] transition-[left] duration-150 ease-out" style={{ left: `${progress * 100}%` }} />
          </div>
        </div>
      </div>
    </nav>
  );
}
