import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { siteConfig } from "@/data"
import { fetchCertificates } from "@/lib/api/server"

const CertificatesPage = async () => {
  const section = siteConfig.sections.certificates
  const certificates = await fetchCertificates()

  return (
    <section id={section.id} className="w-full flex justify-center items-center pb-20 px-4 lg:px-0">
      <div className="max-w-4xl w-full flex flex-col  h-full">

        {/* HEADER */}
        <div className="flex justify-start items-start pt-16 pb-5 border-b border-border-accent mb-8">
          <span className="text-text-secondary text-xl font-mono leading-tight">
            {section.number}
          </span>
          <h1 className="text-4xl font-semibold text-text-primary">
            {section.title}.
          </h1>
        </div>

        {/* CERTIFICATE LIST */}
        <div className="space-y-4">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="flex items-center gap-4 p-2 rounded-xl border border-border-primary hover:border-border-secondary transition-colors duration-200"
            >
              {/* Left: Logo */}
              <div className="shrink-0">
                <Image
                  src={cert.logo}
                  alt={cert.issuer}
                  width={48}
                  height={48}
                  className="rounded-lg"
                />
              </div>

              {/* Middle: Text */}
              <div className="flex flex-col flex-1 min-w-0">
                <h3 className="text-text-primary font-semibold truncate">
                  {cert.title}
                </h3>
                <span className="text-text-tertiary text-sm">
                  {cert.issuer}
                </span>
              </div>

              {/* Right: Credential Link */}
              <div className="shrink-0">
                <a
                  href={cert.credential}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-text-muted hover:text-text-primary transition-colors duration-200"
                  aria-label={`View ${cert.title} credential`}
                >
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default CertificatesPage
