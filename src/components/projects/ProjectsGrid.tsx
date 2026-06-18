"use client";

import { useState } from "react";
import type { Project } from "@/data/project";
import PlainProjectCard from "./PlainProjectCard";
import ProjectDrawer from "./ProjectDrawer";

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <PlainProjectCard
            key={project.id}
            project={project}
            onOpen={() => setSelected(project)}
          />
        ))}
      </section>

      <ProjectDrawer
        project={selected}
        isOpen={selected !== null}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
