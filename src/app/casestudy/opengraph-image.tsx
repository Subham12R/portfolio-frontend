import { ImageResponse } from "next/og";
import { ShareCard } from "@/components/seo/ShareCard";
import { getDefaultCaseStudy } from "@/data/case-study";

const caseStudy = getDefaultCaseStudy();

export const alt = `${caseStudy.title} case study by Subham Karmakar`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <ShareCard eyebrow="Subham12r · Case Study" title={caseStudy.title} description={caseStudy.tagline} />,
    size,
  );
}
