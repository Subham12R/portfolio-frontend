// Central data exports
// Import from this file for cleaner imports throughout the app

// Site configuration
export { siteConfig } from "./site.config";
export type { SiteConfig } from "./site.config";

// Experience/Work data
export { experiences, getExperiencesSorted, getCurrentPositions } from "./experience";
export type { Experience } from "./experience";

// Projects data
export {
  projects,
  getFeaturedProjects,
  getHomeProjects,
  getProjectById,
  getAllTags,
} from "./project";
export type { Project } from "./project";

// Certificates data
export { certificates, getCertificatesSorted } from "./certificates";
export type { Certificate } from "./certificates";

// Tech stack data
export { techRegistry } from "./tech.registry";
export type { TechItem, TechCategory } from "./tech.registry";

// Blog posts data
export {
  blogPosts,
  getFeaturedPosts,
  getPostsSorted,
  getPostBySlug,
  getAllBlogTags,
} from "./blog";
export type { BlogPost } from "./blog";

// Tech icons
export { techIcons, getTechIcon, hasTechIcon } from "./tech-icons";
