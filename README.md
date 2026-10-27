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
```

Requires Node.js 22+ (tested on Node 25).

## Edit the content

Open [`src/content/profile.ts`](src/content/profile.ts). Search for `TODO` to find the values meant to be replaced.

| Section | Field | What it controls |
| --- | --- | --- |
| Navbar | `name`, `wordmark`, `nav`, `ctas` | Brand, links, and the contact button |
| Hero | `headline`, `lede`, `tagline`, `heroCard`, `marquee` | Headline (with highlight word), intro, ticket card, ticker |
| Pillars | `pillars` | The two large "what I do" cards |
| Process | `process` | Four-step stepper |
| Flow | `flow` | Diagram title, nodes, and caption |
| Work | `projectsKicker`, `projectsTitle`, `projectsLede`, `projects` | Project grid |
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
- **Project `href`** values are `"#"` placeholders. Point them at real case studies.
- **Social icons** support `github`, `linkedin`, `x`, and `mail`.
- **Stack JSON** in the code block is generated from `profile.stack`, so editing the data updates the snippet automatically.

## Change the theme

Design tokens live in [`src/styles/global.css`](src/styles/global.css) under `@theme`:

```css
--color-paper: #0a0a0a;
--color-card: #121212;
--color-ink: #f5f5f5;
--color-ink-2: #a3a3a3;
--color-ink-3: #8a8a8a;
--color-line: rgba(255, 255, 255, 0.08);
--color-accent: #7cffb2;
--font-display: "Inter Tight", ...;
--font-mono: "Geist Mono", ...;
```

Swap `--color-accent` to re-skin every CTA, link, marker, and highlight. Amber (`#ffb84d`), violet (`#8b7bff`), or blue (`#5b8cff`) all work with the neutral base. If you change the accent, also update the inline color in the success pill and the hard-coded accents in `src/lib/og.ts` for consistency.

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
    Process.astro
    Flow.astro
    Projects.astro
    CodeBlock.astro
    Stats.astro
    Timeline.astro
    Contact.astro
    Footer.astro
    SectionHead.astro
    Icon.astro
    Social.astro
  lib/og.ts              ← shared OG SVG builder
  pages/
    index.astro
    og.svg.ts
    og.png.ts
    robots.txt.ts
  styles/global.css      ← tokens and custom utilities
docs/DESIGN.md           ← design rationale and tokens
```

## Quality notes

- Lighthouse (production build, mobile): **Performance 100 · Accessibility 100 · Best Practices 100 · SEO 100**
- Semantic landmarks, one `h1`, visible focus rings, skip link, and labelled controls.
- `prefers-reduced-motion` disables reveals, counters, marquee, and dashed flow animation.
- Responsive from 360px to 1440px; verified no horizontal overflow at 390px.
- Dark-only by design. No light mode is included; the `color-scheme` meta is set to dark.
- No images are used for page content, so there is nothing to lazy-load or optimize.

## Attribution

Design inspiration: [usefloat.trade](https://usefloat.trade/). No text, logos, illustrations, or other assets from that site are included. This project is not affiliated with Float.
