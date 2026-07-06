"use client";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ChevronDown, Code2, Palette, Monitor } from "lucide-react";
import type { Experience } from "@/data/experience";

function formatCompact(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return `${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}`;
}

function formatCompactRange(startDate: string, endDate?: string): string {
  return `${formatCompact(startDate)} — ${endDate ? formatCompact(endDate) : "∞"}`;
}

function getRoleIcon(role: string) {
  const r = role.toLowerCase();
  if (r.includes("design")) return Palette;
  if (r.includes("organizer") || r.includes("admin")) return Monitor;
  return Code2;
}

interface RoleEntryProps {
  experience: Experience;
  defaultExpanded?: boolean;
}

function RoleEntry({ experience, defaultExpanded = false }: RoleEntryProps) {
  const [open, setOpen] = useState(defaultExpanded);
  const contentRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const RoleIcon = getRoleIcon(experience.role);

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
      gsap.to(iconRef.current, {
        rotate: 180,
        duration: 0.35,
        ease: "power2.out",
      });
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.35,
        ease: "power2.inOut",
      });
      gsap.to(iconRef.current, {
        rotate: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
    setOpen(!open);
  };

  return (
    <div>
      <button
        onClick={toggle}
        className="group w-full flex items-center justify-between gap-2 text-left"
        aria-label={open ? "Collapse" : "Expand"}
      >
        <span className="flex items-center gap-2 min-w-0">
          <span className="w-6 h-6 rounded bg-bg-elevated border-2 border-border-primary shadow-[inset_0px_0px_2px_4px_rgba(0,0,0,0.08)] dark:shadow-[inset_0px_0px_4px_4px_rgba(255,255,255,0.04)] flex items-center justify-center shrink-0">
            <RoleIcon size={12} className="text-text-primary" />
          </span>
          <span className="text-base font-medium text-text-primary truncate">
            {experience.role}
          </span>
        </span>
        <span className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-text-muted font-mono whitespace-nowrap">
            {formatCompactRange(experience.startDate, experience.endDate)}
          </span>
          <div
            ref={iconRef}
            className="shrink-0 p-1 rounded-lg transition hover:bg-hover-tint"
          >
            <ChevronDown size={15} className="text-text-muted" />
          </div>
        </span>
      </button>

      <div ref={contentRef} className="overflow-hidden">
        <div className="pt-3 space-y-2">
          {(() => {
            const sentences = experience.description
              .split(/\.\s+/)
              .map((s) => s.trim())
              .filter(Boolean)
              .map((s) => (s.endsWith(".") ? s : `${s}.`));
            return (
              <ul className="text-sm text-text-secondary leading-relaxed space-y-1 list-[square] list-outside pl-5">
                {sentences.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );
          })()}
          {experience.responsibilities &&
            experience.responsibilities.length > 0 && (
              <ul className="text-sm text-text-secondary leading-relaxed space-y-1 list-[square] list-outside pl-5">
                {experience.responsibilities.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}

          <div className="flex flex-wrap gap-2">
            {experience.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-mono rounded-md bg-bg-badge/10 border border-border-primary text-text-secondary shadow-[inset_0px_0px_2px_2px_rgba(0,0,0,0.08)] dark:shadow-[inset_0px_0px_4px_4px_rgba(255,255,255,0.04)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface CompanyGroupProps {
  experiences: Experience[];
  defaultOpen?: boolean;
}

export function CompanyGroup({
  experiences,
  defaultOpen = false,
}: CompanyGroupProps) {
  const [{ company, logo, location }] = experiences;

  return (
    <div className="pt-6 first:pt-0">
      <div className="relative">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-6 h-6 rounded bg-bg-elevated border border-border-primary shadow-[inset_0px_0px_2px_2px_rgba(0,0,0,0.08)] dark:shadow-[inset_0px_0px_4px_4px_rgba(255,255,255,0.04)] flex items-center justify-center overflow-hidden shrink-0">
              <Image
                src={logo}
                alt={company}
                width={24}
                height={24}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-base font-medium text-text-primary tracking-tight truncate">
              {company}
            </h3>
          </div>
          {location && (
            <span className="text-sm text-text-muted whitespace-nowrap">
              {location}
            </span>
          )}
        </div>

        {/* bridges the company logo down to the first role's branch */}


        <div className="pt-2 flex flex-col border-b border-spacing-2 border-border-primary/50">
          {experiences.map((experience, i) => {
      
            return (
              <div key={experience.id} className="relative pb-6 last:pb-2 ">
              
         
                <RoleEntry
                  experience={experience}
                  defaultExpanded={defaultOpen && i === 0}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
