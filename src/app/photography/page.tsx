import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { photographyImages } from "@/data/gallery";
import { siteConfig } from "@/data";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Photography",
  description:
    "Curated photography portfolio by Subham Karmakar — street, landscape, and documentary moments captured on film and digital.",
  alternates: {
    canonical: "/photography",
  },
  openGraph: {
    title: `Photography | ${siteConfig.name}`,
    description:
      "Curated photography portfolio by Subham Karmakar — street, landscape, and documentary moments captured on film and digital.",
    url: `${siteConfig.url}/photography`,
    type: "website",
    images: [{ url: "/photography/opengraph-image", width: 1200, height: 630, alt: "Photography by Subham Karmakar" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Photography | ${siteConfig.name}`,
    description:
      "Curated photography portfolio by Subham Karmakar — street, landscape, and documentary moments captured on film and digital.",
    images: ["/photography/opengraph-image"],
  },
};

export default function PhotographyPage() {
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
            Photography
          </h1>
          <p className="text-lg text-text-secondary">
            Curated photography portfolio — street, landscape, and documentary moments on film and digital.
          </p>
        </div>

        <GalleryGrid images={photographyImages} />
      </div>
    </section>
  );
}