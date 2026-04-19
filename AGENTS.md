<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Session Notes

- **2026-04-19** — Upgraded the public marketing experience to feel less template-like and more proof-driven: homepage hero now carries supporting proof pills, the featured Mike T project uses a structured `ProjectCard` snapshot instead of screenshot placeholders, the services page is grouped into `Core Builds` and `Growth Add-Ons`, and the Mike T portfolio/case-study pages now use real walkthrough/proof sections instead of “coming soon” blocks. Added Jest coverage for the new marketing sections and refreshed Playwright `e2e/pages.spec.ts` assertions to match the current metadata and hero copy.
- **2026-04-19** — Stabilized the test suite after the admin-auth hardening: admin API tests now explicitly mock `requireAdmin()`, contact API tests isolate their in-memory rate-limit state with unique IPs, and `contactFormSchema` no longer uses an unmergeable Zod intersection for trimmed line-break-safe fields. `npm test -- --runInBand` and `npm run build` are green again.
- **2026-04-19** — Removed the remaining Next 16 build warnings by migrating `src/middleware.ts` to `src/proxy.ts` and tightening `getScraperPath()` so a blank `SCRAPER_PATH` can’t collapse to the app root and trigger whole-project NFT tracing. Added proxy/scraper regression coverage, updated the stale navbar pathname test harness, and reverified with Jest, `next build`, and Playwright.
