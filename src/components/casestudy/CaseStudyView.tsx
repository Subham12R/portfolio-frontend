"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  BrowserIcon,
  GithubIcon,
  BookOpen01Icon,
  NpmIcon,
} from "@hugeicons/core-free-icons";
import { VideoHoverBanner } from "@/components/projects/VideoHoverBanner";
import { MermaidDiagram } from "@/components/casestudy/MermaidDiagram";
import { CaseStudyText } from "@/components/casestudy/CaseStudyText";
import {
  CaseStudyScrollNav,
  type CaseStudySection,
} from "@/components/casestudy/CaseStudyScrollNav";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { CaseStudy, CaseStudyLink } from "@/data/case-study";

/** Matches main page body: Instrument Sans + token colors */
const bulletItemClass =
  "relative pl-5 text-[15px] sm:text-[16px] font-instrumentsans font-light tracking-tight text-text-secondary/80 leading-relaxed before:absolute before:left-0 before:top-[0.7em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-text-muted";

/** Matches main page section titles */
const sectionHeadingClass =
  "text-2xl sm:text-3xl font-light tracking-tight text-text-primary font-instrumentserif";

const CASE_STUDY_SECTIONS: CaseStudySection[] = [
  { id: "cs-technologies", label: "Tech" },
  { id: "cs-overview", label: "Overview" },
  { id: "cs-links", label: "Links" },
  { id: "cs-details", label: "Details" },
  { id: "cs-metrics", label: "Metrics" },
  { id: "cs-architecture", label: "Architecture" },
  { id: "cs-gallery", label: "Gallery" },
  { id: "cs-problem", label: "Problem" },
  { id: "cs-challenges", label: "Challenges" },
  { id: "cs-learnings", label: "Learnings" },
  { id: "cs-next", label: "Next" },
];

const pillClass =
  "inline-flex items-center gap-2 bg-bg-elevated text-text-secondary rounded-md px-4 py-1 text-sm font-instrumentsans font-medium border border-border-primary shadow-[inset_0px_0px_2px_2px_rgba(0,0,0,0.08)] dark:shadow-[inset_0px_0px_4px_4px_rgba(255,255,255,0.04)]";

function LinkIcon({ type }: { type: CaseStudyLink["type"] }) {
  const icon =
    type === "github"
      ? GithubIcon
      : type === "live"
        ? BrowserIcon
        : type === "docs"
          ? BookOpen01Icon
          : type === "npm"
            ? NpmIcon
            : BrowserIcon;

  return <HugeiconsIcon icon={icon} size={16} />;
}

export function CaseStudyView({ caseStudy }: { caseStudy: CaseStudy }) {
  const sections = CASE_STUDY_SECTIONS.filter((s) => {
    if (s.id === "cs-metrics" && caseStudy.metrics.length === 0) return false;
    if (s.id === "cs-gallery" && caseStudy.images.length === 0) return false;
    return true;
  });

  return (
    <div className="min-h-screen max-w-2xl mx-auto pb-36 font-instrumentsans">
      {/* Sticky breadcrumbs — outside ScrollReveal so transform doesn't break sticky */}
      <nav
        aria-label="Breadcrumb"
        className="sticky top-14 z-30 w-full bg-bg-primary/95 backdrop-blur-md border-b border-border-primary px-4 lg:px-0 py-2.5"
      >
        <ol className="flex items-center gap-1 flex-wrap text-sm font-instrumentsans text-text-muted">
          <li>
            <Link
              href="/"
              className="hover:text-text-primary transition-colors"
            >
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href="/projects"
              className="hover:text-text-primary transition-colors"
            >
              Projects
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-text-secondary truncate max-w-[12rem] sm:max-w-none">
            {caseStudy.title}
          </li>
        </ol>
      </nav>

      <div className="px-4 lg:px-0 pt-8">
        {/* Header + banner */}
        <ScrollReveal stagger={0.08} className="w-full flex flex-col">
          <div className="w-full mb-6 flex flex-col items-start justify-start">
            <h1 className="text-4xl font-light tracking-tight text-text-primary font-instrumentserif leading-tight">
              {caseStudy.title}
            </h1>
            <span className="text-text-tertiary leading-relaxed pt-4 font-instrumentsans font-light tracking-tight text-[16px]">
              {caseStudy.tagline}
            </span>
          </div>

          <div className="w-full mb-10 border-b border-border-primary" />

          <div className="w-full">
            <VideoHoverBanner
              bannerImage={caseStudy.bannerImage}
              youtubeId={caseStudy.youtubeId}
              videoUrl={caseStudy.videoUrl}
              loomId={caseStudy.loomId}
              title={caseStudy.title}
              className="h-[320px] w-full bg-bg-elevated rounded-md"
              autoPlay={false}
            />
          </div>
        </ScrollReveal>

        {/* Technologies */}
        <ScrollReveal className="w-full flex flex-col mt-10">
          <div id="cs-technologies" className="w-full scroll-mt-24">
            <h2 className={sectionHeadingClass}>Technologies Used</h2>
            <div className="w-full mt-4">
              <ul className="flex flex-wrap gap-2">
                {caseStudy.technologies.map((tech) => (
                  <li key={tech} className={pillClass}>
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>

        {/* Overview */}
        <ScrollReveal className="w-full flex flex-col mt-10">
          <div id="cs-overview" className="w-full scroll-mt-24">
            <h2 className={sectionHeadingClass}>Project Overview</h2>
            <div className="w-full mt-4">
              <CaseStudyText content={caseStudy.overview} size="base" />
            </div>
          </div>
        </ScrollReveal>

        {/* Links */}
        <ScrollReveal className="w-full flex flex-col mt-10">
          <div id="cs-links" className="w-full scroll-mt-24">
            <h2 className={sectionHeadingClass}>Project Links</h2>
            <div className="w-full mt-4 flex flex-wrap gap-4">
              {caseStudy.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={pillClass}
                >
                  <LinkIcon type={link.type} />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Details / Features */}
        <ScrollReveal className="w-full flex flex-col mt-10">
          <div id="cs-details" className="w-full scroll-mt-24">
            <h2 className={sectionHeadingClass}>Project Details</h2>
            <div className="w-full mt-4">
              <p className="text-text-primary font-instrumentsans font-medium mb-3 tracking-tight">
                What it does
              </p>
              <ul className="list-none space-y-2.5 pl-0">
                {caseStudy.features.map((feature, i) => (
                  <li key={i} className={bulletItemClass}>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>

        {/* Metrics */}
        {caseStudy.metrics.length > 0 && (
          <ScrollReveal className="w-full flex flex-col mt-10">
            <div id="cs-metrics" className="w-full scroll-mt-24">
              <h2 className={sectionHeadingClass}>At a Glance</h2>
              <div className="w-full mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {caseStudy.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className={`${pillClass} flex-col items-start !py-3`}
                  >
                    <span className="text-xs text-text-muted font-instrumentsans">
                      {metric.label}
                    </span>
                    <span className="font-medium mt-0.5 text-text-primary font-instrumentsans">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Architecture — Mermaid */}
        <ScrollReveal stagger={0.1} className="w-full flex flex-col mt-10">
          <div id="cs-architecture" className="w-full scroll-mt-24">
            <h2 className={sectionHeadingClass}>Project Architecture</h2>
          </div>
          {caseStudy.architecture.summary && (
            <div className="mt-4">
              <CaseStudyText
                content={caseStudy.architecture.summary}
                size="base"
              />
            </div>
          )}
          <div className="w-full mt-4">
            <MermaidDiagram chart={caseStudy.architecture.mermaid} />
          </div>
        </ScrollReveal>

        {/* Gallery — stagger each image */}
        {caseStudy.images.length > 0 && (
          <ScrollReveal
            stagger={0.1}
            className="w-full flex flex-col gap-6 mt-10"
          >
            {caseStudy.images.map((image, index) => (
              <figure
                key={image.src}
                id={index === 0 ? "cs-gallery" : undefined}
                className={`w-full${index === 0 ? " scroll-mt-24" : ""}`}
              >
                <div className="w-full overflow-hidden rounded-md bg-bg-elevated">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={1600}
                    height={900}
                    sizes="(max-width: 768px) 100vw, 672px"
                    className="h-auto w-full object-contain"
                  />
                </div>
                {image.caption && (
                  <figcaption className="mt-2 text-sm font-instrumentsans font-light text-text-muted tracking-tight">
                    {image.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </ScrollReveal>
        )}

        {/* Problem */}
        <ScrollReveal className="w-full flex flex-col mt-10">
          <div id="cs-problem" className="w-full scroll-mt-24">
            <h2 className={sectionHeadingClass}>Problem Statement</h2>
            <div className="w-full mt-4">
              <CaseStudyText content={caseStudy.problem} />
            </div>
          </div>
        </ScrollReveal>

        {/* Challenges — stagger each challenge */}
        <ScrollReveal stagger={0.1} className="w-full flex flex-col mt-10 gap-6">
          <div id="cs-challenges" className="w-full scroll-mt-24">
            <h2 className={sectionHeadingClass}>Challenges</h2>
          </div>
          {caseStudy.challenges.map((challenge) => (
            <div key={challenge.title}>
              <p className="text-[15px] sm:text-[16px] font-instrumentsans font-medium text-text-primary mb-2 tracking-tight">
                {challenge.title}
              </p>
              <CaseStudyText content={challenge.description} />
            </div>
          ))}
        </ScrollReveal>

        {/* Learnings */}
        <ScrollReveal className="w-full flex flex-col mt-10">
          <div id="cs-learnings" className="w-full scroll-mt-24">
            <h2 className={sectionHeadingClass}>Learnings</h2>
            <ul className="w-full mt-4 list-none space-y-2.5 pl-0">
              {caseStudy.learnings.map((learning, i) => (
                <li key={i} className={bulletItemClass}>
                  {learning}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        {/* Next steps */}
        <ScrollReveal stagger={0.08} className="w-full flex flex-col mt-10">
          <div id="cs-next" className="w-full scroll-mt-24">
            <h2 className={sectionHeadingClass}>Next Steps</h2>
            <ul className="w-full mt-4 list-none space-y-2.5 pl-0">
              {caseStudy.nextSteps.map((step, i) => (
                <li key={i} className={bulletItemClass}>
                  {step}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-[16px] font-instrumentsans font-light text-text-tertiary my-8 text-center tracking-tight">
            Thanks for taking the time to read my project.
          </p>
          <div className="w-full mt-4 flex justify-between items-center">
            <Link
              href="/#home"
              className="inline-flex items-center gap-2 text-sm font-instrumentsans font-medium text-text-muted hover:text-text-primary transition-colors"
            >
              <ArrowLeft size={16} />
              Go back home
            </Link>
            {caseStudy.nextProject ? (
              <Link
                href={caseStudy.nextProject.href}
                className="inline-flex items-center gap-2 text-sm font-instrumentsans font-medium text-text-muted hover:text-text-primary transition-colors"
              >
                Next Project
                <ArrowRight size={16} />
              </Link>
            ) : (
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm font-instrumentsans font-medium text-text-muted hover:text-text-primary transition-colors"
              >
                Next Project
                <ArrowRight size={16} />
              </Link>
            )}
          </div>
        </ScrollReveal>

        {/* Closing */}
        <ScrollReveal className="w-full flex flex-col mt-10">
          <div className="w-full items-center justify-center flex h-50 bg-bg-elevated rounded-md">
            <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-text-primary font-instrumentserif">
              &quot;Keep Building&quot;
            </h1>
          </div>
        </ScrollReveal>
      </div>

      {/* Floating scroll progress pill */}
      <CaseStudyScrollNav sections={sections} />
    </div>
  );
}
