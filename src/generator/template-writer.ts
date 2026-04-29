import fs from "fs";
import path from "path";
import type { SiteConfig } from "@/types";

const TEMPLATE_DIR = path.join(process.cwd(), "src", "templates", "starter");
const OUTPUT_BASE = path.join(process.cwd(), "generated-sites");

export async function writeTemplate(slug: string, config: SiteConfig): Promise<string> {
  const outputDir = path.join(OUTPUT_BASE, slug);

  // Clean previous generation if exists
  if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true });
  }

  // Copy template directory
  copyDir(TEMPLATE_DIR, outputDir);

  // Inject siteConfig.ts
  const configContent = `import type { SiteConfig } from "./types";

export const siteConfig: SiteConfig = ${JSON.stringify(config, null, 2)};
`;
  fs.writeFileSync(path.join(outputDir, "src", "siteConfig.ts"), configContent);

  // Inject globals.css with theme colors.
  //
  // Design system (2026-04-28 redesign): a universal light editorial palette
  // shared across every generated site, with one industry-specific accent
  // colour (`--color-accent`). The legacy `--color-primary` is kept as a
  // dark-text token so existing utilities like `text-primary` still mean
  // "dark, readable text". Pages no longer use `bg-primary` as the dominant
  // surface — that pattern produced "moody dark template" looks. Surfaces
  // are now `--color-canvas` / `--color-surface` / `--color-muted`.
  //
  // Per-tenant override: the tenant's brand color from industry-presets.ts
  // becomes `--color-accent`. Soft / hover variants are derived if not
  // supplied by the preset.
  const accentSoft = `${config.colors.accent}1A`; // ~10% alpha
  const cssContent = `@import "tailwindcss";

@theme {
  /* Universal light surfaces — same for every tenant. */
  --color-canvas: #FAFAF7;
  --color-surface: #FFFFFF;
  --color-muted: #F4F4F0;
  --color-border-subtle: #E8E6E0;
  --color-border-strong: #D4D2CC;
  --color-primary: #1A1A1A;       /* primary text — was tenant brand */
  --color-secondary: #5A5A5A;
  --color-text-muted: #8A8A8A;
  --color-footer-bg: #1F1F1B;

  /* Tenant-specific accent — the only color that varies per industry. */
  --color-accent: ${config.colors.accent};
  --color-accent-light: ${config.colors.accentLight};
  --color-accent-dark: ${config.colors.accentDark};
  --color-accent-soft: ${accentSoft};

  /* Legacy aliases — keep until all template files migrate. */
  --color-primary-light: #5A5A5A;
  --color-primary-dark: #1A1A1A;
  --color-surface-dark: #F4F4F0;
  --color-text: #1A1A1A;
  --color-text-light: #5A5A5A;

  --font-heading: ${config.fonts.heading};
  --font-body: ${config.fonts.body};
  --font-display: 'Fraunces', Georgia, serif;
}

body {
  font-family: var(--font-body);
  color: var(--color-primary);
  background-color: var(--color-canvas);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  letter-spacing: -0.015em;
}

.font-display {
  font-family: var(--font-display);
  font-weight: 500;
  letter-spacing: -0.02em;
}
`;
  fs.writeFileSync(path.join(outputDir, "src", "app", "globals.css"), cssContent);

  return outputDir;
}

function copyDir(src: string, dest: string) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    // Skip template files that get replaced
    if (entry.name === "siteConfig.ts.tmpl" || entry.name === "globals.css.tmpl") continue;
    // Skip node_modules
    if (entry.name === "node_modules" || entry.name === ".next") continue;

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}
