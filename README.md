# Personal Portfolio

A single-page developer portfolio built with **Astro 7**, **Tailwind CSS 4**, and **TypeScript**. Light / Dark / System theming, a CSS tech marquee, scroll reveals, a validated contact form, and all copy in typed content files.

Every section reads from `src/content/*.ts`, so the site can be edited without touching components.

## Quick start

```bash
npm install
npm run dev        # http://localhost:4321
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Static build to `dist/` |
| `npm run preview` | Preview the build |
| `npm run check` / `typecheck` | Astro + TypeScript diagnostics |
| `npm run lint` | ESLint (TS + Astro) |
| `npm run format` | Prettier |
| `npm run test:e2e` | Playwright smoke + theme tests |

Playwright uses `channel: "chrome"`. Without system Chrome, run `npx playwright install chromium` and remove that line from `playwright.config.ts`.

## Edit the content

All content is typed. Search for `TODO` to find placeholders.

| File | Controls |
| --- | --- |
| `src/content/profile.ts` | Name, role, hero headline, tagline, bio, photos, resume/booking links, availability, nav, SEO |
| `src/content/stack.ts` | Tech marquee items (`{ name, icon? }`) |
| `src/content/projects.ts` | Featured work cards (`title`, `description`, `url`, `logo?`, `tags`, `year`) |
| `src/content/experiments.ts` | Small experiments list (`title`, `description`, `url`) |
| `src/content/experience.ts` | Timeline (`role`, `company`, `url?`, `logo?`, `summary`, `start`, `end`) |
| `src/content/social.ts` | Navbar / footer / JSON-LD links (`label`, `url`, `icon`) |

Notes:

- Photos live in `src/assets/` and are imported in `profile.ts`. Astro emits AVIF/WebP with explicit dimensions. Replace `profile-picture.jpeg` with your own image (same filename or update the import).
- The hero emphasis phrase is `profile.roleEmphasis` and renders in the accent color.
- `profile.availability.open` hides the pulsing pill when `false`.
- Project `logo` is optional; omit it to fall back to a monogram tile.
- Experience `end` should be `"Present"` for the current role.

## Contact form

The form validates with **zod** on the client, includes a honeypot, and has loading / success / error states.

```bash
cp .env.example .env
```

| Variable | Purpose |
| --- | --- |
| `PUBLIC_CONTACT_ENDPOINT` | POST endpoint (Formspree, Web3Forms, etc.). Receives JSON `{ name, email, message, subject }` |
| `PUBLIC_CONTACT_EMAIL` | Optional mailto fallback (defaults to `profile.email`) |

With no endpoint configured, submitting a valid form opens the visitor's email client instead of silently failing. Set the env var at build time (e.g. in Netlify/Vercel project settings) — `PUBLIC_` variables are inlined into the static build.

## Theme

- Modes: **System** (default), **Light**, **Dark**; stored in `localStorage["theme"]`.
- A blocking inline script in `src/layouts/Base.astro` resolves the theme before first paint, so there is no flash.
- Tokens live in `src/styles/global.css` as `light-dark()` values on `:root`, mapped to Tailwind with `@theme inline`. `--bg`, `--surface`, `--text`, `--accent`, etc. switch at runtime; there is no duplicated dark palette.
- With JS disabled, `color-scheme: light dark` follows the OS.
- The navbar toggle is a `role="menu"` popover with full keyboard support (arrows, Home/End, Escape, focus return).

## SEO

- Title, description, canonical, robots, OG (1200×630) and Twitter `summary_large_image`.
- `/og.png` and `/og.svg` are generated from profile data at build time (`src/lib/og.ts`).
- JSON-LD `Person` with `knowsAbout` from `stack` and `sameAs` from `socials`.
- `/sitemap-index.xml` via `@astrojs/sitemap`; `/robots.txt` via a route.
- Set the production URL in `astro.config.mjs` (`site`) and `profile.seo.site`.

## Deploy

Static output, no server or database.

- Build command: `npm run build`
- Output directory: `dist`
- Node 22+
- Add `PUBLIC_CONTACT_ENDPOINT` in the host's environment settings before building.

`netlify.toml` is included for Netlify. Vercel and Cloudflare Pages work with the same build settings.

## Structure

```
src/
  content/            typed content (edit these)
  assets/             photos imported by content
  components/         Header, Hero, Marquee, SelectedWork, Experiments, About, Experience, Contact, Footer, ThemeToggle, …
  layouts/Base.astro  head, SEO, JSON-LD, theme bootstrap, shell
  scripts/            theme.ts, site.ts, contact.ts (bundled modules)
  styles/             tokens + base + components + motion
  pages/              index, og.png, og.svg, robots.txt
  lib/og.ts
docs/DESIGN.md        tokens, type scale, spacing, motion, decisions
tests/                Playwright theme + smoke tests
```

## Verification

- `astro check`: 0 errors, 0 warnings, 0 hints
- ESLint and production build pass
- Playwright: theme contract + navigation, mobile sheet, form validation, 360px overflow
- No console errors in light or dark; no horizontal overflow at 360–1440px
- Motion and marquee respect `prefers-reduced-motion`

## Attribution

Design direction is original. Structure and UX patterns were inspired by modern engineer portfolios; no text, photos, logos, or assets were copied from any reference site.
