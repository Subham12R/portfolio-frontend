"use client";

import { useEffect, useState } from "react";
import { ExperienceCard } from "@/components/layout/experience";
import { siteConfig } from "@/data";
import { getWorkExperiences } from "@/lib/api/client";
import { transformWorkExperiences } from "@/lib/api/transformers";
import { experiences as staticExperiences } from "@/data/experience";

const Work = () => {
  const section = siteConfig.sections.experience;
  const [experiences, setExperiences] = useState(staticExperiences);

  useEffect(() => {
    getWorkExperiences()
      .then((data) => { if (data.length > 0) setExperiences(transformWorkExperiences(data)); })
      .catch(() => {});
  }, []);

  return (
    <section
      id={section.id}
      className="w-full flex justify-center items-center px-4 lg:px-0 mb-12"
    >
      <div className="max-w-4xl w-full flex flex-col  h-full">
        {/* SECTION HEADER */}
        <div className="mb-6">
          <h1 className="text-4xl font-medium text-text-primary text-start">
            {section.title}.
          </h1>
        </div>

        <div className="flex flex-col">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              defaultExpanded={index === 0}
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
