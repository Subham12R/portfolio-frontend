// Projects data

export interface Project {
  id: string;
  numberId?: string;
  title: string;
  period: string;
  description: string;
  features: string[];
  tags: string[];
  bannerImage?: string;
  youtubeId?: string;
  featured?: boolean;
  status?: "completed" | "in-progress" | "maintained";
  links: {
    github?: string;
    live?: string;
    npm?: string;
    docs?: string;
  };
}

export const projects: Project[] = [
  {
    id: "react-wheel-picker",
    numberId: "01",
    title: "React Wheel Picker",
    period: "05.2025 – Present",
    description:
      "iOS-like wheel picker for React with smooth inertia scrolling and infinite loop support. Backed by Vercel OSS Program.",
    features: [
      "Natural touch scrolling with smooth inertia effect",
      "Mouse drag and scroll support for desktop",
      "Infinite loop scrolling",
      "Unstyled components for complete style customization",
      "Easy installation via shadcn CLI",
    ],
    tags: [
      "Open Source",
      "React",
      "TypeScript",
      "Monorepo",
      "Turborepo",
      "NPM Registry",
    ],
    bannerImage: "/images/projects/wheel-picker.png",
    featured: true,
    status: "maintained",
    links: {
      github: "https://github.com/Subham12R/react-wheel-picker",
      live: "https://react-wheel-picker.vercel.app",
      npm: "https://npmjs.com/package/react-wheel-picker",
    },
  },
  {
    id: "devflow",
    numberId: "02",
    title: "DevFlow",
    period: "03.2025 – 04.2025",
    description:
      "A modern developer portfolio and blog platform built with Next.js 14, featuring MDX support, dark mode, and a custom CMS for managing content.",
    features: [
      "MDX-powered blog with syntax highlighting",
      "Dynamic OG image generation",
      "Full-text search with FlexSearch",
      "RSS feed generation",
      "SEO optimized with structured data",
    ],
    tags: [
      "Next.js",
      "TypeScript",
      "MDX",
      "Tailwind CSS",
      "Vercel",
    ],
    bannerImage: "/images/projects/devflow.png",
    featured: true,
    status: "completed",
    links: {
      github: "https://github.com/Subham12R/devflow",
      live: "https://devflow.vercel.app",
    },
  },
  {
    id: "taskly",
    numberId: "03",
    title: "Taskly",
    period: "01.2025 – 02.2025",
    description:
      "A collaborative task management application with real-time updates, team workspaces, and Kanban boards. Built with modern full-stack technologies.",
    features: [
      "Real-time collaboration with WebSockets",
      "Drag-and-drop Kanban boards",
      "Team workspaces and member management",
      "Activity timeline and notifications",
      "Integration with GitHub and Slack",
    ],
    tags: [
      "React",
      "Node.js",
      "PostgreSQL",
      "Socket.io",
      "Docker",
    ],
    bannerImage: "/images/projects/taskly.png",
    featured: false,
    status: "completed",
    links: {
      github: "https://github.com/Subham12R/taskly",
      live: "https://taskly-app.vercel.app",
    },
  },
  {
    id: "codevis",
    numberId: "04",
    title: "CodeVis",
    period: "11.2024 – 12.2024",
    description:
      "An interactive algorithm visualizer that helps developers understand complex algorithms through step-by-step animations and explanations.",
    features: [
      "Visual representation of 20+ algorithms",
      "Step-by-step execution control",
      "Custom input support",
      "Time and space complexity analysis",
      "Mobile-responsive design",
    ],
    tags: [
      "React",
      "TypeScript",
      "Framer Motion",
      "Canvas API",
      "Algorithms",
    ],
    bannerImage: "/images/projects/codevis.png",
    featured: false,
    status: "completed",
    links: {
      github: "https://github.com/Subham12R/codevis",
      live: "https://codevis.vercel.app",
    },
  },
];

// Helper to get featured projects
export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

// Helper to get projects for homepage (limited)
export function getHomeProjects(limit: number = 4): Project[] {
  return projects.slice(0, limit);
}

// Helper to get project by ID
export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}

// Helper to get all unique tags
export function getAllTags(): string[] {
  const tags = new Set<string>();
  projects.forEach((project) => {
    project.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}
