"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { GithubCalendar } from "@/components/ui/github-calendar";
import { TooltipGlass } from "@/components/ui/tooltip";
import { ArrowRight, Map, MapPin, Phone, PhoneIcon, XCircle } from "lucide-react";

import { DownloadIcon } from "@/components/ui/download";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  GithubIcon,
  Linkedin02Icon,
  NewTwitterIcon,
  YoutubeIcon,
  MediumIcon,
  Mail01Icon,
  CallIcon,
  DiscordIcon,
  AiBrain01Icon,
  AiIdeaIcon,
  Atom02Icon,
  CircleGaugeIcon,
  CodeIcon,
  Globe02Icon,
  DatabaseIcon,
  CpuIcon,
} from "@hugeicons/core-free-icons";
import { ScrollRevealText } from "@/components/ui/ScrollRevealText";
import { siteConfig } from "@/data";
import { useTheme } from "next-themes";

import profileBanner from "../../../public/images/profile/banner.gif";
import profileIcon from "../../../public/images/profile/profile.png";
import DevPresence from "@/components/ui/DevPresence";
import SpotifyNowPlaying from "@/components/ui/SpotifyNowPlaying";
import TotalCodingTime from "@/components/ui/TotalCodingTime";

function formatDate(date: string) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
}

export const Hero = () => {
  const [localTime, setLocalTime] = useState<string>("");
  const [blockSize, setBlockSize] = useState(12);
  const [mounted, setMounted] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const handlePlay = () => {
    if (typeof window !== "undefined") {
      const audio = new Audio("/click.wav");
      audio.play();
    }
  };

  const { name, location, timezone, email, socials, titles, bio, resume } =
    siteConfig;
  const { resolvedTheme } = useTheme();

  // Prevent hydration mismatch by waiting for first animation frame on client
  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  // Dynamic block size based on screen width
  useEffect(() => {
    function updateBlockSize() {
      const width = window.innerWidth;
      if (width < 480) setBlockSize(8);
      else if (width < 640) setBlockSize(10);
      else if (width < 768) setBlockSize(12);
      else if (width < 1024) setBlockSize(14);
      else setBlockSize(14);
    }
    updateBlockSize();
    window.addEventListener("resize", updateBlockSize);
    return () => window.removeEventListener("resize", updateBlockSize);
  }, []);

  // Dynamic time update
  useEffect(() => {
    function updateTime() {
      const now = new Date();
      const time = now.toLocaleTimeString("en-US", {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setLocalTime(time);
    }
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  // Title rotation animation
  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });

    titles.forEach((title) => {
      tl.to(textRef.current, {
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
        });
    });

    return () => {
      tl.kill();
    };
  }, [titles]);

  return (
    <section id="home" className="w-full flex justify-center items-center px-4 pt-4 mb-12">
      <div className="max-w-4xl w-full flex flex-col h-full">
        {/* Banner */}
        <div
          className="relative max-h-full overflow-hidden flex justify-center flex-col items-center p-2 border-2 border-border-primary rounded-xl shadow-[inset_0px_0px_2px_2px_rgba(0,0,0,0.08)] dark:shadow-[inset_0px_0px_4px_4px_rgba(255,255,255,0.04)]"

        >

          <Image
            src={profileBanner}
            alt="Banner"
            width={1920}
            height={1080}
            className="w-full h-64 items-center object-cover border-2 border-border-primary rounded-xl "
            priority
            unoptimized
          />
        </div>

        <div className="w-full py-5 px-0 md:px-0 ">
          {/* Hero Content */}
          <div className="flex flex-col justify-center items-end text-start mt-8 ">
            <div className="flex flex-col md:flex-row md:justify-between items-start w-full mb-8">
              <div className="flex flex-row items-end justify-center gap-4">
                <div className="p-1 relative rounded-2xl border-2 border-border-primary shadow-[inset_0px_0px_2px_2px_rgba(0,0,0,0.08)] dark:shadow-[inset_0px_0px_4px_4px_rgba(255,255,255,0.04)]">
                  <Image
                    src={profileIcon}
                    alt={name}
                    width={100}
                    height={100}
                    className="relative z-20  h-20 w-20 aspect-square overflow-hidden object-cover rounded-xl border-2 border-border-primary "
                    priority
                  />
                </div>

                <div>
                  <div className="h-6 overflow-hidden ">
                    <span
                      ref={textRef}
                      className="block text-text-secondary font-medium"
                    >
                      {titles[0]}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2 group/badge">
                    <span className="text-2xl md:text-4xl font-medium  tracking-tighter">
                      {name}
                    </span>
                    <svg
                      viewBox="0 0 22 22"
                      className="w-5 h-5 md:w-6 md:h-6 shrink-0 transition-transform duration-300 group-hover/badge:rotate-12 items-end mt-1 md:mt-2"
                      aria-label="Verified"
                    >
                      <path
                        fill="#3b82f6"
                        d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.198-.606.225-1.255.08-1.875-.146-.62-.46-1.185-.904-1.63-.445-.445-1.01-.76-1.63-.904-.62-.146-1.27-.119-1.875.08-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.603-.198-1.25-.225-1.868-.08-.617.144-1.18.457-1.625.9-.444.445-.758 1.008-.902 1.626-.144.617-.118 1.264.08 1.867-.588.274-1.089.705-1.444 1.246-.355.54-.553 1.17-.572 1.817.02.647.218 1.276.572 1.817.355.54.856.972 1.444 1.245-.198.604-.224 1.252-.08 1.87.144.618.458 1.182.902 1.626.445.443 1.008.758 1.625.902.618.144 1.265.118 1.868-.08.272.587.703 1.086 1.243 1.44.54.354 1.168.551 1.815.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.198 1.251.223 1.868.078.617-.144 1.18-.458 1.625-.902.444-.444.758-1.008.902-1.626.144-.617.118-1.265-.08-1.87.587-.272 1.087-.704 1.442-1.244.354-.54.553-1.17.571-1.817z"
                      />
                      <path
                        fill="white"
                        d="M9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

            </div>
            <div className="w-full flex flex-col gap-3 mb-8 md:mb-0 md:flex-row md:items-center md:gap-2">
              <div className="flex items-center gap-2">
                <a
                  href={resume.path}
                  download={resume.filename}
                  className="group relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-500 active:scale-95 transition-all duration-300 border-2 border-blue-400/30 shadow-[inset_0px_0px_2px_2px_rgba(0,0,0,0.08)] h-10 min-w-[120px]"
                  onClick={handlePlay}
                >
                  <span className="flex items-center gap-1.5 transition-transform duration-300 group-hover:-translate-y-10">
                    <DownloadIcon size={16} />
                    <span>Resume</span>
                  </span>
                  <span className="absolute flex items-center gap-1.5 transition-transform duration-300 translate-y-10 group-hover:translate-y-0">
                    <DownloadIcon size={16} />
                    <span>Download</span>
                  </span>
                </a>
                <button
                  data-cal-namespace="15min"
                  data-cal-link="subham12r/15min"
                  data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                  className="group relative overflow-hidden cursor-pointer inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium h-10 min-w-[160px] active:scale-95 transition-all duration-300 shadow-[inset_0px_0px_2px_2px_rgba(0,0,0,0.08)] dark:shadow-[inset_0px_0px_4px_4px_rgba(255,255,255,0.04)] border-2 border-border-primary hover:border-border-secondary bg-bg-primary"
                >
                  {/* Default Content (Step 1: exits immediately on hover) */}
                  <div className="flex items-center gap-2 transition-all duration-300 group-hover:-translate-y-10 group-hover:opacity-0">
                    <span>Book a Call</span>
                    <Phone size={16} className="group-hover:rotate-2 transition-transform duration-200" />
                  </div>

                  {/* Hover Content (Container fades in softly, allowing children to animate sequentially) */}
                  <div className="absolute inset-0 flex items-center justify-start pl-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full">
                    {/* Overlapping Icons Wrapper (Step 2: slides in from right to left) */}
                    <div className="relative flex items-center w-16 h-6 flex-shrink-0 transition-all duration-500 delay-[150ms] translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
                      {/* Avatar */}
                      <div className="w-6 h-6 rounded-full overflow-hidden border border-border-primary z-10 bg-bg-secondary flex-shrink-0">
                        <Image
                          src={profileIcon}
                          alt={name}
                          width={24}
                          height={24}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Plus Sign (+): Step 2b (scales up in the middle) */}
                      <span className="absolute left-[29px] z-20 text-[10px] font-bold text-text-secondary select-none transition-transform duration-300 delay-[300ms] scale-0 group-hover:scale-100">
                        +
                      </span>

                      {/* YOU Badge (Step 2c: scales up on the right) */}
                      <div className="absolute left-[38px] z-10 w-6 h-6 rounded-full bg-white text-zinc-900 border border-zinc-200 flex items-center justify-center font-extrabold text-[8px] select-none shadow-sm transition-transform duration-300 delay-[450ms] scale-0 group-hover:scale-100">
                        YOU
                      </div>
                    </div>
                    
                    {/* Let's Talk Text (Step 3: slides and fades in last) */}
                    <span className="ml-2 font-semibold text-text-primary transition-all duration-400 delay-[650ms] opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0">
                      Let&apos;s Talk
                    </span>
                  </div>
                </button>
              </div>

              <div className="md:ml-auto w-full md:w-auto flex md:inline-flex items-center rounded-md border-2 border-border-primary bg-bg-primary shadow-[inset_0px_0px_2px_2px_rgba(0,0,0,0.08)] dark:shadow-[inset_0px_0px_4px_4px_rgba(255,255,255,0.04)] text-zinc-800  p-0.5">
                <a href={socials.github.url} target="_blank" rel="noopener noreferrer" className="group flex-1 md:flex-none flex justify-center items-center p-2 hover:text-text-primary hover:bg-hover-tint transition-colors duration-200 rounded">
                  <HugeiconsIcon icon={GithubIcon} size={20} />
                  <span className="overflow-hidden max-w-0 group-hover:max-w-24 group-hover:ml-1.5 text-xs font-medium whitespace-nowrap [font-family:var(--font-helvetica)] transition-all duration-500 ease-in-out">GitHub</span>
                </a>
                <a href={socials.linkedin.url} target="_blank" rel="noopener noreferrer" className="group flex-1 md:flex-none flex justify-center items-center p-2 hover:text-blue-500 hover:bg-hover-tint transition-colors duration-200 rounded">
                  <HugeiconsIcon icon={Linkedin02Icon} size={20} />
                  <span className="overflow-hidden max-w-0 group-hover:max-w-24 group-hover:ml-1.5 text-xs font-medium whitespace-nowrap [font-family:var(--font-helvetica)] transition-all duration-500 ease-in-out">LinkedIn</span>
                </a>
                <a href={socials.twitter.url} target="_blank" rel="noopener noreferrer" className="group flex-1 md:flex-none flex justify-center items-center p-2 hover:text-text-primary hover:bg-hover-tint transition-colors duration-200 rounded">
                  <HugeiconsIcon icon={NewTwitterIcon} size={20} />
                  <span className="overflow-hidden max-w-0 group-hover:max-w-24 group-hover:ml-1.5 text-xs font-medium whitespace-nowrap [font-family:var(--font-helvetica)] transition-all duration-500 ease-in-out">X</span>
                </a>
                <a href={socials.youtube.url} target="_blank" rel="noopener noreferrer" className="group flex-1 md:flex-none flex justify-center items-center p-2 hover:text-red-500 hover:bg-hover-tint transition-colors duration-200 rounded">
                  <HugeiconsIcon icon={YoutubeIcon} size={20} />
                  <span className="overflow-hidden max-w-0 group-hover:max-w-24 group-hover:ml-1.5 text-xs font-medium whitespace-nowrap [font-family:var(--font-helvetica)] transition-all duration-500 ease-in-out">YouTube</span>
                </a>
                <a href="https://medium.com/@rikk4335" target="_blank" rel="noopener noreferrer" className="group flex-1 md:flex-none flex justify-center items-center p-2 hover:text-text-primary hover:bg-hover-tint transition-colors duration-200 rounded">
                  <HugeiconsIcon icon={MediumIcon} size={20} />
                  <span className="overflow-hidden max-w-0 group-hover:max-w-24 group-hover:ml-1.5 text-xs font-medium whitespace-nowrap [font-family:var(--font-helvetica)] transition-all duration-500 ease-in-out">Medium</span>
                </a>
                <span className="group flex-1 md:flex-none flex justify-center items-center p-2 hover:text-indigo-400 hover:bg-hover-tint transition-colors duration-200 cursor-default rounded">
                  <HugeiconsIcon icon={DiscordIcon} size={20} />
                  <span className="overflow-hidden max-w-0 group-hover:max-w-24 group-hover:ml-1.5 text-xs font-medium whitespace-nowrap [font-family:var(--font-helvetica)] transition-all duration-500 ease-in-out">subham_c9</span>
                </span>
                <a href={`mailto:${email}`} className="group flex-1 md:flex-none flex justify-center items-center p-2 hover:text-red-400 hover:bg-hover-tint transition-colors duration-200 rounded-r-md rounded">
                  <HugeiconsIcon icon={Mail01Icon} size={20} />
                  <span className="overflow-hidden max-w-0 group-hover:max-w-24 group-hover:ml-1.5 text-xs font-medium whitespace-nowrap [font-family:var(--font-helvetica)] transition-all duration-500 ease-in-out rounded">Mail</span>
                </a>
              </div>
            </div>
            {/* Social Links */}
            <ScrollRevealText
              as="p"
              className="text-base md:text-lg mb-8 max-w-4xl leading-relaxed mt-0 md:mt-4 font-medium text-text-secondary"
            >
              A{" "}
              <span className="inline-flex items-baseline gap-1 text-text-primary font-medium">
                <HugeiconsIcon icon={CodeIcon} size={16} className="self-center align-middle" />
                full-stack developer
              </span>{" "}
              living in{" "}
              <span className="inline-flex items-baseline gap-1 text-text-primary font-medium">
                <HugeiconsIcon icon={Globe02Icon} size={16} className="self-center align-middle" />
                Kolkata, India
              </span>
              . Open to{" "}
              <span className="text-text-primary font-medium">
                full-time opportunities
              </span>{" "}
              and{" "}
              <span className="text-text-primary font-medium">
                freelance projects
              </span>
              . This website serves as a collection of my work across{" "}
              <span className="inline-flex items-baseline gap-1 text-text-primary font-medium">
                full-stack development
                <HugeiconsIcon icon={DatabaseIcon} size={16} className="self-center align-middle" />
              </span>
              ,{" "}
              <span className="inline-flex items-baseline gap-1 text-text-primary font-medium">
                systems programming
                <HugeiconsIcon icon={CpuIcon} size={16} className="self-center align-middle" />
              </span>{" "}
              and{" "}
              <span className="inline-flex items-baseline gap-1 text-text-primary font-medium">
                local AI tools
                <HugeiconsIcon icon={AiIdeaIcon} size={16} className="self-center align-middle" />
              </span>
              .
            </ScrollRevealText>
            <div className="mb-8 grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
              <div className="min-w-0 flex rounded-md border-2 border-border-primary bg-bg-elevated/30 px-3 py-2 items-center shadow-[inset_0px_0px_2px_2px_rgba(0,0,0,0.08)] dark:shadow-[inset_0px_0px_4px_4px_rgba(255,255,255,0.04)] ">
                <DevPresence />
              </div>
              <SpotifyNowPlaying className="min-w-0 w-full rounded-md border-2 border-border-primary bg-bg-elevated/30 px-3 py-2 flex items-center md:w-auto md:max-w-[520px]  shadow-[inset_0px_0px_2px_2px_rgba(0,0,0,0.08)] dark:shadow-[inset_0px_0px_4px_4px_rgba(255,255,255,0.04)]" />
            </div>
          </div>

          <div className="">

            {/* GitHub Calendar - Only render after mount and theme is resolved to prevent hydration mismatch */}
            <div className="w-full p-4 rounded-md bg-accent border-2 border-border-primary shadow-[inset_0px_0px_2px_2px_rgba(0,0,0,0.08)] dark:shadow-[inset_0px_0px_4px_4px_rgba(255,255,255,0.04)]">
              {mounted && resolvedTheme ? (
                <>
                  <GithubCalendar username="Subham12R" colorSchema="gray" />
                </>
              ) : (
                <div className="py-4 space-y-3 animate-pulse">
                  {/* Calendar grid skeleton */}
                  <div className="flex gap-[5px] sm:gap-[3px] overflow-x-auto">
                    {Array.from({ length: 53 }).map((_, week) => (
                      <div key={week} className="flex flex-col gap-[5px] sm:gap-[2px] flex-shrink-0 w-[22px] sm:w-[14px]">
                        <div className="h-3 bg-bg-elevated rounded w-full" />
                        {Array.from({ length: 7 }).map((_, day) => (
                          <div
                            key={day}
                            className="w-full aspect-square bg-bg-elevated rounded flex-shrink-0"
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
