"use client";

import { useState } from "react";
import Image from "next/image";
import { siteConfig, techRegistry } from "@/data";
import { groupTech } from "@/lib/groupTech";

const Tech = () => {
  const tech = groupTech(techRegistry);
  const section = siteConfig.sections.skills;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const allTech = [
    ...tech.frontend,
    ...tech.backend,
    ...tech.devops,
    ...tech.other,
  ];

  return (
    <section id={section.id} className="w-full flex justify-center items-center pb-10 px-4 lg:px-0">
      <div className="max-w-4xl w-full flex flex-col h-full">

        {/* Header */}


        {/* Tech Stack Dock */}
        <div className="flex justify-center items-center pt-16 pb-8 px-2">
          <div className="relative w-4xl flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-bg-elevated/80 border border-border-primary backdrop-blur-md">
            {allTech.map((item, index) => {
              const isHovered = hoveredIndex === index;
              const isNeighbor = hoveredIndex !== null && Math.abs(hoveredIndex - index) === 1;

              return (
                <div
                  key={item.name}
                  className="relative flex flex-col items-center"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Tooltip */}
                  <div
                    className={`absolute -top-15 px-3 py-1.5 rounded-lg bg-bg-card border border-border-primary text-text-primary text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                      isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
                    }`}
                  >
                    {item.name}
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded hover:shadow-2xl flex items-center justify-center overflow-hidden transition-all duration-200 cursor-pointer ${
                      isHovered
                        ? "-translate-y-4 scale-125"
                        : isNeighbor
                        ? "-translate-y-1 scale-110"
                        : "scale-100"
                    }`}
                  >
                    <Image
                      src={item.icon}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Tech;
