'use client'

import { createContext, useContext } from 'react'

interface LenisContextValue {
  lenis: null
}

const LenisContext = createContext<LenisContextValue>({ lenis: null })

export function useLenis() {
  return useContext(LenisContext)
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <LenisContext.Provider value={{ lenis: null }}>
      {children}
    </LenisContext.Provider>
  )
}
