'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <div className="w-9 h-9" />
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-bg-badge border border-border-primary hover:border-border-secondary transition-colors duration-200 cursor-pointer"
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      <Sun
        size={16}
        className={`absolute transition-all duration-300 ${
          isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
        } text-zinc-900`}
      />
      <Moon
        size={16}
        className={`absolute transition-all duration-300 ${
          isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
        } text-zinc-200`}
      />
    </button>
  )
}