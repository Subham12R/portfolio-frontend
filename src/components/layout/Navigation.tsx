"use client";

import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { CommandPalette } from "@/components/ui/CommandPalette";
// Navigation links (subset of main navigation for header)
const navLinks = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
];

const Navigation = () => {
  return (
    <header className="sticky top-0 flex justify-center z-50 items-center w-full ">
      <nav className="bg-bg-nav/10 backdrop-blur-sm w-full max-w-4xl flex justify-between items-center px-2 md:px-0">
        {/* Logo - Left side */}
        <div className=" px-2 py-2 inline-flex items-center ml-0.2">
          <Link href="/#home" className="group relative">
            <Image
              src="/images/profile/profile.png"
              alt={siteConfig.name}
              width={40}
              height={40}
              className="w-10 h-10 aspect-square object-contain md:object-cover rounded-lg transition-all duration-200"
              sizes="40px"
            />
            {/* Cloud tooltip */}
            <span className="absolute font-semibold top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-0.5 bg-white text-slate-800 text-xs rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-slate-200">
              Hi!
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-px border-4 border-transparent border-b-white" />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-[1px] border-[5px] border-transparent border-b-slate-200 -z-10" />
            </span>
          </Link>
        </div>

        {/* Navigation Links + Controls - Right side */}
        <div className="flex items-center gap-4 md:gap-6 mr-2">
          <ul className="flex gap-1 md:gap-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="px-2 py-1 text-sm md:text-base font-medium text-text-secondary hover:text-text-primary rounded-md hover:bg-hover-tint transition-colors duration-200"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <CommandPalette />
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
