import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { ShareCard } from "@/components/seo/ShareCard";
import { fetchProjectById } from "@/lib/api/server";

export const revalidate = 3600;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ id: string }> };

export default async function OpenGraphImage({ params }: Props) {
  const { id } = await params;
  const project = await fetchProjectById(id);
  if (!project) notFound();

  return new ImageResponse(
    <ShareCard eyebrow="Subham12r · Project" title={project.title} description={project.description} />,
    size,
  );
}
