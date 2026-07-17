"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import type { Project } from "@/data/project";
import PlainProjectCard from "@/components/projects/PlainProjectCard";

interface AnimatedProjectGridProps {
  projects: Project[];
}

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 30, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 14,
      mass: 0.8,
      delay: (i % 2) * 0.1, // Stagger left and right columns
    },
  }),
};

function ProjectCardSkeleton() {
  return (
    <div className="max-w-2xl p-2 pb-3 -m-4 border-2 shadow-[inset_0px_0px_2px_2px_rgba(0,0,0,0.08)] dark:shadow-[inset_0px_0px_4px_4px_rgba(255,255,255,0.04)] border-border-primary rounded-md bg-bg-primary">
      {/* Thumbnail Aspect Ratio skeleton */}
      <div className="aspect-4/3 rounded-md mb-4 bg-bg-badge/10 animate-pulse relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-bg-badge/20 to-transparent bg-[length:200%_100%] animate-shimmer" />
      </div>
      {/* Title & Date & Tags skeletons */}
      <div className="space-y-3 px-1">
        <div className="flex items-center justify-between gap-4">
          <div className="h-6 w-1/2 bg-bg-badge/15 rounded-md animate-pulse" />
          <div className="flex gap-2">
            <div className="h-5 w-5 bg-bg-badge/15 rounded-md animate-pulse" />
            <div className="h-5 w-5 bg-bg-badge/15 rounded-md animate-pulse" />
          </div>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="h-4 w-1/4 bg-bg-badge/10 rounded-md animate-pulse" />
          <div className="h-5 w-1/3 bg-bg-badge/10 rounded-md animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default function AnimatedProjectGrid({
  projects,
}: AnimatedProjectGridProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-10 p-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <ProjectCardSkeleton key={idx} />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-10 p-4">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            custom={index}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1, margin: "-40px" }}
            className="h-full"
          >
            <PlainProjectCard
              project={project}
            />
          </motion.div>
        ))}
      </div>
    </>
  );
}
