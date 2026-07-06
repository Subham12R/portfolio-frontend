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
          { opacity: 0, y: 40, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.85,
            ease: "power3.out",
            delay: i * 0.1,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
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
      className="w-full flex justify-center items-center px-4 lg:px-0 mb-12"
    >
      <div ref={rootRef} className="max-w-4xl w-full flex flex-col h-full">
        {/* HEADER */}
        <div data-gallery-reveal className="mb-2">
          <h1 className="text-3xl font-medium text-text-primary text-start">
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
