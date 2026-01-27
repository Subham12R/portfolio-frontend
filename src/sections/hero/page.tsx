'use client'

import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { GitHubCalendar } from 'react-github-calendar'
import { Tooltip } from 'react-tooltip'

import { MapPin } from '@/components/animate-ui/icons/map-pin'
import { Clock9 } from '@/components/animate-ui/icons/clock-9'
import { MailCheckIcon } from '@/components/ui/mail-check'
import { GithubIcon } from '@/components/ui/github'
import { LinkedinIcon } from '@/components/ui/linkedin'
import { TwitterIcon } from '@/components/ui/twitter'
import { YoutubeIcon } from '@/components/ui/youtube'
import { DiscordIcon } from '@/components/ui/discord'
import { DownloadIcon } from '@/components/ui/download'
import { siteConfig } from '@/data'

import profileBanner from '../../../public/images/profile/tenor.gif'
import profileIcon from '../../../public/images/profile/pfp.jpg'

function formatDate(date: string) {
  const d = new Date(date)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}.${month}.${year}`
}

export const Hero = () => {
  const [localTime, setLocalTime] = useState<string>('')
  const textRef = useRef<HTMLDivElement>(null)

  const { name, location, timezone, email, socials, titles, bio, resume } = siteConfig

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
      <div className="max-w-4xl w-full flex flex-col bg-black h-full">

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

        <div className="w-full px-4 lg:px-0">

          {/* Hero Content */}
          <div className="flex flex-col justify-center items-start text-start mt-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full mb-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-end justify-center">
                <Image
                  src={profileIcon}
                  alt={name}
                  width={100}
                  height={100}
                  className="rounded-xl mb-4 md:mb-0 md:mr-4 outline-2 outline-offset-2 outline-white/40"
                  priority
                />
                <div>
                  <div className="h-6 overflow-hidden">
                    <span ref={textRef} className="block text-zinc-300 font-medium">
                      {titles[0]}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-3">
                    <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
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

            <p className="text-base md:text-lg text-gray-300 mb-8 max-w-3xl leading-relaxed">
              {bio.long.split('scalable')[0]}
              <strong className="text-white">scalable</strong>
              {bio.long.split('scalable')[1].split('architecture')[0]}
              <strong className="text-white">architecture, thoughtful design, and real world impact</strong>.
              {bio.long.split('real world impact')[1]}
            </p>
          </div>

          {/* Social Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 px-4 py-4 border border-white/10 rounded-2xl shadow-[inset_0_4px_24px_0_rgba(255,255,255,0.04)]">
            <div className="flex flex-col justify-start space-y-4">

              {/* Location */}
              <SocialItem
                icon={<MapPin className="text-amber-200" size={16} animateOnHover />}
                text={location}
              />

              {/* Time */}
              <SocialItem
                icon={<Clock9 className="text-white" size={16} animateOnHover />}
                text={localTime ? `${localTime} (Local)` : 'Loading...'}
              />

              {/* Email */}
              <SocialItem
                icon={<MailCheckIcon className="text-red-400" size={16} />}
                text={email}
                href={`mailto:${email}`}
              />

              {/* GitHub */}
              <SocialItem
                icon={<GithubIcon className="text-blue-300" size={16} />}
                text={socials.github.display}
                href={socials.github.url}
              />
            </div>

            <div className="flex flex-col justify-start space-y-4">

              {/* LinkedIn */}
              <SocialItem
                icon={<LinkedinIcon className="text-blue-500" size={16} />}
                text={socials.linkedin.display}
                href={socials.linkedin.url}
              />

              {/* Twitter */}
              <SocialItem
                icon={<TwitterIcon className="text-white" size={16} />}
                text={socials.twitter.display}
                href={socials.twitter.url}
              />

              {/* YouTube */}
              <SocialItem
                icon={<YoutubeIcon className="text-red-500" size={16} />}
                text={socials.youtube.display}
                href={socials.youtube.url}
              />

              {/* Discord */}
              <SocialItem
                icon={<DiscordIcon className="text-indigo-400" size={16} />}
                text={socials.discord.display}
              />
            </div>
          </div>

          {/* GitHub Calendar */}
          <div className="w-full mb-12 px-5 py-5 rounded-2xl border border-white/10 bg-gradient-to-b from-neutral-900/80 to-black shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] text-white overflow-x-auto">
            <GitHubCalendar
              username={socials.github.username}
              blockSize={13}
              blockMargin={3}
              fontSize={14}
              blockRadius={2}
              showWeekdayLabels={false}
              colorScheme="dark"
              theme={{
                dark: [
                  '#1f2937',
                  '#374151',
                  '#4b5563',
                  '#9ca3af',
                  '#e5e7eb',
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

// Reusable social item component
function SocialItem({
  icon,
  text,
  href,
}: {
  icon: React.ReactNode
  text: string
  href?: string
}) {
  const content = (
    <>
      <div className="bg-neutral-800 p-1.5 rounded-lg flex justify-center items-center border border-white/10">
        {icon}
      </div>
      <span className={`text-gray-100 text-base font-medium ${href ? 'hover:underline' : ''}`}>
        {text}
      </span>
    </>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3">
        {content}
      </a>
    )
  }

  return <div className="inline-flex items-center gap-3">{content}</div>
}
