
import { About } from "@/sections/about/page";
import CertificatesPage from "@/sections/certificates/page";
import ContactCTA from "@/sections/contact/page";
import { Hero } from "@/sections/hero/page";
import ProjectsPage from "@/sections/projects/page";
import Tech from "@/sections/skills/page";

import Work from "@/sections/works/page";
import Image from "next/image";

export default function Home() {
  return (
    <>

      <Hero />
      <Work />
      <ProjectsPage />
      <Tech />
      <About />
      <CertificatesPage />
      <ContactCTA />
    </>
  );
}
