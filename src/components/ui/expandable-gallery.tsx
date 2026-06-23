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
    id: "photo-1",
    src: `${R2}/553841756_17926981056107384_4696958097329136361_n.jpg`,
    alt: "Moment",
    type: "image",
    rotation: -15,
    x: -90,
    y: 10,
    zIndex: 10,
  },
  {
    id: "photo-2",
    src: `${R2}/553449419_17926981047107384_4026841337837683397_n.jpg`,
    alt: "Moment",
    type: "image",
    rotation: -3,
    x: -10,
    y: -15,
    zIndex: 20,
  },
  {
    id: "photo-3",
    src: `${R2}/606166022_17937287223107384_8106454114593472401_n.jpg`,
    alt: "Moment",
    type: "image",
    rotation: 12,
    x: 75,
    y: 5,
    zIndex: 30,
  },
  {
    id: "photo-4",
    src: `${R2}/654987733_18092027365888533_8312294801061277537_n.jpg`,
    alt: "Moment",
    type: "image",
  },
  {
    id: "photo-5",
    src: `${R2}/656112818_18151500763407835_4942104670317066957_n.webp`,
    alt: "Moment",
    type: "image",
  },
  {
    id: "photo-6",
    src: `${R2}/658854407_17957566773107384_1124031656866991804_n.jpg`,
    alt: "Moment",
    type: "image",
  },
  {
    id: "photo-7",
    src: `${R2}/707838589_17969782845107384_1551221773180582630_n.jpg`,
    alt: "Moment",
    type: "image",
  },
  {
    id: "photo-8",
    src: `${R2}/661224902_17957566782107384_4970160689367484436_n.jpg`,
    alt: "Moment",
    type: "image",
  },
  {
    id: "photo-9",
    src: `${R2}/AQMeRXG46pwPfV7MVxdWyUJwvrvep01efkNaladNQE8g5RSAe6iBEESdTdKNFS75hqv_rDIgaWxXksk8zb_5yw522o-72lpk6zUDwvw.mp4`,
    alt: "Clip",
    type: "video",
  },
  {
    id: "photo-10",
    src: `${R2}/AQMfG3hTwFAg_HWzjemsmAJn4WSmfeY_w6GfC8pv3d20SmjTnrln425dKg9IyOVWxf2MyzOrIoBz1ymHxZezMiVR3pPURVzmiOh8v8A.mp4`,
    alt: "Clip",
    type: "video",
  },
  {
    id: "photo-11",
    src: `${R2}/AQPFLrsLtfiaI6tqddpeUgRaPpIRYZG9JZ_qvBHz37J3u-p6VBZNiKWoWcYCMbanpr7e6h2w1Lptf64rPNLjZ-1-OBoWyl7VoasskzE.mp4`,
    alt: "Clip",
    type: "video",
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
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-10 pb-24">
          {/* Back */}
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-text-muted hover:text-text-primary transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            <span className="text-sm">Back</span>
          </button>

          <h1 className="text-4xl font-medium text-text-primary mb-8">
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
                className="relative aspect-square overflow-hidden rounded-2xl bg-bg-elevated border border-border-primary"
              >
                <Media photo={photo} sizes="(max-width: 768px) 50vw, 33vw" />
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
      <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-0">

        {/* Fan — top on mobile, right on desktop */}
        <div className="relative h-56 md:h-100 w-full md:w-[58%] md:order-2 flex items-center justify-center">
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
              className="absolute w-36 h-36 md:w-60 md:h-60 lg:w-72 lg:h-72 rounded-2xl border-[5px] md:border-[6px] border-bg-primary cursor-pointer overflow-hidden bg-bg-elevated"
            >
              <Media photo={photo} sizes="(max-width: 768px) 144px, 240px" />
            </motion.div>
          ))}
        </div>

        {/* Text — bottom on mobile, left on desktop */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:w-[42%] md:order-1 flex flex-col gap-5 md:justify-center"
        >
          <p className="text-xl md:text-2xl font-normal tracking-tight text-text-secondary leading-snug">
            A glimpse of the moments behind the tech world. Click to explore the
            full gallery and dive into the stories each photo holds.
          </p>

          <button
            onClick={() => setIsOpen(true)}
            className="self-start inline-flex items-center gap-2 px-5 py-2 rounded-md border-2 border-border-primary bg-bg-elevated/30 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-hover-tint hover:border-border-accent shadow-[inset_0px_0px_2px_2px_rgba(0,0,0,0.08)] dark:shadow-[inset_0px_0px_4px_4px_rgba(255,255,255,0.04)] transition-all duration-200 group"
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
