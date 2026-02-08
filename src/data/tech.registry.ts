import { StaticImageData } from "next/image";

// Icon imports
import jsIcon from "@/assets/icons/js.png";
import tsIcon from "@/assets/icons/typescript.png";
import reactIcon from "@/assets/icons/react.png";
import nextjsIcon from "@/assets/icons/nextjs.jpeg";
import htmlIcon from "@/assets/icons/html.png";
import cssIcon from "@/assets/icons/css.png";
import tailwindIcon from "@/assets/icons/tailwindcss.jpeg";
import nodejsIcon from "@/assets/icons/nodejs.png";
import mongodbIcon from "@/assets/icons/mongodb.png";
import postgreIcon from "@/assets/icons/postgresql.svg";
import supabaseIcon from "@/assets/icons/supabase.jpeg";
import neonIcon from "@/assets/icons/neon.jpeg";
import dockerIcon from "@/assets/icons/docker.jpeg";
import githubIcon from "@/assets/icons/github.png";
import vercelIcon from "@/assets/icons/vercel.png";
import netlifyIcon from "@/assets/icons/netlify.png";
import figmaIcon from "@/assets/icons/figma.png";
import jestIcon from "@/assets/icons/jest.jpeg";
import framerIcon from "@/assets/icons/framer.jpeg";
import vscodeIcon from "@/assets/icons/vscode.jpeg";
import wordpressIcon from "@/assets/icons/wordpress.jpeg";
import stripeIcon from "@/assets/icons/stripe.jpeg";

export type TechCategory = "frontend" | "backend" | "devops" | "other";

export interface TechItem {
  name: string;
  category?: TechCategory;
  icon: StaticImageData;
}

export const techRegistry: TechItem[] = [
  // Frontend
  { name: "JavaScript", category: "frontend", icon: jsIcon },
  { name: "TypeScript", category: "frontend", icon: tsIcon },
  { name: "React", category: "frontend", icon: reactIcon },
  { name: "Next.js", category: "frontend", icon: nextjsIcon },
  { name: "HTML", category: "frontend", icon: htmlIcon },
  { name: "CSS", category: "frontend", icon: cssIcon },
  { name: "Tailwind CSS", category: "frontend", icon: tailwindIcon },

  // Backend
  { name: "Node.js", category: "backend", icon: nodejsIcon },
  { name: "PostgreSQL", category: "backend", icon: postgreIcon },
  { name: "Supabase", category: "backend", icon: supabaseIcon },
  { name: "Neon", category: "backend", icon: neonIcon },

  // DevOps
  { name: "Docker", category: "devops", icon: dockerIcon },
  { name: "Vercel", category: "devops", icon: vercelIcon },

  // Everything else (no category = auto Other)
  { name: "GitHub", icon: githubIcon },
  { name: "VS Code", icon: vscodeIcon },
];
