'use client'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { ScrollRevealText } from '@/components/ui/ScrollRevealText'
import { siteConfig } from '@/data'
import profileImg from '../../../public/images/profile/pfp.jpeg'

export const About = () => {
  const section = siteConfig.sections.about
  const { socials, email } = siteConfig

  return (
    <section id={section.id} className='w-full flex justify-center items-center py-24  text-text-primary px-4 lg:px-0'>
      <div className='max-w-4xl w-full'>

        {/* HEADER */}
        <div className='flex justify-start items-start pt-16 pb-5 border-b border-border-accent space-y-2 mb-8'>
          <span className='text-start text-text-secondary text-xl font-mono leading-tight'>
            {section.number}
          </span>
          <h1 className='text-4xl font-semibold text-text-primary text-start'>{section.title}.</h1>
        </div>

        {/* SPLIT LAYOUT */}
        <div className='grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12'>

          {/* LEFT: Image Column */}
          <div className='md:col-span-2 relative group'>
            <div className='relative w-full h-[350px] md:h-[450px] overflow-hidden rounded-xl border border-border-primary bg-bg-elevated'>
              <Image
                src={profileImg}
                alt={siteConfig.name}
                fill
                className="object-cover transition-all duration-700 ease-out"
                priority
              />
              <div className='absolute inset-0 ring-1 ring-inset ring-border-primary rounded-xl z-10' />
            </div>
          </div>

          {/* RIGHT: Text & Links Column */}
          <div className='md:col-span-3 flex flex-col justify-start items-start space-y-6'>

            <div className='text-lg md:text-xl leading-relaxed'>
              <ScrollRevealText as="p" className='mb-6'>
                I'm {siteConfig.name}, a B.Tech student and developer from {siteConfig.location.split(',')[0]}.
              </ScrollRevealText>
              <ScrollRevealText as="p" className='mb-6'>
                I build full-stack applications with modern web technologies, while constantly exploring areas like databases, system design, and developer tooling.
              </ScrollRevealText>
              <ScrollRevealText as="p">
                I enjoy turning ideas into practical solutions—whether it's experimenting with visual tools, solving algorithmic problems, or contributing to larger technical projects.
              </ScrollRevealText>
            </div>

            {/* Links Section */}
            <div className='pt-6 mt-2'>
              <div className='flex flex-wrap gap-x-8 gap-y-3 font-mono text-sm tracking-wider uppercase'>
                <a
                  href={socials.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className='group flex items-center space-x-1 text-text-muted hover:text-text-primary transition-colors duration-200'
                >
                  <span>Github</span>
                  <ArrowUpRight size={14} className='group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-200' />
                </a>

                <a
                  href={socials.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className='group flex items-center space-x-1 text-text-muted hover:text-blue-400 transition-colors duration-200'
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight size={14} className='group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-200' />
                </a>

                <a
                  href={`mailto:${email}`}
                  className='group flex items-center space-x-1 text-text-muted hover:text-red-400 transition-colors duration-200'
                >
                  <span>Email</span>
                  <ArrowUpRight size={14} className='group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-200' />
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
