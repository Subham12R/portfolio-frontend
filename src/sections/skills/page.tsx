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
    ...tech.meops,
    ...tech.other,
  ];

  return (
    <section id={section.id} className="w-full flex justify-center items-center pb-10 px-4 lg:px-0 overflow-hidden">
      <div className="max-w-4xl w-full flex flex-col h-full">

        {/* Header */}

        <h1 className="text-3xl  mb-4 tracking-tighter font-bold">
          Tech Stack - That helps me get the stuff done.
        </h1>
        {/* Tech Stack Dock */}
        <div className="flex justify-center items-center pb-2 w-full overflow-visible">
          <div className="relative flex items-center justify-center flex-wrap gap-2 px-4 py-3 rounded-md bg-bg-elevated/80 border border-border-primary backdrop-blur-md w-full">
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
                    className={`relative w-10 h-10 md:w-12 md:h-12 z-20 rounded hover:shadow-2xl flex items-center justify-center overflow-hidden transition-all duration-200 cursor-pointer shrink-0 ${
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
                      className="object-contain"
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
