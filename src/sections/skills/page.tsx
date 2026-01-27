"use client";

import React from "react";
import { Card1 } from "@/components/animate-ui/animated-cards/Backend";
import { Card2 } from "@/components/animate-ui/animated-cards/Frontend";
import { techRegistry } from "@/data/tech.registry";
import { groupTech } from "@/lib/groupTech";
import { OtherToolsCard } from "@/components/animate-ui/animated-cards/Other";
import { DevOpsCard } from "@/components/animate-ui/animated-cards/Devops";

const Tech = () => {
  const tech = groupTech(techRegistry);

  return (
    <div className="w-full flex justify-center items-center pb-10">
      <div className="max-w-4xl w-full flex flex-col bg-black h-full">

        {/* Header */}
        <div className="flex items-start pt-10 pb-4 border-b border-white/40 mb-6">
          <span className="text-white/80 text-xl font-mono">03</span>
          <h1 className="text-3xl md:text-4xl font-semibold text-white ml-2">
            Skills & Technologies
          </h1>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Frontend */}
          <div className="bg-black border-2 border-white/20 rounded-3xl shadow-[inset_0_4px_24px_0_rgba(255,255,255,0.10),inset_0_-4px_24px_0_rgba(0,0,0,0.8)] p-4 flex flex-col items-center min-h-[220px]">
            <h2 className="text-white text-lg font-bold">Frontend</h2>
            <p className="text-white font-semibold text-center text-sm mt-1">
              {tech.frontend.join(", ")}
            </p>
            <span className="text-zinc-400 text-xs mt-1 mb-2 text-center">
              Building sleek, responsive, and accessible UIs.
            </span>
            <Card2 />
          </div>

          {/* Backend */}
          <div className="bg-black border-2 border-white/20 rounded-3xl shadow-[inset_0_4px_24px_0_rgba(255,255,255,0.10),inset_0_-4px_24px_0_rgba(0,0,0,0.8)] p-4 flex flex-col items-center min-h-[220px]">
            <h2 className="text-white text-lg font-bold">Backend</h2>
            <p className="text-white font-semibold text-center text-sm mt-1">
              {tech.backend.join(", ")}
            </p>
            <span className="text-zinc-400 text-xs mt-1 mb-2 text-center">
              APIs, databases, and scalable server logic.
            </span>
            <Card1 />
          </div>

          {/* DevOps */}
          <div className="bg-black border-2 border-white/20 shadow-[inset_0_4px_24px_0_rgba(255,255,255,0.10),inset_0_-4px_24px_0_rgba(0,0,0,0.8)] rounded-xl p-4 flex flex-col items-center min-h-[180px]">
            <h2 className="text-white text-lg font-bold">DevOps</h2>
            <p className="text-white/80 text-sm text-center">
              {tech.devops.join(", ")}
            </p>
            <DevOpsCard />
          </div>

          {/* Other (AUTO FALLBACK) */}
          <div className="bg-black border-2 border-white/20 shadow-[inset_0_4px_24px_0_rgba(255,255,255,0.10),inset_0_-4px_24px_0_rgba(0,0,0,0.8)] rounded-xl p-4 flex flex-col items-center min-h-[180px]">
            <h2 className="text-white text-lg font-bold">Other</h2>
            <p className="text-white/80 text-sm text-center">
              {tech.other.join(", ")}
            </p>
            <OtherToolsCard />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Tech;
