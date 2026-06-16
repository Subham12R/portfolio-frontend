"use client";

import Script from "next/script";
import { useState, useEffect } from "react";

export function Neko() {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  return (
    <Script
      src="/neko.js"
      strategy="afterInteractive"
      data-autostart=""
      onLoad={() => setScriptLoaded(true)}
    />
  );
}
