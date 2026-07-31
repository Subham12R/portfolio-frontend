"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig, techRegistry } from "@/data";
import { groupTech } from "@/lib/groupTech";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

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
    <section
      id={section.id}
      className="w-full flex justify-center items-center px-4 lg:px-0 overflow-hidden mb-12"
    >
      <ScrollReveal className="max-w-2xl w-full flex flex-col h-full">
        {/* Header */}
        <h2 className="text-4xl font-light text-text-primary mb-6 font-instrumentserif">
          Tech Stack - That helps me get the stuff done.
        </h2>
        {/* Tech Stack Dock */}
        <div className="flex justify-center items-center pb-2 w-full overflow-visible ">
          <div className="relative flex items-center justify-center flex-wrap px-2 py-2 rounded-md  border-2 border-border-primary backdrop-blur-md w-full shadow-[inset_0px_0px_2px_2px_rgba(0,0,0,0.08)] dark:shadow-[inset_0px_0px_4px_4px_rgba(255,255,255,0.04)]">
            {allTech.map((item, index) => {
              const isHovered = hoveredIndex === index;
              const isNeighbor =
                hoveredIndex !== null && Math.abs(hoveredIndex - index) === 1;

              return (
                <div
                  key={item.name}
                  className="relative flex flex-col items-center justify-end h-10 w-10 z-20 "
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Tooltip */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
                        exit={{ opacity: 0, y: 8, scale: 0.95, x: "-50%" }}
                        transition={{ duration: 0.15 }}
                        className="absolute z-50 bottom-[calc(100%+22px)] left-1/2 px-3 py-1.5 rounded-lg bg-bg-card border border-border-primary text-text-primary text-xs font-medium whitespace-nowrap shadow-md pointer-events-none"
                      >
                        {item.name}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Icon */}
                  <motion.div
                    animate={{
                      y: isHovered ? -16 : isNeighbor ? -4 : 0,
                      scale: isHovered ? 1.25 : isNeighbor ? 1.1 : 1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 150,
                      damping: 15,
                      mass: 0.5,
                    }}
                    className="relative w-8 h-8 z-20 rounded hover:shadow-2xl flex items-center justify-center overflow-hidden cursor-pointer shrink-0 mb-1"
                  >
                    <Image
                      src={item.icon}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default Tech;
