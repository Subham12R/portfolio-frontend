import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { siteConfig } from "@/data";
import { fetchCertificates } from "@/lib/api/server";

const CertificatesPage = async () => {
  const section = siteConfig.sections.certificates;
  const certificates = await fetchCertificates();

  return (
    <section
      id={section.id}
      className="w-full flex justify-center items-center px-4 lg:px-0 mb-12"
    >
      <div className="max-w-4xl w-full flex flex-col  h-full">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-4xl font-medium text-text-primary text-start">
            {section.title}.
          </h1>
        </div>

        {/* CERTIFICATE LIST */}
        <div className="divide-y divide-border-primary">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="flex items-center justify-between gap-3 py-5 first:pt-0"
            >
              {/* Title inline with logo: "Claude Code 101 by [logo] Anthropic" */}
              <div className="flex items-center flex-wrap gap-x-1.5 gap-y-0.5 min-w-0">
                <span className="text-base font-medium text-text-primary">
                  {cert.title} by
                </span>
                <Image
                  src={cert.logo}
                  alt={cert.issuer}
                  width={20}
                  height={20}
                  className="w-5 h-5 rounded-sm object-cover shrink-0"
                />
                <span className="text-base font-medium text-text-primary">
                  {cert.issuer}
                </span>
              </div>

              {/* Right: Credential Link */}
              <a
                href={cert.credential}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg transition hover:bg-hover-tint shrink-0"
                aria-label={`View ${cert.title} credential`}
              >
                <ExternalLink size={15} className="text-text-muted" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificatesPage;
