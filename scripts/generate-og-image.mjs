import sharp from "sharp";
import { join } from "path";

// Brand tokens from globals.css
const NAVY = "#263353";
const NAVY_DARK = "#1A2540";
const NAVY_LIGHT = "#344568";
const AMBER = "#E8B86D";
const AMBER_DARK = "#C4932E";
const WHITE = "#ffffff";
const ICE_MUTED = "#D6EBF3";

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="topAccent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${NAVY}"/>
      <stop offset="50%" stop-color="${AMBER}"/>
      <stop offset="100%" stop-color="${NAVY}"/>
    </linearGradient>
  </defs>

  <!-- Solid navy background — matches Hero.tsx bg-navy exactly -->
  <rect width="1200" height="630" fill="${NAVY}"/>

  <!-- Top accent stripe (mirrors the hero's top-accent bar) -->
  <rect x="0" y="0" width="1200" height="3" fill="url(#topAccent)"/>

  <!-- Brand wordmark -->
  <text x="80" y="135" font-family="-apple-system, system-ui, 'Helvetica Neue', Arial, sans-serif" font-size="38" font-weight="800" fill="${WHITE}" letter-spacing="6">SPIFFY <tspan fill="${AMBER}">TEC</tspan></text>

  <!-- Main headline -->
  <text x="80" y="295" font-family="-apple-system, system-ui, 'Helvetica Neue', Arial, sans-serif" font-size="78" font-weight="800" fill="${WHITE}" letter-spacing="-2">Web Design &amp; SaaS</text>
  <text x="80" y="385" font-family="-apple-system, system-ui, 'Helvetica Neue', Arial, sans-serif" font-size="78" font-weight="800" fill="${WHITE}" letter-spacing="-2">for Service Businesses</text>

  <!-- Tagline -->
  <text x="80" y="455" font-family="-apple-system, system-ui, 'Helvetica Neue', Arial, sans-serif" font-size="28" font-weight="600" fill="${ICE_MUTED}" letter-spacing="0" opacity="0.85">Custom websites • Booking platforms • Mobile apps • AI tools</text>

  <!-- Bottom row: URL + Location -->
  <text x="80" y="555" font-family="-apple-system, system-ui, 'Helvetica Neue', Arial, sans-serif" font-size="26" font-weight="700" fill="${AMBER}">spiffytec.com</text>
  <text x="280" y="555" font-family="-apple-system, system-ui, 'Helvetica Neue', Arial, sans-serif" font-size="22" font-weight="500" fill="${WHITE}" opacity="0.6">Raleigh • Durham • Cary, NC</text>

  <!-- Pricing button (mirrors hero CTA: bg-amber text-navy-dark) -->
  <rect x="900" y="525" width="220" height="54" rx="27" fill="${AMBER}"/>
  <text x="1010" y="560" font-family="-apple-system, system-ui, 'Helvetica Neue', Arial, sans-serif" font-size="22" font-weight="700" fill="${NAVY_DARK}" text-anchor="middle">From $149/mo</text>
</svg>`;

const outPath = join(process.argv[2] || ".", "public/og-image.png");

await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9, quality: 95 })
  .toFile(outPath);

console.log(`Generated ${outPath}`);
