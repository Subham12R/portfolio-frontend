'use client'
import Image from 'next/image'
import profileBanner from '../../../public/images/profile/tenor.gif'
import profileIcon from '../../../public/images/profile/pfp.jpg'
import React from 'react'
import { useEffect, useRef } from "react"
import { useState } from "react"
import gsap from "gsap"
import { MapPin } from '@/components/animate-ui/icons/map-pin'
import { Clock9 } from '@/components/animate-ui/icons/clock-9'
import { MailCheckIcon } from '@/components/ui/mail-check'
import { GithubIcon } from '@/components/ui/github'
import { LinkedinIcon } from '@/components/ui/linkedin'
import { TwitterIcon } from '@/components/ui/twitter'
import { YoutubeIcon } from '@/components/ui/youtube'
import { DiscordIcon } from '@/components/ui/discord'
import { DownloadIcon } from '@/components/ui/download'
import { GitHubCalendar } from 'react-github-calendar';
import { Tooltip } from "react-tooltip"


function formatDate(date: string) {
  const d = new Date(date)
  const day = String(d.getDate()).padStart(2, "0")
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const year = d.getFullYear()
  return `${day}.${month}.${year}`
}

export const Hero = () => {

  // State for dynamic time in Kolkata
  const [kolkataTime, setKolkataTime] = useState<string>("");


  useEffect(() => {
    function updateTime() {
      const now = new Date();
      // Convert to Kolkata time (Asia/Kolkata, UTC+5:30)
      const kolkata = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setKolkataTime(kolkata);
    }
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

const titles = [
  "Full Stack Developer",
  "Frontend Engineer",
  "Freelance Developer",
  "Open Source Contributor",
  "Tech Enthusiast",
]

  const textRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 })

    titles.forEach((title) => {
      tl
        .to(textRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.6,
          ease: "power2.in",
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
          ease: "power2.out",
        })
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div className=' w-full flex justify-center items-center'>
        <div className=' max-w-4xl w-full flex flex-col bg-black h-full'>
            {/* GIF BANNER */}
            <div className='max-h-[20vh] overflow-hidden flex justify-center flex-col items-center'>
                <Image src={profileBanner} alt="Hero Banner" width={1920} height={1080} className="w-full h-auto object-cover"/>
            </div>
            <div className='w-full px-4 lg:px-0'>
                {/* HERO CONTENT */}
                <div className=' flex flex-col lg:flex-1  justify-center items-start text-start mt-8 '>
                    <div className=' flex flex-col md:flex-row md:justify-between md:items-center w-full mb-8'>
                        <div className='flex flex-col lg:flex-row items-start lg:items-end justify-center'>
                            <Image src={profileIcon} alt="Profile Picture" width={100} height={100} className="rounded-xl mb-4 md:mb-0 md:mr-4 outline-2 outline-offset-2 outline-white/40 "/>
                            <div className=''>
                            <div className="h-6 overflow-hidden">
                                <span
                                    ref={textRef}
                                    className="block text-zinc-200 font-semibold"
                                >
                                    {titles[0]}
                                </span>
                                </div>
                                <div className=' inline-flex items-center space-x-3 '>

                              
                                 <h1 className=' text-3xl md:text-4xl font-bold text-white tracking-tighter'>Subham Karmakar</h1>
                               
                                        <a
                                          href="/resume.pdf"
                                          download
                                          className='bg-blue-700 p-1.5 rounded-xl flex justify-center items-center border-2 border-blue-200/20 outline-2 outline-offset-2 outline-blue-500/40 active:scale-95 transition-transform duration-150 cursor-pointer'
                                          title="Download Resume"
                                        >
                                            <DownloadIcon className=" text-white " size={16} />
                                        </a>
                                      
                             
                                  </div>
                            </div>
                        </div>
           
                    </div>
                    <p className='text-md text-balance text-gray-300 mb-8 max-w-3xl tracking-tighter space-y-2 leading-7'>
                        I’m a full-stack developer who enjoys turning complex problems into simple, elegant solutions. I focus on building <strong className='italic text-white'>scalable</strong>, performant web applications with clean <strong className='italic text-white'>architecture, thoughtful design, and real world impact</strong>. From idea to production, I care about writing code that’s maintainable, meaningful, and built to last.
                    </p>
                </div>
                {/* Socials */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 px-4 py-4 border-2 border-white/10 rounded-2xl ow-[inset_0_4px_24px_0_rgba(255,255,255,0.08),inset_0_-4px_24px_0_rgba(0,0,0,0.5)]shad'>
                    <div className='flex flex-col justify-start space-y-4'>
                        {/*Location*/}
                        <div className='inline-flex items-center space-x-3'>
                            <div className='bg-neutral-700 p-1.5 rounded-xl flex justify-center items-center border-2 border-white/20 outline-2 outline-offset-2 outline-white/40'>
                                  <MapPin className=" text-yellow-100 " size={16} animateOnHover/>
                            </div>
                            <span className='text-gray-100  text-lg font-medium'>Kolkata, West Bengal, India</span>
                        </div>

                        {/* Dynamic Time for Kolkata */}
                        <div className='inline-flex items-center space-x-3'>
                            <div className='bg-neutral-700 p-1.5 rounded-xl flex justify-center items-center border-2 border-white/20 outline-2 outline-offset-2 outline-white/40'>
                                  <Clock9 className=" text-white " size={16} animateOnHover/>
                            </div>
                            <span className='text-gray-100  text-lg font-medium'>
                              {kolkataTime ? kolkataTime + ' (Kolkata)' : 'Loading...'}
                            </span>
                        </div>
                        


                        {/* Mail */}
                        <div className='inline-flex items-center space-x-3'>
                            <div className='bg-neutral-700 p-1.5 rounded-xl flex justify-center items-center border-2 border-white/20 outline-2 outline-offset-2 outline-white/40'>
                                  <MailCheckIcon className=" text-red-400 " size={16} />
                            </div>
                            <a href='mailto:rikk4335@gmail.com' className='text-gray-100  text-lg font-medium hover:underline '>rikk4335@gmail.com</a>
                        </div>

                        {/* Github */}
                        <div className='inline-flex items-center space-x-3'>
                            <div className='bg-neutral-700 p-1.5 rounded-xl flex justify-center items-center border-2 border-white/20 outline-2 outline-offset-2 outline-white/40'>
                                  <GithubIcon className=" text-blue-300 " size={16} />
                            </div>
                            <a href='https://github.com/Subham12R' className='text-gray-100  text-lg font-medium hover:underline'>Subham12r</a>
                        </div>
                        
                    </div>

                    <div className='flex flex-col justify-start space-y-4'>
                        {/* Additional Info or Links can go here */}
                        <div className='inline-flex items-center space-x-3'>
                            <div className='bg-neutral-700 p-1.5 rounded-xl flex justify-center items-center border-2 border-white/20 outline-2 outline-offset-2 outline-white/40'>
                                  <LinkedinIcon className=" text-blue-500 " size={16} />
                            </div>
                            <a href='https://www.linkedin.com/in/subham12r/' className='text-gray-100  text-lg font-medium hover:underline'>subham12r</a>
                        </div>
                        
                        <div className='inline-flex items-center space-x-3'>
                            <div className='bg-neutral-700 p-1.5 rounded-xl flex justify-center items-center border-2 border-white/20 outline-2 outline-offset-2 outline-white/40'>
                                  <TwitterIcon className=" text-white " size={16} />
                            </div>
                            <a href='https://x.com/Subham12R' className='text-gray-100  text-lg font-medium hover:underline'>@Subham12r</a>
                        </div>

                        <div className='inline-flex items-center space-x-3'>
                            <div className='bg-neutral-700 p-1.5 rounded-xl flex justify-center items-center border-2 border-white/20 outline-2 outline-offset-2 outline-white/40'>
                                  <YoutubeIcon className=" text-red-500 " size={16} />
                            </div>
                            <a href='https://www.youtube.com/@SubhamX8' className='text-gray-100  text-lg font-medium hover:underline'>@SubhamX8</a>
                        </div>

                        <div className='inline-flex items-center space-x-3'>
                            <div className='bg-neutral-700 p-1.5 rounded-xl flex justify-center items-center border-2 border-white/20 outline-2 outline-offset-2 outline-white/40'>
                                  <DiscordIcon className=" text-blue-500 " size={16} />
                            </div>
                            <span  className='text-gray-100  text-lg font-medium hover:underline'>subham_c9</span>
                        </div>
                    </div>
                </div>

                {/* Github Calender */}
                        <div className="
                    w-full mb-12 px-5 py-5 rounded-2xl
                    border border-white/10
                    bg-gradient-to-b from-neutral-900/90 to-black
                    shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_20px_60px_rgba(0,0,0,0.8)]
                    text-white">

                    <GitHubCalendar
                    username="Subham12R"
                    blockSize={13}
                    blockMargin={3}
                    fontSize={14}
                    blockRadius={1}
                    showWeekdayLabels={false}
                    showMonthLabels={true}
                    showTotalCount={true}
                    showColorLegend={true}
                    colorScheme="dark"
                    theme={{
                        dark: [
                        "#1f2937", // empty (very dark gray)
                        "#374151",
                        "#4b5563",
                        "#9ca3af",
                        "#e5e7eb", // highest activity (almost white)
                        ],
                    }}
                    renderBlock={(block, activity) =>
                        activity.count > 0
                            ? React.cloneElement(block, {
                                "data-tooltip-id": "github-tooltip",
                                "data-tooltip-content": `${
                                activity.count === 1
                                    ? "1 contribution"
                                    : `${activity.count} contributions`
                                } on ${formatDate(activity.date)}`,
                            })
                            : block
                        }
                    />
                    <Tooltip
                    id="github-tooltip"
                    place="top"
                    
                    className="
                        px-3 py-1.5
                        rounded-md
                        text-sm
                        font-medium
                        bg-white text-black
                        shadow-md
                        border border-black/10
                    "
                    delayHide={50}
                    float
                    />

                    
                </div>
            </div>
        </div>
    </div>
  )
}
