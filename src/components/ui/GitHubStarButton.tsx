'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Star } from 'lucide-react'
import { GithubIcon } from './github'

interface GitHubStarButtonProps {
  repo: string // format: "owner/repo"
}

export function GitHubStarButton({ repo }: GitHubStarButtonProps) {
  const [stars, setStars] = useState<number>(0)
  const [loaded, setLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const res = await fetch(`https://api.github.com/repos/${repo}`)
        if (res.ok) {
          const data = await res.json()
          setStars(data.stargazers_count ?? 0)
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
      <span className={`text-xs font-medium ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
        {loaded ? stars : '·'}
      </span>
    </a>
  )
}
