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

Defined as runtime CSS variables in `src/styles/global.css`: light on `:root`, dark under `[data-theme="dark"]`, with a `prefers-color-scheme` fallback for JS-disabled browsers. Tailwind utilities are mapped to these variables with `@theme inline`, so `bg-paper`, `text-ink`, `border-line`, and `text-accent` change at runtime.

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--bg` | `#ffffff` | `#0a0a0a` | Page background |
| `--surface` | `#f6f6f7` | `#111113` | Cards, panels, code |
| `--surface-2` | `#eeeef0` | `#16161a` | Pills, chips, hovers |
| `--border` | `rgba(0,0,0,.10)` | `rgba(255,255,255,.08)` | Hairline borders |
| `--border-strong` | `rgba(0,0,0,.16)` | `rgba(255,255,255,.14)` | Secondary buttons |
| `--text` | `#0f0f10` | `#ededed` | Primary text, markers |
| `--muted` | `#5f5f68` | `#a3a3a3` | Body copy |
| `--muted-2` | `#6e6e77` | `#8a8a93` | Mono labels, metadata |
| `--accent` | `#086b3c` | `#7cffb2` | Links, active states, markers |
| `--accent-ink` | `#ffffff` | `#06130b` | Text on accent |
| `--accent-soft` | `rgba(8,107,60,.10)` | `rgba(124,255,178,.10)` | Pills, washes |
| `--ghost` | `#e4e4e7` | `#1f2026` | Ghost step numerals |
| `--code-text` | `#24292f` | `#d7dbe0` | Code base |
| `--code-key` | `#0550ae` | `#8ea9c9` | JSON keys |
| `--code-string` | `#0a6b3d` | `#b9d8ff` | JSON strings |
| `--code-number` | `#b45309` | `#ffb547` | JSON numbers |
| `--shadow-card/lift/ticket/stage/panel` | soft neutral shadows | deep black + accent glow | Depth by mode |
| `--radius-card` | `20px` | `20px` | Card radius |
| `--font-display` | Inter Tight | Inter Tight | Display and body |
| `--font-mono` | Geist Mono | Geist Mono | Labels, numbers, code |

Light mode uses softer glows (`--ambient-glow`, `--ticket-wash`) and neutral card shadows instead of relying only on 1px borders. Dark mode keeps the original deep-black surfaces and accent bloom.

### Contrast (approximate sRGB)

| Pair | Ratio |
| --- | --- |
| `--text` on `--bg` (light) | 19.0:1 |
| `--muted` on `--bg` / `--surface` (light) | 5.9:1 / 5.6:1 |
| `--muted-2` on `--bg` / `--surface` (light) | 5.1:1 / 4.9:1 |
| `--accent` on `--bg` / `--surface` / `--accent-soft` (light) | 6.7:1 / 5.8:1 / 5.3:1 |
| `--accent-ink` on `--accent` (light) | 6.7:1 |
| `--text` on `--bg` (dark) | 16.9:1 |
| `--muted` / `--muted-2` on `--bg` (dark) | 7.7:1 / 5.8:1 |
| `--accent` on `--bg` (dark) | 15.4:1 |
| Code pairs, light and dark | ≥ 4.8:1 |

## Theming

- **Preference:** `localStorage["theme"]` is `"system" | "light" | "dark"`. Missing or invalid values resolve to `system`; every storage call is wrapped in `try/catch`.
- **Resolution:** mode `system` asks `matchMedia("(prefers-color-scheme: dark)")`; explicit modes win. The resolved value is written to `<html data-theme="light|dark">`, and the preference to `data-theme-mode`.
- **No FOUC:** a blocking inline script in `Base.astro`, before paint, reads storage and the media query, sets `data-theme`, `data-theme-mode`, `style.colorScheme`, and the `theme-color` meta. A `theme-loading` class suppresses transitions until the first frame.
- **Live system changes:** the toggle script listens to the media query `change` event and re-applies when the stored mode is `system`. The listener is ignored for explicit light/dark choices.
- **Cross-tab sync:** the `storage` event applies the new mode read from another tab.
- **No JS:** no `data-theme` attribute is set, so `@media (prefers-color-scheme: dark)` supplies the dark tokens.
- **Tailwind:** `@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));` wires `dark:` utilities to the resolved attribute.
- **Transitions:** `theme-transition` is applied for 220ms on a change, animating background, border, text, fill, stroke, and shadow. It is skipped during initial load and when `prefers-reduced-motion` is set.
- **Toggle UI:** 40×40 border button in the navbar, 3 stacked lucide icons (Monitor / Sun / Moon) cross-fading with a short rotate (180ms). The menu is a `role="menu"` popover with `menuitemradio` options, `aria-checked`, arrow/Home/End navigation, Enter/Space select, Escape close + focus return, and click-outside close. The button label includes the active mode.

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

**Process stepper.** Four columns on a top rule, separated by vertical rules on desktop. Large ghost numerals (`--ghost`) echo the reference's numbered steps while keeping the copy readable.

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
- Theme menu uses `role="menu"` / `menuitemradio`, `aria-checked`, `aria-expanded`, arrow/Home/End keys, Enter/Space select, Escape close + focus return, and a click-outside close
- Theme button is 40×40, labelled with the current mode, and has a tooltip/title
- Copy buttons announce their action; the copied state is visual text
- Decorative marquee is `aria-hidden`; the flow SVG has an accessible name and a text alternative on mobile
- Light muted text `#5f5f68` / `#6e6e77` on white is 5.9:1 / 5.1:1; dark muted text `#a3a3a3` / `#8a8a93` on black is 7.7:1 / 5.8:1
- Light accent `#086b3c` on white is 6.7:1; dark accent `#7cffb2` on black is 15.4:1; accent-ink on accent is high contrast
- Reduced motion respected at both the CSS and script level, including the icon swap and color transitions

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
- Playwright: **5/5 theme tests pass** — OS light, OS dark, live system change, persistence after reload, keyboard menu behavior
- Lighthouse baseline (production preview, before the switcher): **100 Performance · 100 Accessibility · 100 Best Practices · 100 SEO**
- Browser checks at 1440×900 and 390×844
- No horizontal overflow at 390px (`scrollWidth === clientWidth === 390`)
- Mobile menu open/close and clipboard copy verified in a headless Chromium session
- Light/dark/system switching, `theme-color`, persistence, and live media-query changes verified in Chromium

## Known constraints

- Fonts are self-hosted (Inter Tight, Geist Mono; SIL OFL 1.1) with latin files preloaded
- Project links and personal data are placeholders marked `TODO`
- Playwright uses the installed Chrome channel; CI needs `npx playwright install chromium` and the channel removed
- The OG PNG is rendered with `sharp`; it is already installed as a direct dependency
- The OG artwork stays dark in both modes by design; the favicon stays dark
- The contact form is a `mailto:` action, not a form backend, by design (frontend only)
