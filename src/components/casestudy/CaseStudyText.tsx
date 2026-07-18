import { cn } from "@/lib/utils";

type TextBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

const BULLET_LINE = /^\s*(?:>|[-*•])\s+(.*)$/;

/**
 * Normalize admin/API text so inline `>` bullets become line-based markers.
 * Example: "…problems: >Lost context. >Fragmented chats." → separate lines.
 */
function normalizeBulletMarkers(text: string): string {
  return text
    .replace(/\r\n/g, "\n")
    // Ensure line-start bullets have a space after the marker
    .replace(/^(?:>|[-*•])(?=\S)/gm, (m) => `${m} `)
    // Inline `>` bullets (common in fetched case-study copy)
    .replace(/([^\n>])\s*>(?!\s*>)(?=\S)/g, "$1\n> ");
}

function parseBlocks(content: string): TextBlock[] {
  const normalized = normalizeBulletMarkers(content).trim();
  if (!normalized) return [];

  const lines = normalized.split("\n");
  const blocks: TextBlock[] = [];
  let paragraphLines: string[] = [];
  let listItems: string[] = [];

  const flushParagraph = () => {
    const text = paragraphLines.join(" ").replace(/\s+/g, " ").trim();
    if (text) blocks.push({ type: "paragraph", text });
    paragraphLines = [];
  };

  const flushList = () => {
    if (listItems.length > 0) {
      blocks.push({ type: "list", items: listItems });
      listItems = [];
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    if (!line.trim()) {
      flushList();
      flushParagraph();
      continue;
    }

    const bullet = line.match(BULLET_LINE);
    if (bullet) {
      flushParagraph();
      listItems.push(bullet[1].trim());
      continue;
    }

    flushList();
    paragraphLines.push(line.trim());
  }

  flushList();
  flushParagraph();
  return blocks;
}

/** Lightweight inline emphasis: **bold** and *italic* */
function renderInline(text: string, keyPrefix: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    const key = `${keyPrefix}-${i}`;
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={key} className="font-medium text-text-primary">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (
      part.startsWith("*") &&
      part.endsWith("*") &&
      part.length > 2 &&
      !part.startsWith("**")
    ) {
      return (
        <em key={key} className="italic text-text-tertiary">
          {part.slice(1, -1)}
        </em>
      );
    }
    return <span key={key}>{part}</span>;
  });
}

interface CaseStudyTextProps {
  content: string;
  className?: string;
  /** Slightly larger body text for lead sections like overview */
  size?: "sm" | "base";
}

/**
 * Renders fetched case-study prose with proper paragraphs and bullet lists.
 * Uses main-page fonts: Instrument Sans body + design tokens.
 */
export function CaseStudyText({
  content,
  className,
  size = "sm",
}: CaseStudyTextProps) {
  const blocks = parseBlocks(content);
  if (blocks.length === 0) return null;

  const textSize =
    size === "base" ? "text-[16px]" : "text-[15px] sm:text-[16px]";

  return (
    <div
      className={cn(
        "space-y-3.5 font-instrumentsans font-light tracking-tight text-text-secondary/80 leading-relaxed",
        textSize,
        className
      )}
    >
      {blocks.map((block, i) => {
        if (block.type === "list") {
          return (
            <ul key={i} className="my-1 list-none space-y-2.5 pl-0">
              {block.items.map((item, j) => (
                <li
                  key={j}
                  className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-text-muted"
                >
                  {renderInline(item, `l${i}-${j}`)}
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={i} className="text-pretty">
            {renderInline(block.text, `p${i}`)}
          </p>
        );
      })}
    </div>
  );
}
