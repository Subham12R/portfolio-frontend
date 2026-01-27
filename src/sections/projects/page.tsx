


import { MacbookMockUp } from '@/components/mockups/laptop';
import Mobile from '@/components/mockups/mobile';
import { projects } from "@/data/project"
import ProjectCard from "@/components/projects/ProjectCard"
import { Button } from '@/components/ui/button';
import Link from 'next/link';
const ProjectsPage = () => {
  return (
    <div className='w-full flex justify-center items-center pb-20'>
      <div className='max-w-4xl w-full flex flex-col bg-black h-full'>
        
          {/* HEADER CONTENT */}
            <div className='flex  justify-start items-start  pt-16 pb-5 border-b border-white/40 space-y-2 mb-8 '>
                <span className='text-start text-white/80 text-xl font-mono leading-tight '>
                    02
                </span>
                <h1 className='text-4xl font-semibold text-white text-start '>Projects.</h1>
            </div>

          {/* Projects List Placeholder */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2  overflow-hidden'>
              {/* Left: Text */}
              <div className='flex flex-col justify-start pt-20 items-start gap-2 max-w-lg'>
                <h1>
                  <span className='text-3xl font-semibold text-white'>Welcome to My Projects</span>
                </h1>
                <p className='text-white/80'>
                  Here are some of the projects I've worked on, showcasing my skills and experience in web development. Each project highlights my ability to create dynamic and responsive web applications using modern technologies.
                </p>
              </div>
              {/* Right: Laptop */}
              <div className='flex justify-start items-center'>
                <div className='flex-shrink-0 max-w-xs w-full scale-90 md:scale-75 lg:scale-75'>
                  <MacbookMockUp />
                </div>
              </div>


            </div>


                <section className="space-y-4">
                {projects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}
                </section>

                <div className='mt-10 flex items-center justify-center'>
                    <Link href="/" className='text-white/80 rounded-3xl border-2  border-white/20 hover:bg-white/10 px-4 py-2 cursor-pointer'>
                        View All Projects
                    </Link>

                </div>
        </div>
      
    </div>
  );
};

export default ProjectsPage;
