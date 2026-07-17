import { siteConfig } from "@/data";
import { getDefaultCaseStudy } from "@/data/case-study";
import { CaseStudyView } from "@/components/casestudy/CaseStudyView";

const caseStudy = getDefaultCaseStudy();

export const metadata = {
  title: `${caseStudy.title} — Case Study`,
  description: caseStudy.tagline,
  alternates: {
    canonical: "/casestudy",
  },
  keywords: [
    caseStudy.title,
    "Case Study",
    ...caseStudy.technologies.slice(0, 6),
    "Subham Karmakar",
    "Subham12r",
  ],
  openGraph: {
    title: `${caseStudy.title} — Case Study | ${siteConfig.name}`,
    description: caseStudy.tagline,
    url: `${siteConfig.url}/casestudy`,
    type: "article",
    images: [caseStudy.bannerImage || "/banner.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${caseStudy.title} — Case Study | ${siteConfig.name}`,
    description: caseStudy.tagline,
    images: [caseStudy.bannerImage || "/banner.png"],
  },
};

export default function CaseStudyPage() {
  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      <CaseStudyView caseStudy={caseStudy} />
    </main>
  );
}
