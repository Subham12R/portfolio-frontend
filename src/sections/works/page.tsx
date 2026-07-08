import { CompanyGroup } from "@/components/layout/experience";
import { siteConfig } from "@/data";
import { fetchWorkExperiences } from "@/lib/api/server";
import type { Experience } from "@/data/experience";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

function groupByCompany(experiences: Experience[]): Experience[][] {
  const sorted = [...experiences].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );
  const groups = new Map<string, Experience[]>();
  for (const experience of sorted) {
    if (!groups.has(experience.company)) groups.set(experience.company, []);
    groups.get(experience.company)!.push(experience);
  }
  return Array.from(groups.values());
}

const Work = async () => {
  const section = siteConfig.sections.experience;
  const experiences = await fetchWorkExperiences();
  const companyGroups = groupByCompany(experiences);

  return (
    <section
      id={section.id}
      className="w-full flex justify-center items-center px-4 lg:px-0 mb-12"
    >
      <ScrollReveal className="max-w-2xl w-full flex flex-col h-full">
        {/* SECTION HEADER */}
        <div className="mb-6">
          <h1 className="text-4xl font-light text-text-primary text-start font-instrumentserif">
            {section.title}.
          </h1>
        </div>

        <div className="flex flex-col">
          {companyGroups.map((group, index) => (
            <CompanyGroup
              key={group[0].id}
              experiences={group}
              defaultOpen={index === 0}
            />
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
};

export default Work;
