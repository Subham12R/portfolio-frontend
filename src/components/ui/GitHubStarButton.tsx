'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Star } from 'lucide-react'
import { GithubIcon } from './github'

interface GitHubStarButtonProps {
  repo: string // format: "owner/repo"
}

const CACHE_KEY = 'github-stars-cache'
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour in ms

interface CacheData {
  stars: number
  timestamp: number
  repo: string
}

function getCache(repo: string): number | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY)
    if (cached) {
      const data: CacheData = JSON.parse(cached)
      if (data.repo === repo && Date.now() - data.timestamp < CACHE_DURATION) {
        return data.stars
      }
    }
  } catch {
    // Ignore localStorage errors
  }
  return null
}

function setCache(repo: string, stars: number) {
  try {
    const data: CacheData = { stars, timestamp: Date.now(), repo }
    localStorage.setItem(CACHE_KEY, JSON.stringify(data))
  } catch {
    // Ignore localStorage errors
  }
}

export function GitHubStarButton({ repo }: GitHubStarButtonProps) {
  const [stars, setStars] = useState<number | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    // Check cache first
    const cached = getCache(repo)
    if (cached !== null) {
      setStars(cached)
      setLoaded(true)
      return
    }

    const fetchStars = async () => {
      try {
        const res = await fetch(`https://api.github.com/repos/${repo}`)
        if (res.ok) {
          const data = await res.json()
          const count = data.stargazers_count ?? 0
          setStars(count)
          setCache(repo, count)
        } else if (res.status === 403) {
          // Rate limited - use cached value if available or show nothing
          console.warn('GitHub API rate limited')
        }
      } catch (err) {
        console.error('GitHub API error:', err)
      } finally {
        setLoaded(true)
      }
    }
    fetchStars()
  }, [repo])

  const isDark = resolvedTheme === 'dark'

  // Placeholder while mounting to prevent hydration mismatch
  if (!mounted) {
    return <div className="h-9 w-16 rounded-lg bg-bg-badge" />
  }

  return (
    <a
      href={`https://github.com/${repo}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 h-9 px-2.5 rounded-lg bg-bg-badge border border-border-primary hover:border-border-secondary transition-colors duration-200"
      title="Star on GitHub"
    >
      <GithubIcon size={16} className={isDark ? 'text-zinc-400' : 'text-zinc-600'} />
      <Star size={14} className="text-yellow-500 fill-yellow-500" />
      {stars !== null && (
        <span className={`text-xs font-medium ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
          {loaded ? stars : '·'}
        </span>
      )}
    </a>
  )
}
