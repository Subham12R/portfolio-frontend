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
import {
  CaseStudyScrollNav,
  type CaseStudySection,
} from "@/components/casestudy/CaseStudyScrollNav";
import type { CaseStudy, CaseStudyLink } from "@/data/case-study";

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
  "inline-flex items-center gap-2 bg-zinc-200 text-black dark:bg-zinc-700 dark:text-white rounded-md px-4 py-1 text-sm border border-bg-primary/50 shadow-[inset_0_0_4px_4px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0_4px_4px_rgba(0,0,0,0.1)]";

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
    <div className="min-h-screen h-full max-w-2xl mx-auto flex flex-col items-start justify-start py-10 px-4 lg:px-0 pb-36">
      {/* Breadcrumbs */}
      <nav className="w-full mb-10 sticky top-0 z-10 bg-bg-primary/80 backdrop-blur-sm py-2">
        <ol className="flex items-center gap-1 flex-wrap">
          <li>
            <Link href="/" className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
              Home
            </Link>
          </li>
          <li className="text-gray-600 dark:text-gray-400">/</li>
          <li className="text-gray-600 dark:text-gray-400">Projects</li>
          <li className="text-gray-600 dark:text-gray-400">/</li>
          <li className="text-gray-600 dark:text-gray-400">{caseStudy.title}</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="w-full mb-6 flex flex-col items-start justify-start">
        <h1 className="text-4xl font-bold">{caseStudy.title}</h1>
        <span className="text-gray-600 dark:text-gray-400 leading-tight pt-4">
          {caseStudy.tagline}
        </span>
      </div>

      <div className="w-full mb-10 border-b border-gray-500/60" />

      {/* Banner */}
      <div className="w-full">
        <VideoHoverBanner
          bannerImage={caseStudy.bannerImage}
          youtubeId={caseStudy.youtubeId}
          videoUrl={caseStudy.videoUrl}
          loomId={caseStudy.loomId}
          title={caseStudy.title}
          className="h-[320px] w-full bg-zinc-700 rounded-md"
          autoPlay={false}
        />
      </div>

      {/* Technologies */}
      <div id="cs-technologies" className="w-full mt-10 scroll-mt-24">
        <h2 className="text-2xl font-bold">Technologies Used</h2>
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

      {/* Overview */}
      <div id="cs-overview" className="w-full mt-10 scroll-mt-24">
        <h2 className="text-2xl font-bold">Project Overview</h2>
        <div className="w-full mt-4">
          <p className="text-gray-600 dark:text-gray-400">{caseStudy.overview}</p>
        </div>
      </div>

      {/* Links */}
      <div id="cs-links" className="w-full mt-10 scroll-mt-24">
        <h2 className="text-2xl font-bold">Project Links</h2>
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

      {/* Details / Features */}
      <div id="cs-details" className="w-full mt-10 scroll-mt-24">
        <h2 className="text-2xl font-bold">Project Details</h2>
        <div className="w-full mt-4 text-gray-600 dark:text-gray-400 space-y-1.5">
          <p className="text-black dark:text-white font-medium mb-2">What it does</p>
          {caseStudy.features.map((feature, i) => (
            <p key={i}># {feature}</p>
          ))}
        </div>
      </div>

      {/* Metrics */}
      {caseStudy.metrics.length > 0 && (
        <div id="cs-metrics" className="w-full mt-10 scroll-mt-24">
          <h2 className="text-2xl font-bold">At a Glance</h2>
          <div className="w-full mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {caseStudy.metrics.map((metric) => (
              <div key={metric.label} className={`${pillClass} flex-col items-start !py-3`}>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {metric.label}
                </span>
                <span className="font-medium mt-0.5">{metric.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Architecture — Mermaid */}
      <div id="cs-architecture" className="w-full mt-10 scroll-mt-24">
        <h2 className="text-2xl font-bold">Project Architecture</h2>
        {caseStudy.architecture.summary && (
          <p className="text-gray-600 dark:text-gray-400 mt-4">
            {caseStudy.architecture.summary}
          </p>
        )}
        <div className="w-full mt-4">
          <MermaidDiagram chart={caseStudy.architecture.mermaid} />
        </div>
      </div>

      {/* Gallery */}
      {caseStudy.images.length > 0 && (
        <div
          id="cs-gallery"
          className="grid grid-cols-1 md:grid-cols-2 w-full items-center gap-4 mt-10 scroll-mt-24"
        >
          {caseStudy.images.map((image) => (

            <figure key={image.src} className="w-full">
              <div className="relative h-60 w-full bg-zinc-700 rounded-md overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-cover"
                />
              </div>
              {image.caption && (
                <figcaption className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {image.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}

      {/* Problem */}
      <div id="cs-problem" className="w-full mt-10 scroll-mt-24">
        <h2 className="text-2xl font-bold">Problem Statement</h2>
        <div className="w-full mt-4">
          <p className="text-sm text-gray-600 dark:text-zinc-300 leading-relaxed">
            {caseStudy.problem}
          </p>
        </div>
      </div>

      {/* Challenges */}
      <div id="cs-challenges" className="w-full mt-10 scroll-mt-24">
        <h2 className="text-2xl font-bold">Challenges</h2>
        <div className="w-full mt-4 space-y-4">
          {caseStudy.challenges.map((challenge) => (
            <div key={challenge.title}>
              <p className="text-sm font-medium text-black dark:text-white mb-1">
                {challenge.title}
              </p>
              <p className="text-sm text-gray-600 dark:text-zinc-300 leading-relaxed">
                {challenge.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Learnings */}
      <div id="cs-learnings" className="w-full mt-10 scroll-mt-24">
        <h2 className="text-2xl font-bold">Learnings</h2>
        <div className="w-full mt-4 space-y-2">
          {caseStudy.learnings.map((learning, i) => (
            <p key={i} className="text-sm text-gray-600 dark:text-zinc-300 leading-relaxed">
              # {learning}
            </p>
          ))}
        </div>
      </div>

      {/* Next steps */}
      <div id="cs-next" className="w-full mt-10 scroll-mt-24">
        <h2 className="text-2xl font-bold">Next Steps</h2>
        <div className="w-full mt-4 space-y-2">
          {caseStudy.nextSteps.map((step, i) => (
            <p key={i} className="text-sm text-gray-600 dark:text-zinc-300 leading-relaxed">
              # {step}
            </p>
          ))}
        </div>
        <p className="text-md text-gray-600 dark:text-zinc-300 my-8 text-center ">
          Thanks for taking the time to read my project.
        </p>
        <div className="w-full mt-4 flex justify-between items-center">
          <Link
            href="/#home"
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            Go back home
          </Link>
          {caseStudy.nextProject ? (
            <Link
              href={caseStudy.nextProject.href}
              className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors"
            >
              Next Project
              <ArrowRight size={16} />
            </Link>
          ) : (
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors"
            >
              Next Project
              <ArrowRight size={16} />
            </Link>
          )}
        </div>
      </div>

      {/* Closing */}
      <div className="w-full mt-10 items-center justify-center flex h-50 bg-zinc-400/20 rounded-md">
        <h1 className="text-2xl font-bold">&quot;Keep Building&quot;</h1>
      </div>

      {/* Floating scroll progress pill */}
      <CaseStudyScrollNav sections={sections} />
    </div>
  );
}

