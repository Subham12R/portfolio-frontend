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
    period: "Jan 2026 – Feb 2026",
    startDate: "2026-01-01",
    endDate: "2026-02-28",
    type: "internship",
    logo: "/images/profile/ryze.jpeg",
    logoColor: "orange",
    description:
      "Developed and maintained modern web applications using React and Next.js. Collaborated with backend teams to integrate REST APIs and build scalable UI components.",
    responsibilities: [
      "Built responsive UI components using React and Tailwind CSS",
      "Integrated REST APIs with proper error handling and loading states",
      "Collaborated with design team to implement pixel-perfect interfaces",
      "Optimized application performance through code splitting and lazy loading",
    ],
    techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "REST APIs"],
    links: {
      company: "https://ryze.ai",
    },
  },
  {
    id: "adamas-moodle",
    company: "Adamas University",
    role: "Moodle Dashboard Organizer",
    period: "Dec 2025 – Jun 2026",
    startDate: "2025-12-01",
    type: "part-time",
    logo: "/images/profile/icon.png",
    logoColor: "blue",
    description:
      "Organized and maintained the university's Moodle LMS dashboard, improving course structure and student accessibility across departments.",
    responsibilities: [
      "Restructured course layouts for better student navigation",
      "Coordinated with faculty to upload and manage course materials",
      "Maintained consistent UI standards across department portals",
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
