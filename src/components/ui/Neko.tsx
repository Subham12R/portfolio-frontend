'use client'

import Script from 'next/script'

export function Neko() {
  return (
    <Script
      src="https://louisabraham.github.io/nekojs/neko.js"
      strategy="afterInteractive"
      data-autostart=""
    />
  )
}
