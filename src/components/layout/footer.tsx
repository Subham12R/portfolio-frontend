"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig } from "@/data";
import { VisitorBadge } from "@/components/ui/VisitorBadge";
import { GitHubStarBadge } from "@/components/ui/GitHubStarBadge";
import { GithubIcon } from "@/components/ui/github";
import { XIcon } from "@/components/ui/x";
import { HugeiconsIcon } from '@hugeicons/react'
import { NewTwitterIcon, Linkedin01Icon } from '@hugeicons/core-free-icons'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { socials, timezone } = siteConfig;
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    function updateTime() {
      setLocalTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: timezone,
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    }
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://images.dmca.com/Badges/DMCABadgeHelper.min.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <footer className="w-full flex justify-center items-center pb-12 pt-8 px-4 lg:px-0">
      <div className="relative z-10 w-full max-w-4xl pt-8 pb-2 px-4">
        {/* Main Row - DMCA left, Links right */}
        <div className="flex justify-between items-center mb-2">
          {/* DMCA Badge - Left */}
          <a
            href="https://www.dmca.com/Protection/Status.aspx?ID=cc173fd3-4ecc-447a-8d25-cd5bc17402ca"
            title="DMCA.com Protection Status"
            className="dmca-badge size-14 flex justify-center items-center"
          >
            <img
              src="https://images.dmca.com/Badges/dmca_protected_13_120.png?ID=cc173fd3-4ecc-447a-8d25-cd5bc17402ca"
              alt="DMCA.com Protection Status"
            />
          </a>

          {/* Links - Right */}
          <div className="flex items-center gap-3 md:gap-4">
            <VisitorBadge />
            <GitHubStarBadge repo="Subham12R/portfolio-frontend" />
   
            <a
              href={socials.twitter.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text-primary transition-colors duration-200"
              aria-label="X"
            >
              <HugeiconsIcon icon={NewTwitterIcon}  size={25} />
            </a>
            <a
              href={socials.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text-primary transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <HugeiconsIcon icon={Linkedin01Icon}  size={25} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-1 md:gap-2 text-sm text-text-primary border-t border-border-primary pt-4">
          <span>
            Crafted with <span className="text-red-500">❤️</span> by{" "}
            <span className="text-text-secondary">{siteConfig.name}</span>
          </span>
          <span className="hidden md:inline text-border-primary">·</span>
          <span className="text-text-secondary">{localTime} IST</span>
          <span className="hidden md:inline text-border-primary">·</span>
          <span>&copy; {currentYear} All rights reserved</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
