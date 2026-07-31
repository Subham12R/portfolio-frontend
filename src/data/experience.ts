// Work experience data

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  startDate: string; // ISO date for sorting
  endDate?: string; // undefined means "Present"
  location?: string;
  type: "full-time" | "part-time" | "internship" | "freelance" | "contract";
  logo: string;
  logoColor?: string;
  description: string;
  responsibilities?: string[];
  techStack: string[];
  links?: {
    company?: string;
    linkedin?: string;
  };
}

export const experiences: Experience[] = [
  {
    id: "ryze-ai-intern",
    company: "Ryze AI Pvt. Ltd.",
    role: "Frontend Developer Intern",
    period: "Jan 2026 – Apr 2026",
    startDate: "2026-01-01",
    endDate: "2026-04-30",
    type: "internship",
    logo: "/images/profile/ryze.jpeg",
    logoColor: "orange",
    description:
      "Shipped production UI components in React, TypeScript, and Tailwind CSS, integrated REST APIs, and improved request patterns and component-level caching.",
    responsibilities: [
      "Shipped responsive UI components using React, TypeScript, and Tailwind CSS",
      "Integrated REST APIs with optimized request patterns and component-level caching",
      "Participated in code reviews as an author and reviewer",
      "Improved average data-fetch latency by approximately 30%",
    ],
    techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "REST APIs"],
    links: {
      company: "https://ryze.ai",
    },
  },
  {
    id: "adamas-moodle",
    company: "Adamas University",
    role: "Moodle LMS Cloud Maintainer (Part-time)",
    period: "Nov 2025 – May 2026",
    startDate: "2025-11-01",
    endDate: "2026-05-31",
    type: "part-time",
    logo: "/images/profile/icon.png",
    logoColor: "blue",
    description:
      "Administered a cloud-hosted Moodle LMS for 1,000+ students and faculty with proactive health monitoring, incident response, and role-permission improvements.",
    responsibilities: [
      "Maintained 99%+ uptime through proactive health monitoring and incident-response workflows",
      "Reduced faculty support tickets by approximately 40% and per-course setup time by approximately 50%",
      "Standardized plugin configuration and role-permission flows for 100+ faculty",
    ],
    techStack: ["Moodle", "HTML", "CSS", "PHP"],
    links: {
      company: "https://adamasuniversity.ac.in",
    },
  },
  {
    id: "adamas-frontend",
    company: "Adamas University",
    role: "Frontend Developer",
    period: "Aug 2025 – Jan 2026",
    startDate: "2025-08-01",
    endDate: "2026-01-31",
    type: "part-time",
    logo: "/images/profile/icon.png",
    logoColor: "blue",
    description:
      "Built and maintained internal web tools for the university, focusing on responsive design and usability for both students and staff.",
    responsibilities: [
      "Developed internal dashboards and student-facing portals",
      "Improved page load performance and mobile responsiveness",
      "Worked closely with university IT to deploy and test features",
    ],
    techStack: ["React", "JavaScript", "Tailwind CSS", "Next.js"],
    links: {
      company: "https://adamasuniversity.ac.in",
    },
  },
];

export function getExperiencesSorted(): Experience[] {
  return [...experiences].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );
}

export function getCurrentPositions(): Experience[] {
  return experiences.filter((exp) => !exp.endDate);
}
