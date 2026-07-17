import { notFound } from "next/navigation";
import { siteConfig } from "@/data";
import { fetchProjects, fetchProjectById } from "@/lib/api/server";
import { getProjectCaseStudy } from "@/data/project-case-study";
import { CaseStudyView } from "@/components/casestudy/CaseStudyView";

interface ProjectCaseStudyPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const projects = await fetchProjects();
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: ProjectCaseStudyPageProps) {
  const { id } = await params;
  const project = await fetchProjectById(id);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} — Case Study | ${siteConfig.name}`,
    description: project.description,
    alternates: { canonical: `/projects/${project.id}` },
    openGraph: {
      title: `${project.title} — Case Study | ${siteConfig.name}`,
      description: project.description,
      url: `${siteConfig.url}/projects/${project.id}`,
      type: "article",
      images: [project.bannerImage || "/banner.png"],
    },
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: ProjectCaseStudyPageProps) {
  const { id } = await params;
  const project = await fetchProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      <CaseStudyView caseStudy={getProjectCaseStudy(project)} />
    </main>
  );
}
