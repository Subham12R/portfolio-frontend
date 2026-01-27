"use client";

import { Card1 } from "@/components/animate-ui/animated-cards/Backend";
import { Card2 } from "@/components/animate-ui/animated-cards/Frontend";
import { OtherToolsCard } from "@/components/animate-ui/animated-cards/Other";
import { DevOpsCard } from "@/components/animate-ui/animated-cards/Devops";
import { ScrollRevealText } from "@/components/ui/ScrollRevealText";
import { techRegistry, siteConfig } from "@/data";
import { groupTech } from "@/lib/groupTech";

const Tech = () => {
  const tech = groupTech(techRegistry);
  const section = siteConfig.sections.skills;

  return (
    <section id={section.id} className="w-full flex justify-center items-center pb-10 px-4 lg:px-0">
      <div className="max-w-4xl w-full flex flex-col h-full">

        {/* Header */}
        <div className="flex items-start pt-16 pb-5 border-b border-border-accent mb-8">
          <span className="text-text-secondary text-xl font-mono leading-tight">
            {section.number}
          </span>
          <h1 className="text-4xl font-semibold text-text-primary">
            {section.title}.
          </h1>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Frontend */}
          <div className="bg-bg-card border border-border-secondary rounded-2xl shadow-(--skills-card-shadow) p-5 flex flex-col items-center min-h-[220px]">
            <h2 className="text-text-primary text-lg font-semibold">Frontend</h2>
            <ScrollRevealText as="p" className="text-center text-sm mt-1">
              {tech.frontend.join(", ")}
            </ScrollRevealText>
            <ScrollRevealText as="span" className="text-xs mt-1 mb-3 text-center">
              Building sleek, responsive, and accessible UIs.
            </ScrollRevealText>
            <Card2 />
          </div>

          {/* Backend */}
          <div className="bg-bg-card border border-border-secondary rounded-2xl shadow-(--skills-card-shadow) p-5 flex flex-col items-center min-h-[220px]">
            <h2 className="text-text-primary text-lg font-semibold">Backend</h2>
            <ScrollRevealText as="p" className="text-center text-sm mt-1">
              {tech.backend.join(", ")}
            </ScrollRevealText>
            <ScrollRevealText as="span" className="text-xs mt-1 mb-3 text-center">
              APIs, databases, and scalable server logic.
            </ScrollRevealText>
            <Card1 />
          </div>

          {/* DevOps */}
          <div className="bg-bg-card border border-border-secondary shadow-(--skills-card-shadow) rounded-2xl p-5 flex flex-col items-center min-h-[180px]">
            <h2 className="text-text-primary text-lg font-semibold">DevOps</h2>
            <ScrollRevealText as="p" className="text-sm text-center mt-1">
              {tech.devops.join(", ")}
            </ScrollRevealText>
            <DevOpsCard />
          </div>

          {/* Other Tools */}
          <div className="bg-bg-card border border-border-secondary shadow-(--skills-card-shadow) rounded-2xl p-5 flex flex-col items-center min-h-[180px]">
            <h2 className="text-text-primary text-lg font-semibold">Other</h2>
            <ScrollRevealText as="p" className="text-sm text-center mt-1">
              {tech.other.join(", ")}
            </ScrollRevealText>
            <OtherToolsCard />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Tech;
