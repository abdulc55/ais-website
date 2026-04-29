import Link from "next/link";
import {
  Zap, Shield, ArrowRight, Phone, Brain, MessageCircle,
  TrendingUp, Sparkles, CalendarDays, CreditCard, AlertTriangle,
  Users, Eye, Clock, Repeat, ExternalLink,
} from "lucide-react";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { ProjectCard } from "@/components/ProjectCard";

export default function Home() {
  return (
    <>
      {/* Hero — audit-led positioning */}
      <Hero
        badge="Digital Business Systems"
        title="Your website should be your best salesperson."
        highlight="best salesperson"
        subtitle="Spiffy Tec builds the websites, booking systems, and automation tools every business needs to stop leaking leads and start closing faster."
        supportingPoints={[
          "Launch-ready in 2-3 weeks",
          "No upfront cost — monthly plans",
          "Triangle-based, building for businesses everywhere",
        ]}
        primaryCta={{ label: "Get Your Free Audit", href: "/audit" }}
        secondaryCta={{ label: "See Our Work", href: "/portfolio" }}
        tall
      />

      {/* Section 2 — The Problem */}
      <section className="bg-surface py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            badge="The Real Problem"
            title="Most businesses are leaking revenue online."
            highlight="leaking revenue"
            centered
          />
          <p className="text-center text-gray-500 mt-3 max-w-2xl mx-auto">
            It&apos;s not just about having a website. It&apos;s about fixing the gaps that cost you customers every day.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Eye,
                title: "Invisible online",
                problem: "Customers search, your competitors show up, you don't.",
              },
              {
                icon: AlertTriangle,
                title: "Weak first impression",
                problem: "Visitors land on your site and leave in 5 seconds — no trust, no call.",
              },
              {
                icon: Clock,
                title: "Manual everything",
                problem: "Texting back and forth for bookings, chasing payments, no system.",
              },
              {
                icon: Repeat,
                title: "Customers don't come back",
                problem: "No follow-up, no memberships, no reason to rebook.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-gray-200 bg-white p-6 card-shadow">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-spiffy-orange-soft)] text-[var(--color-spiffy-orange-dark)]">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{item.problem}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-spiffy-orange)] px-7 py-3 font-semibold text-white hover:bg-[var(--color-spiffy-orange-dark)] transition-colors"
            >
              Find out where you&apos;re losing leads <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 3 — The System (5 layers) */}
      <section className="bg-[var(--color-surface)] py-20 md:py-28 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <span className="inline-block rounded-full border border-[var(--color-border)] bg-[var(--color-spiffy-orange-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--color-spiffy-orange-dark)]">
              How We Fix It
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-[var(--color-ink)] md:text-4xl">
              Not just a website. A complete business system.
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-[var(--color-ink-muted)]">
              Every layer works together so your website doesn&apos;t just look good — it books jobs, collects payments, and runs your operations.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {[
              {
                icon: Shield,
                title: "Trust",
                description: "Professional design, reviews, SSL, and local SEO so customers trust you before the first call.",
                label: "Look credible",
              },
              {
                icon: Users,
                title: "Conversion",
                description: "Clear CTAs, contact forms, consultation funnels, and landing pages that turn visitors into leads.",
                label: "Turn visits into calls",
              },
              {
                icon: CalendarDays,
                title: "Booking",
                description: "Online scheduling, deposits, and booking confirmations so customers can act while they still want to.",
                label: "Book without the back-and-forth",
              },
              {
                icon: CreditCard,
                title: "Operations",
                description: "Payments, admin dashboard, customer management, and automations that replace the spreadsheet chaos.",
                label: "Run the business from one place",
              },
              {
                icon: TrendingUp,
                title: "Growth",
                description: "SEO, AI tools, analytics, memberships, and follow-up systems that bring customers back.",
                label: "Keep growing",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-[var(--color-border)] bg-white p-6 text-left card-shadow">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-spiffy-orange-soft)] text-[var(--color-spiffy-orange)]">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-[var(--color-ink)]">{item.title}</h3>
                <p className="mt-1 text-xs font-medium text-[var(--color-spiffy-orange)]">{item.label}</p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-muted)]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — Plans framed around business maturity */}
      <section className="bg-surface py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            badge="Plans"
            title="Pick the system that fits where your business is today."
            highlight="where your business is"
            centered
          />

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "Starter",
                outcome: "Get Credible",
                price: "$99/mo",
                desc: "Professional online presence so customers take you seriously.",
                features: ["3-5 page website", "Mobile responsive", "SEO basics", "Contact form", "1 hr/mo edits"],
              },
              {
                name: "Business",
                outcome: "Get Booked",
                price: "$149/mo",
                desc: "Booking, scheduling, and CMS so you stop texting back and forth.",
                features: ["Everything in Starter", "Online booking", "CMS & blog", "Analytics", "2 hrs/mo edits"],
                popular: true,
              },
              {
                name: "Platform",
                outcome: "Get Automated",
                price: "$249/mo",
                desc: "Payments, accounts, and dashboards so you run the business from one place.",
                features: ["Everything in Business", "Stripe payments", "User accounts", "Admin dashboard", "Unlimited edits"],
              },
              {
                name: "Custom",
                outcome: "Get Everything",
                price: "Let's Talk",
                desc: "Full platform with custom integrations, multi-location, and enterprise features.",
                features: ["Everything in Platform", "Custom integrations", "Multi-location", "VIP systems", "Same-day support"],
              },
            ].map((plan) => (
              <div key={plan.name} className={`rounded-2xl border p-6 bg-white ${plan.popular ? "border-2 border-[var(--color-spiffy-orange)] relative" : "border border-[var(--color-border)]"}`}>
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--color-spiffy-orange)] text-white text-xs font-bold px-3 py-0.5 rounded-full">
                    MOST POPULAR
                  </span>
                )}
                <p className="text-xs font-semibold text-[var(--color-spiffy-orange-dark)] uppercase tracking-wide">{plan.outcome}</p>
                <h3 className="mt-1 text-lg font-bold text-navy">{plan.name}</h3>
                <p className="mt-1 text-2xl font-bold text-navy">{plan.price}</p>
                <p className="mt-2 text-sm text-gray-600">{plan.desc}</p>
                <ul className="mt-4 space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <Zap className="h-3.5 w-3.5 text-amber flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.name === "Custom" ? "/contact" : "/pricing"}
                  className={`mt-6 block text-center rounded-full px-6 py-3 font-semibold transition-colors ${
                    plan.popular
                      ? "bg-[var(--color-spiffy-orange)] text-white hover:bg-[var(--color-spiffy-orange-dark)]"
                      : "bg-white border border-[var(--color-border-strong)] text-[var(--color-ink)] hover:border-[var(--color-spiffy-orange)] hover:text-[var(--color-spiffy-orange)]"
                  }`}
                >
                  {plan.name === "Custom" ? "Book a Call" : "See Full Details"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Business Suite Banner */}
      <section className="bg-white py-20 md:py-28 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-[var(--color-spiffy-orange-soft)] border border-[var(--color-border)] rounded-full px-4 py-1.5 mb-4">
                  <Brain className="w-4 h-4 text-[var(--color-spiffy-orange)]" />
                  <span className="text-sm font-medium text-[var(--color-spiffy-orange-dark)]">AI-Powered</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-ink)]">
                  AI Business Suite
                </h2>
                <p className="mt-3 text-lg text-[var(--color-ink-muted)] leading-relaxed">
                  AI that works while you sleep. Answers customer questions, surfaces revenue insights, and writes your marketing content.
                </p>
                <Link
                  href="/services"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-spiffy-orange)] px-7 py-3 font-semibold text-white hover:bg-[var(--color-spiffy-orange-dark)] transition-colors"
                >
                  Learn More <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                {[
                  { icon: MessageCircle, title: "AI Chatbot", desc: "24/7 customer support that books appointments" },
                  { icon: TrendingUp, title: "AI Analytics", desc: "Revenue predictions and customer insights" },
                  { icon: Sparkles, title: "AI Marketing", desc: "Social posts, emails, and review responses" },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl bg-white border border-[var(--color-border)] p-5 text-center">
                    <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-spiffy-orange-soft)] text-[var(--color-spiffy-orange)]">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-[var(--color-ink)] text-sm">{item.title}</h3>
                    <p className="mt-1 text-xs text-[var(--color-ink-muted)]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Project */}
      <section className="bg-surface-muted py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            badge="Case Study"
            title="A coding education platform built from scratch."
            highlight="coding education platform"
            description="Valueati is a learn-to-code platform with structured lessons, guided practice problems, and spaced review — built end-to-end by Spiffy Tec."
            centered
          />

          <div className="mt-8 max-w-5xl mx-auto">
            <ProjectCard
              title="Valueati"
              description="A modern coding education platform featuring structured curriculum, problem-specific lessons, guided practice, and spaced-review reinforcement — designed to take learners from beginner to job-ready."
              tags={["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma"]}
              featured
              metrics={[
                { value: "Live", label: "Production at valueati.com" },
                { value: "200+", label: "Practice problems planned" },
                { value: "End-to-end", label: "Curriculum + practice + review" },
                { value: "Web + Mobile", label: "Responsive across devices" },
              ]}
              proofPoints={[
                "Curriculum-driven lessons with embedded code editor and inline checks",
                "Guided practice problems with hints, walkthroughs, and graded solutions",
                "Spaced-review system that surfaces past problems for long-term retention",
              ]}
              primaryCta={{ label: "Visit Valueati", href: "https://valueati.com" }}
              secondaryCta={{ label: "Get Your Free Audit", href: "/audit" }}
            />
          </div>
        </div>
      </section>

      {/* From the founder — proof of craft */}
      <section className="bg-surface py-16 md:py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl card-shadow p-8 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-spiffy-orange-dark)]">
              See the work
            </p>
            <h2 className="mt-3 text-2xl md:text-3xl font-bold text-[var(--color-ink)] leading-tight">
              Don&apos;t take our word for it. Click around our work.
            </h2>
            <p className="mt-5 text-base md:text-lg leading-relaxed text-[var(--color-ink)]">
              Valueati is the coding-education platform that sets the standard for{" "}
              <span className="brand-text text-base">Spiffy Tec</span>. It&apos;s live at{" "}
              <a
                href="https://valueati.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-spiffy-orange)] hover:text-[var(--color-spiffy-orange-dark)] font-semibold"
              >
                valueati.com
              </a>
              {" "}— same architecture, same care, same production code that ships on every client project.
            </p>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-[var(--color-ink-muted)]">
              Want to know what you&apos;re paying for before you sign? Open the site, click around, see the polish.
              Then we&apos;ll talk about yours.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <a
                href="https://valueati.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-spiffy-orange)] px-6 py-3 font-semibold text-white hover:bg-[var(--color-spiffy-orange-dark)] transition-colors"
              >
                See Valueati Live <ExternalLink className="w-4 h-4" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[var(--color-border-strong)] px-6 py-3 font-semibold text-[var(--color-ink)] hover:border-[var(--color-spiffy-orange)] hover:text-[var(--color-spiffy-orange)] transition-colors"
              >
                Talk to Abdul
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — Audit-led */}
      <section className="bg-[var(--color-surface-muted)] py-16 md:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-ink)]">
            Where is your business leaking revenue?
          </h2>
          <p className="mt-4 text-lg text-[var(--color-ink-muted)]">
            15-minute audit. We&apos;ll show you exactly what&apos;s costing you customers — and how to fix it.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-spiffy-orange)] px-8 py-3.5 font-semibold text-white hover:bg-[var(--color-spiffy-orange-dark)] transition-colors"
            >
              Get Your Free Audit <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="tel:+19842151498"
              className="inline-flex items-center gap-2 text-[var(--color-ink-muted)] hover:text-[var(--color-spiffy-orange)] transition-colors font-medium"
            >
              <Phone className="h-4 w-4" />
              (984) 215-1498
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
