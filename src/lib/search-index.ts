// Helpers for the site search index (src/pages/[lang]/search-index.json.ts). Build time only.
import type { MarkdownHeading } from 'astro';

const marks = /[‎‏⁦-⁩]/g;

/** Markdown to plain text: no links, markup, tables, bare URLs or direction marks. */
export function plainText(md: string): string {
  return md
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^\[[^\]]+\]:\s*\S+.*$/gm, ' ')
    .replace(/^\s*(?:#{1,6}|>|[-*+]|\d+[.)])\s+/gm, '')
    .replace(/^[\s|:-]*\|[\s|:-]*$/gm, ' ')
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/\|/g, ' ')
    .replace(/[*_`~]/g, '')
    .replace(marks, '')
    .replace(/\s+/g, ' ')
    .replace(/ ([.,;:!?،؛])/g, '$1')
    .trim();
}

export interface Chunk {
  heading?: string;
  slug?: string;
  text: string;
}

/**
 * Split a Markdown body at its ## and ### headings, so each section is its own search result
 * that links straight to the heading. The first chunk is the text before the first heading.
 * `headings` comes from render(entry), which gives the ids Astro puts on the page.
 */
export function chunks(body: string, headings: MarkdownHeading[]): Chunk[] {
  const hs = headings.filter((h) => h.depth === 2 || h.depth === 3);
  const parts = body.split(/^#{2,3}[ \t].*$/m);
  if (parts.length - 1 !== hs.length) return [{ text: plainText(body) }];
  return parts
    .map((part, i) => ({
      heading: i === 0 ? undefined : hs[i - 1].text.replace(marks, '').trim(),
      slug: i === 0 ? undefined : hs[i - 1].slug,
      text: plainText(part),
    }))
    // Keep the first chunk even when empty: the page's own entry (title and description) is built from it.
    .filter((c, i) => i === 0 || c.heading || c.text);
}
