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
} from "@hugeicons/core-free-icons";
import { ScrollRevealText } from "@/components/ui/ScrollRevealText";
import { siteConfig } from "@/data";
import { useTheme } from "next-themes";

import profileBanner from "../../../public/images/profile/banner.gif";
import profileIcon from "../../../public/images/profile/pfp.jpeg";
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
    <section id="home" className="w-full flex justify-center items-center">
      <div className="max-w-4xl w-full flex flex-col h-full">
        {/* Banner */}
        <div className="max-h-full overflow-hidden flex justify-center flex-col items-center">
          <Image
            src={profileBanner}
            alt="Banner"
            width={1920}
            height={1080}
            className="w-full h-64 items-center object-cover"
            priority
            unoptimized
          />
        </div>

        <div className="w-full py-5 px-2 md:px-0 ">
          {/* Hero Content */}
          <div className="flex flex-col justify-center items-end text-start mt-8 ">
            <div className="flex flex-col md:flex-row md:justify-between items-start w-full mb-8">
              <div className="flex flex-row items-end justify-center gap-4">
                <Image
                  src={profileIcon}
                  alt={name}
                  width={100}
                  height={100}
                  className="relative z-20  h-20 w-20 aspect-square overflow-hidden object-cover border-2  rounded-xl outline-2 outline-offset-2 outline-border-primary shadow-[inset_0px_0px_2px_2px_rgba(0,0,0,0.08)] dark:shadow-[inset_0px_0px_4px_4px_rgba(255,255,255,0.04)]"
                  priority
                />
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
                      className="w-5 h-5 md:w-6 md:h-6 shrink-0 transition-transform duration-300 group-hover/badge:rotate-12 items-end mt-2"
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
            <div className="w-full flex items-start gap-2 mb-8 flex-wrap">
                <a
                  href={resume.path}
                  download={resume.filename}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 text-white px-4 py-1.5 text-sm font-medium hover:bg-blue-500 active:scale-95 transition-all duration-200 border-2 border-blue-400/30 shadow-[inset_0px_0px_2px_2px_rgba(0,0,0,0.08)]"
                  onClick={handlePlay}
                >
                  <DownloadIcon size={16} />
                  Resume
                </a>
                <button
                  data-cal-namespace="15min"
                  data-cal-link="subham12r/15min"
                  data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                  className="group cursor-pointer inline-flex items-center justify-center gap-2 rounded-md bg-text-primary text-text-inverse px-4 py-1.5 text-sm font-medium hover:opacity-90 active:scale-95 transition-all duration-200 shadow-[inset_0px_0px_2px_2px_rgba(0,0,0,0.08)] dark:shadow-[inset_0px_0px_4px_4px_rgba(255,255,255,0.04)] border-2 border-border-primary hover:border-border-secondary"
                >
                  Book a Call
                  <Phone size={16} className="group-hover:rotate-2 transition-transform duration-200" />
                </button>

                <div className="md:ml-auto inline-flex items-center rounded-md border-2 border-border-primary bg-bg-elevated/30 shadow-[inset_0px_0px_2px_2px_rgba(0,0,0,0.08)] dark:shadow-[inset_0px_0px_4px_4px_rgba(255,255,255,0.04)] text-zinc-400 divide-x divide-border-primary">
                  <a href={socials.github.url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center p-2.5 hover:text-text-primary hover:bg-hover-tint transition-colors duration-200 rounded-l-md">
                    <HugeiconsIcon icon={GithubIcon} size={20} />
                    <span className="overflow-hidden max-w-0 group-hover:max-w-24 group-hover:ml-1.5 text-xs font-medium whitespace-nowrap [font-family:var(--font-helvetica)] transition-all duration-500 ease-in-out">GitHub</span>
                  </a>
                  <a href={socials.linkedin.url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center p-2.5 hover:text-blue-500 hover:bg-hover-tint transition-colors duration-200">
                    <HugeiconsIcon icon={Linkedin02Icon} size={20} />
                    <span className="overflow-hidden max-w-0 group-hover:max-w-24 group-hover:ml-1.5 text-xs font-medium whitespace-nowrap [font-family:var(--font-helvetica)] transition-all duration-500 ease-in-out">LinkedIn</span>
                  </a>
                  <a href={socials.twitter.url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center p-2.5 hover:text-text-primary hover:bg-hover-tint transition-colors duration-200">
                    <HugeiconsIcon icon={NewTwitterIcon} size={20} />
                    <span className="overflow-hidden max-w-0 group-hover:max-w-24 group-hover:ml-1.5 text-xs font-medium whitespace-nowrap [font-family:var(--font-helvetica)] transition-all duration-500 ease-in-out">X</span>
                  </a>
                  <a href={socials.youtube.url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center p-2.5 hover:text-red-500 hover:bg-hover-tint transition-colors duration-200">
                    <HugeiconsIcon icon={YoutubeIcon} size={20} />
                    <span className="overflow-hidden max-w-0 group-hover:max-w-24 group-hover:ml-1.5 text-xs font-medium whitespace-nowrap [font-family:var(--font-helvetica)] transition-all duration-500 ease-in-out">YouTube</span>
                  </a>
                  <a href="https://medium.com/@rikk4335" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center p-2.5 hover:text-text-primary hover:bg-hover-tint transition-colors duration-200">
                    <HugeiconsIcon icon={MediumIcon} size={20} />
                    <span className="overflow-hidden max-w-0 group-hover:max-w-24 group-hover:ml-1.5 text-xs font-medium whitespace-nowrap [font-family:var(--font-helvetica)] transition-all duration-500 ease-in-out">Medium</span>
                  </a>
                  <span className="group inline-flex items-center p-2.5 hover:text-indigo-400 hover:bg-hover-tint transition-colors duration-200 cursor-default">
                    <HugeiconsIcon icon={DiscordIcon} size={20} />
                    <span className="overflow-hidden max-w-0 group-hover:max-w-24 group-hover:ml-1.5 text-xs font-medium whitespace-nowrap [font-family:var(--font-helvetica)] transition-all duration-500 ease-in-out">subham_c9</span>
                  </span>
                  <a href={`mailto:${email}`} className="group inline-flex items-center p-2.5 hover:text-red-400 hover:bg-hover-tint transition-colors duration-200 rounded-r-md">
                    <HugeiconsIcon icon={Mail01Icon} size={20} />
                    <span className="overflow-hidden max-w-0 group-hover:max-w-24 group-hover:ml-1.5 text-xs font-medium whitespace-nowrap [font-family:var(--font-helvetica)] transition-all duration-500 ease-in-out">Mail</span>
                  </a>
                </div>
            </div>
            {/* Social Links */}
            <ScrollRevealText
              as="p"
              className="text-base md:text-lg mb-8 max-w-4xl leading-loose"
            >
              {bio.long.split("scalable")[0]}
              <strong>scalable</strong>
              {bio.long.split("scalable")[1].split("architecture")[0]}
              <strong>
                architecture, thoughtful design, and real world impact
              </strong>
              .{bio.long.split("real world impact")[1]}
              <span className="inline-flex items-center gap-2 h-9 w-full text-text-primary">
                <Map size={20} className="text-base text-zinc-500" />
                <span>{location}</span>
              </span>
            </ScrollRevealText>
            <div className="mb-8 grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
              <div className="min-w-0 flex rounded-md border-2 border-border-primary bg-bg-elevated/30 px-3 py-2 items-center shadow-[inset_0px_0px_2px_2px_rgba(0,0,0,0.08)] dark:shadow-[inset_0px_0px_4px_4px_rgba(255,255,255,0.04)] ">
                <DevPresence />
              </div>
              <SpotifyNowPlaying className="min-w-0 w-full rounded-md border-2 border-border-primary bg-bg-elevated/30 px-3 py-2 flex items-center md:w-auto md:max-w-[520px]  shadow-[inset_0px_0px_2px_2px_rgba(0,0,0,0.08)] dark:shadow-[inset_0px_0px_4px_4px_rgba(255,255,255,0.04)]" />
            </div>
          </div>

       <div className="px-2 lg:px-0">

          {/* GitHub Calendar - Only render after mount and theme is resolved to prevent hydration mismatch */}
          <div className="w-full p-4 rounded-md bg-accent border-2 border-border-primary shadow-[inset_0px_0px_2px_2px_rgba(0,0,0,0.08)] dark:shadow-[inset_0px_0px_4px_4px_rgba(255,255,255,0.04)]">
            {mounted && resolvedTheme ? (
              <>
                <GithubCalendar username="Subham12R" colorSchema="gray"/>
              </>
            ) : (
              <div className="py-4 space-y-3 animate-pulse">
                {/* Month labels skeleton */}
                <div className="flex gap-3 px-2 md:px-0 mb-2">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="h-3 w-8 bg-bg-elevated rounded" />
                  ))}
                </div>

                {/* Calendar grid skeleton */}
                <div className="flex gap-[4px] sm:gap-[3px] overflow-x-auto">
                  {Array.from({ length: 53 }).map((_, week) => (
                    <div key={week} className="flex flex-col gap-[4px] sm:gap-[3px] flex-shrink-0">
                      {Array.from({ length: 7 }).map((_, day) => (
                        <div
                          key={day}
                          className="w-[18px] h-[18px] sm:w-[14px] sm:h-[14px] bg-bg-elevated rounded flex-shrink-0"
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
