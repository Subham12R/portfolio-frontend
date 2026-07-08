"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Lazy initialize Audio on client-side
    audioRef.current = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.35; // comfortable background level

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    // Play click.wav sound
    const clickAudio = new Audio("/click.wav");
    clickAudio.play().catch(() => {});

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((err) => {
        console.error("Audio playback blocked or failed:", err);
      });
      setIsPlaying(true);
    }
  };

  return (
    <button
      onClick={togglePlay}
      className="fixed bottom-8 right-[88px] z-50 p-3 rounded-md bg-bg-elevated border border-border-primary shadow-[inset_0px_0px_2px_2px_rgba(0,0,0,0.08)] dark:shadow-[inset_0px_0px_4px_4px_rgba(255,255,255,0.04)] hover:bg-hover-tint hover:border-border-secondary transition-all duration-300 group"
      aria-label={isPlaying ? "Mute music" : "Play music"}
    >
      <div className="relative flex items-center justify-center">
        {isPlaying ? (
          <>
            <Volume2 size={20} className="text-text-primary animate-pulse" />
            {/* Tiny sound waves indicator */}
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
          </>
        ) : (
          <VolumeX size={20} className="text-text-muted group-hover:text-text-primary transition-colors" />
        )}
      </div>
    </button>
  );
}
