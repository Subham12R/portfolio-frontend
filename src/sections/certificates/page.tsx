import Image from "next/image"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { certificates, siteConfig } from "@/data"

const CertificatesPage = () => {
  const section = siteConfig.sections.certificates

  return (
    <section id={section.id} className="w-full flex justify-center items-center pb-20 px-4 lg:px-0">
      <div className="max-w-4xl w-full flex flex-col bg-black h-full">

        {/* HEADER */}
        <div className="flex justify-start items-start pt-16 pb-5 border-b border-white/40 mb-8">
          <span className="text-white/80 text-xl font-mono leading-tight">
            {section.number}
          </span>
          <h1 className="text-4xl font-semibold text-white">
            {section.title}.
          </h1>
        </div>

        {/* CERTIFICATE LIST */}
        <div className="space-y-4">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="flex items-center gap-4 p-4 rounded-xl border border-white/10 hover:border-white/20 transition-colors duration-200"
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
                <h3 className="text-white font-semibold truncate">
                  {cert.title}
                </h3>
                <span className="text-white/60 text-sm">
                  {cert.issuer}
                </span>
              </div>

              {/* Right: Credential Link */}
              <div className="shrink-0">
                <Link
                  href={cert.credential}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-white/50 hover:text-white transition-colors duration-200"
                  aria-label={`View ${cert.title} credential`}
                >
                  <ExternalLink size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default CertificatesPage
