// Projects data

export interface ProjectCaseStudyChallenge {
  title: string;
  description: string;
}

export interface ProjectCaseStudyMetric {
  label: string;
  value: string;
}

export interface ProjectCaseStudyImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectCaseStudySections {
  overview?: string;
  problem?: string;
  architecture?: {
    summary?: string;
    mermaid?: string;
  };
  challenges?: ProjectCaseStudyChallenge[];
  learnings?: string[];
  nextSteps?: string[];
  metrics?: ProjectCaseStudyMetric[];
  images?: ProjectCaseStudyImage[];
}

export interface Project {
  id: string;
  numberId?: string;
  title: string;
  completedDate?: string | null;
  description: string;
  caseStudy?: string;
  caseStudySections?: ProjectCaseStudySections;
  features: string[];
  tags: string[];
  /** Flat thumbnail — case study hero / OG style image (API `thumbnailUrl`). */
  bannerImage?: string;
  /** Device mockup — home & projects cards (API `images[]`, prefer type `desktop`). */
  mockupImage?: string;
  youtubeId?: string;
  videoUrl?: string;
  loomId?: string;
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
    completedDate: null,
    description:
      "iOS-like wheel picker for React with smooth inertia scrolling and infinite loop support. Backed by Vercel OSS Program.",
    caseStudy:
      "Most date/time pickers in React felt clunky on mobile — a mix of dropdowns and number inputs that didn't match the native iOS feel. I wanted to build something that felt right on touch devices while still working perfectly on desktop. The core challenge was getting inertia physics right: after a flick, the list should coast to a stop and snap to the nearest item, not abruptly halt. I also needed infinite loop scrolling to feel seamless — no visual jump when wrapping around. Being part of the Vercel OSS Program gave me the infrastructure to ship it properly as a registry-installable component.",
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
    completedDate: "2025-04",
    description:
      "A modern developer portfolio and blog platform built with Next.js 14, featuring MDX support, dark mode, and a custom CMS for managing content.",
    caseStudy:
      "I wanted a portfolio that was genuinely fast and easy to update without a CMS subscription or complex setup. DevFlow started as a personal experiment — what's the minimum stack to have a blog, project showcase, and good SEO all working together? MDX turned out to be the right answer for content: write in markdown, drop in components when needed. The full-text search with FlexSearch was a later addition after realizing how hard it is to find old posts without it. Dynamic OG images were added last, mostly because bare link previews look terrible when sharing on social.",
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
    completedDate: "2025-02",
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
    completedDate: "2024-12",
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
