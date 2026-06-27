'use client'

import dynamic from 'next/dynamic'

const SmoothScroll = dynamic(
  () => import('./SmoothScroll').then(m => m.SmoothScroll),
  { ssr: false }
)

export { SmoothScroll }
