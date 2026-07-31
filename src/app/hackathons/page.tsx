import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { hackathonImages } from "@/data/gallery";
import { siteConfig } from "@/data";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Hackathons",
  description:
    "Behind-the-scenes moments from hackathons, coding competitions, and developer events — by Subham Karmakar.",
  alternates: {
    canonical: "/hackathons",
  },
  openGraph: {
    title: `Hackathons | ${siteConfig.name}`,
    description:
      "Behind-the-scenes moments from hackathons, coding competitions, and developer events — by Subham Karmakar.",
    url: `${siteConfig.url}/hackathons`,
    type: "website",
    images: [{ url: "/hackathons/opengraph-image", width: 1200, height: 630, alt: "Hackathon moments by Subham Karmakar" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Hackathons | ${siteConfig.name}`,
    description:
      "Behind-the-scenes moments from hackathons, coding competitions, and developer events — by Subham Karmakar.",
    images: ["/hackathons/opengraph-image"],
  },
};

export default function HackathonsPage() {
  return (
    <section className="w-full flex justify-center items-center py-20 px-4 lg:px-0">
      <div className="max-w-2xl w-full">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-text-primary mb-4">
            Hackathons
          </h1>
          <p className="text-lg text-text-secondary">
            Behind-the-scenes moments from hackathons, coding competitions, and developer events.
          </p>
        </div>

        <GalleryGrid images={hackathonImages} />
      </div>
    </section>
  );
}