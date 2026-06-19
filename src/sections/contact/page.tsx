"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import { siteConfig } from "@/data";
import { VisitorBadge } from "@/components/ui/VisitorBadge";
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

        <div className="flex flex-col items-center justify-center gap-4">
 
        </div>
      </div>
     
      <div className="max-w-4xl w-full mt-12 flex flex-col items-center justify-center gap-3 pt-6 px-4">
        <img
          src="/sign.png"
          alt="Signature"
          className="w-48 h-auto dark:invert"
        />
        <span className="text-center text-md font-medium text-text-primary">
          &ldquo;Hard times are not the enemy of a good life. They are part of it.&rdquo;
        </span>
      </div>
    </section>
  );
}
