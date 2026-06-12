"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const SOURCE = "/api/spotify/now-playing";

type NowPlayingState = {
  isPlaying: boolean;
  track: string | null;
  artist: string | null;
  url: string | null;
  previewUrl: string | null;
  imageUrl: string | null;
};

type SpotifyNowPlayingResponse = {
  isPlaying?: boolean;
  track?: string | null;
  artist?: string | null;
  url?: string | null;
  previewUrl?: string | null;
  imageUrl?: string | null;
};

function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path
        d="M6.8 9.2c3.9-1.2 8.1-.9 11.4 1"
        fill="none"
        stroke="#111"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M7.6 12c3.3-1 6.8-.7 9.7.8"
        fill="none"
        stroke="#111"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M8.5 14.6c2.7-.8 5.4-.6 7.7.6"
        fill="none"
        stroke="#111"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function SpotifyNowPlaying({
  className = "",
}: {
  className?: string;
}) {
  const [nowPlaying, setNowPlaying] = useState<NowPlayingState>({
    isPlaying: false,
    track: null,
    artist: null,
    url: null,
    previewUrl: null,
    imageUrl: null,
  });
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioPreviewUrlRef = useRef<string | null>(null);

  const stopPreview = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    audioPreviewUrlRef.current = null;
    setIsPreviewPlaying(false);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadNowPlaying() {
      try {
        const res = await fetch(SOURCE, { cache: "no-store" });
        if (!res.ok) {
          if (!cancelled) {
            stopPreview();
            setNowPlaying((prev) => ({
              ...prev,
              isPlaying: false,
            }));
          }
          return;
        }

        const data = (await res.json()) as SpotifyNowPlayingResponse;
        if (!data.track) {
          if (!cancelled) {
            stopPreview();
            setNowPlaying({
              isPlaying: false,
              track: null,
              artist: null,
              url: null,
              previewUrl: null,
              imageUrl: null,
            });
          }
          return;
        }

        if (!cancelled) {
          const nextPreviewUrl = data.previewUrl || null;
          if (
            audioPreviewUrlRef.current &&
            audioPreviewUrlRef.current !== nextPreviewUrl
          ) {
            stopPreview();
          }
          setNowPlaying({
            isPlaying: Boolean(data.isPlaying),
            track: data.track,
            artist: data.artist || null,
            url: data.url || null,
            previewUrl: nextPreviewUrl,
            imageUrl: data.imageUrl || null,
          });
        }
      } catch {
        if (!cancelled) {
          stopPreview();
          setNowPlaying((prev) => ({
            ...prev,
            isPlaying: false,
          }));
        }
      }
    }

    loadNowPlaying();
    const interval = setInterval(loadNowPlaying, 10000);

    return () => {
      cancelled = true;
      clearInterval(interval);
      stopPreview();
    };
  }, [stopPreview]);

  const handlePreviewToggle = async () => {
    if (!nowPlaying.previewUrl) return;

    const currentAudio = audioRef.current;
    const currentPreviewUrl = audioPreviewUrlRef.current;

    if (currentAudio && currentPreviewUrl === nowPlaying.previewUrl) {
      if (currentAudio.paused) {
        try {
          await currentAudio.play();
          setIsPreviewPlaying(true);
        } catch {
          setIsPreviewPlaying(false);
        }
      } else {
        currentAudio.pause();
        setIsPreviewPlaying(false);
      }
      return;
    }

    stopPreview();

    const audio = new Audio(nowPlaying.previewUrl);
    audioRef.current = audio;
    audioPreviewUrlRef.current = nowPlaying.previewUrl;
    audio.onended = () => setIsPreviewPlaying(false);
    audio.onpause = () => setIsPreviewPlaying(false);

    try {
      await audio.play();
      setIsPreviewPlaying(true);
    } catch {
      setIsPreviewPlaying(false);
    }
  };

  const hasTrack = Boolean(nowPlaying.track);
  const isOnline = Boolean(nowPlaying.isPlaying && nowPlaying.track);
  const content = isOnline ? (
    <span className="min-w-0 whitespace-nowrap">
      <span className="text-text-tertiary">Now playing:</span>{" "}
      <span className="text-text-secondary">{nowPlaying.track}</span>
    </span>
  ) : hasTrack ? (
    <span className="min-w-0 whitespace-nowrap">
      <span className="text-text-tertiary">Last played:</span>{" "}
      <span className="text-text-secondary">{nowPlaying.track}</span>
    </span>
  ) : (
    <span className="min-w-0 whitespace-nowrap">
      <span className="text-text-tertiary">Currently offline</span>
    </span>
  );

  return (
    <div
      className={`flex h-full max-w-full items-center gap-2 overflow-x-auto overflow-y-hidden text-sm leading-none ${className}`.trim()}
    >
      {hasTrack && nowPlaying.imageUrl ? (
        <Image
          src={nowPlaying.imageUrl}
          alt={nowPlaying.track || "Album cover"}
          width={24}
          height={24}
          className="h-6 w-6 shrink-0 rounded object-cover"
          unoptimized
        />
      ) : (
        <SpotifyIcon className="h-6 w-6 shrink-0 text-[#1DB954]" />
      )}
      {isOnline && nowPlaying.previewUrl ? (
        <button
          type="button"
          onClick={handlePreviewToggle}
          className="inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded border border-border-primary bg-bg-elevated px-1 text-[10px] text-text-secondary hover:text-text-primary"
          aria-label={
            isPreviewPlaying ? "Pause Spotify preview" : "Play Spotify preview"
          }
          title={isPreviewPlaying ? "Pause 30s preview" : "Play 30s preview"}
        >
          {isPreviewPlaying ? "||" : ">"}
        </button>
      ) : null}
      {hasTrack && nowPlaying.url ? (
        <a
          href={nowPlaying.url}
          target="_blank"
          rel="noopener noreferrer"
          className="min-w-0 flex-1 whitespace-nowrap hover:underline"
          title={nowPlaying.track || undefined}
        >
          {content}
        </a>
      ) : (
        <div className="min-w-0 flex-1 whitespace-nowrap" title={nowPlaying.track || undefined}>
          {content}
        </div>
      )}
    </div>
  );
}
