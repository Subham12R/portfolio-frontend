"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, Calendar } from "lucide-react";
import { MediumIcon } from "@/components/icons/MediumIcon";
import { motion, useMotionValue, useSpring, Variants } from "framer-motion";
import { encode } from "qss";
import type { MediumPost } from "@/data/blog";

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

function getMicrolinkSrc(url: string): string {
  const params = encode({
    url,
    screenshot: true,
    meta: false,
    embed: "screenshot.url",
    colorScheme: "dark",
    "viewport.isMobile": true,
    "viewport.deviceScaleFactor": 1,
    "viewport.width": IMG_W * 3,
    "viewport.height": IMG_H * 3,
  });
  return `https://api.microlink.io/?${params}`;
}

interface MediumBlogCardProps {
  post: MediumPost;
  isBlurred?: boolean;
  onHoverChange?: (hovered: boolean) => void;
}

// Animation variants for each line in the medium card
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

export function MediumBlogCard({ post, isBlurred, onHoverChange }: MediumBlogCardProps) {
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

  const previewSrc = getMicrolinkSrc(post.url);

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
      <motion.div
        className={`absolute ${placement === "below" ? "top-full" : "bottom-full"} pointer-events-none z-20 rounded-xl overflow-hidden shadow-2xl`}
        style={{ x, width: IMG_W, height: IMG_H }}
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.92, y: hovered ? 0 : placement === "below" ? 6 : -6 }}
        transition={{ duration: 0.18 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={previewSrc} alt={post.title} className="w-full h-full object-cover" />
      </motion.div>

      {/* Content */}
      <div className="flex items-start gap-3 min-w-0 flex-1">
        <MediumIcon
          size={18}
          className="shrink-0 mt-0.5 text-text-muted group-hover:text-text-secondary transition-colors duration-200"
        />
        <div className="min-w-0 w-full">
          <motion.div variants={lineVariants}>
            <a href={post.url} target="_blank" rel="noopener noreferrer">
              <h3 className="text-lg font-medium text-text-primary group-hover:text-text-secondary transition-colors duration-200 leading-snug mb-2 font-instrumentserif text-2xl font-light">
                {post.title}
              </h3>
            </a>
          </motion.div>
          <motion.div variants={lineVariants} className="flex items-center gap-1.5 text-xs text-text-muted">
            <Calendar size={12} />
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          </motion.div>
        </div>
      </div>

      <motion.div variants={lineVariants} className="shrink-0 pt-1">
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-text-muted group-hover:text-text-primary transition-colors duration-200"
        >
          Read more
          <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </a>
      </motion.div>
    </article>
  );
}
