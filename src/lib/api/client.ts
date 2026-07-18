import type {
  ApiProject,
  ApiWorkExperience,
  ApiCertificate,
  ApiSkill,
  ApiHighlight,
} from "./types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/** Shared tag for on-demand revalidation (POST /api/revalidate). */
export const PORTFOLIO_API_CACHE_TAG = "portfolio-api";

/** Production data-cache TTL in seconds. Dev always bypasses. */
export const PORTFOLIO_API_REVALIDATE = 3600;

async function fetchApi<T>(endpoint: string): Promise<T> {
  // Dev: no-store so admin panel changes show immediately locally.
  // Prod: Next data cache + CDN ISR (1h); bust with revalidateTag.
  const cacheOptions =
    process.env.NODE_ENV === "development"
      ? { cache: "no-store" as const }
      : {
          next: {
            revalidate: PORTFOLIO_API_REVALIDATE,
            tags: [PORTFOLIO_API_CACHE_TAG],
          },
        };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...cacheOptions,
  });

  if (!response.ok) {
    throw new ApiError(
      response.status,
      `API Error: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

// Public API endpoints
export async function getProjects(): Promise<ApiProject[]> {
  return fetchApi<ApiProject[]>("/api/projects");
}

export async function getProjectById(id: string): Promise<ApiProject> {
  return fetchApi<ApiProject>(`/api/projects/${id}`);
}

export async function getWorkExperiences(): Promise<ApiWorkExperience[]> {
  return fetchApi<ApiWorkExperience[]>("/api/work-experiences");
}

export async function getCertificates(): Promise<ApiCertificate[]> {
  return fetchApi<ApiCertificate[]>("/api/certificates");
}

export async function getSkills(): Promise<ApiSkill[]> {
  return fetchApi<ApiSkill[]>("/api/skills");
}

export async function getHighlights(): Promise<ApiHighlight[]> {
  return fetchApi<ApiHighlight[]>("/api/highlights");
}

// Helper to check if API is available
export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch {
    return false;
  }
}

export { ApiError };
