// Transform API responses to frontend data types
import type {
  ApiProject,
  ApiWorkExperience,
  ApiCertificate,
  ApiSkill,
} from "./types";
import type { Project } from "@/data/project";
import type { Experience } from "@/data/experience";
import type { Certificate } from "@/data/certificates";

// Format date to display period (e.g., "Jan 2025 – Present")
function formatPeriod(startDate: string, endDate: string | null): string {
  const start = new Date(startDate);
  const startStr = start.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  if (!endDate) {
    return `${startStr} – Present`;
  }

  const end = new Date(endDate);
  const endStr = end.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return `${startStr} – ${endStr}`;
}

// Format date as MM.YYYY
function formatProjectPeriod(createdAt: string): string {
  const date = new Date(createdAt);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}.${year}`;
}

// Extract YouTube video ID from URL
function extractYoutubeId(url: string | null): string | undefined {
  if (!url) return undefined;

  // Handle various YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/, // Direct video ID
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return undefined;
}

// Generate number ID from index (01, 02, 03, etc.)
function generateNumberId(index: number): string {
  return String(index + 1).padStart(2, "0");
}

export function transformProject(
  apiProject: ApiProject,
  index: number
): Project {
  // Parse features from longDescription (split by newlines or use as single description)
  const features = apiProject.longDescription
    ? apiProject.longDescription
        .split("\n")
        .filter((line) => line.trim())
        .slice(0, 5) // Limit to 5 features
    : [apiProject.shortDescription];

  return {
    id: apiProject.id,
    numberId: generateNumberId(index),
    title: apiProject.title,
    period: formatProjectPeriod(apiProject.createdAt),
    description: apiProject.shortDescription,
    features,
    tags: apiProject.techStack || [],
    bannerImage: apiProject.thumbnailUrl || undefined,
    youtubeId: extractYoutubeId(apiProject.youtubeUrl),
    featured: apiProject.featured,
    status: "completed", // Backend doesn't have status field yet
    links: {
      github: apiProject.repoUrl || undefined,
      live: apiProject.liveUrl || undefined,
    },
  };
}

export function transformProjects(apiProjects: ApiProject[]): Project[] {
  return apiProjects.map((project, index) => transformProject(project, index));
}

export function transformWorkExperience(
  apiWork: ApiWorkExperience
): Experience {
  return {
    id: apiWork.id,
    company: apiWork.company,
    role: apiWork.role,
    period: formatPeriod(apiWork.startDate, apiWork.endDate),
    startDate: apiWork.startDate,
    endDate: apiWork.endDate || undefined,
    location: apiWork.location || undefined,
    type: "full-time", // Backend doesn't have type field yet, default to full-time
    logo: apiWork.logoUrl || "/images/companies/default.png",
    description: apiWork.description || "",
    techStack: apiWork.techStack || [],
    links: {
      company: apiWork.website || undefined,
    },
  };
}

export function transformWorkExperiences(
  apiWorks: ApiWorkExperience[]
): Experience[] {
  return apiWorks.map(transformWorkExperience);
}

export function transformCertificate(apiCert: ApiCertificate): Certificate {
  return {
    id: apiCert.id,
    title: apiCert.title,
    issuer: apiCert.issuer,
    issueDate: apiCert.issueDate || undefined,
    logo: apiCert.logoUrl || "/certificates/default.png",
    credential: apiCert.credentialUrl || "#",
  };
}

export function transformCertificates(
  apiCerts: ApiCertificate[]
): Certificate[] {
  return apiCerts.map(transformCertificate);
}

// Skill transformer - groups skills by category
export function transformSkills(apiSkills: ApiSkill[]): Record<string, string[]> {
  const grouped: Record<string, string[]> = {};

  for (const skill of apiSkills) {
    const category = skill.category || "Other";
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(skill.name);
  }

  return grouped;
}
