import Link from 'next/link'
import { siteConfig } from '@/data'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full flex justify-center items-center bg-black py-6 text-center text-sm text-zinc-500 px-4 lg:px-0">
      <div className="w-full max-w-4xl border-t border-zinc-800 pt-6">

        {/* Footer Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-4">
          <Link
            href="/projects"
            className="hover:text-white transition-colors duration-200"
          >
            Projects
          </Link>
          <Link
            href="/blog"
            className="hover:text-white transition-colors duration-200"
          >
            Blog
          </Link>
          <a
            href={siteConfig.socials.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-200"
          >
            GitHub
          </a>
          <a
            href={siteConfig.socials.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-200"
          >
            LinkedIn
          </a>
          <a
            href={siteConfig.socials.twitter.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-200"
          >
            Twitter
          </a>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-2 text-xs text-zinc-600">
          <span>
            Designed & built by {siteConfig.name}
          </span>
          <span className="hidden md:inline">·</span>
          <span>&copy; {currentYear}</span>
        </div>

      </div>
    </footer>
  )
}

export default Footer
