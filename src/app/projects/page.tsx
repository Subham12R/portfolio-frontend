import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { siteConfig } from '@/data'
import { fetchProjects } from '@/lib/api/server'
import PlainProjectCard from '@/components/projects/PlainProjectCard'

export const metadata = {
  title: `Projects | ${siteConfig.title}`,
  description: 'A collection of projects showcasing my work in web development.',
}

export default async function ProjectsPage() {
  const projects = await fetchProjects()

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
          <h1 className="text-4xl md:text-5xl font-semibold text-text-primary mb-4">
            Projects
          </h1>
          <p className="text-lg text-text-tertiary max-w-4xl leading-relaxed">
            A collection of projects I&apos;ve built, from open source libraries to full-stack applications.
            Each one represents a problem I wanted to solve or an idea I wanted to explore.
          </p>
        </header>

        {/* Projects Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <PlainProjectCard key={project.id} project={project} />
          ))}
        </section>

      </div>
    </main>
  )
}
