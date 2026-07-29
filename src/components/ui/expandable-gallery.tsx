"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLenis } from "@/components/providers/SmoothScroll";

const R2 = "https://pub-b5cc14cdfc9a459bbb6c1cc637db4ffa.r2.dev/home";

type MediaType = "image" | "video";

interface Photo {
  id: string;
  src: string;
  alt: string;
  type: MediaType;
  rotation?: number;
  x?: number;
  y?: number;
  zIndex?: number;
}

const PHOTOS: Photo[] = [
  {
    id: "dotslash-2026",
    src: `${R2}/DSC_0149.JPEG`,
    alt: "DotSlash 2026",
    type: "image",
    rotation: -15,
    x: -90,
    y: 10,
    zIndex: 10,
  },
  {
    id: "ctrls-datacenter-visit",
    src: `${R2}/IMG_0600.JPG`,
    alt: "CTRLS Datacenter Visit",
    type: "image",
    rotation: -3,
    x: -10,
    y: -15,
    zIndex: 20,
  },
  {
    id: "gdg-devfest-2025",
    src: `${R2}/IMG_2167.JPG`,
    alt: "GDG Devfest 2025",
    type: "image",
    rotation: 12,
    x: 75,
    y: 5,
    zIndex: 30,
  },
  {
    id: "smart-ind-2025",
    src: `${R2}/WhatsApp%20Image%202026-07-29%20at%2023.29.11.jpeg`,
    alt: "Top 10 - SIH Internals 2025",
    type: "image",
    rotation: 12,
    x: 75,
    y: 5,
    zIndex: 30,
  },
];
const transition = {
  type: "spring",
  stiffness: 160,
  damping: 18,
  mass: 1,
} as const;

// ─── Media (image or autoplaying muted video) ────────────────────────────────

function Media({ photo, sizes }: { photo: Photo; sizes?: string }) {
  if (photo.type === "video") {
    return (
      <video
        src={photo.src}
        muted
        autoPlay
        loop
        playsInline
        // Don't pull the clip until the element scrolls into view
        preload="none"
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
      />
    );
  }

  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      fill
      sizes={sizes}
      loading="lazy"
      className="object-cover select-none pointer-events-none"
    />
  );
}

// ─── Full-page overlay ───────────────────────────────────────────────────────

function GalleryOverlay({ onClose }: { onClose: () => void }) {
  const { lenis } = useLenis();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    lenis?.stop();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [lenis, onClose]);

  return createPortal(
    <motion.div
      className="fixed inset-0 z-60 bg-bg-primary flex flex-col"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
      role="dialog"
      aria-modal="true"
      aria-label="Gallery"
    >
      <div
        className="flex-1 overflow-y-auto overscroll-contain"
        data-lenis-prevent
      >
        <div className="max-w-2xl mx-auto px-4 md:px-0 py-10 pb-24">
          {/* Back */}
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-text-muted hover:text-text-primary transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            <span className="text-sm">Back</span>
          </button>

          <h1 className="text-4xl font-light text-text-primary mb-8 font-instrumentserif">
            Gallery
          </h1>

          {/* Masonry-ish grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {PHOTOS.map((photo, i) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: 0.05 + i * 0.04,
                }}
                className="flex flex-col gap-2"
              >
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-bg-elevated border border-border-primary">
                  <Media photo={photo} sizes="(max-width: 768px) 50vw, 33vw" />
                </div>
                <p className="text-sm font-medium text-text-primary">{photo.alt}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>,
    document.body
  );
}

// ─── Collapsed view + trigger ────────────────────────────────────────────────

export function ExpandableGallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col items-center gap-6">

        {/* Fan at the top */}
        <div className="relative h-56 md:h-80 w-full flex items-center justify-center">
          {PHOTOS.slice(0, 3).map((photo, index) => (
            <motion.div
              key={`card-${photo.id}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: photo.rotation ?? 0,
                x: photo.x ?? 0,
                y: photo.y ?? 0,
                zIndex: photo.zIndex ?? index,
              }}
              transition={transition}
              whileHover={{
                scale: 1.05,
                y: (photo.y ?? 0) - 15,
                rotate: (photo.rotation ?? 0) * 0.8,
                zIndex: 50,
                transition: { type: "spring", stiffness: 400, damping: 25 },
              }}
              onClick={() => setIsOpen(true)}
              className="absolute w-36 h-36 md:w-52 md:h-52 lg:w-56 lg:h-56 rounded-2xl border-[5px] md:border-[6px] border-bg-primary cursor-pointer overflow-hidden bg-bg-elevated"
            >
              <Media photo={photo} sizes="(max-width: 768px) 144px, 240px" />
            </motion.div>
          ))}
        </div>

        {/* Text and Button below the fan */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-col items-center gap-4 text-center"
        >
          <p className="text-base md:text-lg font-light tracking-tight text-text-secondary leading-relaxed max-w-xl font-instrumentsans">
            Moments where the tech community comes together—from meetups and
            hackathons to ideas, conversations, and the people behind them.
          </p>

          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-md border-2 border-border-primary bg-bg-elevated/30 text-sm font-light text-text-secondary hover:text-text-primary hover:bg-hover-tint hover:border-border-accent shadow-[inset_0px_0px_2px_2px_rgba(0,0,0,0.08)] dark:shadow-[inset_0px_0px_4px_4px_rgba(255,255,255,0.04)] transition-all duration-200 group font-instrumentsans cursor-pointer"
          >
            View the gallery
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </motion.div>
      </div>

      {/* Full-page overlay */}
      {mounted && (
        <AnimatePresence>
          {isOpen && <GalleryOverlay onClose={() => setIsOpen(false)} />}
        </AnimatePresence>
      )}
    </div>
  );
}

export default ExpandableGallery;
