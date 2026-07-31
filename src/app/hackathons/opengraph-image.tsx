import { ImageResponse } from "next/og";
import { ShareCard } from "@/components/seo/ShareCard";

export const alt = "Hackathon moments by Subham Karmakar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <ShareCard eyebrow="Subham12r · Community" title="Hackathons" description="Team builds, coding competitions, and technology-community events." />,
    size,
  );
}
