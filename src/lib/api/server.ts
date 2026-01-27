// Server-side data fetching utilities
// Use these in Server Components (pages, layouts) for better performance

import {
  getProjects,
  getWorkExperiences,
  getCertificates,
  getSkills,
  getHighlights,
} from "./client";
import {
  transformProjects,
  transformWorkExperiences,
  transformCertificates,
  transformSkills,
} from "./transformers";
import type { Project } from "@/data/project";
import type { Experience } from "@/data/experience";
import type { Certificate } from "@/data/certificates";

// Import static data as fallbacks
import { projects as staticProjects } from "@/data/project";
import { experiences as staticExperiences } from "@/data/experience";
import { certificates as staticCertificates } from "@/data/certificates";

/**
 * Fetch projects from API with static fallback
 * Use in Server Components for optimal performance
 */
export async function fetchProjects(): Promise<Project[]> {
  try {
    const apiProjects = await getProjects();
    if (apiProjects.length > 0) {
      return transformProjects(apiProjects);
    }
    return staticProjects;
  } catch (error) {
    console.error("Failed to fetch projects from API, using static data:", error);
    return staticProjects;
  }
}

/**
 * Fetch work experiences from API with static fallback
 */
export async function fetchWorkExperiences(): Promise<Experience[]> {
  try {
    const apiExperiences = await getWorkExperiences();
    if (apiExperiences.length > 0) {
      return transformWorkExperiences(apiExperiences);
    }
    return staticExperiences;
  } catch (error) {
    console.error("Failed to fetch experiences from API, using static data:", error);
    return staticExperiences;
  }
}

/**
 * Fetch certificates from API with static fallback
 */
export async function fetchCertificates(): Promise<Certificate[]> {
  try {
    const apiCertificates = await getCertificates();
    if (apiCertificates.length > 0) {
      return transformCertificates(apiCertificates);
    }
    return staticCertificates;
  } catch (error) {
    console.error("Failed to fetch certificates from API, using static data:", error);
    return staticCertificates;
  }
}

/**
 * Fetch skills grouped by category from API
 */
export async function fetchSkillsByCategory(): Promise<Record<string, string[]>> {
  try {
    const apiSkills = await getSkills();
    if (apiSkills.length > 0) {
      return transformSkills(apiSkills);
    }
    // Return empty object if no skills (will use frontend static data)
    return {};
  } catch (error) {
    console.error("Failed to fetch skills from API:", error);
    return {};
  }
}

/**
 * Fetch all portfolio data at once
 * Useful for pages that need multiple data sources
 */
export async function fetchPortfolioData() {
  const [projects, experiences, certificates, skills] = await Promise.all([
    fetchProjects(),
    fetchWorkExperiences(),
    fetchCertificates(),
    fetchSkillsByCategory(),
  ]);

  return {
    projects,
    experiences,
    certificates,
    skills,
  };
}

/**
 * Fetch featured projects only
 */
export async function fetchFeaturedProjects(): Promise<Project[]> {
  const projects = await fetchProjects();
  return projects.filter((p) => p.featured);
}

/**
 * Fetch home page projects (limited to first N)
 */
export async function fetchHomeProjects(limit: number = 4): Promise<Project[]> {
  const projects = await fetchProjects();
  return projects.slice(0, limit);
}
