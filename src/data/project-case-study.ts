import type { CaseStudy, CaseStudyLink } from "./case-study";
import type { Project } from "./project";

const FALLBACK_ARCHITECTURE = {
  summary: "Architecture details will be added from the project backend.",
  mermaid: "flowchart LR\n  Client[Client] --> App[Application]\n  App --> Data[Data layer]",
};

const FALLBACK_CHALLENGES = [
  {
    title: "Implementation details",
    description:
      "Project challenges will be documented here when the case-study content is available.",
  },
];

const FALLBACK_LEARNINGS = [
  "Learnings will be added as the project case study is expanded.",
];

const FALLBACK_NEXT_STEPS = [
  "Next steps will be updated from the project administration system.",
];

function getLinkType(link: keyof Project["links"]): CaseStudyLink["type"] {
  if (link === "github" || link === "live" || link === "npm" || link === "docs") {
    return link;
  }
  return "other";
}

export function getProjectCaseStudy(project: Project): CaseStudy {
  const sections = project.caseStudySections ?? {};
  const links = Object.entries(project.links)
    .filter((entry): entry is [keyof Project["links"], string] => Boolean(entry[1]))
    .map(([type, href]) => ({
      label: type === "github" ? "GitHub" : type === "live" ? "Live Site" : type,
      href,
      type: getLinkType(type),
    }));

  return {
    id: project.id,
    slug: project.id,
    title: project.title,
    tagline: project.description,
    role: "Developer",
    timeline: project.completedDate ?? "Present",
    status: project.status ?? "in-progress",
    overview: sections.overview ?? project.description,
    technologies: project.tags,
    links,
    metrics:
      sections.metrics ??
      (project.tags.length > 0
        ? [{ label: "Technologies", value: String(project.tags.length) }]
        : []),
    features: project.features,
    problem:
      sections.problem ??
      project.caseStudy ??
      "The project problem statement will be added from the project backend.",
    challenges:
      sections.challenges && sections.challenges.length > 0
        ? sections.challenges
        : FALLBACK_CHALLENGES,
    architecture: {
      summary: sections.architecture?.summary ?? FALLBACK_ARCHITECTURE.summary,
      mermaid: sections.architecture?.mermaid ?? FALLBACK_ARCHITECTURE.mermaid,
    },
    images: sections.images ?? [],
    learnings:
      sections.learnings && sections.learnings.length > 0
        ? sections.learnings
        : FALLBACK_LEARNINGS,
    nextSteps:
      sections.nextSteps && sections.nextSteps.length > 0
        ? sections.nextSteps
        : FALLBACK_NEXT_STEPS,
    bannerImage: project.bannerImage,
    youtubeId: project.youtubeId,
    videoUrl: project.videoUrl,
    loomId: project.loomId,
  };
}
