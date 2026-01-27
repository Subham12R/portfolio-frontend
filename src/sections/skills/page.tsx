"use client";

import { Card1 } from "@/components/animate-ui/animated-cards/Backend";
import { Card2 } from "@/components/animate-ui/animated-cards/Frontend";
import { OtherToolsCard } from "@/components/animate-ui/animated-cards/Other";
import { DevOpsCard } from "@/components/animate-ui/animated-cards/Devops";
import { techRegistry, siteConfig } from "@/data";
import { groupTech } from "@/lib/groupTech";

const Tech = () => {
  const tech = groupTech(techRegistry);
  const section = siteConfig.sections.skills;

  return (
    <section id={section.id} className="w-full flex justify-center items-center pb-10 px-4 lg:px-0">
      <div className="max-w-4xl w-full flex flex-col bg-black h-full">

        {/* Header */}
        <div className="flex items-start pt-16 pb-5 border-b border-white/40 mb-8">
          <span className="text-white/80 text-xl font-mono leading-tight">
            {section.number}
          </span>
          <h1 className="text-4xl font-semibold text-white">
            {section.title}.
          </h1>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Frontend */}
          <div className="bg-black border border-white/20 rounded-2xl shadow-[inset_0_4px_24px_0_rgba(255,255,255,0.08),inset_0_-4px_24px_0_rgba(0,0,0,0.6)] p-5 flex flex-col items-center min-h-[220px]">
            <h2 className="text-white text-lg font-semibold">Frontend</h2>
            <p className="text-white/80 text-center text-sm mt-1">
              {tech.frontend.join(", ")}
            </p>
            <span className="text-zinc-500 text-xs mt-1 mb-3 text-center">
              Building sleek, responsive, and accessible UIs.
            </span>
            <Card2 />
          </div>

          {/* Backend */}
          <div className="bg-black border border-white/20 rounded-2xl shadow-[inset_0_4px_24px_0_rgba(255,255,255,0.08),inset_0_-4px_24px_0_rgba(0,0,0,0.6)] p-5 flex flex-col items-center min-h-[220px]">
            <h2 className="text-white text-lg font-semibold">Backend</h2>
            <p className="text-white/80 text-center text-sm mt-1">
              {tech.backend.join(", ")}
            </p>
            <span className="text-zinc-500 text-xs mt-1 mb-3 text-center">
              APIs, databases, and scalable server logic.
            </span>
            <Card1 />
          </div>

          {/* DevOps */}
          <div className="bg-black border border-white/20 shadow-[inset_0_4px_24px_0_rgba(255,255,255,0.08),inset_0_-4px_24px_0_rgba(0,0,0,0.6)] rounded-2xl p-5 flex flex-col items-center min-h-[180px]">
            <h2 className="text-white text-lg font-semibold">DevOps</h2>
            <p className="text-white/70 text-sm text-center mt-1">
              {tech.devops.join(", ")}
            </p>
            <DevOpsCard />
          </div>

          {/* Other Tools */}
          <div className="bg-black border border-white/20 shadow-[inset_0_4px_24px_0_rgba(255,255,255,0.08),inset_0_-4px_24px_0_rgba(0,0,0,0.6)] rounded-2xl p-5 flex flex-col items-center min-h-[180px]">
            <h2 className="text-white text-lg font-semibold">Other</h2>
            <p className="text-white/70 text-sm text-center mt-1">
              {tech.other.join(", ")}
            </p>
            <OtherToolsCard />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Tech;
