import Link from "next/link";
import { siteConfig } from "@/data";
import { AnimatedBlogGrid } from "@/components/blog/AnimatedBlogGrid";
import { MediumBlogCard } from "@/components/blog/MediumBlogCard";
import { getPostsSorted, getMediumPostsSorted } from "@/data/blog";
import { HugeiconsIcon } from "@hugeicons/react";
import { LicenseDraftIcon } from "@hugeicons/core-free-icons";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const BlogSection = () => {
  const section = siteConfig.sections.blog;
  const posts = getPostsSorted().slice(0, 4); // Show max 4 posts
  const mediumPosts = getMediumPostsSorted().slice(0, 2); // Show 2 featured Medium posts

  if (posts.length === 0 && mediumPosts.length === 0) return null;

  return (
    <>
      <section
        id={section.id}
        className="w-full flex justify-center items-center px-4 lg:px-0 mb-12"
      >
        <ScrollReveal className="max-w-2xl w-full flex flex-col h-full">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-4xl font-light text-text-primary text-start font-instrumentserif">
            {section.title}.
          </h1>
        </div>

        {/* Blog Cards Grid */}
        {posts.length > 0 && <AnimatedBlogGrid posts={posts} />}

        {/* Featured on Medium */}
        {mediumPosts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-lg font-medium text-text-secondary mb-4">
              Featured on Medium
            </h2>
            <div className="flex flex-col gap-3">
              {mediumPosts.map((post) => (
                <MediumBlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}

        {/* View All Link */}
        <div className="mt-12 flex items-center justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md border-2 border-border-primary bg-bg-elevated/30 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-hover-tint hover:border-border-accent shadow-[inset_0px_0px_2px_2px_rgba(0,0,0,0.08)] dark:shadow-[inset_0px_0px_4px_4px_rgba(255,255,255,0.04)] transition-all duration-200"
          >
            <HugeiconsIcon icon={LicenseDraftIcon} size={16} />
            View All Posts
          </Link>
        </div>
        </ScrollReveal>
      </section>
    </>
  );
};

export default BlogSection;
