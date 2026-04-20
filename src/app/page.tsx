import Link from "next/link";
import {
  Globe, Search, Zap, Shield, ArrowRight, Phone, Brain, MessageCircle,
  TrendingUp, Sparkles, CalendarDays, CreditCard, Layers3, AlertTriangle,
  Users, Eye, Clock, BarChart3, Repeat, Code,
} from "lucide-react";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { TestimonialCard } from "@/components/TestimonialCard";

export default function Home() {
  return (
    <>
      {/* Hero — audit-led positioning */}
      <Hero
        badge="Digital Business Systems"
        title="Your website should be your best salesperson."
        highlight="best salesperson"
        subtitle="Spiffy Tec builds the website, booking system, and automation tools service businesses need to stop leaking leads and start closing faster."
        supportingPoints={[
          "Launch-ready in 2-3 weeks",
          "No upfront cost — monthly plans",
          "Built in the Triangle for service businesses",
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
            title="Most service businesses are leaking revenue online."
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
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-light text-amber-dark">
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
              className="inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3 font-semibold text-white hover:bg-navy-light transition-colors"
            >
              Find out where you&apos;re losing leads <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 3 — The System (5 layers) */}
      <section className="bg-navy py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <span className="inline-block rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber">
              How We Fix It
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-white md:text-4xl">
              Not just a website. A complete business system.
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-white/80">
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
              <div key={item.title} className="rounded-3xl border border-white/10 bg-white/6 p-6 text-left backdrop-blur-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-amber">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-1 text-xs font-medium text-amber">{item.label}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{item.description}</p>
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
              <div key={plan.name} className={`rounded-2xl border p-6 bg-white ${plan.popular ? "border-amber ring-2 ring-amber/20 relative" : "border-gray-200"}`}>
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber text-navy-dark text-xs font-bold px-3 py-0.5 rounded-full">
                    MOST POPULAR
                  </span>
                )}
                <p className="text-xs font-semibold text-amber-dark uppercase tracking-wide">{plan.outcome}</p>
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
                      ? "bg-amber text-navy-dark hover:bg-amber-dark"
                      : "border border-navy text-navy hover:bg-navy hover:text-white"
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
      <section className="bg-gradient-to-br from-navy-dark via-navy to-navy-dark py-10 md:py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-4">
                <Brain className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-white">AI-Powered</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                AI Business Suite
              </h2>
              <p className="mt-3 text-lg text-white/60 leading-relaxed">
                AI that works while you sleep. Answers customer questions, surfaces revenue insights, and writes your marketing content.
              </p>
              <Link
                href="/services"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber px-7 py-3 font-semibold text-navy-dark hover:bg-amber-dark transition-colors"
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
                <div key={item.title} className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 p-5 text-center">
                  <item.icon className="w-8 h-8 text-white mx-auto mb-3" />
                  <h3 className="font-semibold text-white text-sm">{item.title}</h3>
                  <p className="mt-1 text-xs text-white/50">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Project */}
      <section className="bg-surface-muted py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            badge="Case Study"
            title="From manual text bookings to an automated platform."
            highlight="automated platform"
            description="Mike T Detailing went from texting customers one-by-one to a full booking system with payments, memberships, and a mobile app — live in 3 weeks."
            centered
          />

          <div className="mt-8 max-w-5xl mx-auto">
            <ProjectCard
              title="Mike T Detailing"
              description="Full-stack booking platform with online scheduling, Stripe payments, VIP memberships, referral program, admin dashboard, and a React Native mobile app."
              tags={["Next.js", "React", "TypeScript", "Stripe", "Prisma", "Tailwind CSS", "React Native"]}
              featured
              metrics={[
                { value: "3 weeks", label: "Strategy call to live platform" },
                { value: "24/7", label: "Booking availability for customers" },
                { value: "Stripe", label: "Payments and receipts automated" },
                { value: "iOS + Android", label: "Companion app shipped" },
              ]}
              proofPoints={[
                "5-step booking flow built for fast mobile checkout",
                "VIP memberships and referrals to create repeat revenue",
                "Admin dashboard to run schedule, customers, and payments in one place",
              ]}
              primaryCta={{ label: "Read the Full Story", href: "/portfolio/mike-t-detailing" }}
              secondaryCta={{ label: "Get Your Free Audit", href: "/audit" }}
            />
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-surface py-12 md:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <TestimonialCard
            name="Mike T."
            business="Mike T Detailing"
            quote="Spiffy Tec built our entire booking platform from scratch. Online scheduling, payments, VIP memberships — everything we needed to run our business. The quality is incredible and they delivered fast."
            rating={5}
          />
        </div>
      </section>

      {/* CTA — Audit-led */}
      <section className="bg-navy py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Where is your business leaking revenue?
          </h2>
          <p className="mt-4 text-lg text-white/60">
            15-minute audit. We&apos;ll show you exactly what&apos;s costing you customers — and how to fix it.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 rounded-full bg-amber px-8 py-3.5 font-semibold text-navy-dark hover:bg-amber-dark transition-colors"
            >
              Get Your Free Audit <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="tel:+19842151498"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors font-medium"
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
