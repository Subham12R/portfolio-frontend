"use client";

import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data";
import profileIcon from "../../../public/images/profile/pfp.jpeg";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { GitHubStarButton } from "@/components/ui/GitHubStarButton";
import { CommandPalette } from "@/components/ui/CommandPalette";

// Navigation links (subset of main navigation for header)
const navLinks = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
];

const Navigation = () => {
  return (
    <header className="sticky top-0 flex justify-center z-50 items-center w-full">
      <nav className="bg-bg-nav/50 backdrop-blur-sm w-full max-w-4xl flex justify-between items-center px-2 md:px-0">
        {/* Logo + Navigation Links - Left side */}
        <div className="flex items-center gap-4 md:gap-6 ml-0.2">
          <div className="py-2 inline-flex items-center">
            <Link href="#home" className="group">
              <Image
                src={profileIcon}
                alt={siteConfig.name}
                width={40}
                height={40}
                className="w-10 h-10 aspect-square object-cover rounded-[9999px] transition-all duration-200"
              />
            </Link>
          </div>

          <ul className="flex items-center gap-1 md:gap-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="px-2 py-2 text-sm md:text-base font-medium text-text-secondary hover:text-text-primary relative after:absolute after:left-2 after:right-2 after:bottom-0 after:h-0.5 after:bg-text-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:origin-left transition-colors duration-200"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Controls - Right side */}
        <div className="flex items-center gap-1">
          <GitHubStarButton repo="Subham12R/portfolio-frontend" />
          <CommandPalette />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
