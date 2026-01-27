"use client"

import { useState } from "react"
import Image from "next/image"
import { Play } from "lucide-react"

export default function YouTubePlayer({ youtubeId, title }: { youtubeId: string; title: string }) {
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <div className="aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={title}
        />
      </div>
    )
  }

  return (
    <button
      onClick={() => setPlaying(true)}
      className="relative block w-full aspect-video bg-bg-elevated group/video cursor-pointer"
    >
      <Image
        src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
        alt={`${title} preview`}
        fill
        className="object-cover transition-transform duration-300 group-hover/video:scale-105"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover/video:opacity-100 transition-opacity duration-200">
        <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
          <Play size={28} className="text-black ml-1" fill="black" />
        </div>
      </div>
    </button>
  )
}
