# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Personal website for TJ Eastmond built with Next.js 15, React 19, and TypeScript. The site features a custom text scrambling animation effect and is deployed on Vercel with analytics integration.

## Development Commands

### Development Server
```bash
pnpm run dev
```
Starts Next.js development server with Turbo mode on port 3000.

### Build & Production
```bash
pnpm run build  # Create production build
pnpm start      # Start production server
```

### Testing
```bash
pnpm test       # Run all tests with Jest
```
Tests use Jest with ts-jest preset and jsdom environment. Test files match patterns: `**/__tests__/**/*.[jt]s?(x)` or `**/?(*.)+(spec|test).[jt]s?(x)`.

### Linting
```bash
pnpm run lint   # Run Next.js ESLint
```

### Dependency Updates
```bash
pnpm run update         # Update Next.js, React, and TypeScript types
pnpm run update:next    # Update Next.js and React only
pnpm run update:ts      # Update TypeScript types only
```

## Architecture

### Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with font config, analytics
│   ├── page.tsx           # Homepage
│   ├── metadata.tsx       # SEO metadata configuration
│   └── posthog.tsx        # PostHog analytics provider
├── components/            # React components
│   ├── scrambler/         # Text scrambling animation library
│   │   ├── scrambler.ts   # Core scramble logic (class-based)
│   │   ├── types.ts       # TypeScript interfaces
│   │   └── scrambler.spec.ts  # Jest tests
│   ├── scramblerText.tsx  # React wrapper for scrambler
│   ├── title.tsx          # Animated site title
│   ├── link.tsx           # Animated link component
│   └── socials.tsx        # Social media links
├── css/                   # Global styles
│   ├── hack.css          # Primary stylesheet (imported in layout)
│   ├── reset.css         # CSS reset
│   └── all.min.css       # Additional styles
└── webfonts/             # Custom font files
```

### TypeScript Path Aliases
Configured in `tsconfig.json`:
- `@app/*` → `src/app/*`
- `@components/*` → `src/components/*`
- `@modules/*` → `src/modules/*`
- `@styles/*` → `src/css/*`
- `@webfonts/*` → `src/webfonts/*`

Always use these aliases when importing files from these directories.

### Key Technical Details

**Next.js Configuration:**
- App Router (not Pages Router)
- Turbo mode enabled for dev server
- `poweredByHeader: false` for security
- TypeScript with `strict: false` mode

**Scrambler Animation System:**
The centerpiece of the site is a custom text scrambling effect:
- `scrambler.ts`: Pure TypeScript class handling character-by-character animation
- `scramblerText.tsx`: React wrapper using hooks (useRef, useEffect, useCallback) and forwardRef
- Supports hover-triggered animations via `useHover` prop
- Configurable characters, speed, changes count, and frame rate
- Uses `requestAnimationFrame` for smooth 60fps animations

**Analytics & Monitoring:**
- Vercel Analytics (`@vercel/analytics`)
- Vercel Speed Insights (`@vercel/speed-insights`)
- PostHog analytics with client-side provider

**Styling:**
- Global CSS imported in layout (`@styles/hack.css`)
- Google Font: Source Code Pro (weights: 300, 400, 500, 700)
- Theme color: `#1d1e22`
- No CSS-in-JS or utility frameworks

### Testing Strategy
- Jest with ts-jest for TypeScript support
- jsdom environment for DOM testing
- Coverage collection enabled (text and lcov reporters)
- Tests co-located with components (e.g., `scrambler.spec.ts`)
- Focus on unit testing animation logic and component behavior

## Code Standards

### Formatting
- EditorConfig enforces:
  - 2-space indentation
  - LF line endings
  - UTF-8 encoding
  - 120 character line limit (except markdown)
  - Trailing whitespace trimmed

### Git Commits
Use conventional commits standard for all commit messages (e.g., `feat:`, `fix:`, `chore:`).

### React Patterns
- Use `"use client"` directive for client-side interactive components
- Prefer functional components with hooks over class components
- Use TypeScript generics for polymorphic components (see `scramblerText.tsx`)
- forwardRef pattern for components needing ref access

### Component Props
- Use `React.ComponentPropsWithoutRef<T>` for extending HTML element props
- Define prop types explicitly rather than using `any`
- Use `JSX.IntrinsicElements` for type-safe "as" prop polymorphism
