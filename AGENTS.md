# Agent notes — tjeastmond.com

Personal single-page site (**Vite** + React). No API routes, no database, no auth. Editable copy and layout are in `src/App.tsx` and `src/components/novel/`.

## Agent workflow

**Before finishing a change (or in CI): always run `pnpm check`.** If any step fails, stop and fix the issues before you consider the task done.

The `check` script in `package.json` is:

```text
pnpm test && pnpm run typecheck && pnpm run lint && pnpm run format && pnpm run build
```

That is the same as running, in order: `test` → `typecheck` → `lint` → `format` → `build`. The `format` step **rewrites** files with Prettier when they are not already formatted.

## Commands (pnpm)

| Command | Purpose |
|--------|--------|
| `pnpm check` | **Full validation** — `test`, `typecheck`, `lint`, `format` (write), `build` (use this; see above) |
| `pnpm dev` | Vite dev server (port 3000) |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm lint` | ESLint (`eslint.config.js` — `@eslint/js`, `typescript-eslint`, `react-hooks`, `react-refresh`) |
| `pnpm format` / `pnpm format:check` | Prettier — write or check (`.prettierrc`, 2 spaces, 120 print width) |
| `pnpm build` | `tsc && vite build` — production bundle to `dist/` |
| `pnpm preview` / `pnpm start` | Serve production build |
| `pnpm test` | Vitest; `*.spec.ts` / `*.test.ts` |

## Stack

- **Vite** 6, **React** 19, **TypeScript** 5.5 (strict)
- **Vercel**: `@vercel/analytics`, `@vercel/speed-insights` in `src/App.tsx`; root `vercel.json` for `dist` output
- Styling: global CSS in `src/css/global.css` (includes reset); **Cormorant Garamond** and **Geist Mono** self-hosted from `public/fonts/cormorant-garamond/` and `public/fonts/geist-mono/`
- **Novel layout**: components in `src/components/novel/` — `NovelPage`, index table, colophon; index row data in `indexData.ts`

## Layout

- `index.html` — shell, head meta, `#root` entry
- `src/main.tsx` → `src/App.tsx` — page content, Vercel widgets
- `src/components/novel/` — novel theme UI; pre-novel dark theme backed up under `src/archived/pre-novel-theme/`
- `public/` — static assets, favicons, `images/icons/`, self-hosted fonts

**Path aliases** (see `tsconfig.json`): `@components/*`, `@styles/*` — prefer these over deep relatives.

## What not to expect

- No `.github/` workflows in the repo; deploy config is `vercel.json` plus the Vercel project.
- README is minimal; this file and the source are the project map.

## Learned User Preferences

- Light folio/catalog theme from `novel.html`; no theme toggle in the UI.
- Self-host all fonts locally (no Google Fonts network requests).
- Novel landing layout: centered `.content` only — no `.page` double-border frame wrapper.
- When porting reference HTML to React, exclude page-load stagger animations; keep hover effects and dynamic behaviors (e.g. dot leaders).
- When implementing attached plans, do not edit the plan file.
- Include the `.cursor` directory in commits when adding Cursor hooks or config.

## Learned Workspace Facts

- Landing page components live in `src/components/novel/` (NovelPage, IndexTable, indexData, etc.).
- Previous dark-theme components backed up in `src/archived/pre-novel-theme/`.
- Fonts: Cormorant Garamond + Geist Mono self-hosted from `public/fonts/cormorant-garamond/` and `public/fonts/geist-mono/`.
- `novel.html` at repo root is the authoritative design reference for the landing page.
- Light palette and layout constants live in `src/css/global.css` (`--bg: #f5f2eb`, `--ink: #1e1c19`, `--accent: #964b34`); body flex-centers `.content`.
- `.cursor/hooks/state/continual-learning.json` is gitignored (local continual-learning hook state).
