import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { PORTFOLIO_API_CACHE_TAG } from "@/lib/api/client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * On-demand CDN / ISR cache bust.
 *
 * POST /api/revalidate
 * Header:  x-revalidate-secret: <REVALIDATE_SECRET>
 * Body (optional JSON):
 *   { "tags": ["portfolio-api"], "paths": ["/", "/projects"] }
 *
 * Wire this from the admin panel after publishing projects.
 */
export async function POST(req: NextRequest) {
  const secret =
    req.headers.get("x-revalidate-secret") ||
    req.nextUrl.searchParams.get("secret");

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let tags: string[] = [PORTFOLIO_API_CACHE_TAG];
  let paths: string[] = ["/", "/projects"];

  try {
    const body = (await req.json()) as {
      tags?: string[];
      paths?: string[];
    };
    if (Array.isArray(body.tags) && body.tags.length > 0) tags = body.tags;
    if (Array.isArray(body.paths) && body.paths.length > 0) paths = body.paths;
  } catch {
    // empty body is fine — use defaults
  }

  for (const tag of tags) {
    // Next.js 16: second arg is cache life profile ("max" = expire immediately)
    revalidateTag(tag, "max");
  }
  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({
    ok: true,
    revalidated: true,
    tags,
    paths,
    now: Date.now(),
  });
}

export async function GET() {
  return NextResponse.json(
    {
      ok: false,
      error: "Use POST with x-revalidate-secret header",
    },
    { status: 405 }
  );
}
