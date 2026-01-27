'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTheme } from 'next-themes'

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealTextProps {
  children: React.ReactNode
  as?: React.ElementType
  className?: string
  start?: string
  end?: string
  stagger?: number
}

function processNode(node: React.ReactNode, keyPrefix: string): React.ReactNode {
  if (typeof node === 'string') {
    const segments = node.split(/(\s+)/)
    return segments.map((segment, i) => {
      if (/^\s+$/.test(segment)) return segment
      if (segment === '') return null
      return (
        <span
          key={`${keyPrefix}-${i}`}
          data-scroll-word=""
          style={{ opacity: 0.4 }}
        >
          {segment}
        </span>
      )
    })
  }

  if (typeof node === 'number') {
    return (
      <span key={keyPrefix} data-scroll-word="" style={{ opacity: 0.4 }}>
        {String(node)}
      </span>
    )
  }

  if (React.isValidElement(node)) {
    const element = node as React.ReactElement<Record<string, unknown>>
    const children = (element.props as { children?: React.ReactNode }).children
    const newChildren = React.Children.map(
      children,
      (child, i) => processNode(child, `${keyPrefix}-c${i}`)
    )
    return React.cloneElement(element, { key: element.key ?? `${keyPrefix}-el` } as Record<string, unknown>, newChildren)
  }

  if (Array.isArray(node)) {
    return node.map((child, i) => processNode(child, `${keyPrefix}-a${i}`))
  }

  return node
}

export function ScrollRevealText({
  children,
  as: Tag = 'p',
  className,
  start = 'top 80%',
  end = 'top 30%',
  stagger = 0.05,
}: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()

  const processed = React.Children.map(children, (child, i) =>
    processNode(child, `sr-${i}`)
  )

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const words = containerRef.current!.querySelectorAll('[data-scroll-word]')
      if (!words.length) return

      gsap.fromTo(
        words,
        { opacity: 0.4 },
        {
          opacity: 1,
          stagger,
          scrollTrigger: {
            trigger: containerRef.current,
            start,
            end,
            scrub: true,
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [resolvedTheme, start, end, stagger])

  return (
    <Tag ref={containerRef} className={className}>
      {processed}
    </Tag>
  )
}
