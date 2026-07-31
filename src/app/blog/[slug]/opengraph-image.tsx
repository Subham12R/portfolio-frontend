import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { ShareCard } from "@/components/seo/ShareCard";
import { getPostBySlug } from "@/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ slug: string }> };

export default async function OpenGraphImage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return new ImageResponse(
    <ShareCard eyebrow="Subham12r · Blog" title={post.title} description={post.excerpt} />,
    size,
  );
}
