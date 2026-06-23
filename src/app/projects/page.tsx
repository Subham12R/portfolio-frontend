import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { siteConfig } from "@/data";
import { fetchProjects } from "@/lib/api/server";
import ProjectsGrid from "@/components/projects/ProjectsGrid";

export const dynamic = "force-dynamic";

export const metadata = {
  title: `Projects | ${siteConfig.title}`,
  description:
    "A collection of projects showcasing my work in web development.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: `Projects | ${siteConfig.name}`,
    description:
      "A collection of projects showcasing my work in web development.",
    url: `${siteConfig.url}/projects`,
    type: "website",
    images: ["/icon.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `Projects | ${siteConfig.name}`,
    description:
      "A collection of projects showcasing my work in web development.",
    images: ["/icon.png"],
  },
};

export default async function ProjectsPage() {
  const projects = await fetchProjects();

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      <div className="max-w-4xl mx-auto px-4 lg:px-0 py-16">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors duration-200 mb-12"
        >
          <ArrowLeft size={16} />
          <span className="text-sm font-medium">Back to home</span>
        </Link>

        {/* Header */}
        <header className="mb-16">
          <h1 className="text-4xl font-medium text-text-primary mb-4">
            Projects
          </h1>
          <p className="text-lg text-text-tertiary max-w-4xl leading-relaxed">
            A collection of projects I&apos;ve built, from open source libraries
            to full-stack applications. Each one represents a problem I wanted
            to solve or an idea I wanted to explore.
          </p>
        </header>

        <ProjectsGrid projects={projects} />
      </div>
    </main>
  );
}
