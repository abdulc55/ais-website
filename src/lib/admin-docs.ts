import { readFile } from "node:fs/promises";
import path from "node:path";

export interface AdminDocSection {
  id: string;
  title: string;
}

interface AdminDocBaseBlock {
  type: string;
}

export interface AdminDocHeadingBlock extends AdminDocBaseBlock {
  type: "heading";
  id: string;
  level: number;
  text: string;
}

export interface AdminDocParagraphBlock extends AdminDocBaseBlock {
  type: "paragraph";
  text: string;
}

export interface AdminDocListItem {
  depth: number;
  text: string;
}

export interface AdminDocListBlock extends AdminDocBaseBlock {
  type: "list";
  items: AdminDocListItem[];
  ordered: boolean;
}

export interface AdminDocQuoteBlock extends AdminDocBaseBlock {
  type: "quote";
  text: string;
}

export interface AdminDocCodeBlock extends AdminDocBaseBlock {
  type: "code";
  code: string;
  language: string;
}

export type AdminDocBlock =
  | AdminDocHeadingBlock
  | AdminDocParagraphBlock
  | AdminDocListBlock
  | AdminDocQuoteBlock
  | AdminDocCodeBlock;

export interface AdminDoc {
  blocks: AdminDocBlock[];
  sections: AdminDocSection[];
  title: string;
  updated: string | null;
}

function slugifyHeading(text: string, seen: Map<string, number>) {
  const base = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "section";

  const count = seen.get(base) ?? 0;
  seen.set(base, count + 1);

  return count === 0 ? base : `${base}-${count + 1}`;
}

export function parseMarkdownDocument(markdown: string): AdminDoc {
  const normalized = markdown.replace(/\r\n/g, "\n");
  const lines = normalized.split("\n");
  const blocks: AdminDocBlock[] = [];
  const sections: AdminDocSection[] = [];
  const seenHeadings = new Map<string, number>();

  let title = "Admin Docs";
  let updated: string | null = null;
  let paragraphLines: string[] = [];
  let quoteLines: string[] = [];
  let listState: { items: AdminDocListItem[]; ordered: boolean } | null = null;
  let inCodeBlock = false;
  let codeLanguage = "";
  let codeLines: string[] = [];

  function flushParagraph() {
    if (paragraphLines.length === 0) return;

    blocks.push({
      type: "paragraph",
      text: paragraphLines.join(" ").trim(),
    });
    paragraphLines = [];
  }

  function flushQuote() {
    if (quoteLines.length === 0) return;

    blocks.push({
      type: "quote",
      text: quoteLines.join(" ").trim(),
    });
    quoteLines = [];
  }

  function flushList() {
    if (!listState) return;

    blocks.push({
      type: "list",
      ordered: listState.ordered,
      items: listState.items,
    });
    listState = null;
  }

  function flushOpenBlocks() {
    flushParagraph();
    flushQuote();
    flushList();
  }

  for (const rawLine of lines) {
    if (inCodeBlock) {
      if (rawLine.startsWith("```")) {
        blocks.push({
          type: "code",
          code: codeLines.join("\n"),
          language: codeLanguage || "text",
        });
        inCodeBlock = false;
        codeLanguage = "";
        codeLines = [];
      } else {
        codeLines.push(rawLine);
      }
      continue;
    }

    if (rawLine.startsWith("```")) {
      flushOpenBlocks();
      inCodeBlock = true;
      codeLanguage = rawLine.slice(3).trim();
      continue;
    }

    if (!rawLine.trim()) {
      flushOpenBlocks();
      continue;
    }

    const updatedMatch = rawLine.match(/^Updated:\s+(.+)$/);
    if (updatedMatch) {
      flushOpenBlocks();
      updated = updatedMatch[1].trim();
      continue;
    }

    const headingMatch = rawLine.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      flushOpenBlocks();

      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();
      const id = slugifyHeading(text, seenHeadings);

      blocks.push({
        type: "heading",
        id,
        level,
        text,
      });

      if (level === 1) {
        title = text;
      }

      if (level === 2) {
        sections.push({ id, title: text });
      }

      continue;
    }

    const quoteMatch = rawLine.match(/^>\s?(.*)$/);
    if (quoteMatch) {
      flushParagraph();
      flushList();
      quoteLines.push(quoteMatch[1].trim());
      continue;
    }

    flushQuote();

    const unorderedMatch = rawLine.match(/^(\s*)-\s+(.+)$/);
    const orderedMatch = rawLine.match(/^(\s*)\d+\.\s+(.+)$/);
    if (unorderedMatch || orderedMatch) {
      flushParagraph();

      const ordered = Boolean(orderedMatch);
      const match = orderedMatch ?? unorderedMatch;

      if (!match) continue;

      const depth = Math.floor(match[1].length / 2);
      const text = match[2].trim();

      if (!listState || listState.ordered !== ordered) {
        flushList();
        listState = { items: [], ordered };
      }

      listState.items.push({ depth, text });
      continue;
    }

    flushList();
    paragraphLines.push(rawLine.trim());
  }

  flushOpenBlocks();

  return {
    blocks,
    sections,
    title,
    updated,
  };
}

export async function loadSalesPlaybook(): Promise<AdminDoc> {
  const filePath = path.join(process.cwd(), "SPIFFYTEC-SALES-PLAYBOOK.md");
  const markdown = await readFile(filePath, "utf8");
  return parseMarkdownDocument(markdown);
}
