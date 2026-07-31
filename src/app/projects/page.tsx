import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { siteConfig } from "@/data";
import { fetchProjects } from "@/lib/api/server";
import ProjectsGrid from "@/components/projects/ProjectsGrid";

/** ISR — HTML + data revalidate hourly (CDN-friendly). */
export const revalidate = 3600;

export const metadata = {
  title: `Projects | ${siteConfig.title}`,
  description:
    "Production-grade full-stack products, applied AI systems, and open-source developer tools — built by Subham Karmakar.",
  alternates: {
    canonical: "/projects",
  },
  keywords: [
    "Subham Karmakar Projects",
    "Subham12r Projects",
    "Full Stack projects",
    "Next.js projects",
    "GoLang projects",
    "FastAPI projects",
    "Web Development Portfolio",
    "Open Source projects",
  ],
  openGraph: {
    title: `Projects | ${siteConfig.name}`,
    description:
      "Production-grade full-stack products, applied AI systems, and open-source developer tools — built by Subham Karmakar.",
    url: `${siteConfig.url}/projects`,
    type: "website",
    images: [{ url: "/projects/opengraph-image", width: 1200, height: 630, alt: "Projects by Subham Karmakar" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Projects | ${siteConfig.name}`,
    description:
      "Production-grade full-stack products, applied AI systems, and open-source developer tools — built by Subham Karmakar.",
    images: ["/projects/opengraph-image"],
  },
};

export default async function ProjectsPage() {
  const projects = await fetchProjects();

  return (
    <section className="w-full flex justify-center items-center py-20 px-4 lg:px-0">
      <div className="max-w-2xl w-full">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-instrumentsans text-text-muted hover:text-text-primary transition-colors mb-8 text-md "
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>

        <div className="text-left mb-16">
          <h1 className="text-4xl lg:text-5xl font-medium font-instrumentserif tracking-tight text-text-primary mb-6">
            Projects
          </h1>
          <p className="text-md lg:text-lg text-text-secondary max-w-2xl mx-auto">
            Production-grade full-stack products, applied AI systems, and open-source developer tools.
          </p>
        </div>

        <ProjectsGrid projects={projects} />
      </div>
    </section>
  );
}
