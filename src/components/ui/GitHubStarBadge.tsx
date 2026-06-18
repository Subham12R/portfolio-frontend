"use client";

import { useEffect, useState } from "react";
import { GithubIcon } from "./github";
import { Star } from "lucide-react";

interface Props {
  repo: string;
}

const CACHE_KEY = "github-stars-cache-badge";
const CACHE_DURATION = 60 * 60 * 1000;

interface CacheData {
  stars: number;
  timestamp: number;
  repo: string;
}

function getCache(repo: string): number | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const data: CacheData = JSON.parse(cached);
      if (data.repo === repo && Date.now() - data.timestamp < CACHE_DURATION) {
        return data.stars;
      }
    }
  } catch {}
  return null;
}

function setCache(repo: string, stars: number) {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ stars, timestamp: Date.now(), repo })
    );
  } catch {}
}

export function GitHubStarBadge({ repo }: Props) {
  const [stars, setStars] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const cached = getCache(repo);
    if (cached !== null) {
      setStars(cached);
      return;
    }

    fetch(`https://api.github.com/repos/${repo}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        const count = data.stargazers_count ?? 0;
        setStars(count);
        setCache(repo, count);
      })
      .catch(() => {});
  }, [repo]);

  if (!mounted) {
    return (
      <div className="h-10 w-16 rounded-md bg-bg-badge/10 border-2 shadow-[inset_0px_0px_2px_2px_rgba(0,0,0,0.08)] dark:shadow-[inset_0px_0px_4px_4px_rgba(255,255,255,0.04)] border-border-primary" />
    );
  }

  return (
    <a
      href={`https://github.com/${repo}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 h-10 px-2 rounded-md underline underline-offset-4 underline-color-text-muted transition-colors duration-200"
    >
      <GithubIcon size={25} className="text-text-secondary" />
  
      <span className="text-md font-medium text-text-secondary whitespace-nowrap">
        {stars !== null ? stars : "·"} 
      </span>
    </a>
  );
}
