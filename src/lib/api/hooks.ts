"use client";

import { useState, useEffect } from "react";
import {
  getProjects,
  getWorkExperiences,
  getCertificates,
  getSkills,
  getHighlights,
} from "./client";
import type {
  ApiProject,
  ApiWorkExperience,
  ApiCertificate,
  ApiSkill,
  ApiHighlight,
} from "./types";

interface UseApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

function useApi<T>(
  fetcher: () => Promise<T>,
  fallback: T
): UseApiState<T> & { data: T } {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      try {
        const data = await fetcher();
        if (mounted) {
          setState({ data, isLoading: false, error: null });
        }
      } catch (error) {
        if (mounted) {
          setState({
            data: null,
            isLoading: false,
            error: error instanceof Error ? error : new Error("Unknown error"),
          });
        }
      }
    }

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    ...state,
    data: state.data ?? fallback,
  };
}

export function useProjects() {
  return useApi<ApiProject[]>(getProjects, []);
}

export function useWorkExperiences() {
  return useApi<ApiWorkExperience[]>(getWorkExperiences, []);
}

export function useCertificates() {
  return useApi<ApiCertificate[]>(getCertificates, []);
}

export function useSkills() {
  return useApi<ApiSkill[]>(getSkills, []);
}

export function useHighlights() {
  return useApi<ApiHighlight[]>(getHighlights, []);
}
