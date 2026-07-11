"use client";

import Image from "next/image";
import React, { useState } from "react";
import { siteConfig } from "@/data";
import profileIcon from "../../../public/images/profile/profile.png";
import DevPresence from "@/components/ui/DevPresence";
import SpotifyNowPlaying from "@/components/ui/SpotifyNowPlaying";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import bannerWhite from "../../../public/images/profile/banner_white.png"
import bannerDark from "../../../public/images/profile/banner_dark.png"
export const Hero = () => {
  const [copied, setCopied] = useState(false);
  const [copiedDiscord, setCopiedDiscord] = useState(false);

  const { name, email, socials, resume } = siteConfig;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    const audio = new Audio("/click.wav");
    audio.play().catch(() => {});
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyDiscord = () => {
    navigator.clipboard.writeText(socials.discord.username);
    setCopiedDiscord(true);
    const audio = new Audio("/click.wav");
    audio.play().catch(() => {});
    setTimeout(() => setCopiedDiscord(false), 2000);
  };

  const playClickSound = () => {
    const audio = new Audio("/click.wav");
    audio.play().catch(() => {});
  };

  return (
    <section
      id="home"
      className="w-full flex justify-center items-center px-4 pt-5 pb-6 mb-6"
    >
      <div className="max-w-2xl w-full flex flex-col items-start text-start">
        {/* Banner rendered outside ScrollReveal's stagger so it doesn't replay its entrance animation every time this section remounts (e.g. navigating back to Home) */}
        <div className="relative w-full h-48 sm:h-64 overflow-hidden rounded-md shadow-[inset_0px_0px_2px_2px_rgba(0,0,0,0.08)] dark:shadow-[inset_0px_0px_4px_4px_rgba(255,255,255,0.04)]">
          <Image
            src={bannerWhite}
            alt="banner white"
            fill
            className="object-cover dark:opacity-0 transition-opacity duration-300"
            priority
          />
          <Image
            src={bannerDark}
            alt="banner dark"
            fill
            className="object-cover opacity-0 dark:opacity-100 transition-opacity duration-300"
            priority
          />
        </div>

        <ScrollReveal stagger={0.08} start="top 100%">
        {/* Profile Info Wrapper */}
        <div className="flex flex-row items-center gap-5 mt-6 mb-3 w-full">
          {/* Avatar */}
          <div className="relative overflow-hidden rounded-md shrink-0">
          <Image
            src={profileIcon}
            alt={name}
            width={88}
            height={88}
            className="h-[88px] w-[88px] aspect-square object-cover bg-amber-400 dark:bg-blue-600  "
            priority
          />
          </div>
          <div className="flex flex-col items-start justify-baseline gap-0.5 min-w-0 w-full mt-auto">
          {/* Name */}
          <h1 className="text-3xl font-light tracking-tight text-text-primary font-instrumentserif truncate w-full">
            {name}
          </h1>
          <p className="text-[14px] text-text-secondary/70 font-light font-instrumentsans tracking-tight">
            21,  Software Engineer,  IND
          </p>
        </div>
      </div>

        {/* Social Icons Row — email copy button first */}
        <div className="flex flex-wrap items-center gap-2 mt-2 mb-6 text-text-secondary/40">
          {/* Email copy inline */}
          <button
            onClick={handleCopyEmail}
            className="group relative inline-flex items-center gap-1 text-[14px] font-normal text-text-secondary/60 hover:text-text-primary transition-colors duration-200 cursor-pointer"
          >
            <span className="underline decoration-text-secondary/30 underline-offset-4">{email}</span>
            {copied ? (
              <span className="text-[10px] text-green-500 font-medium ml-1">done</span>
            ) : (
              <svg
                viewBox="0 0 24 24"
                width="12"
                height="12"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-text-secondary/40 group-hover:text-text-primary transition-colors shrink-0"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            )}
            <span className="absolute font-semibold top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-0.5 bg-white text-slate-800 text-xs rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-slate-200 z-50">
              Copy Email
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-px border-4 border-transparent border-b-white" />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-[1px] border-[5px] border-transparent border-b-slate-200 -z-10" />
            </span>
          </button>

          {/* divider */}
          <span className="text-text-secondary/20 select-none">|</span>
          {/* GitHub */}
          <a
            href={socials.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative hover:text-text-primary transition-colors duration-200"
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            {/* Cloud tooltip */}
            <span className="absolute font-semibold top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-0.5 bg-white text-slate-800 text-xs rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-slate-200 z-50">
              GitHub
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-px border-4 border-transparent border-b-white" />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-[1px] border-[5px] border-transparent border-b-slate-200 -z-10" />
            </span>
          </a>

          {/* Mail */}
          <a
            href={`mailto:${email}`}
            className="group relative hover:text-text-primary transition-colors duration-200"
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            {/* Cloud tooltip */}
            <span className="absolute font-semibold top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-0.5 bg-white text-slate-800 text-xs rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-slate-200 z-50">
              Email
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-px border-4 border-transparent border-b-white" />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-[1px] border-[5px] border-transparent border-b-slate-200 -z-10" />
            </span>
          </a>

          {/* Discord */}
          <button
            onClick={handleCopyDiscord}
            className="group relative hover:text-text-primary transition-colors duration-200 cursor-pointer flex items-center"
          >
            {copiedDiscord ? (
              <span className="text-[10px] text-green-500 absolute -top-5 left-1/2 -translate-x-1/2 font-medium whitespace-nowrap bg-bg-primary px-1 border border-border-primary rounded z-50">
                Copied!
              </span>
            ) : null}
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="currentColor"
            >
              <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 01-1.873-.894.077.077 0 01-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 01.077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 01.078.009c.12.099.246.195.373.289a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.894.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
            </svg>
            {/* Cloud tooltip */}
            <span className="absolute font-semibold top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-0.5 bg-white text-slate-800 text-xs rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-slate-200 z-50">
              Discord: subham_c9
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-px border-4 border-transparent border-b-white" />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-[1px] border-[5px] border-transparent border-b-slate-200 -z-10" />
            </span>
          </button>

          {/* Instagram */}
          <a
            href={socials.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative hover:text-text-primary transition-colors duration-200"
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            {/* Cloud tooltip */}
            <span className="absolute font-semibold top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-0.5 bg-white text-slate-800 text-xs rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-slate-200 z-50">
              Instagram
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-px border-4 border-transparent border-b-white" />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-[1px] border-[5px] border-transparent border-b-slate-200 -z-10" />
            </span>
          </a>

          {/* YouTube */}
          <a
            href={socials.youtube.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative hover:text-text-primary transition-colors duration-200"
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
              <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
            </svg>
            {/* Cloud tooltip */}
            <span className="absolute font-semibold top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-0.5 bg-white text-slate-800 text-xs rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-slate-200 z-50">
              YouTube
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-px border-4 border-transparent border-b-white" />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-[1px] border-[5px] border-transparent border-b-slate-200 -z-10" />
            </span>
          </a>

          {/* X */}
          <a
            href={socials.twitter.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative hover:text-text-primary transition-colors duration-200"
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="currentColor"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            {/* Cloud tooltip */}
            <span className="absolute font-semibold top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-0.5 bg-white text-slate-800 text-xs rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-slate-200 z-50">
              X
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-px border-4 border-transparent border-b-white" />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-[1px] border-[5px] border-transparent border-b-slate-200 -z-10" />
            </span>
          </a>

          {/* LinkedIn */}
          <a
            href={socials.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative hover:text-text-primary transition-colors duration-200"
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            {/* Cloud tooltip */}
            <span className="absolute font-semibold top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-0.5 bg-white text-slate-800 text-xs rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-slate-200 z-50">
              LinkedIn
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-px border-4 border-transparent border-b-white" />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-[1px] border-[5px] border-transparent border-b-slate-200 -z-10" />
            </span>
          </a>

          {/* Medium */}
          <a
            href="https://medium.com/@rikk4335"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative hover:text-text-primary transition-colors duration-200"
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="currentColor"
            >
              <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM21 12c0 3.54-1.51 6.42-3.38 6.42S14.25 15.54 14.25 12s1.51-6.42 3.37-6.42S21 8.46 21 12zm3 0c0 3.24-.53 5.87-1.18 5.87S21.64 15.24 21.64 12s.53-5.87 1.18-5.87S24 8.76 24 12z" />
            </svg>
            {/* Cloud tooltip */}
            <span className="absolute font-semibold top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-0.5 bg-white text-slate-800 text-xs rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-slate-200 z-50">
              Medium
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-px border-4 border-transparent border-b-white" />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-[1px] border-[5px] border-transparent border-b-slate-200 -z-10" />
            </span>
          </a>
        </div>

        {/* Paragraph 1 */}
        <p className="text-text-secondary/60 leading-relaxed text-[16px] font-instrumentsans tracking-tighter max-w-2xl font-light">
          <a
            href="/projects"
            className="underline text-text-primary hover:text-blue-500 transition-colors font-light tracking-tight decoration-text-primary/30 underline-offset-4 font-instrumentsans  "
          >
            Full Stack Dev
          </a>{" "}
          - loves to create, break and fix and ship high quality products.
          Everyday is a new learning experience, I embrace it with passion..
        </p>

        {/* Paragraph 2 */}
        <p className="text-text-primary/60 leading-relaxed text-[16px] font-instrumentsans tracking-tight  decoration-text-primary/30 max-w-2xl font-regular mt-4">
          Wanna know more ? Get my{" "}
          <a
            href={resume.path}
            download={resume.filename}
            onClick={playClickSound}
            className="underline text-text-primary hover:text-blue-500 transition-colors font-light decoration-text-primary/30 underline-offset-4"
          >
            resume
          </a>{" "}
          or{" "}
          <button
            data-cal-namespace="15min"
            data-cal-link="subham12r/15min"
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
            onClick={playClickSound}
            className="underline text-text-primary hover:text-blue-500 transition-colors font-light decoration-text-primary/30 underline-offset-4 cursor-pointer"
          >
            book a quick call
          </button>{" "}
          with me..
        </p>

        {/* Spotify / Coding Presence Row — sticky bottom */}
        <div className="z-10 w-full grid grid-cols-1 sm:grid-cols-2 items-center gap-4 mt-6 pt-3 pb-3 bg-bg-primary/80 backdrop-blur-sm">
          <SpotifyNowPlaying className="" />
          <DevPresence  />
        </div>
      </ScrollReveal>
      </div>
    </section>
  );
};
