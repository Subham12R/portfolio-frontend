"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure ScrollTrigger is registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
  children: React.ReactNode;
  stagger?: number;
  start?: string;
  className?: string;
}

export function ScrollReveal({
  children,
  stagger = 0.08,
  start = "top 88%",
  className = "w-full flex flex-col",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      const targets = containerRef.current!.children;
      if (!targets.length) return;

      gsap.fromTo(
        targets,
        { opacity: 0, scale: 0.95, y: -10 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start,
            toggleActions: "play none none none",
            once: true,
          },
          clearProps: "all",
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [stagger, start]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
