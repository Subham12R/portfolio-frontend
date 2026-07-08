"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/data";
import { ExpandableGallery } from "@/components/ui/expandable-gallery";

gsap.registerPlugin(ScrollTrigger);

const GallerySection = () => {
  const section = siteConfig.sections.gallery;
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>("[data-gallery-reveal]");

      targets.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.95, y: -10 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            delay: i * 0.08,
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          },
        );
      });
    }, rootRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id={section.id}
      className="w-full flex  justify-center items-center px-4 lg:px-0 mb-12"
    >
      <div ref={rootRef} className="max-w-2xl w-full flex flex-col h-full">
        {/* HEADER */}
        <div data-gallery-reveal className="mb-2">
          <h1 className="text-4xl font-light text-text-primary text-start font-instrumentserif">
            {section.title}.
          </h1>
        </div>

        <div data-gallery-reveal>
          <ExpandableGallery />
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
