"use client";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ChevronDown, LinkIcon } from "lucide-react";
import type { Experience } from "@/data/experience";

interface ExperienceCardProps {
  experience: Experience;
  defaultExpanded?: boolean;
}

function getYearRange(startDate: string, endDate?: string): string {
  const start = new Date(startDate).getFullYear();
  if (!endDate) return `${start} — NOW`;
  const end = new Date(endDate).getFullYear();
  return start === end ? `${start}` : `${start} — ${end}`;
}

export function ExperienceCard({
  experience,
  defaultExpanded = false,
}: ExperienceCardProps) {
  const [open, setOpen] = useState(defaultExpanded);
  const contentRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current || !iconRef.current) return;
    if (defaultExpanded) {
      gsap.set(contentRef.current, { height: "auto", opacity: 1 });
      gsap.set(iconRef.current, { rotate: 180 });
    } else {
      gsap.set(contentRef.current, { height: 0, opacity: 0 });
    }
  }, [defaultExpanded]);

  const toggle = () => {
    if (!contentRef.current || !iconRef.current) return;
    if (!open) {
      gsap.to(contentRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        onComplete: () => ScrollTrigger.refresh(),
      });
      gsap.to(iconRef.current, { rotate: 180, duration: 0.35, ease: "power2.out" });
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.35,
        ease: "power2.inOut",
      });
      gsap.to(iconRef.current, { rotate: 0, duration: 0.3, ease: "power2.inOut" });
    }
    setOpen(!open);
  };

  const yearRange = getYearRange(experience.startDate, experience.endDate);

  return (
    <div className="flex gap-6 md:gap-10 py-5 border-t border-border-primary first:border-t-0">
      {/* Left: year range */}
      <div className="w-24 shrink-0 pt-0.5 text-xs font-mono text-text-muted tracking-wide hidden sm:block">
        {yearRange}
      </div>

      {/* Right: content */}
      <div className="flex-1 min-w-0">
        {/* Title row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center flex-wrap gap-x-1.5 gap-y-0.5">
            <span className="text-base font-medium text-text-primary">
              {experience.role} at
            </span>
            <Image
              src={experience.logo}
              alt={experience.company}
              width={20}
              height={20}
              className="w-5 h-5 rounded-sm object-cover shrink-0"
            />
            <span className="text-base font-medium text-text-primary">
              {experience.company}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-0.5 shrink-0">
            {experience.links?.company && (
              <a
                href={experience.links.company}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg transition hover:bg-hover-tint"
                aria-label={`Visit ${experience.company}`}
              >
                <LinkIcon size={15} className="text-text-muted" />
              </a>
            )}
            <button
              onClick={toggle}
              className="p-1.5 rounded-lg transition hover:bg-hover-tint"
              aria-label={open ? "Collapse" : "Expand"}
            >
              <div ref={iconRef}>
                <ChevronDown size={15} className="text-text-muted" />
              </div>
            </button>
          </div>
        </div>

        {/* Period — visible on mobile where the left col is hidden */}
        <p className="text-xs text-text-muted mt-0.5 sm:hidden">{yearRange} · {experience.company}</p>

        {/* Expandable: description + responsibilities + tech stack */}
        <div ref={contentRef} className="overflow-hidden">
          <div className="pt-2 space-y-3">
            <p className="text-sm text-text-secondary leading-relaxed">
              {experience.description}
            </p>
            {experience.responsibilities && experience.responsibilities.length > 0 && (
              <ul className="text-sm text-text-secondary leading-relaxed space-y-1 list-disc list-inside">
                {experience.responsibilities.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}

            <div className="flex flex-wrap gap-2">
              {experience.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-medium rounded-md bg-bg-badge/10 border border-border-primary text-text-secondary shadow-[inset_0px_0px_2px_2px_rgba(0,0,0,0.08)] dark:shadow-[inset_0px_0px_4px_4px_rgba(255,255,255,0.04)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
