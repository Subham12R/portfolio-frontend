import { BriefcaseIcon } from "lucide-react";
import { experiences } from "@/data/experience";

function getYearRange(startDate: string, endDate?: string): string {
  const start = new Date(startDate).getFullYear();
  if (!endDate) return `${start} — Present`;
  const end = new Date(endDate).getFullYear();
  return start === end ? `${start}` : `${start} — ${end}`;
}

export default function Experience() {
  return (
    <div className="h-full w-full flex flex-col">
      <div
        data-about-item
        className="w-full px-2 backdrop-blur-3xl rounded-md inline-flex items-center gap-2 mb-4"
      >
        <BriefcaseIcon size={20} className="mb-1" />
        <h1 className="tracking-tighter text-lg font-medium">Experience</h1>
      </div>

      <div className="flex flex-1 flex-col gap-2">
        {experiences.slice(0, 3).map((exp) => (
          <div
            key={exp.id}
            data-about-item
            className="rounded-xl bg-bg-elevated flex justify-start flex-col items-start px-2 py-2"
          >
            <div className="flex justify-between items-center w-full">
              <h3 className="tracking-tighter">
                {exp.role} at {exp.company}
              </h3>
              <p className="text-sm text-text-muted">
                {getYearRange(exp.startDate, exp.endDate)}
              </p>
            </div>

            <div className="pl-2 border-l flex flex-col gap-1 w-full">
              <span className="tracking-tighter text-sm text-text-secondary">
                {exp.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
