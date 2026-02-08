// Tech icons mapping
// Maps technology names to their icon paths in /icons/

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
  "PostgreSQL": "/icons/postgresql.svg",
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

  // Additional tools
  "Better-Auth": "/icons/better-auth.png",
  "React Router": "/icons/reactrouter.svg",
  "Redux": "/icons/redux.png",
  "Vite": "/icons/vite.svg",
  "Zod": "/icons/zod.png",

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

// Normalize a tech name: lowercase, strip spaces, dots, and dashes
function normalize(name: string): string {
  return name.toLowerCase().replace(/[\s.\-_]/g, "");
}

// Build a normalized lookup map once for fast case-insensitive matching
const normalizedMap = new Map<string, string>();
for (const [key, value] of Object.entries(techIcons)) {
  normalizedMap.set(normalize(key), value);
}

// Get icon path for a tech with case-insensitive fallback
export function getTechIcon(tech: string): string | undefined {
  // Exact match first
  if (tech in techIcons) return techIcons[tech];
  // Normalized fallback (handles "Javascript" → "JavaScript", "NodeJS" → "Node.js", etc.)
  return normalizedMap.get(normalize(tech));
}

// Check if a tech has an icon
export function hasTechIcon(tech: string): boolean {
  return tech in techIcons || normalizedMap.has(normalize(tech));
}
