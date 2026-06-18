import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const SKIP = /^(\/_next|\/api|\/favicon\.ico|\/images|\/fonts)/;

let _redis: Redis | null = null;

function getRedis(): Redis | null {
  if (_redis) return _redis;
  const url   = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) _redis = new Redis({ url, token });
  return _redis;
}

async function hashIp(ip: string, date: string): Promise<string> {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(`${ip}:${date}`)
  );
  return Array.from(new Uint8Array(buf))
    .slice(0, 8)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const { pathname } = req.nextUrl;

  if (SKIP.test(pathname)) return res;

  const r = getRedis();
  if (!r) return res;

  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const ip   = (req.ip ?? req.headers.get("x-forwarded-for") ?? "anon")
    .split(",")[0]
    .trim();
  const uid  = await hashIp(ip, date);
  const ttl  = 40 * 86400; // 40 days

  const pipe = r.pipeline();
  pipe.incr(`v:${date}`);
  pipe.expire(`v:${date}`, ttl);
  pipe.pfadd(`uv:${date}`, uid);
  pipe.expire(`uv:${date}`, ttl);
  pipe.zincrby("pg", 1, pathname);

  await pipe.exec().catch(() => {});

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico).*)"],
};
