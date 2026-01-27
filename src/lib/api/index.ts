// API Module - centralized exports
export * from "./types";
export * from "./client";
export * from "./hooks";
export * from "./transformers";

// Server-side utilities (use only in Server Components)
export {
  fetchProjects,
  fetchWorkExperiences,
  fetchCertificates,
  fetchSkillsByCategory,
  fetchPortfolioData,
  fetchFeaturedProjects,
  fetchHomeProjects,
} from "./server";
