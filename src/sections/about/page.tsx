"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollRevealText } from "@/components/ui/ScrollRevealText";
import { siteConfig } from "@/data";
import profileImg from "../../../public/images/profile/pfp.jpeg";
import Experience from "@/components/cards/experience";
import Hobbies from "@/components/cards/hobbies";
import Achievements from "@/components/cards/achievements";
import Activities from "@/components/cards/activities";
import { GithubIcon } from "@/components/ui/github";
import { LinkedinIcon } from "@/components/ui/linkedin";
import { MailCheckIcon } from "@/components/ui/mail-check";
import { TwitterIcon } from "@/components/ui/twitter";
import { YoutubeIcon } from "@/components/ui/youtube";
import { DiscordIcon } from "@/components/ui/discord";

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const section = siteConfig.sections.about;
  const { socials, email } = siteConfig;
  const imageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imageRef.current || !containerRef.current) return;

    // Start from -10% and move to +10% for smooth parallax
    gsap.fromTo(
      imageRef.current,
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
      },
    );

    if (statsRef.current) {
      const statItems = statsRef.current.querySelectorAll("[data-about-item]");

      if (statItems.length) {
        gsap.fromTo(
          statItems,
          { opacity: 0, y: 36, scale: 0.98, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.85,
            ease: "power3.out",
            stagger: 0.16,
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 82%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id={section.id}
      className="w-full flex justify-center items-center text-text-primary px-4 lg:px-0 mb-12"
    >
      <div className="max-w-4xl w-full">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-4xl font-medium text-text-primary text-start">
            {section.title}.
          </h1>
        </div>

        {/* SPLIT LAYOUT */}
        <div className="gap-8 md:gap-12">



          <div className="md:col-span-3 flex flex-col justify-start items-start space-y-6">
            <div className="text-lg md:text-xl leading-relaxed">
              <ScrollRevealText as="p" className="mb-6">
                I&apos;m {siteConfig.name}, a B.Tech student and developer from{" "}
                {siteConfig.location.split(",")[0]}.
              </ScrollRevealText>
              <ScrollRevealText as="p" className="mb-6">
                I build full-stack applications with modern web technologies,
                while constantly exploring areas like databases, system design,
                and developer tooling.
              </ScrollRevealText>
              <ScrollRevealText as="p">
                I enjoy turning ideas into practical solutions—whether it&apos;s
                experimenting with visual tools, solving algorithmic problems,
                or contributing to larger technical projects.
              </ScrollRevealText>
            </div>

            {/* Links Section */}
            <div className="pt-6 mt-2">
              <div className="flex flex-wrap gap-x-2 gap-y-3 font-mono text-sm tracking-wider uppercase">
                <a
                  href={socials.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-1 text-text-muted hover:text-text-primary transition-colors duration-200"
                >
                  <GithubIcon
                    size={24}
                    className="text-text-muted group-hover:text-text-primary transition-colors duration-200"
                  />
                </a>

                <a
                  href={socials.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-1 text-text-muted hover:text-blue-400 transition-colors duration-200"
                >
                  <LinkedinIcon
                    size={24}
                    className="text-text-muted group-hover:text-blue-400 transition-colors duration-200"
                  />
                </a>

                <a
                  href={socials.twitter.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-1 text-text-muted hover:text-blue-400 transition-colors duration-200"
                >
                  <TwitterIcon
                    size={24}
                    className="text-text-muted group-hover:text-blue-400 transition-colors duration-200"
                  />
                </a>

                <a
                  href={socials.youtube.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-1 text-text-muted hover:text-red-400 transition-colors duration-200"
                >
                  <YoutubeIcon
                    size={24}
                    className="text-text-muted group-hover:text-red-400 transition-colors duration-200"
                  />
                </a>

                <span
                  title={socials.discord.display}
                  className="group flex items-center space-x-1 text-text-muted hover:text-indigo-400 transition-colors duration-200"
                >
                  <DiscordIcon
                    size={24}
                    className="text-text-muted group-hover:text-indigo-400 transition-colors duration-200"
                  />
                </span>

                <a
                  href={`mailto:${email}`}
                  className="group flex items-center space-x-1 text-text-muted hover:text-red-400 transition-colors duration-200"
                >
                  <MailCheckIcon
                    size={24}
                    className="text-text-muted group-hover:text-red-400 transition-colors duration-200"
                  />
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
        {/**Stats Card **/}
        <div ref={statsRef} className="pt-10 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <Experience />
            <Hobbies />
          </div>
          <div className="grid grid-cols-1 gap-4 pt-4 w-full">
            <Achievements />
            <Activities />
          </div>
        </div>
      </div>
    </section>
  );
};
