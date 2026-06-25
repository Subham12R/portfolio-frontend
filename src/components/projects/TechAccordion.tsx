"use client";

import Image from "next/image";
import { getTechIcon, hasTechIcon } from "@/data/tech-icons";
import { TooltipGlass } from "@/components/ui/tooltip";

interface TechAccordionProps {
  tags: string[];
  projectId: string;
}

export default function TechAccordion({ tags, projectId }: TechAccordionProps) {
  // Filter tags to only those that have a mapped icon
  const validTags = tags.filter((tag) => hasTechIcon(tag));
  const tooltipId = `tech-tooltip-${projectId}`;

  if (validTags.length === 0) return null;

  return (
    <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
      <div className="group/tech flex items-center shrink-0">
        {validTags.map((tag, index) => {
          const iconPath = getTechIcon(tag);
          if (!iconPath) return null;

          return (
            <div
              key={tag}
              data-tooltip-id={tooltipId}
              data-tooltip-content={tag}
              className="relative z-10 w-6 h-6 rounded-full border border-border-primary bg-bg-card/80 backdrop-blur-[2px] transition-all duration-300 ease-out hover:scale-120 hover:z-30 hover:-translate-y-1 hover:border-border-secondary cursor-help shrink-0 -ml-2 first:ml-0 group-hover/tech:ml-1 group-hover/tech:first:ml-0"
              style={{
                transitionDelay: `${index * 15}ms`,
              }}
            >
              <Image
                src={iconPath}
                alt={tag}
                fill
                sizes="24px"
                className="object-cover rounded-full"
                priority
              />
            </div>
          );
        })}
      </div>
      <TooltipGlass id={tooltipId} place="top" offset={8} />
    </div>
  );
}
