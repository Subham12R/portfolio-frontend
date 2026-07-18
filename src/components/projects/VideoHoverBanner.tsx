"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Clip-path ellipse keyframes for smooth tilted oval transition.
// Final ellipse must be large enough to cover the full box *after* ~25° rotation.
const OVAL_TINY = "ellipse(0% 0% at 50% 50%)";
const OVAL_PEEK = "ellipse(22% 10% at 50% 50%)";
const OVAL_FULL = "ellipse(280% 280% at 50% 50%)";

/** Direct file / Cloudflare R2 public video URL (often pasted into youtube field). */
function isDirectVideoUrl(url: string): boolean {
  const u = url.trim();
  if (!/^https?:\/\//i.test(u)) return false;
  if (/\.(mp4|webm|ogg|mov|m4v)(\?|#|$)/i.test(u)) return true;
  if (/\.r2\.dev\//i.test(u)) return true;
  if (/cloudflarestorage\.com\//i.test(u)) return true;
  return false;
}

interface VideoHoverBannerProps {
  bannerImage?: string;
  youtubeId?: string;
  videoUrl?: string;
  loomId?: string;
  title: string;
  className?: string;
  /** Skip hover interaction — immediately mount and reveal the video */
  autoPlay?: boolean;
  /**
   * `cover` — fill the box (use with aspect-* / fixed height); best for project cards.
   * `natural` — container height follows the image; best for case study banners.
   */
  fit?: "cover" | "natural";
}

export function VideoHoverBanner({
  bannerImage,
  youtubeId,
  videoUrl,
  loomId,
  title,
  className,
  autoPlay = false,
  fit = "cover",
}: VideoHoverBannerProps) {
  const [hovered, setHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  /** Used when there is no poster image (video-only, natural fit). */
  const [videoAspect, setVideoAspect] = useState<number | null>(null);

  const resolvedVideoUrl =
    videoUrl ||
    (youtubeId && isDirectVideoUrl(youtubeId) ? youtubeId : undefined);
  const resolvedYoutubeId =
    youtubeId && !isDirectVideoUrl(youtubeId) ? youtubeId : undefined;

  const hasVideo = !!(resolvedYoutubeId || resolvedVideoUrl || loomId);
  const isExpanded = autoPlay || hovered;
  const isCover = fit === "cover";

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
          "relative w-full bg-bg-elevated flex items-center justify-center text-text-muted text-sm min-h-40",
          className
        )}
      >
        No preview
      </div>
    );
  }

  const expandKeyframes = [OVAL_TINY, OVAL_PEEK, OVAL_PEEK, OVAL_FULL];
  const expandTimes = [0, 0.08, 0.55, 1];

  // Video-only natural: size box from video metadata (fallback 16:9)
  const videoOnlyStyle =
    !isCover && !bannerImage && hasVideo
      ? {
          aspectRatio:
            videoAspect != null ? String(videoAspect) : "16 / 9",
        }
      : undefined;

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-bg-elevated",
        // Cover mode needs an explicit box; callers should pass aspect-* or height
        isCover && !className?.includes("aspect-") && !className?.match(/\bh-/)
          ? "aspect-4/3"
          : null,
        className
      )}
      style={videoOnlyStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Poster */}
      {bannerImage &&
        (isCover ? (
          <>
            <Image
              src={bannerImage}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 672px"
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
        ) : (
          <>
            <Image
              src={bannerImage}
              alt={title}
              width={1600}
              height={900}
              sizes="(max-width: 768px) 100vw, 672px"
              onLoad={() => setImageLoaded(true)}
              className={cn(
                "relative z-0 block w-full h-auto max-w-full object-contain transition-all duration-500",
                imageLoaded ? "opacity-100" : "opacity-0",
                isExpanded && hasVideo ? "scale-105 blur-md" : "scale-100 blur-0"
              )}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 z-0 bg-bg-badge/10 animate-pulse overflow-hidden min-h-40">
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-bg-badge/20 to-transparent bg-[length:200%_100%] animate-shimmer" />
              </div>
            )}
          </>
        ))}

      {/* Hidden probe for video-only aspect (natural mode) */}
      {!isCover && !bannerImage && resolvedVideoUrl && videoAspect == null && (
        <video
          src={resolvedVideoUrl}
          muted
          playsInline
          preload="metadata"
          className="pointer-events-none absolute opacity-0 w-0 h-0"
          onLoadedMetadata={(e) => {
            const v = e.currentTarget;
            if (v.videoWidth > 0 && v.videoHeight > 0) {
              setVideoAspect(v.videoWidth / v.videoHeight);
            }
          }}
        />
      )}

      {/* Black oval → full-bleed video reveal */}
      {hasVideo && (
        <div className="absolute inset-0 z-10 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-black origin-center"
            initial={
              autoPlay
                ? { clipPath: OVAL_FULL, rotate: -25 }
                : { clipPath: OVAL_TINY, rotate: -35 }
            }
            animate={{
              clipPath: isExpanded ? expandKeyframes : OVAL_TINY,
              rotate: isExpanded ? -25 : -35,
            }}
            transition={
              isExpanded
                ? {
                    clipPath: {
                      duration: 1.4,
                      times: expandTimes,
                      ease: [0.2, 0, 0.1, 1],
                    },
                    rotate: {
                      duration: 1.4,
                      times: expandTimes,
                      ease: [0.2, 0, 0.1, 1],
                    },
                  }
                : {
                    clipPath: { duration: 0.45, ease: [0.2, 0, 0.1, 1] },
                    rotate: { duration: 0.45, ease: [0.2, 0, 0.1, 1] },
                  }
            }
          >
            {/* Counter-rotate so video stays upright */}
            <motion.div
              className="absolute inset-0 origin-center"
              initial={autoPlay ? { rotate: 25 } : { rotate: 35 }}
              animate={{ rotate: isExpanded ? 25 : 35 }}
              transition={
                isExpanded
                  ? {
                      duration: 1.4,
                      times: expandTimes,
                      ease: [0.2, 0, 0.1, 1],
                    }
                  : { duration: 0.45, ease: [0.2, 0, 0.1, 1] }
              }
            >
              {isExpanded && (
                <motion.div
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.12 }}
                >
                  {resolvedVideoUrl ? (
                    <video
                      src={resolvedVideoUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      onLoadedMetadata={(e) => {
                        const v = e.currentTarget;
                        if (
                          !isCover &&
                          !bannerImage &&
                          v.videoWidth > 0 &&
                          v.videoHeight > 0
                        ) {
                          setVideoAspect(v.videoWidth / v.videoHeight);
                        }
                      }}
                      className={cn(
                        "absolute inset-0 h-full w-full",
                        isCover ? "object-cover" : "object-contain"
                      )}
                    />
                  ) : resolvedYoutubeId ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${resolvedYoutubeId}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1&controls=0&disablekb=1&loop=1&playlist=${resolvedYoutubeId}`}
                      className="absolute inset-0 h-full w-full pointer-events-none"
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
