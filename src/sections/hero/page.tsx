"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { GitHubCalendar } from "react-github-calendar";
import { Tooltip } from "react-tooltip";
import { Map, MapPin, XCircle } from "lucide-react";

import { MailCheckIcon } from "@/components/ui/mail-check";
import { GithubIcon } from "@/components/ui/github";
import { LinkedinIcon } from "@/components/ui/linkedin";
import { TwitterIcon } from "@/components/ui/twitter";
import { YoutubeIcon } from "@/components/ui/youtube";
import { DiscordIcon } from "@/components/ui/discord";
import { DownloadIcon } from "@/components/ui/download";
import { ScrollRevealText } from "@/components/ui/ScrollRevealText";
import { siteConfig } from "@/data";
import { useTheme } from "next-themes";

import profileBanner from "../../../public/images/profile/banner.gif";
import profileIcon from "../../../public/images/profile/pfp.jpeg";
import { XIcon } from "@/components/ui/x";
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
    const audio = new Audio("/click.wav");
    audio.play();
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
        <div className="max-h-full  overflow-hidden flex justify-center flex-col items-center">
          <Image
            src={profileBanner}
            alt="Banner"
            width={1920}
            height={1080}
            className="w-full h-80 items-center object-cover"
            priority
          />
        </div>

        <div className="w-full py-5 px-2 md:px-0">
          {/* Hero Content */}
          <div className="flex flex-col justify-center items-start text-start mt-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full ml-1 mb-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-end justify-center ">
                <Image
                  src={profileIcon}
                  alt={name}
                  width={100}
                  height={100}
                  className="relative z-20 -mt-10 md:-mt-20 mb-4 md:mb-0 md:mr-4 h-20 w-20 aspect-square overflow-hidden object-cover border-2  rounded-xl outline-2 outline-offset-2 outline-border-primary"
                  priority
                />
                <div>
                  <div className="h-6 overflow-hidden">
                    <span
                      ref={textRef}
                      className="block text-text-secondary font-medium"
                    >
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
                      onClick={handlePlay}
                    >
                      <DownloadIcon className="text-white" size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <ScrollRevealText
              as="p"
              className="text-base md:text-lg mb-8 max-w-4xl leading-relaxed"
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

            <div className="mb-8 grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-[minmax(0,1fr)_auto_auto]">
              <div className="min-w-0 rounded-md border border-border-primary bg-bg-elevated/30 px-3 py-2 flex items-center md:rounded-r-none">
                <DevPresence />
              </div>
              <SpotifyNowPlaying className="min-w-0 w-full rounded-md border border-border-primary bg-bg-elevated/30 px-3 py-2 flex items-center md:w-auto md:max-w-[520px] " />
              
            </div>
          </div>

          {/* Social Links */}
          <div className=" gap-2 lg:gap-1 mb-10 w-full text-zinc-400">
            {/* Social Icons Grid */}
            <div className="flex flex-wrap  w-full">
              <a
                href={socials.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-9 hover:text-text-primary transition-colors p-2  "
                title="GitHub"
              >
                <GithubIcon size={24} />
              </a>
              <a
                href={socials.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-9 hover:text-blue-500 transition-colors p-2 "
                title="LinkedIn"
              >
                <LinkedinIcon size={24} />
              </a>
              <a
                href={socials.twitter.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-9 hover:text-blue-400 transition-colors p-2 "
                title="Twitter"
              >
                <TwitterIcon size={24} />
              </a>
              <a
                href={socials.youtube.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-9 hover:text-red-500 transition-colors p-2 "
                title="YouTube"
              >
                <YoutubeIcon size={24} />
              </a>
              <span
                className="inline-flex items-center gap-2 h-9 hover:text-indigo-400 transition-colors cursor-default p-2 "
                title={socials.discord.display}
              >
                <DiscordIcon size={24} />
              </span>
            </div>
          </div>

          {/* GitHub Calendar - Only render after mount and theme is resolved to prevent hydration mismatch */}
          <div className="w-full  mb-12 px-4 py-2  rounded-xl border border-border-primary bg-bg-elevated/30 text-text-primary overflow-x-auto min-h-[180px]">
            {mounted && resolvedTheme ? (
              <>
                <GitHubCalendar
                  username={socials.github.username}
                  blockSize={blockSize}
                  blockMargin={2}
                  fontSize={14}
                  year={2026}
                  blockRadius={2}
                  showWeekdayLabels={false}
                  colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
                  theme={{
                    dark: [
                      "#1f2937",
                      "#374151",
                      "#4b5563",
                      "#9ca3af",
                      "#e5e7eb",
                    ],
                    light: [
                      "#ebedf0",
                      "#9be9a8",
                      "#40c463",
                      "#30a14e",
                      "#216e39",
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
                  className="!px-3 !py-1.5 !rounded-md !text-sm !font-medium !bg-white !text-black !shadow-md !border !border-black/10"
                  delayHide={50}
                />
              </>
            ) : (
              <div className="py-4 space-y-3 animate-pulse">
                {/* Month labels skeleton */}
                <div className="flex gap-3 px-2 mb-2">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="h-3 w-8 bg-bg-elevated rounded" />
                  ))}
                </div>

                {/* Calendar grid skeleton */}
                <div className="flex gap-1">
                  {Array.from({ length: 53 }).map((_, week) => (
                    <div key={week} className="flex flex-col gap-1">
                      {Array.from({ length: 7 }).map((_, day) => (
                        <div
                          key={day}
                          className="w-[10px] h-[10px] bg-bg-elevated rounded"
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
    </section>
  );
};
