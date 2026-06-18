"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface LetterPath {
  d: string;
  x2: number;
}

const TEXT = "Subham";
const FONT_SIZE = 145;
const BASELINE_Y = 210;
const CANVAS_W = 900;
const CANVAS_H = 256;

export function SignatureBanner() {
  const [letters, setLetters] = useState<LetterPath[]>([]);
  const clipRectRef = useRef<SVGRectElement>(null);

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
        x2: g.getBoundingBox().x2,
      }));

      if (!cancelled) setLetters(data);
    })().catch(console.error);

    return () => {
      cancelled = true;
    };
  }, []);

  // Per-letter clip-based handwriting animation
  useEffect(() => {
    if (!letters.length || !clipRectRef.current) return;

    const rect = clipRectRef.current;
    gsap.set(rect, { attr: { width: 0 } });

    const tl = gsap.timeline({ delay: 0.3 });
    let prevX2 = 0;

    letters.forEach((letter, i) => {
      const end = letter.x2 + 8; // small padding to include connecting strokes
      const range = end - prevX2;
      const duration = Math.max(0.18, range / 240); // ~240 px/s writing speed

      tl.to(rect, {
        attr: { width: end },
        duration,
        ease: "power1.inOut",
        ...(i > 0 && { delay: 0.07 }), // brief pen-lift between letters
      });

      prevX2 = letter.x2;
    });

    // Finish clip to full width
    tl.to(rect, { attr: { width: CANVAS_W }, duration: 0.05, ease: "none" });

    return () => {
      tl.kill();
    };
  }, [letters]);

  return (
    <div className="w-full h-64 overflow-hidden bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <svg
        viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
        role="img"
        aria-label="Subham Karmakar signature"
      >
        <defs>
          {/* Expanding clip drives the handwriting reveal */}
          <clipPath id="hw-clip">
            <rect ref={clipRectRef} x="0" y="0" width="0" height={CANVAS_H} />
          </clipPath>

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

          {/* Pixel-art ink texture: hard alpha edges + micro-displacement */}
          <filter
            id="px-ink"
            x="-5%"
            y="-5%"
            width="110%"
            height="110%"
            colorInterpolationFilters="sRGB"
          >
            <feComponentTransfer in="SourceGraphic" result="hard">
              <feFuncA type="discrete" tableValues="0 0 1 1" />
            </feComponentTransfer>
            <feTurbulence
              type="turbulence"
              baseFrequency="0.06 0.06"
              numOctaves="2"
              seed="4"
              result="noise"
            />
            <feDisplacementMap
              in="hard"
              in2="noise"
              scale="1.2"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>

        {/* Full-canvas pixel grid */}
        <rect width={CANVAS_W} height={CANVAS_H} fill="url(#px-grid)" />

        {/* Signature letters — revealed letter-by-letter by the animated clip */}
        <g
          clipPath="url(#hw-clip)"
          filter="url(#px-ink)"
          fill="currentColor"
        >
          {letters.map((letter, i) => (
            <path key={i} d={letter.d} />
          ))}
        </g>
      </svg>
    </div>
  );
}
