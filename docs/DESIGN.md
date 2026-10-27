# Design Notes

## Direction

A single-page personal profile that borrows the *visual grammar* of a modern crypto product site without borrowing its content: near-black surfaces, enormous tight display type, mono metadata, hairline borders, one restrained accent, and a few bespoke "instrument panel" moments (a capability sheet and a stack readout).

The result should feel like a working desk, not a résumé template.

## Reference vs. decisions

Verified from the reference site:

- Theme color `#0a0a0a`
- Section rhythm: hero → capability sheet (two text columns + four-step loop) → project cards → code block → stats → timeline → contact → footer
- Card surfaces with `inset 0 0 0 1px rgba(255,255,255,.08)` borders
- Display type with very tight tracking; mono labels for metadata
- Short, pill-shaped primary CTAs
- Numbered process steps

Deliberately changed:

- **Accent:** electric green `#7cffb2` instead of the reference's blue. The brief asked for one distinct accent (green / violet / amber), and green gives the neutral dark palette a sharper, more personal signature.
- **Fonts:** Inter Tight for display/body and Geist Mono for labels. Poppins is not used; the wordmark is a tight Inter Tight lockup with an accent dot.
- **Hero visual:** a neutral frosted-glass profile card built from live content instead of a 3D canvas scene. It uses backdrop blur, a translucent surface, a specular sheen, a cool ambient aura, and inset highlights.
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
| `--code-text` | `#1e1e1e` | `#d4d4d4` | Code base |
| `--code-key` | `#0451a5` | `#9cdcfe` | JSON keys |
| `--code-string` | `#a31515` | `#ce9178` | JSON strings |
| `--code-number` | `#098658` | `#b5cea8` | JSON numbers |
| `--ide-*` | VS Code Light+ | VS Code Dark+ | Editor chrome |
| `--glass-bg/border/sheen/aura` | translucent white | translucent cool dark | Frosted profile card |
| `--shadow-card/lift/glass/panel/ide` | soft neutral shadows | deep black shadows | Depth by mode |
| `--radius-card` | `12px` | `12px` | Card radius |
| `--font-display` | Inter Tight | Inter Tight | Display and body |
| `--font-mono` | Geist Mono | Geist Mono | Labels, numbers, code |

Light mode uses softer glows (`--ambient-glow`) and neutral card shadows. Dark mode keeps the deep-black surfaces and neutral glass shadows.

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

**Profile glass card (hero).** A neutral frosted-glass panel with a 1px translucent border, a soft specular sheen, inset highlights, backdrop blur, and a blurred cool ambient aura behind it. Inside: mono kicker, neutral availability pill, avatar photo (initials fallback), a three-cell glass fact grid, and a footer rule. No green accent appears on the card.

**Capability sheet.** One panel combines "what I do" with "how I work": two text columns for Backend / Cloud & Delivery, then a compact four-column process row (`01–04`) with small accent numbers. Hairlines separate the halves on desktop; everything stacks into one column on mobile. No icons, bullets, or CTAs inside the columns.

**Project cards.** A 16:9 local SVG banner, meta row, title, short description, tech tags, and a footer with a native expandable tech-stack panel plus a GitHub icon link. The panel summarizes the actual repo stack (Gin/GORM/PostgreSQL, CodeIgniter 4/Tailwind, Docker/Fly.io, GitHub Actions). Banners are replaceable image paths.

**Stack readout.** A VS Code-inspired editor window: title bar with traffic lights, active/inactive tabs, breadcrumb, activity bar icons, line-number gutter, VS Code syntax colors, and a status bar. The left Currently/Focus tiles are back to the default neutral surface. JSON is generated from `profile.stack` and syntax-highlighted at build time; the copy button writes the raw JSON to the clipboard.

**Stats.** A four-column rule-bounded row with tabular numerals that count up once on view.

**Timeline.** Period in mono, role/company in display type, description in muted body. The left column sticks on desktop.

**Contact panel.** A large inset card with a masked grid, a radial accent wash, a marker-highlighted headline, email CTA, copy button, and social pills.

## Motion

- Scroll reveals: 500ms opacity + 16px translate, staggered 60–90ms via `--reveal-delay`
- Hover lifts: 220ms, 3px, with a soft accent shadow
- Counters: 1100ms cubic ease-out, once
- Marquee: 55s linear loop, pauses on hover
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
- Decorative marquee is `aria-hidden`
- Light muted text `#5f5f68` / `#6e6e77` on white is 5.9:1 / 5.1:1; dark muted text `#a3a3a3` / `#8a8a93` on black is 7.7:1 / 5.8:1
- Light accent `#086b3c` on white is 6.7:1; dark accent `#7cffb2` on black is 15.4:1; accent-ink on accent is high contrast
- Reduced motion respected at both the CSS and script level, including the icon swap and color transitions

## Responsive behavior

Tested breakpoints:

- 390px: single column, full-width nav sheet, stacked pillars/process/timeline, project cards stack, code block scrolls inside its panel, no page-level horizontal scroll
- 768px: two-column project and pillar grids, two-column process loop
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
