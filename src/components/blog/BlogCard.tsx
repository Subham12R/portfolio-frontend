"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import { motion, useMotionValue, useSpring, Variants } from "framer-motion";
import type { BlogPost } from "@/data/blog";

const IMG_W = 280;
const IMG_H = 160;

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

interface BlogCardProps {
  post: BlogPost;
  isBlurred?: boolean;
  onHoverChange?: (hovered: boolean) => void;
}

// Animation variants for each line in the blog card
const lineVariants: Variants = {
  hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 0.8,
    },
  },
};

export function BlogCard({ post, isBlurred, onHoverChange }: BlogCardProps) {
  const [hovered, setHovered] = useState(false);
  const [placement, setPlacement] = useState<"below" | "above">("below");
  const rowRef = useRef<HTMLElement>(null);

  const rawX = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 200, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!rowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    const clamped = Math.max(0, Math.min(rect.width - IMG_W, e.clientX - rect.left - IMG_W / 2));
    rawX.set(clamped);
  };

  const href = `/blog/${post.slug}`;

  return (
    <article
      ref={rowRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        if (rowRef.current) {
          const rect = rowRef.current.getBoundingClientRect();
          setPlacement(window.innerHeight - rect.bottom >= IMG_H + 8 ? "below" : "above");
        }
        setHovered(true);
        onHoverChange?.(true);
      }}
      onMouseLeave={() => { setHovered(false); onHoverChange?.(false); }}
      style={{ zIndex: hovered ? 30 : 0 }}
      className={`group relative flex items-start justify-between gap-6 py-6 border-b border-border-primary last:border-0 transition-[filter,opacity] duration-300 ${isBlurred ? "opacity-40 blur-sm" : ""}`}
    >
      {/* Mouse-tracking banner — anchored below the border line */}
      {post.coverImage && (
        <motion.div
          className={`absolute ${placement === "below" ? "top-full" : "bottom-full"} pointer-events-none z-50 rounded-xl overflow-hidden shadow-2xl`}
          style={{ x, width: IMG_W, height: IMG_H }}
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.92, y: hovered ? 0 : placement === "below" ? 6 : -6 }}
          transition={{ duration: 0.18 }}
        >
          <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
        </motion.div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <motion.div variants={lineVariants} className="flex flex-wrap gap-1.5 mb-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded border-2 shadow-[inset_0px_0px_2px_2px_rgba(0,0,0,0.08)] dark:shadow-[inset_0px_0px_4px_4px_rgba(255,255,255,0.04)] border-border-primary text-text-muted">
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.div variants={lineVariants}>
          <Link href={href}>
            <h3 className="text-lg font-medium text-text-primary group-hover:text-text-secondary transition-colors duration-200 leading-snug mb-1.5 font-instrumentserif text-2xl font-light">
              {post.title}
            </h3>
          </Link>
        </motion.div>

        <motion.p variants={lineVariants} className="text-sm text-text-muted leading-relaxed line-clamp-2 mb-3 font-light">
          {post.excerpt}
        </motion.p>

        <motion.div variants={lineVariants} className="flex items-center gap-1.5 text-xs text-text-muted">
          <Calendar size={12} />
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        </motion.div>
      </div>

      <motion.div variants={lineVariants} className="shrink-0 pt-1">
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-sm text-text-muted group-hover:text-text-primary transition-colors duration-200"
        >
          Read more
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
        </Link>
      </motion.div>
    </article>
  );
}
