// Tech icons mapping
// Maps technology names to their icon paths in /src/assets/icons/

export const techIcons: Record<string, string> = {
  // Frontend
  "React": "/icons/react.png",
  "Next.js": "/icons/nextjs.jpeg",
  "TypeScript": "/icons/typescript.png",
  "JavaScript": "/icons/js.png",
  "HTML": "/icons/html.png",
  "CSS": "/icons/css.png",
  "Tailwind CSS": "/icons/tailwindcss.jpeg",
  "Framer Motion": "/icons/framer.jpeg",
  "GSAP": "/icons/gsap.svg",

  // Backend
  "Node.js": "/icons/nodejs.png",
  "MongoDB": "/icons/mongodb.png",
  "PostgreSQL": "/icons/database.png",
  "Supabase": "/icons/supabase.jpeg",
  "Neon": "/icons/neon.jpeg",
  "Database": "/icons/database.png",

  // DevOps & Tools
  "Docker": "/icons/docker.jpeg",
  "Vercel": "/icons/vercel.png",
  "Netlify": "/icons/netlify.png",
  "GitHub": "/icons/github.png",
  "GitHub Actions": "/icons/github.png",
  "Git": "/icons/github.png",

  // Other
  "Figma": "/icons/figma.png",
  "VS Code": "/icons/vscode.jpeg",
  "Jest": "/icons/jest.jpeg",
  "Stripe": "/icons/stripe.jpeg",
  "WordPress": "/icons/wordpress.jpeg",
  "Canva": "/icons/canva.jpeg",
  "Cursor": "/icons/cursor.webp",
  "Lenis": "/icons/lenis.png",

  // Learning platforms
  "Udemy": "/icons/udemy.png",
  "HackerRank": "/icons/hackerrank.svg",

  // Aliases
  "Canvas API": "/icons/html.png",
  "Algorithms": "/icons/js.png",
  "REST APIs": "/icons/nodejs.png",
  "Socket.io": "/icons/nodejs.png",
  "MDX": "/icons/nextjs.jpeg",
  "Turborepo": "/icons/vercel.png",
  "Monorepo": "/icons/github.png",
  "NPM Registry": "/icons/nodejs.png",
  "Open Source": "/icons/github.png",
};

// Get icon path for a tech, returns undefined if not found
export function getTechIcon(tech: string): string | undefined {
  return techIcons[tech];
}

// Check if a tech has an icon
export function hasTechIcon(tech: string): boolean {
  return tech in techIcons;
}
