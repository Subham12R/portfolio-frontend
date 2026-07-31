"use client";

import Image from "next/image";
import { MermaidDiagram } from "@/components/casestudy/MermaidDiagram";

type Block =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "image"; src: string; alt: string }
  | { type: "mermaid"; chart: string }
  | { type: "code"; language: string; code: string }
  | { type: "table"; rows: string[][] }
  | { type: "rule" };

const imagePattern = /^!\[([^\]]*)\]\(([^)]+)\)$/;
const tableLinePattern = /^\|(.+)\|\s*$/;

function parseMarkdown(content: string): Block[] {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let index = 0;
  let paragraph: string[] = [];

  const flushParagraph = () => {
    const text = paragraph.join(" ").replace(/\s+/g, " ").trim();
    if (text) blocks.push({ type: "paragraph", text });
    paragraph = [];
  };

  while (index < lines.length) {
    const line = lines[index].trim();

    if (!line) {
      flushParagraph();
      index += 1;
      continue;
    }

    if (line.startsWith("```")) {
      flushParagraph();
      const language = line.slice(3).trim();
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        code.push(lines[index]);
        index += 1;
      }
      if (index < lines.length) index += 1;
      const source = code.join("\n").trim();
      blocks.push(language === "mermaid" ? { type: "mermaid", chart: source } : { type: "code", language, code: source });
      continue;
    }

    const image = line.match(imagePattern);
    if (image) {
      flushParagraph();
      blocks.push({ type: "image", alt: image[1], src: image[2] });
      index += 1;
      continue;
    }

    if (line === "---") {
      flushParagraph();
      blocks.push({ type: "rule" });
      index += 1;
      continue;
    }

    if (line.startsWith("## ") || line.startsWith("### ")) {
      flushParagraph();
      blocks.push({ type: "heading", level: line.startsWith("### ") ? 3 : 2, text: line.replace(/^#{2,3}\s+/, "") });
      index += 1;
      continue;
    }

    if (line.startsWith("> ")) {
      flushParagraph();
      blocks.push({ type: "quote", text: line.slice(2).trim() });
      index += 1;
      continue;
    }

    if (line.startsWith("- ")) {
      flushParagraph();
      const items: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith("- ")) {
        items.push(lines[index].trim().slice(2).trim());
        index += 1;
      }
      blocks.push({ type: "list", items });
      continue;
    }

    if (tableLinePattern.test(line)) {
      flushParagraph();
      const rows: string[][] = [];
      while (index < lines.length && tableLinePattern.test(lines[index].trim())) {
        const cells = lines[index].trim().split("|").slice(1, -1).map((cell) => cell.trim());
        if (!cells.every((cell) => /^:?-{3,}:?$/.test(cell))) rows.push(cells);
        index += 1;
      }
      blocks.push({ type: "table", rows });
      continue;
    }

    paragraph.push(line);
    index += 1;
  }

  flushParagraph();
  return blocks;
}

function headingId(text: string): string {
  return `blog-heading-${text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}`;
}

function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("*") && part.endsWith("*")) return <em key={index}>{part.slice(1, -1)}</em>;
    if (part.startsWith("`") && part.endsWith("`")) return <code key={index}>{part.slice(1, -1)}</code>;
    return <span key={index}>{part}</span>;
  });
}

function BlogArtwork({ src, alt }: { src: string; alt: string }) {
  return (
    <figure className="my-14 not-prose">
      <Image src={src} alt={alt} width={1672} height={941} unoptimized loading="eager" sizes="(max-width: 768px) 100vw, 720px" className="block h-auto w-full rounded-2xl object-contain" />
    </figure>
  );
}

export function BlogContentRenderer({ content }: { content: string }) {
  const blocks = parseMarkdown(content);

  return (
    <div className="prose prose-invert prose-zinc max-w-none prose-headings:text-text-primary prose-p:text-text-secondary prose-strong:text-text-primary prose-li:text-text-secondary prose-em:text-text-tertiary prose-code:text-blue-200 prose-code:before:content-none prose-code:after:content-none">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading": {
            const Tag = block.level === 2 ? "h2" : "h3";
            return <Tag key={index} id={headingId(block.text)} className={block.level === 2 ? "!mt-0 !mb-10 scroll-mt-32 pt-12 font-instrumentserif text-3xl font-normal tracking-tight" : "!mt-0 !mb-7 scroll-mt-32 pt-8 font-instrumentserif text-2xl font-normal tracking-tight"}><Inline text={block.text} /></Tag>;
          }
          case "paragraph": return <p key={index} className="my-8 text-[1.05rem] leading-8"><Inline text={block.text} /></p>;
          case "list": return <ul key={index} className="my-9 list-disc space-y-3 pl-6 text-[1.05rem] leading-8">{block.items.map((item, itemIndex) => <li key={itemIndex}><Inline text={item} /></li>)}</ul>;
          case "quote": return <blockquote key={index} className="my-12 border-0 p-0 text-lg italic leading-7 text-text-secondary"><Inline text={block.text} /></blockquote>;
          case "image": return <BlogArtwork key={index} src={block.src} alt={block.alt} />;
          case "mermaid": return <MermaidDiagram key={index} chart={block.chart} className="my-14 not-prose" />;
          case "code": return <pre key={index} className="my-12 overflow-x-auto rounded-xl border border-border-primary bg-bg-elevated/35 px-5 py-4 font-mono text-[13px] leading-5 text-text-secondary"><code>{block.code}</code></pre>;
          case "table": return <div key={index} className="my-12 overflow-x-auto"><table className="w-full border-collapse text-left text-[15px] leading-6"><tbody>{block.rows.map((row, rowIndex) => <tr key={rowIndex} className="border-b border-border-primary/80 last:border-0">{row.map((cell, cellIndex) => rowIndex === 0 ? <th key={cellIndex} className="whitespace-nowrap px-3 py-3 text-left font-medium text-text-primary first:pl-0 last:pr-0"><Inline text={cell} /></th> : <td key={cellIndex} className="px-3 py-4 align-top text-text-secondary first:pl-0 last:pr-0"><Inline text={cell} /></td>)}</tr>)}</tbody></table></div>;
          case "rule": return <hr key={index} className="!my-0 border-border-primary/80" />;
        }
      })}
    </div>
  );
}
