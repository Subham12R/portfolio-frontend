import Link from 'next/link'
import { siteConfig } from '@/data'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full flex justify-center items-center bg-black py-6 text-center text-sm text-zinc-500 px-4 lg:px-0">
      <div className="w-full max-w-4xl border-t border-zinc-800 pt-2">


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
