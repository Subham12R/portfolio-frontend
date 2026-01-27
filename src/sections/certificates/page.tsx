import Image from "next/image"
import Link from "next/link"
import { certificates } from "@/data/certificates"
import { ExternalLink } from "lucide-react"

const CertificatesPage = () => {
  return (
    <div className="w-full flex justify-center items-center pb-20">
      <div className="max-w-4xl w-full flex flex-col bg-black h-full">

        {/* HEADER */}
        <div className="flex justify-start items-start pt-16 pb-5 border-b border-white/40 mb-8">
          <span className="text-white/80 text-xl font-mono leading-tight">
            05
          </span>
          <h1 className="text-4xl font-semibold text-white ">
            Certifications.
          </h1>
        </div>


        {/* CERTIFICATE LIST */}
        <section className="space-y-4">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="flex items-center gap-4 rounded-xl  "
            >
              {/* Left: Logo */}
              <div className="flex-shrink-0">
                <Image
                  src={cert.logo}
                  alt={cert.issuer}
                  width={48}
                  height={48}
                  className="rounded-md"
                />
              </div>

              {/* Middle: Text */}
              <div className="flex flex-col flex-1">
                <h3 className="text-white font-semibold">
                  {cert.title}
                </h3>
                <span className="text-white/60 text-sm">
                  {cert.issuer}
                </span>
              </div>

              {/* Right: Credential */}
              <div className="flex-shrink-0">
                <Link
                  href={cert.credential}
                  target="_blank"
                  className="text-sm text-white/70   transition"
                >
                  <ExternalLink size={18} />
                </Link>
              </div>
            </div>
          ))}
        </section>



      </div>
    </div>
  )
}

export default CertificatesPage
