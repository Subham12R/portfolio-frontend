import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getPostBySlug, blogPosts, siteConfig } from "@/data";
import { BlogContentRenderer } from "@/components/blog/BlogContentRenderer";
import { BlogScrollNav } from "@/components/blog/BlogScrollNav";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const image = post.coverImage
    ? {
        url: post.coverImage,
        width: post.coverImageWidth ?? 1200,
        height: post.coverImageHeight ?? 630,
        alt: post.coverImageAlt ?? `${post.title} cover image`,
      }
    : {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} portfolio banner`,
      };

  return {
    title: `${post.title} | ${siteConfig.title}`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    keywords: [
      ...(post.tags || []),
      post.title,
      "Subham Karmakar Blog",
      "Subham12r Blog",
      "Software Development Blog",
      "Web Development",
    ],
    openGraph: {
      title: `${post.title} | ${siteConfig.name}`,
      description: post.excerpt,
      url: `${siteConfig.url}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | ${siteConfig.name}`,
      description: post.excerpt,
      images: [image.url],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const contentSections = (post.content ?? "")
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => {
      const label = line.replace("## ", "");
      return {
        id: `blog-heading-${toHeadingId(label)}`,
        label,
      };
    });

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      <article className="max-w-2xl mx-auto px-4 lg:px-0 py-16">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors duration-200 mb-12"
        >
          <ArrowLeft size={16} />
          <span className="text-sm font-medium">Back to blog</span>
        </Link>

        {/* Header */}
        <header id="blog-post-intro" className="mb-12 scroll-mt-24">
          <div className="flex items-center gap-4 text-sm text-text-muted mb-4">
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
            <span className="w-1 h-1 rounded-full bg-text-muted" />
            <span>{post.readingTime}</span>
          </div>

          <h1 className="mb-6 font-instrumentserif text-4xl font-normal leading-tight tracking-tight text-text-primary">
            {post.title}
          </h1>

          <p className="text-xl text-text-tertiary leading-relaxed">
            {post.excerpt}
          </p>

          {post.coverImage && (
            <div className="mt-10">
              <Image
                src={post.coverImage}
                alt={post.coverImageAlt ?? `${post.title} cover image`}
                width={post.coverImageWidth ?? 1200}
                height={post.coverImageHeight ?? 630}
                priority
                sizes="(max-width: 768px) 100vw, 672px"
                className="block h-auto w-full rounded-2xl object-contain"
              />
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm px-3 py-1 rounded-full border border-border-primary text-text-tertiary"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Content */}
        {post.content ? (
          <BlogContentRenderer content={post.content} />
        ) : (
          <div className="py-20 text-center border border-dashed border-border-secondary rounded-2xl">
            <p className="text-text-muted">Content coming soon.</p>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border-primary">
          <div className="flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors duration-200"
            >
              <ArrowLeft size={16} />
              <span className="text-sm font-medium">All posts</span>
            </Link>

            <span className="text-sm text-text-muted">
              © {new Date().getFullYear()} {siteConfig.name}
            </span>
          </div>
        </footer>
      </article>
      <BlogScrollNav
        sections={[
          { id: "blog-post-intro", label: "Introduction" },
          ...contentSections,
        ]}
      />
    </main>
  );
}

function toHeadingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
