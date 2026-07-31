// Site-wide configuration and personal information
// This file serves as the single source of truth for all personal data

export const siteConfig = {
  name: "Subham Karmakar",
  title: "Subham12r",
  url: "https://www.subham12r.me",
  role: "Full-Stack AI Developer",
  description: "Subham Karmakar is a full-stack AI developer in Kolkata building production-ready products with Next.js, TypeScript, FastAPI, PostgreSQL, Redis, Docker, and LLM workflows.",
  location: "Kolkata, West Bengal, India",
  timezone: "Asia/Kolkata",
  email: "dev@subham12r.me",

  // Bio and introduction
  bio: {
    short: "Full-stack AI developer building applied-AI products, scalable backend services, and polished frontend experiences.",
    long: `Full-stack AI developer based in Kolkata. I build production-ready products across the stack: polished interfaces, reliable backend services, cloud infrastructure, and practical LLM workflows. My work spans Next.js, TypeScript, FastAPI, PostgreSQL, Redis, Docker, and developer tooling.`,
    about: `I'm Subham Karmakar, a B.Tech Computer Science student at Adamas University and a full-stack AI developer from Kolkata. I build end-to-end products with modern web technologies, backend systems, cloud infrastructure, and practical AI workflows—from the interface and API to deployment, monitoring, and documentation.`
  },

  // Rotating titles for hero animation
  titles: [
    "Full-Stack AI Developer",
    "Applied AI Builder",
    "Backend & DevOps Engineer",
    "Open Source Contributor",
    "Developer Toolmaker",
  ],

  // Social media links
  socials: {
    github: {
      url: "https://github.com/Subham12R",
      username: "Subham12R",
      display: "Subham12r",
    },
    linkedin: {
      url: "https://www.linkedin.com/in/subham12r/",
      username: "subham12r",
      display: "subham12r",
    },
    twitter: {
      url: "https://x.com/Subham12R",
      username: "Subham12R",
      display: "@Subham12r",
    },
    youtube: {
      url: "https://www.youtube.com/@SubhamX8",
      username: "SubhamX8",
      display: "@SubhamX8",
    },
    discord: {
      username: "subham_c9",
      display: "subham_c9",
    },
    instagram: {
      url: "https://instagram.com/subham12r",
      username: "subham12r",
      display: "subham12r",
    },
  },

  // Navigation links
  navigation: {
    main: [
      { name: "Home", href: "#home" },
      { name: "Experience", href: "#experience" },
      { name: "Projects", href: "#projects" },
      { name: "Skills", href: "#skills" },
      { name: "About", href: "#about" },
      { name: "Contact", href: "#contact" },
    ],
  },

  // Section configuration
  sections: {
    experience: { id: "experience", number: "01", title: "Experience" },
    projects: { id: "projects", number: "02", title: "Projects" },
    skills: { id: "skills", number: "03", title: "Skills & Technologies" },
    about: { id: "about", number: "04", title: "About Me" },
    blog: { id: "blog", number: "05", title: "Blog" },
    certificates: { id: "certificates", number: "06", title: "Certifications" },
    gallery: { id: "gallery", number: "08", title: "Gallery" },
    contact: { id: "contact", number: "07", title: "Contact" },
  },

  // Cal.com configuration for scheduling
  calendar: {
    username: "subham12r",
    eventSlug: "30min",
  },

  // Resume/CV
  resume: {
    path: "/Resume.pdf",
    filename: "Subham_Karmakar_Resume.pdf",
  },
} as const;

export type SiteConfig = typeof siteConfig;
