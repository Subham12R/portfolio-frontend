"use client";

import Script from "next/script";
import { useState, useEffect } from "react";

export function Neko() {
  const [enabled, setEnabled] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    setEnabled(localStorage.getItem("neko-enabled") === "true");

    const toggle = () => {
      setEnabled((prev) => {
        const next = !prev;
        localStorage.setItem("neko-enabled", String(next));
        return next;
      });
    };
    window.addEventListener("neko-toggle", toggle);
    return () => window.removeEventListener("neko-toggle", toggle);
  }, []);

  useEffect(() => {
    const el = document.getElementById("neko");
    if (!el) return;
    el.style.display = enabled ? "" : "none";
  }, [enabled, scriptLoaded]);

  if (!enabled && !scriptLoaded) return null;

  return (
    <Script
      src="https://louisabraham.github.io/nekojs/neko.js"
      strategy="afterInteractive"
      data-autostart=""
      onLoad={() => setScriptLoaded(true)}
    />
  );
}
