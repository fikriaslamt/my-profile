# Changelog

## Unreleased

### Added

- Light / Dark / System theme switcher in the navbar with a 40×40 icon button and accessible popover menu.
- System mode follows the OS live and is the default for first visits.
- Blocking head bootstrap that reads `localStorage["theme"]` and sets `data-theme` before first paint (no FOUC).
- Cross-tab sync via the `storage` event; storage access is guarded with `try/catch`.
- Light and dark token sets, light-mode shadows/glows, theme-aware code syntax colors, and a `prefers-color-scheme` fallback for JS-disabled browsers.
- Dynamic `theme-color` meta (`#ffffff` / `#0a0a0a`).
- Playwright coverage for OS light, OS dark, live system changes, persistence, and keyboard navigation.
- `docs/DESIGN.md` theming notes, palette table, and contrast results.

### Changed

- All component colors now resolve from CSS variables; no hard-coded component hex values.
- Tailwind colors are mapped to runtime variables with `@theme inline`; `dark:` uses the `[data-theme="dark"]` selector via `@custom-variant`.
- Theme changes animate colors for 200ms; initial load is transition-free. Icon swap is 180ms and respects reduced motion.

### Verification

- `astro check`: 0 errors, 0 warnings, 0 hints.
- `astro build`: pass.
- `playwright test`: 5/5 pass.
