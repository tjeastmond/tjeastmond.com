# Agent notes — tjeastmond.com

Personal single-page site (**Vite** + React). No API routes, no database, no auth. Editable copy and layout are in `src/App.tsx` and `src/components/`.

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
- Styling: global CSS in `src/css/global.css` (includes reset); **Roboto Mono** self-hosted from `public/fonts/roboto-mono/`
- **Social icons**: custom inline SVGs in `SiteIcons.tsx`, wired through `socialLinkData.ts` → `SocialLinks.tsx` → `SocialRow.tsx`

## Layout

- `index.html` — shell, head meta, `#root` entry
- `src/main.tsx` → `src/App.tsx` — page content, Vercel widgets
- `src/components/` — UI pieces; archived scramble effect under `src/archived/scrambler-effect/`
- `public/` — static assets, favicons, `images/icons/`, self-hosted fonts

**Path aliases** (see `tsconfig.json`): `@components/*`, `@styles/*` — prefer these over deep relatives.

## What not to expect

- No `.github/` workflows in the repo; deploy config is `vercel.json` plus the Vercel project.
- README is minimal; this file and the source are the project map.

## Learned User Preferences

- Dark theme only; no theme toggle in the UI.
- Social row: first icon flush with body text left edge; uniform spacing between icons; `cursor: pointer` on the icons, with the zoom/color effect on hover and keyboard focus (`:hover`/`:focus-visible`).
- When implementing attached plans, do not edit the plan file.
- Include the `.cursor` directory in commits when adding Cursor hooks or config.

## Learned Workspace Facts

- Minimal single-page header: site name only (no logo-mark, subtitle, or home link).
- Social links (inventory, order, hrefs, labels) live in `socialLinkData.ts` — the canonical source; e.g. X is labeled `x.com`.
- Page layout follows Swoo.io patterns: animated underline on body links; desktop social row shows attribution labels on hover.
- Layout constants (content/body max-widths, top padding) live in `src/css/global.css` — the canonical source; content is not vertically centered.
- `.cursor/hooks/state/continual-learning.json` is gitignored (local continual-learning hook state).
