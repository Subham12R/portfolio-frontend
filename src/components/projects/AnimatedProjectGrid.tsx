"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "@/data/project";
import PlainProjectCard from "@/components/projects/PlainProjectCard";
import ProjectDrawer from "@/components/projects/ProjectDrawer";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedProjectGridProps {
  projects: Project[];
}

export default function AnimatedProjectGrid({
  projects,
}: AnimatedProjectGridProps) {
  const [selected, setSelected] = useState<Project | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const ctx = gsap.context(() => {
      const projectItems = Array.from(
        gridRef.current?.querySelectorAll<HTMLElement>("[data-project-item]") ??
          [],
      );
      if (!projectItems.length) return;

      const rowMap = new Map<number, HTMLElement[]>();

      // Group grid cells by vertical row position so each row triggers independently.
      projectItems.forEach((item) => {
        const rowKey = Math.round(item.offsetTop);
        const rowItems = rowMap.get(rowKey) ?? [];
        rowItems.push(item);
        rowMap.set(rowKey, rowItems);
      });

      const rows = Array.from(rowMap.entries())
        .sort((a, b) => a[0] - b[0])
        .map(([, rowItems]) => rowItems);

      rows.forEach((rowItems) => {
        gsap.fromTo(
          rowItems,
          { opacity: 0, y: 32, scale: 0.98, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.75,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: rowItems[0],
              start: "top 88%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );
      });
    }, gridRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <>
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-10 p-4"
      >
        {projects.map((project) => (
          <div key={project.id} data-project-item>
            <PlainProjectCard
              project={project}
              onOpen={() => setSelected(project)}
            />
          </div>
        ))}
      </div>

      <ProjectDrawer
        project={selected}
        isOpen={selected !== null}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
