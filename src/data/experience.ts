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
  logoColor?: string; // For outline color styling
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
    period: "Jan 2026 – Present",
    startDate: "2026-01-01",
    type: "internship",
    logo: "/images/profile/ryze.jpeg",
    logoColor: "orange",
    description:
      "Developed and maintained modern web applications using React and Next.js. Collaborated with backend teams to integrate REST APIs and build scalable UI components. Focused on performance, accessibility, and clean architecture.",
    responsibilities: [
      "Built responsive UI components using React and Tailwind CSS",
      "Integrated REST APIs with proper error handling and loading states",
      "Collaborated with design team to implement pixel-perfect interfaces",
      "Optimized application performance through code splitting and lazy loading",
      "Participated in code reviews and maintained coding standards",
    ],
    techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "REST APIs", "Git"],
    links: {
      company: "https://ryze.ai",
    },
  },
  // Add more experiences here as needed
  // Example:
  // {
  //   id: "freelance-2025",
  //   company: "Freelance",
  //   role: "Full Stack Developer",
  //   period: "Jun 2025 – Dec 2025",
  //   startDate: "2025-06-01",
  //   endDate: "2025-12-31",
  //   type: "freelance",
  //   logo: "/images/companies/freelance.png",
  //   description: "Worked with various clients on web development projects.",
  //   techStack: ["React", "Node.js", "PostgreSQL"],
  // },
];

// Helper to get experiences sorted by date (most recent first)
export function getExperiencesSorted(): Experience[] {
  return [...experiences].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );
}

// Helper to get current positions
export function getCurrentPositions(): Experience[] {
  return experiences.filter((exp) => !exp.endDate);
}
