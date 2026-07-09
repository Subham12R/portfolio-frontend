"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import type { BlogPost } from "@/data/blog";
import { BlogCard } from "@/components/blog/BlogCard";

interface AnimatedBlogGridProps {
  posts: BlogPost[];
  className?: string;
}

const itemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: (i % 3) * 0.08,
    },
  }),
};

function BlogCardSkeleton() {
  return (
    <div className="flex items-start justify-between gap-6 py-6 border-b border-border-primary last:border-0 bg-bg-primary w-full">
      <div className="flex-1 min-w-0 space-y-3">
        <div className="flex gap-1.5">
          <div className="h-5 w-12 bg-bg-badge/10 rounded animate-pulse" />
          <div className="h-5 w-14 bg-bg-badge/10 rounded animate-pulse" />
        </div>
        <div className="h-6 w-3/4 bg-bg-badge/15 rounded-md animate-pulse" />
        <div className="space-y-1.5">
          <div className="h-4 w-full bg-bg-badge/10 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-bg-badge/10 rounded animate-pulse" />
        </div>
        <div className="h-4 w-1/4 bg-bg-badge/10 rounded animate-pulse" />
      </div>
      <div className="h-5 w-16 bg-bg-badge/10 rounded animate-pulse shrink-0 pt-1" />
    </div>
  );
}

export function AnimatedBlogGrid({ posts, className }: AnimatedBlogGridProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={className ?? ""}>
        {Array.from({ length: 3 }).map((_, idx) => (
          <BlogCardSkeleton key={idx} />
        ))}
      </div>
    );
  }

  return (
    <div className={className ?? ""}>
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          custom={index}
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1, margin: "-40px" }}
          className="h-full"
        >
          <BlogCard
            post={post}
            isBlurred={hoveredId !== null && hoveredId !== post.id}
            onHoverChange={(h) => setHoveredId(h ? post.id : null)}
          />
        </motion.div>
      ))}
    </div>
  );
}
