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
import fastapiIcon from "@/assets/icons/fastapi.webp";
import pythonIcon from "@/assets/icons/python.png";
import n8nIcon from "@/assets/icons/n8n.png";

// New / missing icons
import reduxIcon from "@/assets/icons/redux.png";
import viteIcon from "@/assets/icons/vite.svg";
import zodIcon from "@/assets/icons/zod.png";
import gsapIcon from "@/assets/icons/gsap.svg";
import reactnativeIcon from "@/assets/icons/reactnative.png";
import reactreanimatedIcon from "@/assets/icons/reactreanimated.png";
import nativewindIcon from "@/assets/icons/nativewind.jpeg";
import expoIcon from "@/assets/icons/expo.webp";
import betterAuthIcon from "@/assets/icons/better-auth.png";
import sqliteIcon from "@/assets/icons/sqlite.jpeg";
import canvaIcon from "@/assets/icons/canva.jpeg";
import cursorIcon from "@/assets/icons/cursor.webp";
import lenisIcon from "@/assets/icons/lenis.png";
import electronIcon from "@/assets/icons/electron.jpg";
import mediumIcon from "@/assets/icons/medium.jpeg";
import udemyIcon from "@/assets/icons/udemy.png";
import hackerrankIcon from "@/assets/icons/hackerrank.svg";
import xgboostIcon from "@/assets/icons/xgboost.png";
import zedIcon from "@/assets/icons/zed.png";
import socketioIcon from "@/assets/icons/socketio.png";

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
  // { name: "HTML", category: "frontend", icon: htmlIcon },
  // { name: "CSS", category: "frontend", icon: cssIcon },
  { name: "Tailwind CSS", category: "frontend", icon: tailwindIcon },
  // { name: "Framer Motion", category: "frontend", icon: framerIcon },
  // { name: "GSAP", category: "frontend", icon: gsapIcon },
  // { name: "Redux", category: "frontend", icon: reduxIcon },
  // { name: "Vite", category: "frontend", icon: viteIcon },
  // { name: "React Native", category: "frontend", icon: reactnativeIcon },
  // { name: "React Reanimated", category: "frontend", icon: reactreanimatedIcon },
  // { name: "NativeWind", category: "frontend", icon: nativewindIcon },
  // { name: "Expo", category: "frontend", icon: expoIcon },

  // Backend
  { name: "Python", category: "backend", icon: pythonIcon },
  { name: "Node.js", category: "backend", icon: nodejsIcon },
  { name: "PostgreSQL", category: "backend", icon: postgreIcon },
  { name: "Neon", category: "backend", icon: neonIcon },
  // { name: "MongoDB", category: "backend", icon: mongodbIcon },
  // { name: "FastAPI", category: "backend", icon: fastapiIcon },
  // { name: "SQLite", category: "backend", icon: sqliteIcon },
  // { name: "Supabase", category: "backend", icon: supabaseIcon },
  // { name: "Socket.io", category: "backend", icon: socketioIcon },
  
  // DevOps
  { name: "Docker", category: "devops", icon: dockerIcon },
  { name: "Vercel", category: "devops", icon: vercelIcon },
  // { name: "Netlify", category: "devops", icon: netlifyIcon },
  
  // Everything else (no category = auto Other)
  { name: "GitHub", icon: githubIcon },
  // { name: "VS Code", icon: vscodeIcon },
  { name: "N8N", category: "other", icon: n8nIcon },
  // { name: "Better-Auth", category: "other", icon: betterAuthIcon },
  // { name: "Figma", category: "other", icon: figmaIcon },
  // { name: "Jest", category: "other", icon: jestIcon },
  { name: "Stripe", category: "other", icon: stripeIcon },
  // { name: "WordPress", category: "other", icon: wordpressIcon },
  // { name: "Canva", category: "other", icon: canvaIcon },
  { name: "Cursor", category: "other", icon: cursorIcon },
  // { name: "Lenis", category: "other", icon: lenisIcon },
  // { name: "Electron", category: "other", icon: electronIcon },
  // { name: "Medium", category: "other", icon: mediumIcon },
  // { name: "Udemy", category: "other", icon: udemyIcon },
  // { name: "HackerRank", category: "other", icon: hackerrankIcon },
  // { name: "XGBoost", category: "other", icon: xgboostIcon },
  // { name: "Zed", category: "other", icon: zedIcon },
  // { name: "Zod", category: "other", icon: zodIcon },
];
