import { ExperienceCard } from '@/components/layout/experience'
import { siteConfig } from '@/data'
import { fetchWorkExperiences } from '@/lib/api/server'

const Work = async () => {
  const section = siteConfig.sections.experience
  const experiences = await fetchWorkExperiences()

  return (
    <section id={section.id} className='w-full flex justify-center items-center px-4 lg:px-0'>
      <div className='max-w-4xl w-full flex flex-col bg-black h-full'>
        {/* SECTION HEADER */}
        <div className='flex justify-start items-start pt-16 pb-5 border-b border-white/40 space-y-2 mb-8'>
          <span className='text-start text-white/80 text-xl font-mono leading-tight'>
            {section.number}
          </span>
          <h1 className='text-4xl font-semibold text-white text-start'>{section.title}.</h1>
        </div>

        <div className='flex flex-col justify-center items-start pb-16 space-y-8'>
          {experiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Work
