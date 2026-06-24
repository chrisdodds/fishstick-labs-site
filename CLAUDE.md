# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Production build (output in `dist/`)
- `npm run preview` — Preview production build locally

No test framework or linter is configured.

## Architecture

Astro 5 static site for **fishsticklabs.com** (infrastructure/DevOps advisory). Uses MDX and sitemap integrations. TypeScript strict mode.

### Content

Blog posts live in `src/content/blog/` as Markdown files with `YYYY-MM-DD-slug.md` naming. The content collection schema (`src/content/config.ts`) requires `title`, `description`, and `pubDate` frontmatter; `author` defaults to "Chris Dodds"; `draft` is optional and filters posts from all listings and RSS.

### Pages

- `src/pages/index.astro` — Homepage; renders the latest non-draft blog post inline with a truncated excerpt
- `src/pages/blog/index.astro` — Blog listing; renders all non-draft posts sorted by date with excerpts
- `src/pages/blog/[...slug].astro` — Individual post pages via `getStaticPaths`
- `src/pages/rss.xml.js` — RSS feed
- `src/pages/404.astro` — 404 page

### Layout & Styling

Single layout (`src/layouts/Layout.astro`) handles all meta tags, Open Graph, structured data, analytics (Clicky + GoatCounter), and global styles. All CSS is in `<style>` blocks within `.astro` files — no external CSS framework. The design is dark-themed (#1a1d29 background) with Inter font and purple (#a78bfa) accent color.
