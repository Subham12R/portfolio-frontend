"use client";

import { GithubCalendar } from "@/components/ui/github-calendar";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { siteConfig } from "@/data";

const GithubActivity = () => {
  return (
    <section className="w-full flex justify-center items-center px-4 lg:px-0 overflow-hidden mb-12">
      <ScrollReveal className="max-w-2xl w-full flex flex-col">
        <h2 className="text-4xl font-light text-text-primary mb-6 font-instrumentserif">
          GitHub Activity
        </h2>
        <GithubCalendar
          username={siteConfig.socials.github.username}
          colorSchema="gray"
          variant="default"
          shape="rounded"
          showTotal
        />
      </ScrollReveal>
    </section>
  );
};

export default GithubActivity;
