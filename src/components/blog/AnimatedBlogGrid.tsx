"use client"

import { useEffect, useRef } from "react"
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
          { opacity: 0, y: 32, scale: 0.98, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.75,
            ease: "power3.out",
            stagger: 0.1,
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
    <div ref={gridRef} className={className ?? "grid grid-cols-1 md:grid-cols-2 md:auto-rows-fr gap-6"}>
      {posts.map((post) => (
        <div key={post.id} data-blog-item className="h-full">
          <BlogCard post={post} />
        </div>
      ))}
    </div>
  )
}
