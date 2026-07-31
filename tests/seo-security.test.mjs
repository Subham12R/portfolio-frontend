import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

const root = new URL("..", import.meta.url);

async function source(relativePath) {
  return readFile(new URL(relativePath, root), "utf8");
}

test("canonical site configuration uses the final www host", async () => {
  const config = await source("src/data/site.config.ts");

  assert.match(config, /url:\s*"https:\/\/www\.subham12r\.me"/);
});

test("security headers protect every route", async () => {
  const config = await source("next.config.ts");

  for (const header of [
    "X-Content-Type-Options",
    "X-Frame-Options",
    "Referrer-Policy",
    "Permissions-Policy",
    "Content-Security-Policy",
  ]) {
    assert.match(config, new RegExp(header));
  }

  assert.match(config, /source:\s*"\/:path\*"/);
});

test("LLM discovery files use the canonical host and current profile facts", async () => {
  const llms = await source("public/llms.txt");
  const full = await source("public/llms-full.txt");

  for (const content of [llms, full]) {
    assert.match(content, /Website: https:\/\/www\.subham12r\.me/);
    assert.match(content, /Email: dev@subham12r\.me/);
    assert.match(content, /Ryze AI \(January 2026 – April 2026\)/);
    assert.match(content, /Moodle LMS Cloud Maintainer/);
    assert.match(content, /November 2025 – May 2026/);
    assert.match(content, /Last Updated\n2026-07-31/);
  }
});

test("SEO routes expose current-page article and project schema", async () => {
  const blogPage = await source("src/app/blog/[slug]/page.tsx");
  const projectPage = await source("src/app/projects/[id]/page.tsx");

  assert.match(blogPage, /BlogPosting/);
  assert.match(projectPage, /CreativeWork/);
});

test("analytics does not retain arbitrary routes or expose detailed telemetry", async () => {
  const middleware = await source("src/middleware.ts");
  const analytics = await source("src/app/api/analytics/route.ts");

  assert.match(middleware, /TRACKED_PATHS/);
  assert.match(middleware, /toAnalyticsPath/);
  assert.match(analytics, /PublicAnalyticsStats/);
  assert.match(analytics, /Cache-Control": "no-store"/);
});
