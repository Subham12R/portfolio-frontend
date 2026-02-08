import Link from 'next/link'
import { siteConfig } from '@/data'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const { socials } = siteConfig

  return (
    <footer className="w-full flex justify-center items-center bg-bg-primary pb-12 pt-8 px-4 lg:px-0">
      <div className="w-full max-w-4xl pt-8 pb-2 px-4">

        {/* Main Row - DMCA left, Links right */}
        <div className="flex justify-between items-center mb-4">
          {/* DMCA Badge - Left */}
          <a
            href="//www.dmca.com/Protection/Status.aspx?ID=cc173fd3-4ecc-447a-8d25-cd5bc17402ca"
            title="DMCA.com Protection Status"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-50 hover:opacity-100 transition-opacity duration-200"
          >
            <img
              src="https://images.dmca.com/Badges/dmca_protected_6_120.png?ID=cc173fd3-4ecc-447a-8d25-cd5bc17402ca"
              alt="DMCA.com Protection Status"
              className="h-5 w-auto"
            />
          </a>

          {/* Links - Right */}
          <div className="flex items-center gap-4 md:gap-6 text-sm text-text-secondary">
            <Link
              href="/llms.txt"
              className="hover:text-text-primary transition-colors duration-200"
            >
              llms.txt
            </Link>
            <a
              href={socials.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-primary transition-colors duration-200"
            >
              Github
            </a>
            <a
              href={socials.twitter.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-primary transition-colors duration-200"
            >
              x.com
            </a>
            <a
              href={socials.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-primary transition-colors duration-200"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-1 md:gap-2 text-sm text-text-muted border-t border-border-primary pt-4">
          <span>
            Designed & built by{' '}
            <span className="text-text-secondary">{siteConfig.name}</span>
          </span>
          <span className="hidden md:inline text-border-primary">·</span>
          <span>&copy; {currentYear} All rights reserved</span>
        </div>

      </div>
    </footer>
  )
}

export default Footer
