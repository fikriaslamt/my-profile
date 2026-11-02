# Design Notes

## Direction

A clean, spacious single-page portfolio with strong typographic hierarchy: a large greeting hero, a mono-labelled section rhythm (`label → heading → subtitle → content`), card-based featured work, a compact experiment list, an editorial about block, a vertical work timeline, and a contact card.

The palette is neutral with one green accent. Light mode is paper-white with soft shadows; dark mode is near-black with hairline borders and a restrained glow.

## Structure

| # | Section | Pattern |
| --- | --- | --- |
| — | Header | Sticky 72px bar; avatar, centered anchors, socials, theme toggle, mobile sheet; blur + border after 8px scroll |
| 01 | Hero (`#home`) | Availability pill, greeting + role headline, value prop, Book a call / Resume CTAs, location meta |
| — | Marquee | Duplicated tech list, CSS translate loop, edge fade, pause on hover |
| 02 | Selected Work (`#projects`) | 2-column cards: 12:5 banner crop, title, description, tags, year/index, arrow |
| 03 | Small Experiments (`#experiments`) | Compact divided list: index, title, one-line description, arrow |
| 04 | About (`#about`) | Bio column + overlapping rotated portrait and "Currently" note card |
| 05 | Work Experience (`#work`) | Vertical rail, monogram markers, role — company, summary, right-aligned dates |
| — | Contact (`#contact`) | Inset card, booking/email CTAs, socials, validated form |
| — | Footer | Name, tagline, availability, socials, back to top, copyright |

Sections use `clamp(80px, 9vw, 128px)` vertical padding and a 1160px container (24px gutters, 40px from 768px).

## Tokens

Defined once in `src/styles/global.css` with `light-dark()`. The head script sets `color-scheme` for an explicit choice; without JS the OS decides. Tailwind maps tokens through `@theme inline`.

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--bg` | `#ffffff` | `#0a0a0a` | Page |
| `--surface` | `#f7f7f8` | `#111113` | Cards |
| `--surface-2` | `#efeff1` | `#17171b` | Pills, hovers |
| `--border` | `rgba(15,15,16,.10)` | `rgba(255,255,255,.09)` | Hairlines |
| `--border-strong` | `rgba(15,15,16,.18)` | `rgba(255,255,255,.16)` | Outline buttons |
| `--text` | `#0f0f10` | `#ededed` | Primary text |
| `--muted` | `#57575f` | `#a1a1aa` | Body copy |
| `--muted-2` | `#6b6b74` | `#8b8b94` | Mono labels |
| `--accent` | `#086b3c` | `#7cffb2` | Emphasis, links, active states |
| `--accent-ink` | `#ffffff` | `#06130b` | Text on accent |
| `--accent-soft` | `rgba(8,107,60,.09)` | `rgba(124,255,178,.10)` | Washes, focus rings |
| `--danger` | `#b42318` | `#ff9b9b` | Form errors |
| `--shadow-card` | soft neutral | deep black | Card depth |
| `--shadow-lift` | soft + hint of accent | deep + accent glow | Hover lift |

Contrast (approximate): body text 19:1 light / 17:1 dark; muted 7.1:1 light / 8.6:1 dark; label 5.5:1 light / 6.4:1 dark; accent 6.7:1 light / 15:1 dark. All meet WCAG AA.

## Type

- Display: **Inter Tight**, 400–700, self-hosted, `font-display: swap`
- Mono: **Geist Mono**, labels, dates, indices
- Hero: `clamp(44px, 7vw, 88px)`, weight 600, line-height 0.98, tracking −0.045em
- Section heading: `clamp(32px, 4vw, 48px)`, tracking −0.04em
- Body: 16px / 1.6; supporting copy 14–15.5px
- Labels: 11px uppercase mono, tracking 0.14em
- Card titles: `clamp(21px, 2.4vw, 26px)`, tracking −0.035em

## Motion

- Scroll reveal: opacity + 12px rise, 380ms, staggered via `--reveal-delay` (50–70ms per item)
- Card hover: 3px lift, border brightening, soft shadow, 220ms; arrow slides 2px
- Marquee: 48s linear loop, pauses on hover
- Theme switch: 200ms color transition (skipped on load), icon crossfade 180ms
- `prefers-reduced-motion`: reveals visible immediately, marquee becomes a static wrapped row, lifts and icon transitions removed

## Decisions

- **Cards for work, list for experiments.** Featured projects get image-led cards; smaller experiments stay scannable as divided rows.
- **One token source.** `light-dark()` removed the three duplicated palettes. Shadows use color functions so they also resolve from `color-scheme`.
- **Banner cropping.** Project SVGs include their own titles; the 12:5 `object-top` crop keeps the visual and removes the duplicated title, letting the card own the text.
- **Two content-driven frames in About.** One real portrait plus a rotated "Currently" note card avoids repeating the same photo and surfaces useful context.
- **Bundled scripts.** Theme, navigation, and contact logic are TypeScript modules in `src/scripts/`; only the no-flash bootstrap stays inline.
- **Form without a backend.** zod validation + honeypot + `PUBLIC_CONTACT_ENDPOINT`, with mailto fallback so the form is never a dead end.

## Accessibility

- One `h1`, ordered headings, semantic `header/nav/main/section/footer`
- Skip-to-content link; visible 2px accent focus rings
- Active nav link uses `aria-current="page"`, driven by IntersectionObserver
- Theme menu and mobile sheet support keyboard and Escape; focus returns to the trigger
- Form labels, `aria-describedby`, `aria-invalid`, `role="status"` live region, and `aria-busy` on submit
- Marquee duplicate is `aria-hidden`; decorative icons are hidden
- Images have explicit dimensions, alt text, and lazy loading below the fold

## SEO

- Canonical, robots, OG/Twitter (1200×630 `/og.png`), JSON-LD `Person`
- Sitemap + robots routes; favicon SVG + PNG set
