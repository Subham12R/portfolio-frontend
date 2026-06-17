"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { ScrollRevealText } from "@/components/ui/ScrollRevealText";
import { siteConfig } from "@/data";
import { ArrowRight } from "lucide-react";

export default function ContactCTA() {
  const section = siteConfig.sections.contact;

  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "15min" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <section
      id={section.id}
      className="w-full max-w-4xl mx-auto flex flex-col justify-center items-center   "
    >
      <div className="flex flex-row items-center justify-center gap-6 flex-wrap px-4">
        <h1 className="text-3xl md:text-4xl font-semibold text-text-primary font-playfair text-center">
          Let's work together and create something amazing.
        </h1>

        <div className="flex flex-col items-center justify-center gap-4">
          <button
            data-cal-namespace="15min"
            data-cal-link="subham12r/15min"
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
            className="group cursor-pointer inline-flex items-center justify-center gap-2 rounded-md bg-text-primary text-text-inverse px-4 py-1 font-medium hover:opacity-90 transition-all duration-200 shadow-[inset_0px_0px_2px_2px_rgba(0,0,0,0.08)] dark:shadow-[inset_0px_0px_4px_4px_rgba(255,255,255,0.04)] border-2 border-border-primary hover:border-border-secondary"
          >
            Schedule a Call
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </button>
        </div>
      </div>

      <ScrollRevealText
        as="div"
        className="max-w-2xl w-full mt-12 text-center text-sm text-text-muted pt-6 px-4"
        start="top 95%"
        end="top 75%"
      >
        This portfolio is built and developed by{" "}
        <span className="text-text-secondary">{siteConfig.name}</span>. I have
        taken inspirations from various other developers and designers. If you
        like the design and want to build something similar, feel free to check
        out the source code which is open-sourced on{" "}
        <a
          href="https://github.com/Subham12R/portfolio-frontend"
          className="underline hover:text-zinc-900 dark:hover:text-white"
        >
          GitHub
        </a>
        .
      </ScrollRevealText>
    </section>
  );
}
