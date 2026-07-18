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
    // Prevent browser restoring mid-page scroll (fights Lenis; lands at bottom)
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

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

    // Handle smooth scrolling for hash links + Home nav
    const handleHashClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      const onHome = window.location.pathname === '/';

      // Home link — always go to top when already on home
      if (href === '/' || href === '/#home' || href === '#home') {
        if (onHome) {
          e.preventDefault();
          lenis.scrollTo(0, { immediate: false });
          window.history.pushState(null, '', '/');
        }
        // Cross-route navigation: pathname effect scrolls to top
        return;
      }

      // Same-page anchor click
      if (href.startsWith('#')) {
        e.preventDefault();
        if (href === '#') {
          lenis.scrollTo(0);
          window.history.pushState(null, '', '/');
        } else {
          const targetElement = document.querySelector(href);
          if (targetElement) {
            lenis.scrollTo(targetElement as HTMLElement, { offset: -80 });
            window.history.pushState(null, '', href);
          }
        }
      } else if (href.startsWith('/#') && onHome) {
        // In-page section link while already on home
        e.preventDefault();
        const hash = href.substring(1); // e.g. "#projects"
        if (hash === '#' || hash === '#home') {
          lenis.scrollTo(0);
          window.history.pushState(null, '', '/');
        } else {
          const targetElement = document.querySelector(hash);
          if (targetElement) {
            lenis.scrollTo(targetElement as HTMLElement, { offset: -80 });
            window.history.pushState(null, '', hash);
          }
        }
      }
    };

    // Handle back/forward and script hash changes
    const handleHashChange = () => {
      if (window.location.hash && window.location.hash !== '#' && window.location.hash !== '#home') {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
          lenis.scrollTo(targetElement as HTMLElement, { offset: -80 });
        }
      } else {
        lenis.scrollTo(0, { immediate: true });
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

  // On route change: scroll to top (or to a real section hash)
  useEffect(() => {
    if (!lenisInstance) return;

    const hash = window.location.hash;

    // Plain path or home hash → always top (fixes landing at bottom after nav)
    if (!hash || hash === '#' || hash === '#home') {
      lenisInstance.scrollTo(0, { immediate: true });
      // Retry once after layout settles (route transition / async content)
      const t = window.setTimeout(() => {
        lenisInstance.scrollTo(0, { immediate: true });
      }, 50);
      return () => clearTimeout(t);
    }

    // Retry the scroll for a bit: async content can shift the target.
    let attempts = 0;
    const maxAttempts = 10;
    const interval = setInterval(() => {
      const targetElement = document.querySelector(hash);
      if (targetElement) {
        lenisInstance.scrollTo(targetElement as HTMLElement, {
          offset: -80,
          immediate: true,
        });
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

