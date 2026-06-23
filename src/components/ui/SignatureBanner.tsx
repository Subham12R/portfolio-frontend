"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface LetterPath {
  d: string;
}

const TEXT = "Subham";
const FONT_SIZE = 145;
const BASELINE_Y = 210;
const CANVAS_W = 900;
const CANVAS_H = 256;

export function SignatureBanner() {
  const [letters, setLetters] = useState<LetterPath[]>([]);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Extract per-letter SVG paths from the font
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const opentype = (await import("opentype.js")).default;

      const res = await fetch("/fonts/DancingScript-Bold.ttf");
      const buf = await res.arrayBuffer();
      const font = opentype.parse(buf);

      if (cancelled) return;

      // Measure total text to center it
      const probe = font.getPath(TEXT, 0, BASELINE_Y, FONT_SIZE);
      const pb = probe.getBoundingBox();
      const textW = pb.x2 - pb.x1;
      const xShift = (CANVAS_W - textW) / 2 - pb.x1;

      // One path element per glyph
      const glyphs: any[] = font.getPaths(TEXT, xShift, BASELINE_Y, FONT_SIZE);

      const data: LetterPath[] = glyphs.map((g: any) => ({
        d: g.toPathData(2),
      }));

      if (!cancelled) setLetters(data);
    })().catch(console.error);

    return () => {
      cancelled = true;
    };
  }, []);

  // GSAP stroke-draw (handwriting) animation per glyph — runs once on scroll-in
  useEffect(() => {
    if (!letters.length || !containerRef.current) return;

    const paths = pathRefs.current.filter(Boolean) as SVGPathElement[];
    if (!paths.length) return;

    // Prime each path: dash the full outline, hide the fill (stays hidden until in view)
    paths.forEach((path) => {
      const len = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: len,
        strokeDashoffset: len,
        fillOpacity: 0,
      });
    });

    const tl = gsap.timeline({
      delay: 0.2,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        once: true,
      },
    });

    paths.forEach((path, i) => {
      const len = path.getTotalLength();
      const duration = Math.max(0.4, len / 900); // ~900 px/s pen speed

      // Trace the glyph outline
      tl.to(
        path,
        {
          strokeDashoffset: 0,
          duration,
          ease: "power1.inOut",
        },
        i === 0 ? 0 : ">-0.15" // slight overlap between letters
      );

      // Flood the glyph with ink once it's drawn
      tl.to(
        path,
        {
          fillOpacity: 1,
          duration: 0.25,
          ease: "power1.out",
        },
        ">-0.1"
      );
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [letters]);

  return (
    <div
      ref={containerRef}
      className="w-full h-64 overflow-hidden bg-white dark:bg-black text-black dark:text-white transition-colors duration-300"
    >
      <svg
        viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
        role="img"
        aria-label="Subham Karmakar signature"
      >
        <defs>
          {/* Subtle pixel grid overlay */}
          <pattern
            id="px-grid"
            x="0"
            y="0"
            width="8"
            height="8"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0" y1="0" x2="8" y2="0"
              stroke="currentColor"
              strokeWidth="0.25"
              strokeOpacity="0.12"
            />
            <line
              x1="0" y1="0" x2="0" y2="8"
              stroke="currentColor"
              strokeWidth="0.25"
              strokeOpacity="0.12"
            />
          </pattern>
        </defs>

        {/* Full-canvas pixel grid */}
        <rect width={CANVAS_W} height={CANVAS_H} fill="url(#px-grid)" />

        {/* Signature letters — each outline is traced, then filled with ink */}
        <g fill="currentColor" stroke="currentColor" strokeWidth="1.5">
          {letters.map((letter, i) => (
            <path
              key={i}
              ref={(el) => {
                pathRefs.current[i] = el;
              }}
              d={letter.d}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
