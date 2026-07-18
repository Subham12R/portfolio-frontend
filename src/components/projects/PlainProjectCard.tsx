"use client";
import { useState } from "react";
import { ExternalLink, GitBranch } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Project } from "@/data/project";
import { VideoHoverBanner } from "@/components/projects/VideoHoverBanner";
import TechAccordion from "./TechAccordion";
import ProjectDrawer from "./ProjectDrawer";

interface PlainProjectCardProps {
  project: Project;
}

function formatProjectDate(dateStr?: string | null): string {
  if (!dateStr) return "Present";
  const d = new Date(dateStr + "T00:00:00");
  const month = d.toLocaleDateString("en-US", { month: "long" });
  return `${month} ${d.getFullYear()}`;
}

export default function PlainProjectCard({ project }: PlainProjectCardProps) {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // Cards show mockup (API images[].type desktop); fall back to thumbnail
  const cardImage = project.mockupImage || project.bannerImage;

  const hasCaseStudy = !!(
    project.caseStudy ||
    (project.caseStudySections && (
      project.caseStudySections.overview ||
      project.caseStudySections.problem ||
      (project.caseStudySections.challenges && project.caseStudySections.challenges.length > 0) ||
      (project.caseStudySections.learnings && project.caseStudySections.learnings.length > 0) ||
      (project.caseStudySections.nextSteps && project.caseStudySections.nextSteps.length > 0)
    ))
  );

  const openProjectDetail = () => {
    if (hasCaseStudy) {
      router.push(`/projects/${project.id}`);
    } else {
      setIsDrawerOpen(true);
    }
  };

  return (
    <>
      <div
        className="group/card cursor-pointer max-w-2xl p-2 pb-3 -m-4 border-2 shadow-[inset_0px_0px_2px_2px_rgba(0,0,0,0.08)] dark:shadow-[inset_0px_0px_4px_4px_rgba(255,255,255,0.04)] border-border-primary rounded-md hover:bg-bg-elevated/50 transition-colors duration-200"
        onClick={openProjectDetail}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openProjectDetail();
          }
        }}
        role="link"
        tabIndex={0}
        aria-label={hasCaseStudy ? `View case study for ${project.title}` : `View details for ${project.title}`}
      >
        {/* Thumbnail */}
        <VideoHoverBanner
          bannerImage={cardImage}
          youtubeId={project.youtubeId}
          videoUrl={project.videoUrl}
          loomId={project.loomId}
          title={project.title}
          className="aspect-4/3 rounded-md mb-4"
        />

        {/* Content */}
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-xl font-light text-text-primary group-hover/card:text-text-secondary transition-colors font-instrumentsans">
              {project.title}
            </h3>
            <div className="flex items-center gap-3">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="group relative text-text-muted hover:text-text-primary transition-colors"
                >
                  <ExternalLink size={16} />
                  {/* Cloud tooltip */}
                  <span className="absolute font-semibold bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-0.5 bg-white text-slate-800 text-[10px] rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-slate-200 z-50">
                    Live Demo
                    <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-white" />
                    <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-[5px] border-transparent border-t-slate-200 -z-10" />
                  </span>
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="group relative text-text-muted hover:text-text-primary transition-colors"
                >
                  <GitBranch size={16} />
                  {/* Cloud tooltip */}
                  <span className="absolute font-semibold bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-0.5 bg-white text-slate-800 text-[10px] rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-slate-200 z-50">
                    GitHub
                    <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-white" />
                    <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-[5px] border-transparent border-t-slate-200 -z-10" />
                  </span>
                </a>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-text-muted font-instrumentsans font-light">
              {formatProjectDate(project.completedDate)}
            </p>
            <TechAccordion tags={project.tags} projectId={project.id} />
          </div>
        </div>
      </div>
      <ProjectDrawer
        project={project}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
}
