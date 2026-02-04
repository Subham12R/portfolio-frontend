"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Sparkles, Camera } from "lucide-react"

interface GalleryCardProps {
  title: string
  count: number
  description: string
  buttonText: string
  href: string
  icon: "hackathon" | "photography"
  images: string[]
}

export function GalleryCard({
  title,
  count,
  description,
  buttonText,
  href,
  icon,
  images,
}: GalleryCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const IconComponent = icon === "hackathon" ? Sparkles : Camera

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Back div - taller, contains fanned images */}
      <div className="absolute inset-0 top-0  rounded-2xl bg-zinc-900/50 border border-border-primary shadow-(--skills-card-shadow) mb-4 z-0 overflow-visible">
        {/* Fanned images - positioned at top right of back div */}
        <div className="absolute top-0 right-30 pb-20">
          {images.slice(0, 4).map((img, index) => {
            const rotations = [-15, -5, 5, 15]
            const xOffsets = [-50, -25, 0, 25]
            const yOffsets = [0, -8, -12, -4]

            return (
              <div
                key={index}
                className="absolute w-22 h-16 rounded-lg overflow-hidden shadow-md bg-bg-card transition-all duration-300 ease-out"
                style={{
                  transform: isHovered
                    ? `rotate(${rotations[index]}deg) translateX(${xOffsets[index]}px) translateY(${yOffsets[index]}px)`
                    : "rotate(0deg) translateX(0px) translateY(0px) scale(0)",
                  opacity: isHovered ? 1 : 0,
                  transitionDelay: `${index * 50}ms`,
                  zIndex: 4 - index,
                }}
              >
                <Image
                  src={img}
                  alt=""
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* Front div - shorter, contains content */}
      <div className="relative rounded-2xl bottom-0 mt-8 z-10 bg-zinc-300 dark:bg-zinc-900">
        {/* Left accent border */}
        
        {/* Content */}
        <div className="p-6 pl-5">
          {/* Icon */}
          <div className="w-10 h-10 rounded-full flex items-center justify-center mb-5 bg-bg-elevated text-text-muted">
            <IconComponent size={18} strokeWidth={1.5} />
          </div>

          {/* Title + Count */}
          <div className="flex items-baseline gap-3 mb-3">
            <h3 className="text-xl font-bold text-text-primary">{title}</h3>
            <span className="text-base text-text-muted">{count}</span>
          </div>

          {/* Description */}
          <p className="text-sm text-text-secondary leading-relaxed mb-5">
            {description}
          </p>

          {/* Button */}
          <Link
            href={href}
            className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-full border border-border-primary text-text-primary hover:bg-bg-elevated transition-colors"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  )
}
