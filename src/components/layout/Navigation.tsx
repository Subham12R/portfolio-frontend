'use client'

import Image from "next/image"
import Link from "next/link"
import { siteConfig } from "@/data"
import profileIcon from "../../../public/images/profile/pfp.jpeg"
import { ThemeToggle } from "@/components/ui/ThemeToggle"

// Navigation links (subset of main navigation for header)
const navLinks = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Blogs", href: "/blogs" },
]

const Navigation = () => {
  return (
    <header className="sticky top-0 flex justify-center z-50 items-center w-full">
      <nav className="bg-bg-nav backdrop-blur-xl w-full max-w-4xl flex justify-between items-center px-2">

        {/* Logo */}
        <div className="py-2 inline-flex items-center">
          <Link href="#home" className="group">
            <Image
              src={profileIcon}
              alt={siteConfig.name}
              width={40}
              height={40}
              className="rounded-xl outline-2 w-10 h-10 outline-offset-2 object-cover outline-border-primary group-hover:outline-border-secondary transition-all duration-200"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex justify-center items-center gap-1 md:gap-6">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="px-2 py-2 text-sm md:text-base font-medium text-text-secondary hover:text-text-primary relative after:absolute after:left-2 after:right-2 after:bottom-0 after:h-0.5 after:bg-text-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:origin-left transition-colors duration-200"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Theme Toggle */}
        <div className="flex items-center">
          <ThemeToggle />
        </div>

      </nav>
    </header>
  )
}

export default Navigation
