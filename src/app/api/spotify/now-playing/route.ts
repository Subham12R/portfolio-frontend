import { NextResponse } from "next/server";

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT = "https://api.spotify.com/v1/me/player/recently-played?limit=1";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, max-age=0",
};

type SpotifyTokenResponse = {
  access_token?: string;
};

type SpotifyTrackResponse = {
  is_playing?: boolean;
  item?: {
    name?: string;
    artists?: Array<{ name?: string }>;
    external_urls?: { spotify?: string };
    preview_url?: string | null;
    album?: {
      images?: Array<{ url?: string }>;
    };
  } | null;
};

type SpotifyRecentlyPlayedResponse = {
  items?: Array<{
    track?: {
      name?: string;
      artists?: Array<{ name?: string }>;
      external_urls?: { spotify?: string };
      preview_url?: string | null;
      album?: {
        images?: Array<{ url?: string }>;
      };
    };
  }>;
};

function getEnv(name: string): string | null {
  const value = process.env[name];
  return value && value.trim() ? value.trim() : null;
}

async function getAccessToken(): Promise<string | null> {
  const clientId = getEnv("SPOTIFY_CLIENT_ID");
  const clientSecret = getEnv("SPOTIFY_CLIENT_SECRET");
  const refreshToken = getEnv("SPOTIFY_REFRESH_TOKEN");

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${authHeader}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as SpotifyTokenResponse;
  return data.access_token || null;
}

function extractTrack(item: {
  name?: string;
  artists?: Array<{ name?: string }>;
  external_urls?: { spotify?: string };
  preview_url?: string | null;
  album?: { images?: Array<{ url?: string }> };
} | null | undefined) {
  if (!item) return null;
  const track = item.name || null;
  const artist =
    item.artists?.map((entry) => entry.name).filter((name): name is string => Boolean(name)).join(", ") ||
    null;
  const url = item.external_urls?.spotify || null;
  const previewUrl = item.preview_url || null;
  const imageUrl = item.album?.images?.find((img) => typeof img.url === "string" && img.url)?.url || null;
  return { track, artist, url, previewUrl, imageUrl };
}

export async function GET() {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      return NextResponse.json(
        { isPlaying: false, track: null, artist: null, url: null, previewUrl: null, imageUrl: null },
        { headers: NO_STORE_HEADERS }
      );
    }

    // Try currently playing first
    const nowResponse = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    });

    if (nowResponse.ok && nowResponse.status !== 204) {
      const data = (await nowResponse.json()) as SpotifyTrackResponse;
      const item = data.item;
      const isPlaying = Boolean(data.is_playing && item?.name);
      if (isPlaying && item) {
        const track = extractTrack(item);
        if (track && track.track) {
          return NextResponse.json(
            { isPlaying: true, ...track },
            { headers: NO_STORE_HEADERS }
          );
        }
      }
    }

    // Fallback to recently played
    const recentResponse = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    });

    if (recentResponse.ok) {
      const data = (await recentResponse.json()) as SpotifyRecentlyPlayedResponse;
      const item = data.items?.[0]?.track;
      const track = extractTrack(item);
      if (track && track.track) {
        return NextResponse.json(
          { isPlaying: false, ...track },
          { headers: NO_STORE_HEADERS }
        );
      }
    }

    return NextResponse.json(
      { isPlaying: false, track: null, artist: null, url: null, previewUrl: null, imageUrl: null },
      { headers: NO_STORE_HEADERS }
    );
  } catch {
    return NextResponse.json(
      { isPlaying: false, track: null, artist: null, url: null, previewUrl: null, imageUrl: null },
      { headers: NO_STORE_HEADERS }
    );
  }
}
