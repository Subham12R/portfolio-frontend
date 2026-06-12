'use client'

import { useEffect, useState, createContext, useContext } from 'react'
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

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    })

    setLenisInstance(lenis)

    lenis.on('scroll', ScrollTrigger.update)

    const update = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(update)
      lenis.destroy()
      setLenisInstance(null)
    }
  }, [])

  return (
    <LenisContext.Provider value={{ lenis: lenisInstance }}>
      {children}
    </LenisContext.Provider>
  )
}
