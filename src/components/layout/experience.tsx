"use client";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ChevronDown, LinkIcon } from "lucide-react";
import type { Experience } from "@/data/experience";
import { ScrollRevealText } from "@/components/ui/ScrollRevealText";

interface ExperienceCardProps {
  experience: Experience;
  defaultExpanded?: boolean;
  isLast?: boolean;
}

// Logo outline color mapping
const logoColorMap: Record<string, string> = {
  orange: "outline-orange-500/40",
  blue: "outline-blue-500/40",
  green: "outline-green-500/40",
  purple: "outline-purple-500/40",
  red: "outline-red-500/40",
  white: "outline-white/40",
};

export function ExperienceCard({
  experience,
  defaultExpanded = false,
  isLast = false,
}: ExperienceCardProps) {
  const [open, setOpen] = useState(defaultExpanded);
  const contentRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current || !iconRef.current) return;
    if (defaultExpanded) {
      gsap.set(contentRef.current, {
        height: "auto",
        opacity: 1,
      });
      gsap.set(iconRef.current, {
        rotate: 180,
      });
    } else {
      gsap.set(contentRef.current, {
        height: 0,
        opacity: 0,
      });
    }
  }, [defaultExpanded]);

  const toggle = () => {
    if (!contentRef.current || !iconRef.current) return;

    if (!open) {
      gsap.to(contentRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => ScrollTrigger.refresh(),
      });
      gsap.to(iconRef.current, {
        rotate: 180,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.4,
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

  const outlineColor =
    logoColorMap[experience.logoColor || "white"] || "outline-white/40";

  return (
    <div className="w-full rounded-2xl py-2 relative">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-6 top-16 bottom-0 w-px bg-border-primary -translate-x-1/2" />
      )}

      {/* HEADER */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative z-10">
            <Image
              src={experience.logo}
              alt={experience.company}
              width={48}
              height={48}
              className={`w-12 h-12 rounded-xl outline-2 outline-offset-2 bg-white shadow ${outlineColor}`}
            />
          </div>
          <div>
            <h2 className="text-lg font-medium text-text-primary">
              {experience.role}
            </h2>
            <p className="text-sm text-text-secondary">
              {experience.company} · {experience.period}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {experience.links?.company && (
            <a
              href={experience.links.company}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg transition hover:bg-hover-tint"
              aria-label={`Visit ${experience.company} website`}
            >
              <LinkIcon size={18} className="text-text-primary" />
            </a>
          )}

          {/* TOGGLE BUTTON */}
          <button
            onClick={toggle}
            className="p-2 rounded-lg transition hover:bg-hover-tint"
            aria-label={open ? "Collapse details" : "Expand details"}
          >
            <div ref={iconRef}>
              <ChevronDown size={18} className="text-text-primary" />
            </div>
          </button>
        </div>
      </div>

      {/* EXPANDABLE CONTENT */}
      <div ref={contentRef} className="overflow-hidden ml-15">
        <div className="pt-4 pb-1 px-1">
          <ScrollRevealText
            as="p"
            className="text-sm leading-relaxed mb-4 max-w-4xl"
          >
            {experience.description}
          </ScrollRevealText>

          {/* RESPONSIBILITIES (if available) */}
          {experience.responsibilities &&
            experience.responsibilities.length > 0 && (
              <ul className="text-sm text-text-secondary leading-relaxed mb-4 space-y-1 list-disc list-inside">
                {experience.responsibilities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}

          {/* TECH STACK - Text only */}
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
  );
}
