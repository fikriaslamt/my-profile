# Personal Profile

A dark, minimal single-page personal profile built with **Astro 7**, **Tailwind CSS 4**, and **TypeScript**. The visual language is inspired by modern crypto-native product sites (dark surfaces, tight display type, mono labels, thin rules), but every word and asset here is original.

All page content comes from one typed file: [`src/content/profile.ts`](src/content/profile.ts).

## Quick start

```bash
npm install
npm run dev        # http://localhost:4321
```

Build and preview:

```bash
npm run build      # static output in dist/
npm run preview
npm run check      # Astro + TypeScript diagnostics
npm run test:e2e   # Playwright theme tests
```

The Playwright config uses `channel: "chrome"` so it runs with your installed browser. On CI without Chrome, run `npx playwright install chromium` and remove that channel line.

Requires Node.js 22+ (tested on Node 25).

## Edit the content

Open [`src/content/profile.ts`](src/content/profile.ts). Search for `TODO` to find the values meant to be replaced.

| Section | Field | What it controls |
| --- | --- | --- |
| Navbar | `name`, `wordmark`, `nav`, `ctas` | Brand, links, and the contact button |
| Hero | `headline`, `lede`, `tagline`, `avatar`, `cv`, `heroCard`, `marquee` | Headline, photo, CV download, glass profile card, icon ticker |
| Work | `projectsKicker`, `projectsTitle`, `projectsLede`, `projects` | Project cards: banner, tags, expandable tech stack, GitHub link |
| Stack | `stack` | Code block content, focus areas, principles |
| Numbers | `stats` | Animated stat row |
| About | `aboutKicker`, `aboutTitle`, `aboutLede`, `experience` | Timeline |
| Contact | `contact` | Headline, email, note, social links |
| Footer | `footer` | Tagline and link columns |
| SEO | `seo` | Title, description, canonical site, OG image |

Things worth knowing:

- **Highlight words** use `{ before, highlight, after }` — the middle value gets the white marker treatment.
- **`tagline`** can be left empty; the hero then builds `role · location · availability` automatically.
- **Stats** use `value` (number, animated on scroll) plus an optional `suffix` such as `+`.
- **Marquee** items are `{ label, icon }`; `TechIcon` resolves brands via `simple-icons`, with lucide for REST/Cloud.
- **CV** points to `public/cv/fikri-aslam-cv.pdf`; replace the file and keep the path. The hero button downloads it.
- **Avatar** points to `public/profile-picture.jpeg`; replace the image to update the hero card.
- **Project `href`** is the GitHub repo URL; `image` is the banner and `stack` is the expandable detail.
- **Social icons** support `github`, `linkedin`, `x`, and `mail`.
- **Stack JSON** in the code block is generated from `profile.stack`, so editing the data updates the snippet automatically.

## Theme: light, dark, system

The navbar switch (monitor / sun / moon icon) opens a small menu with **System**, **Light**, and **Dark**. System is the default and follows the OS live. An explicit choice is saved in `localStorage` under `theme` and synced across tabs. Storage access is wrapped in `try/catch` and falls back to System.

Theme is applied as `data-theme="light|dark"` plus `color-scheme` on `<html>`. A blocking inline script in [`Base.astro`](src/layouts/Base.astro) resolves the theme before first paint, so there is no flash. With JavaScript disabled, `@media (prefers-color-scheme: dark)` supplies the dark tokens.

All colors are CSS variables in [`src/styles/global.css`](src/styles/global.css):

```css
:root {
  --bg: #ffffff;
  --surface: #f6f6f7;
  --surface-2: #eeeef0;
  --border: rgba(0, 0, 0, 0.1);
  --text: #0f0f10;
  --muted: #5f5f68;
  --accent: #086b3c;
}

[data-theme="dark"] {
  --bg: #0a0a0a;
  --surface: #111113;
  --surface-2: #16161a;
  --border: rgba(255, 255, 255, 0.08);
  --text: #ededed;
  --muted: #a3a3a3;
  --accent: #7cffb2;
}
```

Tailwind maps these with `@theme inline` (`bg-paper`, `text-ink`, `border-line`, `text-accent`, etc.), so editing the variables rethemes every component. `dark:` utilities are wired to `[data-theme="dark"]` via `@custom-variant dark`. The `<meta name="theme-color">` updates to `#ffffff` or `#0a0a0a`.

If you change the accent, also update the accent values in [`src/lib/og.ts`](src/lib/og.ts) — the OG artwork intentionally stays dark.

Fonts are **self-hosted** in [`public/fonts/`](public/fonts) with `@font-face` declarations in [`src/styles/fonts.css`](src/styles/fonts.css). There are no third-party font requests. Inter Tight and Geist Mono are licensed under the SIL Open Font License 1.1. The two latin files are preloaded in the document head.

## SEO, domain, and social previews

1. Set your production URL in **two places**:
   - `site` in [`astro.config.mjs`](astro.config.mjs)
   - `seo.site` in [`src/content/profile.ts`](src/content/profile.ts)
2. Update `seo.title` / `seo.description` and the contact email.
3. The build generates:
   - `/og.png` and `/og.svg` — social preview images rendered from your profile data
   - `/sitemap-index.xml` — via `@astrojs/sitemap`
   - `/robots.txt` — via [`src/pages/robots.txt.ts`](src/pages/robots.txt.ts)
4. JSON-LD `Person` schema is generated from the same data in [`src/layouts/Base.astro`](src/layouts/Base.astro).

The OG PNG is rendered with `sharp` at build time, so no manual export is needed. Some platforms still require a raster image — `/og.png` is used in the meta tags.

## Deploy

The output is fully static (`dist/`), with no server, database, wallet, or API.

**Vercel / Netlify / Cloudflare Pages**

- Build command: `npm run build`
- Output directory: `dist`
- Node 22+

**GitHub Pages**

Set `site` to the Pages URL, build, then publish `dist/`. If the site lives under a subpath, also set `base` in `astro.config.mjs`.

## Project structure

```
src/
  content/profile.ts     ← edit everything here
  layouts/Base.astro     ← head, SEO, global scripts
  components/
    Navbar.astro
    Hero.astro
    Pillars.astro
    Projects.astro
    CodeBlock.astro
    Stats.astro
    Timeline.astro
    Contact.astro
    Footer.astro
    SectionHead.astro
    ThemeToggle.astro
    TechIcon.astro
    Icon.astro
    Social.astro
  lib/og.ts              ← shared OG SVG builder
  pages/
    index.astro
    og.svg.ts
    og.png.ts
    robots.txt.ts
  styles/global.css      ← light/dark tokens and utilities
docs/DESIGN.md           ← design rationale, tokens, theming
tests/theme.spec.ts      ← Playwright theme coverage
playwright.config.ts
CHANGELOG.md
```

## Quality notes

- Lighthouse baseline (production preview, mobile): **Performance 100 · Accessibility 100 · Best Practices 100 · SEO 100**
- Theme switcher covered by 5 Playwright tests: OS light, OS dark, live system changes, persistence, and keyboard navigation.
- Light and dark palettes both meet WCAG AA for text, muted text, links, buttons, and focus rings.
- Blocking head script prevents a flash of the wrong theme; JS-disabled browsers fall back to `prefers-color-scheme`.
- Semantic landmarks, one `h1`, visible focus rings, skip link, and labelled controls.
- `prefers-reduced-motion` disables reveals, counters, marquee, and the theme icon transition.
- Responsive from 360px to 1440px; verified no horizontal overflow at 390px.
- Project banners are local SVGs (lazy-loaded) and can be swapped for screenshots by replacing the `image` paths in `profile.ts`.

## Attribution

Design inspiration: [usefloat.trade](https://usefloat.trade/). No text, logos, illustrations, or other assets from that site are included. This project is not affiliated with Float.
