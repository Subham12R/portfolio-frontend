"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Clip-path ellipse keyframes for smooth tilted oval transition
const OVAL_TINY = "ellipse(0% 0% at 50% 50%)";
const OVAL_PEEK = "ellipse(22% 10% at 50% 50%)";
const OVAL_FULL = "ellipse(150% 150% at 50% 50%)";

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
  const [imageLoaded, setImageLoaded] = useState(false);

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

  const expandKeyframes = [OVAL_TINY, OVAL_PEEK, OVAL_PEEK, OVAL_FULL];
  const expandTimes = [0, 0.1, 0.7, 1];

  return (
    <div
      className={cn("relative w-full overflow-hidden bg-bg-elevated", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Thumbnail */}
      {bannerImage && (
        <>
          <Image
            src={bannerImage}
            alt={title}
            fill
            onLoad={() => setImageLoaded(true)}
            className={cn(
              "object-cover transition-all duration-500",
              imageLoaded ? "opacity-100" : "opacity-0",
              isExpanded && hasVideo ? "scale-105 blur-md" : "scale-100 blur-0"
            )}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-bg-badge/10 animate-pulse overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-bg-badge/20 to-transparent bg-[length:200%_100%] animate-shimmer" />
            </div>
          )}
        </>
      )}

      {/* Black mask container */}
      {hasVideo && (
        <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
          {/* Rotated mask div to achieve tilted oval shape */}
          <motion.div
            className="w-full h-full bg-black origin-center flex items-center justify-center"
            initial={autoPlay ? { clipPath: OVAL_FULL, rotate: -25 } : { clipPath: OVAL_TINY, rotate: -35 }}
            animate={{
              clipPath: isExpanded ? expandKeyframes : OVAL_TINY,
              rotate: isExpanded ? -25 : -35,
            }}
            transition={
              isExpanded
                ? {
                    clipPath: { duration: 1.4, times: expandTimes, ease: [0.2, 0, 0.1, 1] },
                    rotate: { duration: 1.4, times: expandTimes, ease: [0.2, 0, 0.1, 1] },
                  }
                : {
                    clipPath: { duration: 0.5, ease: [0.2, 0, 0.1, 1] },
                    rotate: { duration: 0.5, ease: [0.2, 0, 0.1, 1] },
                  }
            }
          >
            {/* Counter-rotated inner div so video contents remain perfectly straight */}
            <motion.div
              className="absolute inset-0 origin-center"
              initial={autoPlay ? { rotate: 25 } : { rotate: 35 }}
              animate={{
                rotate: isExpanded ? 25 : 35,
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
                    <div className="absolute inset-0 overflow-hidden">
                      <iframe
                        src={`https://www.loom.com/embed/${loomId}?autoplay=1&hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true`}
                        className="absolute top-0 left-0 w-full pointer-events-none"
                        style={{ height: "calc(100% + 52px)" }}
                        allowFullScreen
                        title={title}
                      />
                    </div>
                  ) : null}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
