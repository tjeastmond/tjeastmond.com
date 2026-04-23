# Agent notes — tjeastmond.com

Personal single-page site (**Vite** + React). No API routes, no database, no auth. Editable copy and layout are in `src/App.tsx` and `src/components/`.

## Agent workflow

**Before finishing a change (or in CI): always run `pnpm check`.** If any step fails, stop and fix the issues before you consider the task done.

The `check` script in `package.json` is:

```text
pnpm test && pnpm run typecheck && pnpm run lint && pnpm run format:check && pnpm run build
```

That is the same as running, in order: `test` → `typecheck` → `lint` → `format:check` → `build`.

## Commands (pnpm)

| Command | Purpose |
|--------|--------|
| `pnpm check` | **Full validation** — `test`, `typecheck`, `lint`, `format:check`, `build` (use this; see above) |
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
- Styling: global CSS in `src/css/global.css` (imports `reset.css`, Font Awesome from `src/fonts/fontawesome/all.min.css`), **Source Code Pro** from `index.html` (Google Fonts)
- **Social icons**: Font Awesome classes in `socials.tsx`; webfont kit lives under `src/fonts/fontawesome/` (`all.min.css`, `*.woff2`, `LICENSE.txt`) — Vite bundles and fingerprints these at build time

## Layout

- `index.html` — shell, head meta, theme bootstrap script, `#root` entry
- `src/main.tsx` → `src/App.tsx` — page content, Vercel widgets
- `src/components/` — UI pieces; archived scramble effect under `src/archived/scrambler-effect/`
- `public/` — static assets, favicons, `logo.svg`, `images/icons/`

**Path aliases** (see `tsconfig.json`): `@components/*`, `@styles/*`, `@webfonts/*` — prefer these over deep relatives.

## What not to expect

- No `.github/` workflows in the repo; deploy config is `vercel.json` plus the Vercel project.
- README is minimal; this file and the source are the project map.
