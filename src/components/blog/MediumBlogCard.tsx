"use client";

import { ArrowUpRight } from "lucide-react";
import { MediumIcon } from "@/components/icons/MediumIcon";
import type { MediumPost } from "@/data/blog";

interface MediumBlogCardProps {
  post: MediumPost;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function MediumBlogCard({ post }: MediumBlogCardProps) {
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between gap-4 rounded-2xl border border-border-primary bg-bg-elevated/50 px-5 py-4 hover:border-border-secondary transition-colors duration-200"
    >
      <div className="flex items-center gap-4 min-w-0">
        <MediumIcon
          size={28}
          className="shrink-0 text-text-primary group-hover:text-text-secondary transition-colors duration-200"
        />
        <div className="flex flex-col min-w-0">
          <h3 className="text-base font-semibold text-text-primary group-hover:text-text-secondary transition-colors duration-200 truncate">
            {post.title}
          </h3>
          <time
            dateTime={post.publishedAt}
            className="text-xs text-text-muted mt-0.5"
          >
            {formatDate(post.publishedAt)}
          </time>
        </div>
      </div>

      <ArrowUpRight
        size={18}
        className="shrink-0 text-text-muted group-hover:text-text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
      />
    </a>
  );
}
