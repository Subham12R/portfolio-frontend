import PlainProjectCard from "@/components/projects/PlainProjectCard"
import Link from 'next/link'
import { siteConfig } from '@/data'
import { fetchProjects } from '@/lib/api/server'

const ProjectsPage = async () => {
  const section = siteConfig.sections.projects
  const projects = await fetchProjects()
  const displayProjects = projects.slice(0, 6)

  return (
    <section id={section.id} className='w-full flex justify-center items-center pb-20 px-4 lg:px-0'>
      <div className='max-w-4xl w-full flex flex-col h-full'>

        {/* HEADER CONTENT */}
        <div className='flex justify-start items-start pt-16 pb-5 border-b border-border-accent space-y-2 mb-12'>
          <span className='text-start text-text-secondary text-xl font-mono leading-tight'>
            {section.number}
          </span>
          <h1 className='text-4xl font-semibold text-text-primary text-start'>{section.title}.</h1>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
          {displayProjects.map(project => (
            <PlainProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* View All Link */}
        <div className='mt-12 flex items-center justify-center'>
          <Link
            href="/projects"
            className='text-text-secondary rounded-3xl border border-border-secondary hover:bg-hover-tint hover:border-border-accent px-6 py-2.5 transition-all duration-200'
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ProjectsPage
