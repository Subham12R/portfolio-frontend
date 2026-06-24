"use client";

import Script from "next/script";
import { useState, useEffect } from "react";

export function Neko() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(window.matchMedia("(pointer: fine)").matches);
  }, []);

  if (!show) return null;

  return (
    <Script
      src="https://louisabraham.github.io/nekojs/neko.js"
      strategy="afterInteractive"
      data-autostart=""
    />
  );
}
