'use client'

import { useEffect, useState, createContext, useContext } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface LenisContextValue {
  lenis: Lenis | null
}

const LenisContext = createContext<LenisContextValue>({ lenis: null })

export function useLenis() {
  return useContext(LenisContext)
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null)
  const pathname = usePathname()

  // Initialize Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      syncTouch: true,
    })

    setLenisInstance(lenis)

    lenis.on('scroll', ScrollTrigger.update)

    const update = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    // Handle smooth scrolling for hash links
    const handleHashClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Same-page anchor click
      if (href.startsWith('#')) {
        e.preventDefault();
        if (href === '#') {
          lenis.scrollTo(0, { offset: -80 });
          window.history.pushState(null, '', '/');
        } else {
          const targetElement = document.querySelector(href);
          if (targetElement) {
            lenis.scrollTo(targetElement as HTMLElement, { offset: -80 });
            window.history.pushState(null, '', href);
          }
        }
      } else if (href.startsWith('/#')) {
        // Relative anchor on home page
        const hash = href.substring(1);
        if (window.location.pathname === '/') {
          e.preventDefault();
          if (hash === '#') {
            lenis.scrollTo(0, { offset: -80 });
            window.history.pushState(null, '', '/');
          } else {
            const targetElement = document.querySelector(hash);
            if (targetElement) {
              lenis.scrollTo(targetElement as HTMLElement, { offset: -80 });
              window.history.pushState(null, '', hash);
            }
          }
        }
      }
    };

    // Handle back/forward and script hash changes
    const handleHashChange = () => {
      if (window.location.hash && window.location.hash !== '#') {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
          lenis.scrollTo(targetElement as HTMLElement, { offset: -80 });
        }
      }
    };

    document.addEventListener('click', handleHashClick);
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      gsap.ticker.remove(update)
      document.removeEventListener('click', handleHashClick)
      window.removeEventListener('hashchange', handleHashChange)
      lenis.destroy()
      setLenisInstance(null)
    }
  }, [])

  // Handle route transition hash jumps
  useEffect(() => {
    if (!lenisInstance) return;

    const hash = window.location.hash;
    if (!hash || hash === '#') return;

    // Retry the scroll for a bit: async content (data fetches, images) can
    // still shift the target element's position after the first attempt.
    let attempts = 0;
    const maxAttempts = 10;
    const interval = setInterval(() => {
      const targetElement = document.querySelector(hash);
      if (targetElement) {
        lenisInstance.scrollTo(targetElement as HTMLElement, { offset: -80, immediate: true });
      }
      attempts += 1;
      if (attempts >= maxAttempts) clearInterval(interval);
    }, 150);

    return () => clearInterval(interval);
  }, [pathname, lenisInstance]);

  return (
    <LenisContext.Provider value={{ lenis: lenisInstance }}>
      {children}
    </LenisContext.Provider>
  )
}

