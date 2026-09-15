import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");

test("hero renders the cursor-tracking mascot in place of the portrait", () => {
  const hero = fs.readFileSync(
    path.join(root, "src/sections/hero/page.tsx"),
    "utf8",
  );

  assert.match(hero, /import\s+\{\s*Mascot\s*\}\s+from\s+["']page-mascot["']/);
  assert.match(
    hero,
    /<Mascot[\s\S]*directions=["']\/mascots\/subham-directions\.webp["'][\s\S]*reactions=["']\/mascots\/subham-reactions\.webp["']/,
  );
});

test("the mascot atlases are served from the public mascot directory", () => {
  assert.ok(
    fs.existsSync(path.join(root, "public/mascots/subham-directions.webp")),
  );
  assert.ok(
    fs.existsSync(path.join(root, "public/mascots/subham-reactions.webp")),
  );
});

test("the mascot tile and profile copy share a centered alignment", () => {
  const hero = fs.readFileSync(
    path.join(root, "src/sections/hero/page.tsx"),
    "utf8",
  );

  assert.match(hero, /items-end justify-center/);
  assert.match(hero, /items-start justify-center gap-0\.5 min-w-0 w-full/);
  assert.doesNotMatch(hero, /truncate w-full mt-10/);
});

test("mascot clicks play feedback while the character stays centered at the bottom", () => {
  const hero = fs.readFileSync(
    path.join(root, "src/sections/hero/page.tsx"),
    "utf8",
  );

  assert.match(
    hero,
    /className="relative flex h-\[\d+px\] w-\[\d+px\] shrink-0 items-end justify-center overflow-hidden rounded-md[^\"]*"/,
  );
  assert.match(hero, /onClick=\{playClickSound\}/);
  assert.match(
    hero,
    /className="absolute bottom-0 left-1\/2 -translate-x-1\/2"/,
  );
  assert.doesNotMatch(hero, /right-\[-10px\]|-translate-y-1\/2/);
});
