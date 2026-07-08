"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type { BlogPost } from "@/data/blog"
import { BlogCard } from "@/components/blog/BlogCard"

gsap.registerPlugin(ScrollTrigger)

interface AnimatedBlogGridProps {
  posts: BlogPost[]
  className?: string
}

export function AnimatedBlogGrid({ posts, className }: AnimatedBlogGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  useEffect(() => {
    if (!gridRef.current) return

    const ctx = gsap.context(() => {
      const blogItems = Array.from(
        gridRef.current?.querySelectorAll<HTMLElement>("[data-blog-item]") ?? []
      )
      if (!blogItems.length) return

      const rowMap = new Map<number, HTMLElement[]>()

      blogItems.forEach((item) => {
        const rowKey = Math.round(item.offsetTop)
        const rowItems = rowMap.get(rowKey) ?? []
        rowItems.push(item)
        rowMap.set(rowKey, rowItems)
      })

      const rows = Array.from(rowMap.entries())
        .sort((a, b) => a[0] - b[0])
        .map(([, rowItems]) => rowItems)

      rows.forEach((rowItems) => {
        gsap.fromTo(
          rowItems,
          { opacity: 0, scale: 0.95, y: -10 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: rowItems[0],
              start: "top 88%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        )
      })
    }, gridRef)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <div ref={gridRef} className={className ?? ""}>
      {posts.map((post) => (
        <div key={post.id} data-blog-item className="h-full">
          <BlogCard
            post={post}
            isBlurred={hoveredId !== null && hoveredId !== post.id}
            onHoverChange={(h) => setHoveredId(h ? post.id : null)}
          />
        </div>
      ))}
    </div>
  )
}
