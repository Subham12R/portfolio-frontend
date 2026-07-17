import type { Project } from "@/data/project";
import PlainProjectCard from "./PlainProjectCard";

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-10 p-4">
      {projects.map((project) => (
        <PlainProjectCard key={project.id} project={project} />
      ))}
    </section>
  );
}
