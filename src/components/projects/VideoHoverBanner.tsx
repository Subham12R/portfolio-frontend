"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const RHOMBUS_TINY =
  "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)";

// ~20% expanded — thinner tilted rectangle
const RHOMBUS_PEEK =
  "polygon(53% 42%, 72% 50%, 47% 58%, 28% 50%)";

// Full — thin tilted rectangle that fully covers the container
const RHOMBUS_FULL =
  "polygon(65% -60%, 160% 50%, 35% 160%, -60% 50%)";

interface VideoHoverBannerProps {
  bannerImage?: string;
  youtubeId?: string;
  videoUrl?: string;
  loomId?: string;
  title: string;
  className?: string;
  /** Skip hover interaction — immediately mount and reveal the video */
  autoPlay?: boolean;
}

export function VideoHoverBanner({
  bannerImage,
  youtubeId,
  videoUrl,
  loomId,
  title,
  className,
  autoPlay = false,
}: VideoHoverBannerProps) {
  const [hovered, setHovered] = useState(false);

  const hasVideo = !!(youtubeId || videoUrl || loomId);
  const isExpanded = autoPlay || hovered;

  const handleMouseEnter = () => {
    if (autoPlay) return;
    setHovered(true);
  };

  const handleMouseLeave = () => {
    if (autoPlay) return;
    setHovered(false);
  };

  if (!bannerImage && !hasVideo) {
    return (
      <div
        className={cn(
          "relative w-full bg-bg-elevated flex items-center justify-center text-text-muted text-sm",
          className
        )}
      >
        No preview
      </div>
    );
  }

  const expandKeyframes = [RHOMBUS_TINY, RHOMBUS_PEEK, RHOMBUS_PEEK, RHOMBUS_FULL];
  const expandTimes = [0, 0.1, 0.7, 1];

  return (
    <div
      className={cn("relative w-full overflow-hidden bg-bg-elevated", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Thumbnail */}
      {bannerImage && (
        <Image
          src={bannerImage}
          alt={title}
          fill
          className={cn(
            "object-cover transition-all duration-500",
            isExpanded && hasVideo ? "scale-105 blur-md" : "scale-100 blur-0"
          )}
        />
      )}

      {/* Black mask that expands from center on hover */}
      {hasVideo && (
        <motion.div
          className="absolute inset-0 bg-black"
          initial={autoPlay ? { clipPath: RHOMBUS_FULL } : { clipPath: RHOMBUS_TINY }}
          animate={{
            clipPath: isExpanded ? expandKeyframes : RHOMBUS_TINY,
          }}
          transition={
            isExpanded
              ? { duration: 1.4, times: expandTimes, ease: [0.2, 0, 0.1, 1] }
              : { duration: 0.5, ease: [0.2, 0, 0.1, 1] }
          }
        >
          {/* Video only renders while expanded — stops on leave */}
          {isExpanded && (
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              {videoUrl ? (
                <video
                  src={videoUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : youtubeId ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1&controls=0&disablekb=1&loop=1&playlist=${youtubeId}`}
                  className="w-full h-full pointer-events-none"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  title={title}
                />
              ) : loomId ? (
                <iframe
                  src={`https://www.loom.com/embed/${loomId}?autoplay=1&hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true`}
                  className="w-full h-full pointer-events-none"
                  allowFullScreen
                  title={title}
                />
              ) : null}
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}
