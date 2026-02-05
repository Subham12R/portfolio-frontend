'use client'
import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollRevealText } from '@/components/ui/ScrollRevealText'
import { siteConfig } from '@/data'
import profileImg from '../../../public/images/profile/pfp.jpeg'

gsap.registerPlugin(ScrollTrigger)

export const About = () => {
  const section = siteConfig.sections.about
  const { socials, email } = siteConfig
  const imageRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!imageRef.current || !containerRef.current) return

    // Start from -10% and move to +10% for smooth parallax
    gsap.fromTo(imageRef.current,
      { yPercent: -10 },
      {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

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
          <div ref={containerRef} className='md:col-span-2 relative group'>
            <div className='relative w-full h-[350px] md:h-[450px] overflow-hidden rounded-xl border border-border-primary bg-bg-elevated'>
              {/* Parallax image container */}
              <div ref={imageRef} className="absolute -inset-[10%] scale-100">
                <Image
                  src={profileImg}
                  alt={siteConfig.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Noise overlay */}
              <div
                className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none z-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
              />
              <div className='absolute inset-0 ring-1 ring-inset ring-border-primary rounded-xl z-20' />
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

        {/* Gallery Cards - Commented out for now */}
        {/*
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 pt-12">
          <GalleryCard
            title="Hackathon Diaries"
            count={5}
            description="Memories from hackathons, coding events, and tech meetups I've participated in."
            buttonText="View all"
            href="/hackathons"
            icon="hackathon"
            images={hackathonImages}
          />
          <GalleryCard
            title="Photography"
            count={24}
            description="A collection of photos capturing moments, places, and perspectives I find interesting."
            buttonText="View gallery"
            href="/photography"
            icon="photography"
            images={photographyImages}
          />
        </div>
        */}

      </div>
    </section>
  )
}
