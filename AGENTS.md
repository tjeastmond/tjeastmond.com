# Agent notes — tjeastmond.com

Personal single-page site (**Vite** + React). No API routes, no database, no auth. Editable copy and layout are in `src/App.tsx` and `src/components/`.

## Agent workflow

**After each change:** run `pnpm typecheck`, `pnpm lint`, and `pnpm format`. Fix anything they report.

**Before every commit (or in CI): run `pnpm check`.** If any step fails, fix it and run `pnpm check` again; commit only once it passes. Don't run the full check after every change — it slows iteration down.

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

- **Vite** 8, **React** 19, **TypeScript** 7 (strict) — `tsc` is the native TS 7 compiler (`@typescript/native`); the `typescript` package is aliased to `@typescript/typescript6` so typescript-eslint keeps a supported compiler API. Tests: **Vitest** 5 + **jsdom** 30
- **Vercel**: `@vercel/analytics`, `@vercel/speed-insights` in `src/App.tsx`; root `vercel.json` for `dist` output
- Styling: global CSS in `src/css/global.css` (color/font tokens on `:root`); **Geist** and **Geist Mono** variable fonts self-hosted from `public/fonts/geist/` and preloaded in `index.html` (license in `src/fonts/geist/`)
- **Social icons**: stroke-style inline SVGs in `SiteIcons.tsx`, wired through `socialLinkData.ts` → `SocialPills.tsx` (hero pill row)
- **Jellyfish ocean**: animated ASCII canvas background in `src/components/ocean/createOcean.js`, kept verbatim from the design canvas (plain JS + `createOcean.d.ts`, excluded from Prettier). Mounted by `src/hooks/useOcean.ts`; `App.tsx` feeds it pointer position and drives the custom cursor

## Layout

- `index.html` — shell, head meta, `#root` entry
- `src/main.tsx` → `src/App.tsx` — page shell (ocean, cursor, motion state), Vercel widgets
- `src/components/` — `SiteHeader`, `Hero`, `FocusSection`, `WritingSection`, `ContactSection`, `SiteFooter`
- `src/archived/` — `scrambler-effect/` and `classic-theme/` (the pre-redesign Roboto Mono site, self-contained)
- `public/` — static assets, favicons, `images/icons/`, self-hosted fonts

**Path aliases** (see `tsconfig.json`): `@components/*`, `@styles/*` — prefer these over deep relatives.

## What not to expect

- No `.github/` workflows in the repo; deploy config is `vercel.json` plus the Vercel project.
- README is minimal; this file and the source are the project map.

## Learned User Preferences

- Dark theme only; no theme toggle in the UI.
- The site follows the design canvas exactly (https://claude.ai/code/artifact/e79f6248-1724-4a0f-b669-881cb8334f92); don't change the look when refactoring.
- Approved departures from the canvas (keep these): X pill uses the filled X logo labeled `X.com`; Steam uses the classic-theme icon; header Writing/Contact links sit in a glass pill; text outside glass panels gets the `--text-halo` glow; the footer has a full-bleed fade to the background color (`.site-footer::before`) so jellyfish don't wash out its text; section labels (e.g. "What I work on") sit on a feathered page-color backing (`.section-label::before`) because the halo alone can't keep small mono text legible over the jellyfish glyphs.
- Don't modify `createOcean.js` unless explicitly asked; answer questions about the jellyfish by reading it.
- The jellyfish animation respects `prefers-reduced-motion` and has a pause/play toggle in the header.
- When implementing attached plans, do not edit the plan file.
- Include the `.cursor` directory in commits when adding Cursor hooks or config.

## Learned Workspace Facts

- Header: `~/tjeastmond` brand, Writing/Contact anchor links (hidden under 640px), and the jellyfish pause/play pill.
- Social links (inventory, order, hrefs, labels) live in `socialLinkData.ts` — the canonical source; e.g. X is labeled `X.com` and uses the filled X logo. Email and LinkedIn are exported separately for the contact buttons.
- Writing is hidden for now: `<WritingSection />` (App.tsx) and the header's Writing link (SiteHeader.tsx) are commented out, not deleted. Uncomment both to show it; placeholder posts are in `POSTS` in `WritingSection.tsx`.
- Layout constants (container max-width, section padding) live in `src/css/global.css` — the canonical source.
- `.cursor/hooks/state/continual-learning.json` is gitignored (local continual-learning hook state).
