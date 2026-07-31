import { ImageResponse } from "next/og";
import { ShareCard } from "@/components/seo/ShareCard";

export const alt = "Writing by Subham Karmakar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <ShareCard eyebrow="Subham12r · Writing" title="Blog" description="Practical notes on applied AI, full-stack engineering, backend systems, and learning by building." />,
    size,
  );
}
