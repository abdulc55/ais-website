# Spiffy Tec

Agency website for Spiffy Tec, a web development & SaaS company based in Cary, NC. Specializes in service businesses, builds for any business ready to grow online — Triangle roots, no geographic limit.

## Tech Stack

- **Framework:** Next.js 16.2.1 (App Router) + React 19.2.4 + TypeScript 5
- **Styling:** Tailwind CSS 4 (inline `@theme` in globals.css, no tailwind.config.ts)
- **Animations:** Framer Motion 12.38.0
- **Icons:** lucide-react 1.0.1
- **Email:** Resend 6.9.4 (contact form delivery)
- **Utilities:** clsx 2.1.1 + tailwind-merge 3.5.0 (via `cn()` helper)
- **Font:** Inter (Google Fonts, latin subset, swap display)

## Commands

```bash
npm run dev          # Start dev server (localhost:3001)
npm run build        # Production build
npm run start        # Run production server
npm run lint         # ESLint 9
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (metadata, JSON-LD, Inter font, Navbar + Footer)
│   ├── globals.css             # Tailwind @theme, custom animations, utility classes
│   ├── page.tsx                # Home (Hero, Services, Featured Project, Stats, Testimonial, CTA)
│   ├── services/page.tsx       # Services (Custom Websites, SaaS, Mobile Apps, SEO, AI Suite)
│   ├── pricing/page.tsx        # Pricing tiers ($99–$349/mo) + add-ons + FAQs
│   ├── portfolio/page.tsx      # Featured case study (Mike T Detailing) + project grid
│   ├── about/page.tsx          # Founder story, mission, values, tech stack
│   ├── contact/page.tsx        # Contact form + direct contact info panel
│   ├── admin/
│   │   ├── login/page.tsx          # Admin login
│   │   └── leads/page.tsx          # Lead Scanner dashboard (tabbed: Search by Area + Analyze URLs)
│   └── api/
│       ├── contact/route.ts        # POST — validates form, sends email via Resend
│       └── admin/leads/
│           ├── route.ts            # GET leads, POST mark contacted
│           ├── analyze/route.ts    # POST — analyze specific URLs via lead scraper CLI
│           └── discover/route.ts   # POST — Google Places search + analyze (Search by Area)
├── components/
│   ├── Navbar.tsx              # Fixed header, transparent→white on scroll, mobile hamburger
│   ├── Footer.tsx              # Dark navy, 4-column grid, social icons (GitHub, LinkedIn, X)
│   ├── Hero.tsx                # Reusable hero: badge, title (gradient highlight), subtitle, CTAs
│   ├── SectionHeader.tsx       # Badge + title (with highlight) + description
│   ├── ServiceCard.tsx         # Icon, title, features list, price, CTA, popular variant
│   ├── PricingCard.tsx         # Tier name, price, period, features, CTA, popular variant, setupFee badge
│   ├── ProjectCard.tsx         # Featured & standard project layouts with tech badges
│   ├── TestimonialCard.tsx     # 5-star rating, quote, author/business attribution
│   ├── ContactForm.tsx         # Form with validation, loading/success/error states
│   ├── StatCounter.tsx         # Animated number counter (Framer Motion useInView + animate)
│   └── TechBadge.tsx           # Small tech stack pill/badge
└── lib/
    ├── cn.ts                   # clsx + twMerge className utility
    └── email.ts                # Resend sendContactEmail() with HTML template + escapeHtml()
```

## Design System

### Colors (defined in `globals.css` @theme)

| Token | Value | Usage |
|-------|-------|-------|
| `primary-500`–`primary-950` | `#3b82f6`–`#172554` | Trust, headings, links, nav |
| `cyan-400`–`cyan-600` | `#22d3ee`–`#0891b2` | Tech accent, gradient highlights, logo dot |
| `amber-400`–`amber-600` | `#fbbf24`–`#d97706` | Attention, warm accents |
| `navy` / `navy-light` / `navy-dark` | `#0f172a` / `#1e293b` / `#020617` | Dark sections, hero, footer |
| `surface` / `surface-muted` / `surface-alt` | `#ffffff` / `#f8fafc` / `#f1f5f9` | Page backgrounds, cards |

### Custom CSS Classes

| Class | Purpose |
|-------|---------|
| `gradient-text` | Blue→cyan gradient text (`-webkit-background-clip: text`) |
| `cta-gradient` | Blue→cyan button gradient (`#1d4ed8` → `#06b6d4`) |
| `card-shadow` | Subtle shadow with hover lift (`translateY(-2px)`) |
| `section-divider` | 1px gradient line (transparent → gray → transparent) |

### Animations

| Name | Duration | Effect |
|------|----------|--------|
| `fade-up` | 0.6s | Opacity 0→1 + translateY(24px→0) |
| `fade-in` | 0.5s | Opacity 0→1 |

### Typography
- Font: Inter (Google Fonts)
- Body: `text-navy` (#0f172a) on white
- Hero titles: `text-white` on navy gradient backgrounds
- Section headers use `SectionHeader` component with optional gradient highlight word

### Layout Patterns
- Max width: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Hero sections: `bg-gradient-to-br from-navy via-primary-900 to-navy-dark`
- Cards: white bg + `card-shadow` class + `rounded-2xl`
- Popular card variant: gradient border + `bg-gradient-to-br from-primary-50 to-cyan-50`

## Component Props

### Hero
```typescript
{ badge?: string; title: string; highlight?: string; subtitle?: string;
  primaryCta?: { label: string; href: string }; secondaryCta?: { label: string; href: string };
  tall?: boolean }
```

### ServiceCard
```typescript
{ icon: LucideIcon; title: string; description: string; features: string[];
  price: string; priceLabel?: string; href: string; popular?: boolean }
```

### PricingCard
```typescript
{ name: string; price: string; period?: string; description: string;
  features: string[]; cta: string; href: string; popular?: boolean; setupFee?: string }
```

### SectionHeader
```typescript
{ badge?: string; title: string; highlight?: string; description?: string }
```

### ContactForm
No props — self-contained with internal state management. Service and budget options are defined internally.

### StatCounter
```typescript
{ value: number; suffix?: string; label: string }
```

## Environment Variables

```
RESEND_API_KEY          # Resend service API key for contact form emails
CONTACT_EMAIL           # Recipient email for form submissions (defaults to abdul@spiffytec.com)
```

## SEO

- **Metadata:** Defined in `layout.tsx` with title template `"%s | Spiffy Tec"`
- **JSON-LD:** `LocalBusiness` schema with geo coordinates (Cary, NC: 35.7915, -78.7811), service radius 50km
- **OpenGraph + Twitter cards:** Configured globally in layout metadata
- **Service types in schema:** Web Development, SaaS Development, Mobile App Development, SEO & Digital Marketing

## Code Conventions

- **Light theme** — completely different from Mike T Detailing's dark theme. White backgrounds, navy text, dark hero sections.
- **Server components by default** — only 3 client components: Navbar (scroll detection), ContactForm (form state), StatCounter (animation)
- **`cn()` utility** from `src/lib/cn.ts` — always use for conditional classNames
- **`cta-gradient`** class for all primary action buttons (not inline gradient classes)
- **`card-shadow`** class for all card hover effects (not inline shadow/transform)
- **Framer Motion** only in client components: `useInView` for scroll triggers, `animate` for counters
- **Input styling** pattern: `w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500`
- **Form validation** on client side before API call; API also validates
- **HTML escaping** via `escapeHtml()` in email.ts for all user-provided content
- **No database** — static marketing site with contact form email only
- **Navbar** uses `scrolled` state at `window.scrollY > 50` to toggle transparent→white
- **Mobile menu** locks body scroll with `overflow: hidden`
- **Social links** use custom SVG components (GithubIcon, LinkedinIcon, XIcon) in Footer

## Pricing Model (Monthly + Setup Fees, 12-Month Commitment)

| Tier | Setup Fee | Monthly | Annual (Save 2 Months) | Key Features |
|------|-----------|---------|------------------------|-------------|
| Starter | $0 | $149/mo | $1,490/yr ($124/mo) | 3-5 pages, hosting, SSL, responsive, basic SEO, 1 hr/mo edits |
| Business ⭐ | $999 | $249/mo | $2,490/yr ($208/mo) | 5-10 pages, booking, CMS, analytics, 2 hrs/mo edits (**Most Popular**) |
| Growth | $1,999 | $399/mo | $3,990/yr ($333/mo) | Payments, accounts, admin dashboard, priority support |
| Premium | $3,999 | $599/mo | $5,990/yr ($499/mo) | Full platform + mobile app + SEO + unlimited edits |

### Add-Ons
- AI Business Suite: +$99/mo
- Mobile App: +$99/mo
- SEO Package: +$149/mo
- Rush Delivery: +50% first month

### Revenue Share (Platform Clients Only)
- $0–$5,000/mo: 0% (included)
- $5,001–$15,000/mo: 2% of amount over $5K
- $15,001+/mo: 3% of amount over $15K

### Key Policies
- 12-month partnership commitment (month-to-month after)
- Setup fees can be split across first 3 months
- Annual billing saves 2 months
- Cancel with 30 days notice after commitment period

## Session Maintenance

**IMPORTANT:** At the end of every session or after significant changes, update this CLAUDE.md file to reflect:

1. **New files or routes** — Add to Project Structure
2. **New dependencies** — Add to Tech Stack
3. **New/changed commands** — Update Commands section
4. **New components** — Add to Components section with props
5. **New environment variables** — Add to Environment Variables
6. **Changed pricing** — Update Pricing Model section
7. **New CSS classes** — Add to Design System
8. **Changed conventions** — Add to Code Conventions

### Quick Pre-Flight (run at session start)
```bash
npm run build          # Verify clean build
npm run dev            # Start dev server on port 3001
```

### Session Changelog
<!-- Append a one-liner per session so we have a running history -->
- **2026-03-23** — Created CLAUDE.md. Updated pricing from one-time ($1,500–$5,000+) to monthly model ($99–$349/mo). Added AI Business Suite as new service and add-on.
- **2026-03-23** — Major pricing restructure: $149-$599/mo with setup fees ($0-$3,999), monthly/annual billing toggle, revenue share model, 12-month commitment, updated headlines across all pages, generated sales PDF (AIS-Sales-Pricing-2026.pdf). Updated CLAUDE.md pricing section.
- **2026-03-24** — Added Lead Scanner web UI at `/admin/leads`: tabbed interface with "Search by Area" (Google Places discovery → auto-analyze) and "Analyze URLs" (direct URL scan). New API routes: `/api/admin/leads/analyze` and `/api/admin/leads/discover`. Dashboard shows scores, pitch points, outreach tracking. Reads from `tools/lead-scraper/` SQLite DB.
- **2026-04-29** — Merged client-portal into spiffytec: NextAuth (email + bcrypt) replaces shared-password proxy. Prisma + libsql added. Admin lives at `/admin/*` (Dashboard, Lead Scanner, Intake Forms, Submissions, Demos, Sites). Public intake/preview at `/intake/[token]` and `/preview/[token]`. Full site-generator engine + starter template ported. Per-IP rate limiter on `/api/auth/callback/credentials` with regression test. 172/172 jest tests + `npm run build` green. **Dev script uses `--webpack` flag** because Turbopack was wedged in this install ("Persisting failed: Unable to write SST file" / "ENOENT middleware-manifest.json"). Production build is unaffected; sign-in works end-to-end via webpack dev. Re-enable Turbopack by removing `--webpack` from `package.json` once the upstream issue is fixed.

## Planning Convention — Multi-Agent Approval

Every non-trivial plan must include an **Agent Team Review** section where each specialized agent provides their individual verdict before implementation begins:

1. **Each agent reports independently** with a verdict: GREEN LIGHT / YELLOW / RED
2. **Each agent raises concerns** specific to their domain
3. **The Head Agent** synthesizes all opinions into a final recommendation
4. **No single perspective dominates** — critical concerns from any agent can block or reshape the plan
