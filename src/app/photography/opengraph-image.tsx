import { ImageResponse } from "next/og";
import { ShareCard } from "@/components/seo/ShareCard";

export const alt = "Photography by Subham Karmakar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <ShareCard eyebrow="Subham12r · Gallery" title="Photography" description="Developer-community, hackathon, and everyday moments captured by Subham Karmakar." />,
    size,
  );
}
