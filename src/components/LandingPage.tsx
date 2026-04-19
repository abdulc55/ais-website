import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Hero } from "@/components/Hero";
import { ServiceSchema } from "@/components/ServiceSchema";

/**
 * LandingPage — reusable template for SEO landing pages.
 *
 * Used by both city-scoped pages (/raleigh-web-design) and niche-scoped
 * pages (/websites-for-mobile-detailers). Same skeleton, different data.
 *
 * Each landing page supplies a single content object; the component renders
 * the hero, who-it's-for section, offer grid, priced outcome bar,
 * case-study teaser, FAQ accordion, and CTA — plus a Service JSON-LD tag.
 *
 * Internal link targets (/pricing, /contact, /portfolio/mike-t-detailing)
 * are hard-wired to keep every landing page funneling to the same
 * conversion surfaces without needing the caller to spell them out.
 */

export interface LandingPageFaq {
  question: string;
  answer: string;
}

export interface LandingPageContent {
  /** URL slug (no leading slash). Used by ServiceSchema and canonical URL. */
  slug: string;
  /** Short tag above the H1, e.g. "Raleigh, NC" or "Mobile Detailing". */
  eyebrow: string;
  /** H1 — the money headline. Include city/niche term literally. */
  h1: string;
  /** Phrase inside h1 to render in amber accent color. */
  h1Highlight?: string;
  /** Supporting paragraph under H1. */
  subtitle: string;
  /** Who it's for — 3-5 short bullets. */
  whoItsFor: string[];
  /** What you offer — 3-6 cards with title + body. */
  offers: { title: string; body: string }[];
  /** Price range shown in the offer bar, e.g. "$99 – $599/mo". */
  priceRange: string;
  /** Short pitch shown alongside price range. */
  priceBlurb: string;
  /** Link + label for the case study teaser strip. Optional. */
  caseStudy?: { href: string; label: string; body: string };
  /** FAQs — 3-6 Q/A pairs. */
  faqs: LandingPageFaq[];
  /** Service name used in the JSON-LD schema (keyword-focused). */
  schemaServiceName: string;
  /** Areas served for schema; defaults to Triangle cities. */
  schemaAreas?: string[];
}

export function LandingPage({ content }: { content: LandingPageContent }) {
  const {
    slug,
    eyebrow,
    h1,
    h1Highlight,
    subtitle,
    whoItsFor,
    offers,
    priceRange,
    priceBlurb,
    caseStudy,
    faqs,
    schemaServiceName,
    schemaAreas,
  } = content;

  const url = `https://spiffytec.com/${slug}`;

  return (
    <>
      <ServiceSchema
        name={schemaServiceName}
        description={subtitle}
        priceRange={priceRange}
        url={url}
        areaServed={schemaAreas}
      />

      <Hero
        badge={eyebrow}
        title={h1}
        highlight={h1Highlight}
        subtitle={subtitle}
      />

      {/* Who it's for */}
      <section className="bg-surface py-14 md:py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber-dark">
            Who this is for
          </p>
          <h2 className="mt-2 text-2xl md:text-3xl font-bold text-navy">
            Built for people who actually run the business.
          </h2>
          <ul className="mt-8 space-y-3">
            {whoItsFor.map((item) => (
              <li key={item} className="flex gap-3 text-text-muted">
                <Check className="h-5 w-5 text-success mt-0.5 shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Offers grid */}
      <section className="bg-surface-muted py-16 md:py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber-dark text-center">
            What you get
          </p>
          <h2 className="mt-2 text-2xl md:text-3xl font-bold text-navy text-center">
            Everything you need to book clients and look legit online.
          </h2>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <div
                key={offer.title}
                className="rounded-2xl bg-white border border-gray-100 p-6 card-shadow"
              >
                <h3 className="font-bold text-navy">{offer.title}</h3>
                <p className="mt-2 text-sm text-text-muted leading-relaxed">
                  {offer.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Price bar */}
      <section className="bg-navy py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber">
            Pricing
          </p>
          <p className="mt-3 text-3xl md:text-4xl font-bold text-white">
            {priceRange}
          </p>
          <p className="mt-3 text-ice/70 max-w-2xl mx-auto">{priceBlurb}</p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/contact?ref=${slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-amber px-8 py-3.5 font-semibold text-navy-dark hover:bg-amber-dark transition-colors"
            >
              Book a Strategy Call <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 text-white px-8 py-3.5 font-semibold hover:bg-white/10 transition-colors"
            >
              See All Plans
            </Link>
          </div>
        </div>
      </section>

      {/* Case study teaser */}
      {caseStudy && (
        <section className="bg-surface py-16 md:py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-amber-dark">
              Real proof
            </p>
            <h2 className="mt-2 text-2xl md:text-3xl font-bold text-navy">
              {caseStudy.label}
            </h2>
            <p className="mt-4 text-text-muted leading-relaxed">
              {caseStudy.body}
            </p>
            <Link
              href={caseStudy.href}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy text-white px-8 py-3.5 font-semibold hover:bg-navy-light transition-colors"
            >
              Read the Full Case Study <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      )}

      {/* FAQs */}
      <section className="bg-surface-muted py-16 md:py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-navy text-center">
            Frequently Asked Questions
          </h2>
          <div className="mt-10 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-gray-200 bg-white overflow-hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 font-semibold text-navy hover:bg-gray-50 transition-colors [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span className="shrink-0 text-gray-400 transition-transform group-open:rotate-180">
                    &#9662;
                  </span>
                </summary>
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-navy py-16 md:py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Ready to get set up?
          </h2>
          <p className="mt-4 text-ice/70">
            {"Book a free 30-minute strategy call. We'll pull up your site, score it, and show you exactly what's costing you customers."}
          </p>
          <Link
            href={`/contact?ref=${slug}`}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber px-8 py-3.5 font-semibold text-navy-dark hover:bg-amber-dark transition-colors"
          >
            Book Your Strategy Call <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
