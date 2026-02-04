import { About } from "@/sections/about/page";
import BlogSection from "@/sections/blog/page";
import CertificatesPage from "@/sections/certificates/page";
import ContactCTA from "@/sections/contact/page";
import { Hero } from "@/sections/hero/page";
import ProjectsPage from "@/sections/projects/page";
import Tech from "@/sections/skills/page";
import Work from "@/sections/works/page";

export default function Home() {
  return (
    <>
      <Hero />
      <Tech />
      <Work />
      <ProjectsPage />
      <About />
      <BlogSection />
      <CertificatesPage />
      <ContactCTA />
    </>
  );
}
