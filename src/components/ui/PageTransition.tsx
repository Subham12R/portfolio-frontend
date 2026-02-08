'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import gsap from 'gsap'

export function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const blurRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()
  const prevThemeRef = useRef<string | undefined>(undefined)
  const isInitialMount = useRef(true)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  // Initial page load - slide up animation
  const animateInitialReveal = () => {
    if (!overlayRef.current || !containerRef.current) return

    if (timelineRef.current) {
      timelineRef.current.kill()
    }

    gsap.set(containerRef.current, { display: 'block', opacity: 1 })
    gsap.set(overlayRef.current, { yPercent: 0 })

    timelineRef.current = gsap.timeline({
      onComplete: () => {
        if (containerRef.current) {
          gsap.set(containerRef.current, { display: 'none' })
        }
      },
    })

    timelineRef.current.to(overlayRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: 'power3.inOut',
      delay: 0.15,
    })
  }

  // Theme change - soft blur fade
  const animateThemeChange = () => {
    if (!blurRef.current || !containerRef.current) return

    if (timelineRef.current) {
      timelineRef.current.kill()
    }

    // Reset overlay position (keep it out of view)
    gsap.set(overlayRef.current, { yPercent: -100 })
    gsap.set(containerRef.current, { display: 'block' })
    gsap.set(blurRef.current, { opacity: 0 })

    timelineRef.current = gsap.timeline({
      onComplete: () => {
        if (containerRef.current) {
          gsap.set(containerRef.current, { display: 'none' })
        }
      },
    })

    // Fade blur in then out
    timelineRef.current
      .to(blurRef.current, {
        opacity: 1,
        duration: 0.15,
        ease: 'power2.out',
      })
      .to(blurRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.inOut',
      })
  }

  // Initial page load animation
  useEffect(() => {
    animateInitialReveal()
    const timer = setTimeout(() => {
      isInitialMount.current = false
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Theme change animation
  useEffect(() => {
    if (isInitialMount.current) {
      prevThemeRef.current = resolvedTheme
      return
    }

    if (prevThemeRef.current !== resolvedTheme) {
      prevThemeRef.current = resolvedTheme
      animateThemeChange()
    }
  }, [resolvedTheme])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-100 pointer-events-none overflow-hidden"
    >
      {/* Blur overlay for theme changes - fades in/out */}
      <div
        ref={blurRef}
        className="absolute inset-0 backdrop-blur-md bg-bg-primary/50"
        style={{ opacity: 0 }}
      />

      {/* Slide overlay for initial load */}
      <div
        ref={overlayRef}
        className="absolute left-0 right-0"
        style={{ top: 0, height: '120vh' }}
      >
        <div className="absolute inset-0 backdrop-blur-xl bg-bg-primary" />
      </div>
    </div>
  )
}
