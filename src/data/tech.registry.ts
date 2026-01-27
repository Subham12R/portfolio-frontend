export type TechCategory = "frontend" | "backend" | "devops" | "other";

export interface TechItem {
  name: string;
  category?: TechCategory; // optional → fallback to other
}

export const techRegistry: TechItem[] = [
  // Frontend
  { name: "JavaScript", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "HTML", category: "frontend" },
  { name: "CSS", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },

  // Backend
  { name: "Node.js", category: "backend" },
  { name: "MongoDB", category: "backend" },
  { name: "PostgreSQL", category: "backend" },
  { name: "Supabase", category: "backend" },
  { name: "Neon", category: "backend" },

  // DevOps
  { name: "Docker", category: "devops" },
  { name: "GitHub Actions", category: "devops" },
  { name: "Vercel", category: "devops" },
  { name: "Netlify", category: "devops" },

  // Everything else (no category = auto Other)
  { name: "Figma" },
  { name: "Jest" },
  { name: "Storybook" },
  { name: "Framer Motion" },
  { name: "VS Code" },
  { name: "WordPress" },
  { name: "Stripe" },
];
