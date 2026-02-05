'use client'

import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { GitHubCalendar } from 'react-github-calendar'
import { Tooltip } from 'react-tooltip'

import { MailCheckIcon } from '@/components/ui/mail-check'
import { GithubIcon } from '@/components/ui/github'
import { LinkedinIcon } from '@/components/ui/linkedin'
import { TwitterIcon } from '@/components/ui/twitter'
import { YoutubeIcon } from '@/components/ui/youtube'
import { DiscordIcon } from '@/components/ui/discord'
import { DownloadIcon } from '@/components/ui/download'
import { ScrollRevealText } from '@/components/ui/ScrollRevealText'
import { siteConfig } from '@/data'
import { useTheme } from 'next-themes'

import profileBanner from '../../../public/images/profile/tenor.gif'
import profileIcon from '../../../public/images/profile/pfp.jpeg'

function formatDate(date: string) {
  const d = new Date(date)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}.${month}.${year}`
}

export const Hero = () => {
  const [localTime, setLocalTime] = useState<string>('')
  const [blockSize, setBlockSize] = useState(16)
  const textRef = useRef<HTMLDivElement>(null)

  const { name, location, timezone, email, socials, titles, bio, resume } = siteConfig
  const { resolvedTheme } = useTheme()

  // Dynamic block size based on screen width
  useEffect(() => {
    function updateBlockSize() {
      const width = window.innerWidth
      if (width < 480) setBlockSize(8)
      else if (width < 640) setBlockSize(10)
      else if (width < 768) setBlockSize(12)
      else if (width < 1024) setBlockSize(14)
      else setBlockSize(14)
    }
    updateBlockSize()
    window.addEventListener('resize', updateBlockSize)
    return () => window.removeEventListener('resize', updateBlockSize)
  }, [])

  // Dynamic time update
  useEffect(() => {
    function updateTime() {
      const now = new Date()
      const time = now.toLocaleTimeString('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      })
      setLocalTime(time)
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [timezone])

  // Title rotation animation
  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 })

    titles.forEach((title) => {
      tl.to(textRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.in',
        delay: 1.8,
      })
        .set(textRef.current, {
          y: 20,
          opacity: 0,
          textContent: title,
        })
        .to(textRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
        })
    })

    return () => {
      tl.kill()
    }
  }, [titles])

  return (
    <section id="home" className="w-full flex justify-center items-center">
      <div className="max-w-4xl w-full flex flex-col h-full">

        {/* Banner */}
        <div className="max-h-[20vh] overflow-hidden flex justify-center flex-col items-center">
          <Image
            src={profileBanner}
            alt="Banner"
            width={1920}
            height={1080}
            className="w-full h-auto object-cover"
            priority
          />
        </div>

        <div className="w-full px-4 lg:px-2">

          {/* Hero Content */}
          <div className="flex flex-col justify-center items-start text-start mt-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full mb-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-end justify-center ">
                <Image
                  src={profileIcon}
                  alt={name}
                  width={100}
                  height={100}
                  className="rounded-xl mb-4 md:mb-0 md:mr-4 outline-2 outline-offset-2 outline-border-accent h-20 w-20 object-cover"
                  priority
                />
                <div>
                  <div className="h-6 overflow-hidden">
                    <span ref={textRef} className="block text-text-secondary font-medium">
                      {titles[0]}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-3">
                    <h1 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
                      {name}
                    </h1>
                    <a
                      href={resume.path}
                      download={resume.filename}
                      className="bg-blue-600 p-1.5 rounded-lg flex justify-center items-center border border-blue-400/20 hover:bg-blue-500 active:scale-95 transition-all duration-150"
                      title="Download Resume"
                    >
                      <DownloadIcon className="text-white" size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <ScrollRevealText as="p" className="text-base md:text-lg mb-8 max-w-3xl leading-relaxed">
              {bio.long.split('scalable')[0]}
              <strong>scalable</strong>
              {bio.long.split('scalable')[1].split('architecture')[0]}
              <strong>architecture, thoughtful design, and real world impact</strong>.
              {bio.long.split('real world impact')[1]}
            </ScrollRevealText>
          </div>

          {/* Social Links */}
          <div className="flex sm:flex-col lg:flex-row  gap-4 mb-12">
            {/* Location & Time - Plain text */}
            <div className="flex flex-wrap items-start gap-3 text-sm text-text-secondary justify-start flex-col ">
              <span className='bg-zinc-200 w-full dark:bg-zinc-900 px-2 py-1 text-zinc-900 dark:text-white rounded outline-2 outline-zinc-900/10 dark:outline-white/20 outline-offset-2 '>{location}</span>
              <span className='bg-zinc-200 w-full dark:bg-zinc-900 px-2 py-1 text-zinc-900 dark:text-white rounded outline-2 outline-zinc-900/10 dark:outline-white/20 outline-offset-2 '>{localTime ? `${localTime} (+5:30 GMT)` : 'Loading...'}</span>
            </div>

            {/* Social Icons Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 bg-zinc-200 dark:bg-zinc-900 px-3 py-2 rounded outline-2 outline-zinc-900/10 dark:outline-white/20 outline-offset-2">
              <a href={`mailto:${email}`} className="inline-flex items-center gap-2 hover:text-red-400 transition-colors" title="Email">
                <MailCheckIcon size={20} />
                <span className="text-sm">Email</span>
              </a>
              <a href={socials.github.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-text-primary transition-colors" title="GitHub">
                <GithubIcon size={20} />
                <span className="text-sm">GitHub</span>
              </a>
              <a href={socials.linkedin.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-blue-500 transition-colors" title="LinkedIn">
                <LinkedinIcon size={20} />
                <span className="text-sm">LinkedIn</span>
              </a>
              <a href={socials.twitter.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-blue-400 transition-colors" title="Twitter">
                <TwitterIcon size={20} />
                <span className="text-sm">Twitter</span>
              </a>
              <a href={socials.youtube.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-red-500 transition-colors" title="YouTube">
                <YoutubeIcon size={20} />
                <span className="text-sm">YouTube</span>
              </a>
              <span className="inline-flex items-center gap-2 hover:text-indigo-400 transition-colors cursor-default" title={socials.discord.display}>
                <DiscordIcon size={20} />
                <span className="text-sm">Discord</span>
              </span>
            </div>
          </div>

          {/* GitHub Calendar */}
          <div className="w-full mb-12 px-4 py-2 rounded-xl border border-border-primary bg-bg-elevated/30 text-text-primary overflow-x-auto">
            <GitHubCalendar
              username={socials.github.username}
              blockSize={blockSize}
              blockMargin={2}
              fontSize={16}
              year={2026}
              blockRadius={2}
              showWeekdayLabels={false}
              colorScheme={resolvedTheme === 'dark' ? 'dark' : 'light'}
              theme={{
                dark: [
                  '#1f2937',
                  '#374151',
                  '#4b5563',
                  '#9ca3af',
                  '#e5e7eb',
                ],
                light: [
                  '#ebedf0',
                  '#9be9a8',
                  '#40c463',
                  '#30a14e',
                  '#216e39',
                ],
              }}
              renderBlock={(block, activity) =>
                activity.count > 0
                  ? React.cloneElement(block, {
                      'data-tooltip-id': 'github-tooltip',
                      'data-tooltip-content': `${
                        activity.count === 1 ? '1 contribution' : `${activity.count} contributions`
                      } on ${formatDate(activity.date)}`,
                    })
                  : block
              }
            />
            <Tooltip
              id="github-tooltip"
              place="top"
              className="!px-3 !py-1.5 !rounded-md !text-sm !font-medium !bg-white !text-black !shadow-md !border !border-black/10"
              delayHide={50}
            />
          </div>

        </div>
      </div>
    </section>
  )
}

