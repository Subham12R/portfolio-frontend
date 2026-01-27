import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ExternalLink, Github, Play } from 'lucide-react'
import { siteConfig } from '@/data'
import { getTechIcon } from '@/data/tech-icons'
import { fetchProjects } from '@/lib/api/server'

export const metadata = {
  title: `Projects | ${siteConfig.title}`,
  description: 'A collection of projects showcasing my work in web development.',
}

export default async function ProjectsPage() {
  const projects = await fetchProjects()
  const tags = Array.from(new Set(projects.flatMap((p) => p.tags))).sort()

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
          <p className="text-lg text-text-tertiary max-w-2xl leading-relaxed">
            A collection of projects I&quot;ve built, from open source libraries to full-stack applications.
            Each one represents a problem I wanted to solve or an idea I wanted to explore.
          </p>
        </header>

        {/* Projects Grid */}
        <section className="space-y-8">
          {projects.map((project) => (
            <article
              key={project.id}
              className="group p-6 rounded-2xl border border-border-primary hover:border-border-secondary transition-colors duration-200"
            >
              {/* Video/Banner Preview */}
              {(project.youtubeId || project.bannerImage) && (
                <div className="mb-6 rounded-xl overflow-hidden border border-border-primary">
                  {project.youtubeId ? (
                    <a
                      href={`https://www.youtube.com/watch?v=${project.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative block aspect-video bg-bg-elevated group/video"
                    >
                      <Image
                        src={`https://img.youtube.com/vi/${project.youtubeId}/maxresdefault.jpg`}
                        alt={`${project.title} preview`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover/video:scale-105"
                      />
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover/video:opacity-100 transition-opacity duration-200">
                        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                          <Play size={28} className="text-black ml-1" fill="black" />
                        </div>
                      </div>
                    </a>
                  ) : project.bannerImage ? (
                    <div className="relative aspect-video bg-bg-elevated">
                      <Image
                        src={project.bannerImage}
                        alt={`${project.title} banner`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : null}
                </div>
              )}

              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-mono text-text-muted">
                      {project.numberId}
                    </span>
                    {project.status && (
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        project.status === 'maintained'
                          ? 'bg-green-500/10 text-green-400'
                          : project.status === 'in-progress'
                          ? 'bg-amber-500/10 text-amber-400'
                          : 'bg-zinc-500/10 text-text-tertiary'
                      }`}>
                        {project.status === 'maintained' ? 'Actively Maintained' :
                         project.status === 'in-progress' ? 'In Progress' : 'Completed'}
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-semibold text-text-primary group-hover:text-text-secondary transition-colors duration-200">
                    {project.title}
                  </h2>
                  <p className="text-sm text-text-muted mt-1">{project.period}</p>
                </div>

                {/* Links */}
                <div className="flex items-center gap-3">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-text-muted hover:text-text-primary transition-colors duration-200"
                      aria-label="View live site"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-text-muted hover:text-text-primary transition-colors duration-200"
                      aria-label="View source code"
                    >
                      <Github size={18} />
                    </a>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-text-secondary leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {project.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-text-tertiary">
                    <span className="text-text-muted mt-1">•</span>
                    {feature}
                  </li>
                ))}
                {project.features.length > 3 && (
                  <li className="text-sm text-text-muted">
                    +{project.features.length - 3} more features
                  </li>
                )}
              </ul>

              {/* Tech Icons */}
              <div className="flex flex-wrap items-center gap-4">
                {project.tags.map((tag) => {
                  const iconPath = getTechIcon(tag)
                  return iconPath ? (
                    <div
                      key={tag}
                      className="p-1.5 rounded-xl bg-bg-badge border border-border-primary outline-2 outline-offset-2 outline-border-secondary hover:outline-border-accent transition-all duration-200"
                      title={tag}
                    >
                      <Image
                        src={iconPath}
                        alt={tag}
                        width={24}
                        height={24}
                        className="rounded-md"
                      />
                    </div>
                  ) : (
                    <span
                      key={tag}
                      className="text-xs font-bold tracking-tight px-3 py-1.5 rounded-xl bg-bg-badge border border-border-primary outline-2 outline-offset-2 outline-border-secondary text-text-tertiary"
                    >
                      {tag}
                    </span>
                  )
                })}
              </div>
            </article>
          ))}
        </section>

        {/* All Technologies Section */}
        <section className="mt-16 pt-8 border-t border-border-primary">
          <h2 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-6">
            Technologies Used
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            {tags.map((tag) => {
              const iconPath = getTechIcon(tag)
              return iconPath ? (
                <div
                  key={tag}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-bg-badge border border-border-primary outline-2 outline-offset-2 outline-border-secondary hover:outline-border-accent transition-all duration-200"
                  title={tag}
                >
                  <Image
                    src={iconPath}
                    alt={tag}
                    width={20}
                    height={20}
                    className="rounded-sm"
                  />
                  <span className="text-sm text-text-secondary">{tag}</span>
                </div>
              ) : (
                <span
                  key={tag}
                  className="text-sm font-bold tracking-tight px-3 py-2 rounded-xl bg-bg-badge border border-border-primary outline-2 outline-offset-2 outline-border-secondary text-text-secondary"
                >
                  {tag}
                </span>
              )
            })}
          </div>
        </section>

      </div>
    </main>
  )
}
