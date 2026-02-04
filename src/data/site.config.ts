// Site-wide configuration and personal information
// This file serves as the single source of truth for all personal data

export const siteConfig = {
  name: "Subham Karmakar",
  title: "Subham12r",
  role: "Full Stack Developer",
  description: "Full Stack Developer Portfolio",
  location: "Kolkata, West Bengal, India",
  timezone: "Asia/Kolkata",
  email: "rikk4335@gmail.com",

  // Bio and introduction
  bio: {
    short: "I'm a full-stack developer who enjoys turning complex problems into simple, elegant solutions.",
    long: `I'm a full-stack developer who enjoys turning complex problems into simple, elegant solutions. I focus on building scalable, performant web applications with clean architecture, thoughtful design, and real world impact. From idea to production, I care about writing code that's maintainable, meaningful, and built to last.`,
    about: `I'm Subham Karmakar, a B.Tech student and developer from Kolkata. I build full-stack applications with modern web technologies, while constantly exploring areas like databases, system design, and developer tooling. I enjoy turning ideas into practical solutions—whether it's experimenting with visual tools, solving algorithmic problems, or contributing to larger technical projects.`
  },

  // Rotating titles for hero animation
  titles: [
    "Full Stack Developer",
    "Frontend Engineer",
    "Freelance Developer",
    "Open Source Contributor",
    "Tech Enthusiast",
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
