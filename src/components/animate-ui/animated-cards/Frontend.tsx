"use client"

import React, { forwardRef, useRef } from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"
import { AnimatedBeam } from "@/components/ui/animated-beam"

const reactIcon = "/icons/react.png"
const nextIcon = "/icons/nextjs.jpeg"
const jsIcon = "/icons/js.png"
const tsIcon = "/icons/typescript.png"
const tailwindIcon = "/icons/tailwindcss.jpeg"


const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; src: any; alt: string }
>(({ className, src, alt }, ref) => (
  <div
    ref={ref}
    className={cn(
      "z-10 flex size-12 items-center justify-center rounded-full backdrop-blur-xl overflow-hidden border bg-white border-white/20 bg-black/40 shadow-lg",
      className
    )}
  >
    <Image src={src} alt={alt} width={100} height={40} />
  </div>
))

Circle.displayName = "Circle"

export function Card2() {
  const containerRef = useRef<HTMLDivElement>(null)

  const js = useRef<HTMLDivElement>(null)
  const ts = useRef<HTMLDivElement>(null)
  const tailwind = useRef<HTMLDivElement>(null)
  const react = useRef<HTMLDivElement>(null)
  const next = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className="relative flex h-[300px] w-full items-center justify-center overflow-hidden"
    >
      <div className="flex w-full max-w-lg justify-between">
        <div className="flex flex-col gap-3">
          <Circle ref={js} src={jsIcon} alt="JavaScript" />
          <Circle ref={ts} src={tsIcon} alt="TypeScript" />
          <Circle ref={tailwind} src={tailwindIcon} alt="Tailwind" />
        </div>

        <div className="flex items-center">
          <Circle ref={react} src={reactIcon} alt="React" className="size-16" />
        </div>

        <div className="flex items-center">
          <Circle ref={next} src={nextIcon} alt="Next.js" />
        </div>
      </div>

      {/* Beams */}
      <AnimatedBeam containerRef={containerRef} fromRef={js} toRef={react} />
      <AnimatedBeam containerRef={containerRef} fromRef={ts} toRef={react} />
      <AnimatedBeam containerRef={containerRef} fromRef={tailwind} toRef={react} />
      <AnimatedBeam containerRef={containerRef} fromRef={react} toRef={next} />
    </div>
  )
}
