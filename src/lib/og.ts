import { profile } from "../content/profile";

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export const buildOgSvg = () => {
  const name = escapeXml(profile.name);
  const role = escapeXml(profile.role);
  const location = escapeXml(profile.location);
  const wordmark = escapeXml(profile.wordmark);
  const site = escapeXml(profile.seo.site.replace(/^https?:\/\//, ""));

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
      <path d="M64 0H0V64" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
    </pattern>
    <radialGradient id="glow" cx="78%" cy="18%" r="60%">
      <stop offset="0%" stop-color="#7cffb2" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#7cffb2" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="#0a0a0a"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <g font-family="Geist Mono, ui-monospace, monospace" fill="#737373" font-size="15" letter-spacing="2">
    <text x="80" y="86">${wordmark.toUpperCase()}</text>
    <text x="1120" y="86" text-anchor="end">PROFILE / 01</text>
  </g>

  <rect x="80" y="116" width="1040" height="1" fill="rgba(255,255,255,0.12)"/>

  <text x="80" y="360" font-family="Inter Tight, Inter, sans-serif" font-weight="600" font-size="104" letter-spacing="-6" fill="#f5f5f5">${name}</text>
  <text x="80" y="416" font-family="Inter Tight, Inter, sans-serif" font-weight="500" font-size="34" letter-spacing="-1" fill="#a3a3a3">${role}</text>

  <g transform="translate(80 476)">
    <rect width="150" height="34" rx="8" fill="rgba(124,255,178,0.1)"/>
    <circle cx="18" cy="17" r="4" fill="#7cffb2"/>
    <text x="32" y="22" font-family="Geist Mono, ui-monospace, monospace" font-size="13" fill="#7cffb2">AVAILABLE</text>
  </g>

  <g font-family="Geist Mono, ui-monospace, monospace" fill="#737373" font-size="15">
    <text x="80" y="570">${location}</text>
    <text x="1120" y="570" text-anchor="end">${site}</text>
  </g>

  <rect x="80" y="596" width="1040" height="1" fill="rgba(255,255,255,0.08)"/>
  <rect x="1120" y="176" width="6" height="6" rx="3" fill="#7cffb2"/>
</svg>`;
};
