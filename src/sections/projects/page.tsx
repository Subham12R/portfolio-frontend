import AnimatedProjectGrid from "@/components/projects/AnimatedProjectGrid";
import Link from "next/link";
import { siteConfig } from "@/data";
import { fetchProjects } from "@/lib/api/server";
import { HugeiconsIcon } from "@hugeicons/react";
import { NanoTechnologyIcon } from "@hugeicons/core-free-icons";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const ProjectsPage = async () => {
  const section = siteConfig.sections.projects;
  const projects = await fetchProjects();
  const displayProjects = projects.slice(0, 6);

  return (
    <section
      id={section.id}
      className="w-full flex justify-center items-center px-4 lg:px-0 mb-12"
    >
      <ScrollReveal className="max-w-2xl w-full flex flex-col h-full">
        {/* HEADER CONTENT */}
        <div className="mb-6">
          <h1 className="text-4xl font-light tracking-tight text-text-primary text-start font-instrumentserif">
            {section.title}.
          </h1>
        </div>

        {/* Project Cards Grid */}
        <AnimatedProjectGrid projects={displayProjects} />

        {/* View All Link */}
        <div className="mt-12 flex items-center justify-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md border-2 border-border-primary bg-bg-elevated/30 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-hover-tint hover:border-border-accent shadow-[inset_0px_0px_2px_2px_rgba(0,0,0,0.08)] dark:shadow-[inset_0px_0px_4px_4px_rgba(255,255,255,0.04)] transition-all duration-200"
          >
            <HugeiconsIcon icon={NanoTechnologyIcon} size={16} />
            View All Projects
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default ProjectsPage;
