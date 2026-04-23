# Agent notes — tjeastmond.com

Personal single-page site (Next.js App Router). No API routes, no database, no auth. Editable content lives in `src/app/page.tsx` and `src/components/`.

## Commands (pnpm)

| Command | Purpose |
|--------|--------|
| `pnpm dev` | Dev server: Turbopack, port 3000 |
| `pnpm build` | Production build |
| `pnpm start` | Run production build |
| `pnpm lint` | `next lint` (ESLint) |
| `pnpm test` | Jest + ts-jest, jsdom; `*.spec.ts` / `*.test.ts` |

## Stack

- **Next.js** 16 (App Router), **React** 19, **TypeScript** 5.5
- **Vercel**: `@vercel/analytics`, `@vercel/speed-insights` (wired in `src/app/layout.tsx`)
- Styling: global CSS in `src/css/hack.css` (imports `reset.css`, theme ~`#1d1e22` / `#fffcf7`), **Source Code Pro** via `next/font/google` in the root layout
- **Font Awesome** class names in `socials.tsx` (`fab`, `fa-*`); ensure CSS for icons stays in sync

## Layout

- `src/app/` — `layout.tsx` (font, metadata export, analytics), `page.tsx` (home), `metadata.tsx` (SEO, icons, `robots`)
- `src/components/` — UI pieces; `scrambler/` holds the text-scramble logic + `scrambler.spec.ts`
- `public/` — static assets, favicons, `logo.svg`, `images/icons/`

**Path aliases** (see `tsconfig.json`): `@app/*`, `@components/*`, `@modules/*`, `@styles/*`, `@webfonts/*` — prefer these over deep relatives.

## Patterns to respect

- **`ScrambleText` / `scramblerText.tsx`**: client component (`"use client"`). Wraps `ScrambleText` from `scrambler.ts` (DOM + `requestAnimationFrame`). `Link` and `Title` use it; changing scramble behavior or refs may need cleanup in `useEffect` hooks.
- **TypeScript** is `strict: false` — add explicit types for new public props/APIs; do not assume strict null checks.
- **Metadata**: `metadata.tsx` is the single source for `export default metadata` consumed by the layout; keep `title` / `description` / icons coherent when editing.

## What not to expect

- No `.github/` workflows, no `vercel.json` in repo (deploy config may live in Vercel only).
- README is minimal; this file and the source are the project map.

## Before finishing a change

Run `pnpm lint`, `pnpm test`, and `pnpm build` when edits touch components, config, or dependencies.
