import { ScrollRevealText } from '@/components/ui/ScrollRevealText'
import { MacbookMockUp } from '@/components/mockups/laptop'
import ProjectCard from "@/components/projects/ProjectCard"
import Link from 'next/link'
import { siteConfig } from '@/data'
import { fetchProjects } from '@/lib/api/server'

const ProjectsPage = async () => {
  const section = siteConfig.sections.projects
  const projects = await fetchProjects()

  return (
    <section id={section.id} className='w-full flex justify-center items-center pb-20 px-4 lg:px-0'>
      <div className='max-w-4xl w-full flex flex-col bg-bg-primary h-full'>

        {/* HEADER CONTENT */}
        <div className='flex justify-start items-start pt-16 pb-5 border-b border-border-accent space-y-2 mb-8'>
          <span className='text-start text-text-secondary text-xl font-mono leading-tight'>
            {section.number}
          </span>
          <h1 className='text-4xl font-semibold text-text-primary text-start'>{section.title}.</h1>
        </div>

        {/* Projects Intro */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-2 overflow-hidden mb-8'>
          {/* Left: Text */}
          <div className='flex flex-col justify-start pt-8 md:pt-20 items-start gap-3 max-w-lg'>
            <ScrollRevealText as="h2" className='text-2xl md:text-3xl font-semibold'>
              Building things that matter
            </ScrollRevealText>
            <ScrollRevealText as="p" className='leading-relaxed'>
              A collection of projects that showcase my approach to solving problems with code.
              Each project reflects my focus on clean architecture, thoughtful UX, and modern technologies.
            </ScrollRevealText>
          </div>
          {/* Right: Laptop */}
          <div className='hidden md:flex justify-center items-center'>
            <div className='flex-shrink-0 max-w-xs w-full scale-75'>
              <MacbookMockUp />
            </div>
          </div>
        </div>

        {/* Project Cards */}
        <div className="space-y-4">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* View All Link */}
        <div className='mt-10 flex items-center justify-center'>
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
