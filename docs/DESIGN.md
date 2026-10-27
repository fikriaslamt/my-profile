# Design Notes

## Direction

A single-page personal profile that borrows the *visual grammar* of a modern crypto product site without borrowing its content: near-black surfaces, enormous tight display type, mono metadata, hairline borders, one restrained accent, and a few bespoke "instrument panel" moments (a workflow diagram and a stack readout).

The result should feel like a working desk, not a résumé template.

## Reference vs. decisions

Verified from the reference site:

- Theme color `#0a0a0a`
- Section rhythm: hero → two product cards → 4-step stepper → flow/diagram → code block → stats → footer
- Card surfaces with `inset 0 0 0 1px rgba(255,255,255,.08)` borders
- Display type with very tight tracking; mono labels for metadata
- Short, pill-shaped primary CTAs
- Large ghost numerals in step sections

Deliberately changed:

- **Accent:** electric green `#7cffb2` instead of the reference's blue. The brief asked for one distinct accent (green / violet / amber), and green gives the neutral dark palette a sharper, more personal signature.
- **Fonts:** Inter Tight for display/body and Geist Mono for labels. Poppins is not used; the wordmark is a tight Inter Tight lockup with an accent dot.
- **Hero visual:** a "profile ticket" card built from live content instead of a 3D canvas scene. It keeps the layered-card, inset-border, radial-glow language while staying static and fast.
- **Flow section:** a hand-built inline SVG diagram with dashed connectors and a repeat loop, rather than a data-driven market visualization.
- **All copy and data:** original placeholders. No text, logo, or image from the reference is used.

## Tokens

Defined in `src/styles/global.css` under `@theme`.

| Token | Value | Use |
| --- | --- | --- |
| `--color-paper` | `#0a0a0a` | Page background |
| `--color-card` | `#121212` | Cards, panels |
| `--color-card-2` | `#171717` | Pills, small chips |
| `--color-ink` | `#f5f5f5` | Primary text |
| `--color-ink-2` | `#a3a3a3` | Body text |
| `--color-ink-3` | `#8a8a8a` | Mono labels, metadata |
| `--color-line` | `rgba(255,255,255,.08)` | Hairline borders |
| `--color-line-2` | `rgba(255,255,255,.14)` | Stronger borders, secondary buttons |
| `--color-accent` | `#7cffb2` | CTAs, links, active states, markers |
| `--color-accent-ink` | `#06130b` | Text on accent |
| `--radius-card` | `20px` | Card radius |
| `--font-display` | Inter Tight | Display and body |
| `--font-mono` | Geist Mono | Labels, numbers, code |

Type rhythm:

- Hero: `clamp(52px, 7.4vw, 104px)`, weight 600, tracking `-0.055em`, line-height `0.98`
- Section headings: `clamp(38px, 4.2vw, 58px)`, tracking `-0.05em`
- Contact heading: `clamp(40px, 6vw, 84px)`
- Body: 14.5–18px, line-height 1.55–1.65
- Mono labels: 10–12px, uppercase, tracking `0.08em–0.12em`

Spacing:

- Page container: max 1400px, 40px side padding (20px under 760px)
- Section start: 110px mobile, 140px desktop
- Card padding: 28–36px
- Card grid gap: 16px
- Nav height: 68px

## Signature components

**Profile ticket (hero).** Two scaled ghost cards sit behind a radial-gradient panel. Inside: mono kicker, availability pill, avatar initials, three-cell fact grid, and a footer rule. The accent glow is the only large soft gradient on the page.

**Pillars.** Two equal cards with an eyebrow index, a small accent icon tile, a large statement, a description, a ticked list, and a text link. Hover lifts 3px and adds a faint accent bloom.

**Process stepper.** Four columns on a top rule, separated by vertical rules on desktop. Large ghost numerals (`#1f2026`) echo the reference's numbered steps while keeping the copy readable.

**Workflow diagram.** An inset panel with a window bar (three dots + `workflow / v1.0`), an SVG with four nodes, dashed connectors, an accent-highlighted "Build" node, and a return loop. On mobile the SVG is replaced by a vertical list, so nothing shrinks below legibility.

**Stack readout.** A split section: editable principles on the left, a fake `profile.json` window on the right. The JSON is generated from `profile.stack` and syntax-highlighted at build time; a copy button writes the raw JSON to the clipboard.

**Stats.** A four-column rule-bounded row with tabular numerals that count up once on view.

**Timeline.** Period in mono, role/company in display type, description in muted body. The left column sticks on desktop.

**Contact panel.** A large inset card with a masked grid, a radial accent wash, a marker-highlighted headline, email CTA, copy button, and social pills.

## Motion

- Scroll reveals: 500ms opacity + 16px translate, staggered 60–90ms via `--reveal-delay`
- Hover lifts: 220ms, 3px, with a soft accent shadow
- Counters: 1100ms cubic ease-out, once
- Marquee: 55s linear loop, pauses on hover
- Flow dashes: 2.4s linear loop
- All of the above are disabled or reduced under `prefers-reduced-motion: reduce`
- Content is visible by default when JavaScript is unavailable; the `js` class is added in the head before reveals are hidden

## Accessibility

- One `h1`; section headings follow in order
- Landmarks: `header`, `nav`, `main`, `footer`, labelled sections
- Skip-to-content link, visible focus rings on all controls
- Mobile menu uses `aria-expanded` / `aria-controls`, closes on Escape, and returns focus to the toggle
- Copy buttons announce their action; the copied state is visual text
- Decorative marquee is `aria-hidden`; the flow SVG has an accessible name and a text alternative on mobile
- Muted text `#8a8a8a` on `#0a0a0a` is ~5.8:1, above WCAG AA for normal text
- Accent `#7cffb2` on black is ~15:1; accent-ink on accent is high contrast
- Reduced motion respected at both the CSS and script level

## Responsive behavior

Tested breakpoints:

- 390px: single column, full-width nav sheet, stacked pillars/steps/timeline, vertical flow list, code block scrolls inside its panel, no page-level horizontal scroll
- 768px: two-column project and pillar grids, flow SVG shown
- 1280–1440px: two-column hero, four-column process and stats, sticky side columns

## SEO and metadata

- `<title>`, description, canonical, OG/Twitter tags
- JSON-LD `Person` generated from `profile`
- `/og.png` (raster, 1200×630) and `/og.svg` (vector) generated from profile data at build time
- `/sitemap-index.xml` via `@astrojs/sitemap`
- `/robots.txt` generated from `Astro.site`
- SVG favicon with the accent mark

## Verification

- `astro check`: 0 errors, 0 warnings, 0 hints
- `astro build`: static build succeeds; routes `/`, `/og.png`, `/og.svg`, `/robots.txt`, sitemap
- Lighthouse on the production preview (mobile): **100 Performance · 100 Accessibility · 100 Best Practices · 100 SEO**
- Browser checks at 1440×900 and 390×844
- No horizontal overflow at 390px (`scrollWidth === clientWidth === 390`)
- Mobile menu open/close and clipboard copy verified in a headless Chromium session

## Known constraints

- Dark-only; light mode was optional in the brief
- Fonts are self-hosted (Inter Tight, Geist Mono; SIL OFL 1.1) with latin files preloaded
- Project links and personal data are placeholders marked `TODO`
- The OG PNG is rendered with `sharp`; it is already installed as a direct dependency
- The contact form is a `mailto:` action, not a form backend, by design (frontend only)
