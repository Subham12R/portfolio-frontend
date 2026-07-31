import { ImageResponse } from "next/og";
import { ShareCard } from "@/components/seo/ShareCard";

export const alt = "Projects by Subham Karmakar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <ShareCard eyebrow="Portfolio · Projects" title="Projects" description="Full-stack products, applied AI systems, developer tools, and open-source work by Subham Karmakar." />,
    size,
  );
}
