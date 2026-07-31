import { notFound } from "next/navigation";
import { siteConfig } from "@/data";
import { fetchProjects, fetchProjectById } from "@/lib/api/server";
import { getProjectCaseStudy } from "@/data/project-case-study";
import { CaseStudyView } from "@/components/casestudy/CaseStudyView";

/** ISR — case study pages revalidate hourly for CDN caching. */
export const revalidate = 3600;

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
      images: [{ url: `/projects/${project.id}/opengraph-image`, width: 1200, height: 630, alt: `${project.title} — Subham12r project` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Case Study | ${siteConfig.name}`,
      description: project.description,
      images: [`/projects/${project.id}/opengraph-image`],
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

  const projectUrl = `${siteConfig.url}/projects/${project.id}`;
  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: projectUrl,
    image: project.bannerImage ? `${siteConfig.url}${project.bannerImage}` : `${siteConfig.url}/banner.png`,
    keywords: project.tags,
    author: { "@id": `${siteConfig.url}/#person` },
    ...(project.completedDate ? { dateCreated: project.completedDate } : {}),
    ...(project.links.github ? { codeRepository: project.links.github } : {}),
  };

  return (
    <section className="min-h-screen bg-bg-primary text-text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema).replace(/</g, "\\u003c") }}
      />
      <CaseStudyView caseStudy={getProjectCaseStudy(project)} />
    </section>
  );
}
