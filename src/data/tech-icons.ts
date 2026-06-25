import { StaticImageData } from "next/image";

// Tech icon static imports
import reactIcon from "@/assets/icons/react.png";
import nextjsIcon from "@/assets/icons/nextjs.jpeg";
import typescriptIcon from "@/assets/icons/typescript.png";
import jsIcon from "@/assets/icons/js.png";
import htmlIcon from "@/assets/icons/html.png";
import cssIcon from "@/assets/icons/css.png";
import tailwindIcon from "@/assets/icons/tailwindcss.jpeg";
import framerIcon from "@/assets/icons/framer.jpeg";
import gsapIcon from "@/assets/icons/gsap.svg";
import nodejsIcon from "@/assets/icons/nodejs.png";
import mongodbIcon from "@/assets/icons/mongodb.png";
import postgresqlIcon from "@/assets/icons/postgresql.svg";
import supabaseIcon from "@/assets/icons/supabase.jpeg";
import neonIcon from "@/assets/icons/neon.jpeg";
import databaseIcon from "@/assets/icons/database.png";
import fastapiIcon from "@/assets/icons/fastapi.webp";
import pythonIcon from "@/assets/icons/python.png";
import dockerIcon from "@/assets/icons/docker.jpeg";
import vercelIcon from "@/assets/icons/vercel.png";
import netlifyIcon from "@/assets/icons/netlify.png";
import githubIcon from "@/assets/icons/github.png";
import figmaIcon from "@/assets/icons/figma.png";
import vscodeIcon from "@/assets/icons/vscode.jpeg";
import jestIcon from "@/assets/icons/jest.jpeg";
import stripeIcon from "@/assets/icons/stripe.jpeg";
import wordpressIcon from "@/assets/icons/wordpress.jpeg";
import canvaIcon from "@/assets/icons/canva.jpeg";
import cursorIcon from "@/assets/icons/cursor.webp";
import lenisIcon from "@/assets/icons/lenis.png";
import udemyIcon from "@/assets/icons/udemy.png";
import hackerrankIcon from "@/assets/icons/hackerrank.svg";
import betterAuthIcon from "@/assets/icons/better-auth.png";
import reactRouterIcon from "@/assets/icons/reactrouter.svg";
import reduxIcon from "@/assets/icons/redux.png";
import viteIcon from "@/assets/icons/vite.svg";
import zodIcon from "@/assets/icons/zod.png";
import socketioIcon from "@/assets/icons/socketio.png";
// Newly added icons in assets/icons
import electronIcon from "@/assets/icons/electron.jpg";
import expoIcon from "@/assets/icons/expo.webp";
import mediumIcon from "@/assets/icons/medium.jpeg";
import n8nIcon from "@/assets/icons/n8n.png";
import nativewindIcon from "@/assets/icons/nativewind.jpeg";
import reactnativeIcon from "@/assets/icons/reactnative.png";
import reactreanimatedIcon from "@/assets/icons/reactreanimated.png";
import sqliteIcon from "@/assets/icons/sqlite.jpeg";
import xgboostIcon from "@/assets/icons/xgboost.png";
import zedIcon from "@/assets/icons/zed.png";

export const techIcons: Record<string, StaticImageData> = {
  // Frontend
  "React": reactIcon,
  "Next.js": nextjsIcon,
  "TypeScript": typescriptIcon,
  "JavaScript": jsIcon,
  "HTML": htmlIcon,
  "CSS": cssIcon,
  "Tailwind CSS": tailwindIcon,
  "Framer Motion": framerIcon,
  "GSAP": gsapIcon,
  "React Router": reactRouterIcon,
  "Redux": reduxIcon,
  "Vite": viteIcon,
  "Zod": zodIcon,
  "React Native": reactnativeIcon,
  "React Reanimated": reactreanimatedIcon,
  "NativeWind": nativewindIcon,
  "Expo": expoIcon,

  // Backend
  "Node.js": nodejsIcon,
  "MongoDB": mongodbIcon,
  "PostgreSQL": postgresqlIcon,
  "Supabase": supabaseIcon,
  "Neon": neonIcon,
  "Database": databaseIcon,
  "FastAPI": fastapiIcon,
  "Python": pythonIcon,
  "SQLite": sqliteIcon,

  // DevOps & Tools
  "Docker": dockerIcon,
  "Vercel": vercelIcon,
  "Netlify": netlifyIcon,
  "GitHub": githubIcon,
  "GitHub Actions": githubIcon,
  "Git": githubIcon,
  "N8N": n8nIcon,
  "n8n": n8nIcon,

  // Other
  "Figma": figmaIcon,
  "VS Code": vscodeIcon,
  "Jest": jestIcon,
  "Stripe": stripeIcon,
  "WordPress": wordpressIcon,
  "Canva": canvaIcon,
  "Cursor": cursorIcon,
  "Lenis": lenisIcon,
  "Electron": electronIcon,
  "ElectronJS": electronIcon,
  "Electron JS": electronIcon,
  "Electron.js": electronIcon,
  "Medium": mediumIcon,
  "Better-Auth": betterAuthIcon,
  "XGBoost": xgboostIcon,
  "Zed": zedIcon,

  // Learning platforms
  "Udemy": udemyIcon,
  "HackerRank": hackerrankIcon,

  // Aliases
  "Canvas API": htmlIcon,
  "Algorithms": jsIcon,
  "REST APIs": nodejsIcon,
  "Socket.io": socketioIcon,
  "MDX": nextjsIcon,
  "Turborepo": vercelIcon,
  "Monorepo": githubIcon,
  "NPM Registry": nodejsIcon,
  "Open Source": githubIcon,
  "Motion": framerIcon,
};

// Normalize a tech name: lowercase, strip spaces, dots, and dashes
function normalize(name: string): string {
  return name.toLowerCase().replace(/[\s.\-_]/g, "");
}

// Build a normalized lookup map once for fast case-insensitive matching
const normalizedMap = new Map<string, StaticImageData>();
for (const [key, value] of Object.entries(techIcons)) {
  normalizedMap.set(normalize(key), value);
}

// Get icon path for a tech with case-insensitive fallback
export function getTechIcon(tech: string): StaticImageData | undefined {
  // Exact match first
  if (tech in techIcons) return techIcons[tech];
  // Normalized fallback (handles "Javascript" → "JavaScript", "NodeJS" → "Node.js", etc.)
  return normalizedMap.get(normalize(tech));
}

// Check if a tech has an icon
export function hasTechIcon(tech: string): boolean {
  return tech in techIcons || normalizedMap.has(normalize(tech));
}
