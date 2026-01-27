"use client"

import React, { forwardRef, useRef } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { AnimatedBeam } from "@/components/ui/animated-beam"

const databaseIcon = "/icons/database.png"
const nodejsIcon = "/icons/nodejs.png"
const mongodbIcon = "/icons/mongodb.png"
const postgresqlIcon = "/icons/postgresql.png"
const supabaseIcon = "/icons/supabase.jpeg"
const neonIcon = "/icons/neon.jpeg"


const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; src: any; alt: string }
>(({ className, src, alt }, ref) => (
  <div
    ref={ref}
    className={cn(
      "z-10 flex size-12 items-center justify-center rounded-full backdrop-blur-xl bg-white overflow-hidden border border-white/20  shadow-lg object-cover",
      className
    )}
  >
    <Image src={src} alt={alt} width={100} height={40} />
  </div>
))

Circle.displayName = "Circle"

export function Card1() {
  const containerRef = useRef<HTMLDivElement>(null)

  const dbTop = useRef<HTMLDivElement>(null)
  const supabase = useRef<HTMLDivElement>(null)

  const node = useRef<HTMLDivElement>(null)
  const coreDb = useRef<HTMLDivElement>(null)
  const mongo = useRef<HTMLDivElement>(null)

  const neon1 = useRef<HTMLDivElement>(null)
  const neon2 = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className="relative flex h-[300px] w-full items-center justify-center overflow-hidden"
    >
      <div className="flex w-full max-w-lg flex-col gap-10">
        <div className="flex justify-between">
          <Circle ref={dbTop} src={postgresqlIcon} alt="PostgreSQL" />
          <Circle ref={supabase} src={supabaseIcon} alt="Supabase" />
        </div>

        <div className="flex justify-between items-center">
          <Circle ref={node} src={nodejsIcon} alt="Node.js" />
          <Circle
            ref={coreDb}
            src={databaseIcon}
            alt="Core DB"
            className="size-16"
          />
          <Circle ref={mongo} src={mongodbIcon} alt="MongoDB" />
        </div>

        <div className="flex justify-between">
          <Circle ref={neon1} src={neonIcon} alt="Neon" />
          <Circle ref={neon2} src={neonIcon} alt="Neon Replica" />
        </div>
      </div>

      {/* Beams */}
      <AnimatedBeam containerRef={containerRef} fromRef={dbTop} toRef={coreDb} curvature={-70} />
      <AnimatedBeam containerRef={containerRef} fromRef={node} toRef={coreDb} />
      <AnimatedBeam containerRef={containerRef} fromRef={neon1} toRef={coreDb} curvature={70} />
      <AnimatedBeam containerRef={containerRef} fromRef={supabase} toRef={coreDb} reverse curvature={-70} />
      <AnimatedBeam containerRef={containerRef} fromRef={mongo} toRef={coreDb} reverse />
      <AnimatedBeam containerRef={containerRef} fromRef={neon2} toRef={coreDb} reverse curvature={70} />
    </div>
  )
}
