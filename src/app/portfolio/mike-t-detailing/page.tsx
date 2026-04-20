import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  MapPin,
  Calendar,
  Code2,
  Smartphone,
  CreditCard,
  Users,
  LayoutDashboard,
  MessageSquare,
} from "lucide-react";
import { Hero } from "@/components/Hero";
import { TechBadge } from "@/components/TechBadge";
import { ServiceSchema } from "@/components/ServiceSchema";

export const metadata: Metadata = {
  title: "Mike T Detailing — Booking Platform Case Study",
  description:
    "How Spiffy Tec built a full booking platform with Stripe payments, VIP memberships, admin dashboard, and a React Native mobile app for Mike T Detailing in Cary, NC.",
  openGraph: {
    title: "Mike T Detailing Case Study — Booking Platform by Spiffy Tec",
    description:
      "Full-stack booking platform replacing phone-only scheduling. Built in 3 weeks.",
    images: ["/og-image.png"],
  },
};

// ─── TODO: replace with real numbers once Abdul sends them ───────────────
// Flag any metrics you can verify; leave others out rather than inventing.
const STATS = [
  { value: "3 weeks", label: "Strategy call → live site" },
  { value: "24/7", label: "Online booking availability" },
  { value: "iOS + Android", label: "Mobile app on both stores" },
  { value: "Stripe", label: "Integrated payments" },
];

const PROBLEMS = [
  "Booking happened exclusively by phone — every missed call was a lost customer.",
  "No online payments meant invoices, Venmo requests, and chasing down clients for money.",
  "No customer records — repeat clients had to re-explain their vehicle and history every time.",
  "Zero recurring revenue — every month started from zero with no membership or VIP tier.",
];

const SOLUTIONS = [
  {
    icon: Calendar,
    title: "5-Step Booking Flow",
    body:
      "Package selection → add-ons → date → address → review. Mobile-optimized. Customers can book in under 2 minutes without ever picking up the phone.",
  },
  {
    icon: CreditCard,
    title: "Stripe Payments + Deposits",
    body:
      "Real payment processing, automated receipts, refunds, and a deposit system for high-ticket services. No more Venmo chasing.",
  },
  {
    icon: Users,
    title: "VIP Memberships + Referrals",
    body:
      "Recurring monthly subscribers get priority booking and discounts. Referral program awards credits for client-get-client growth.",
  },
  {
    icon: LayoutDashboard,
    title: "Admin Dashboard",
    body:
      "See the schedule, manage bookings, handle refunds, track revenue, and review customer history — all from one dashboard on any device.",
  },
  {
    icon: MessageSquare,
    title: "AI Business Assistant",
    body:
      "Claude-powered chatbot trained on Mike T's services, pricing, and FAQs. Handles customer questions 24/7 — even while Mike is on the road detailing.",
  },
  {
    icon: Smartphone,
    title: "iOS + Android Mobile App",
    body:
      "React Native companion app. Push notifications for new bookings. Lets repeat customers rebook their usual service in two taps.",
  },
];

const PLATFORM_WALKTHROUGH = [
  {
    title: "Booking Flow",
    body: "Customers choose a package, stack add-ons, pick a time, enter their address, and pay without needing a callback.",
  },
  {
    title: "Admin Dashboard",
    body: "Schedule, customer records, revenue, and refunds are managed from one control panel instead of a pile of separate tools.",
  },
  {
    title: "Mobile App",
    body: "Repeat customers can rebook faster, while the business gets a stronger premium feel on both app stores.",
  },
  {
    title: "AI Chatbot",
    body: "Questions about pricing, packages, and memberships get answered even while Mike is out on the road detailing.",
  },
];

const BUILD_PROOF = [
  {
    title: "Customer acquisition",
    body: "The site is no longer a brochure. It is the front desk, the booking rep, and the payment checkpoint.",
  },
  {
    title: "Operational control",
    body: "Scheduling, receipts, refunds, and customer history now live inside one system the owner can actually run day to day.",
  },
  {
    title: "Retention and repeat revenue",
    body: "VIP memberships, referrals, and mobile rebooking turn one-off detailing jobs into something much stickier.",
  },
];

const TECH_STACK = [
  "Next.js",
  "React",
  "React Native",
  "TypeScript",
  "Tailwind CSS",
  "Prisma",
  "PostgreSQL",
  "Stripe",
  "NextAuth",
  "Claude AI",
  "Twilio",
  "Vercel",
];

export default function MikeTCaseStudyPage() {
  return (
    <>
      <ServiceSchema
        name="Booking Platform Websites for Service Businesses"
        description="Custom booking platforms with Stripe payments, admin dashboard, VIP memberships, and mobile app."
        priceRange="$249-$599/mo"
        url="https://spiffytec.com/portfolio/mike-t-detailing"
        serviceType="Web Development"
      />

      <Hero
        badge="Featured Case Study"
        title="Mike T Detailing — A Full Booking Platform"
        highlight="Full Booking Platform"
        subtitle="From phone-only scheduling to a 24/7 booking platform with Stripe payments, VIP memberships, admin dashboard, and a mobile app on both app stores."
      />

      {/* Client summary strip */}
      <section className="bg-surface pt-4 pb-12 px-4">
        <div className="max-w-5xl mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-4 text-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-dark">
              Client
            </p>
            <p className="mt-1 font-bold text-navy">Mike T Detailing</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-dark">
              Industry
            </p>
            <p className="mt-1 font-bold text-navy">Mobile Auto Detailing</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-dark">
              Location
            </p>
            <p className="mt-1 font-bold text-navy inline-flex items-center gap-1">
              <MapPin className="h-4 w-4" /> Cary, NC
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-dark">
              Tier
            </p>
            <p className="mt-1 font-bold text-navy">Premium + Mobile App</p>
          </div>
        </div>
      </section>

      {/* Key stats */}
      <section className="bg-surface-muted py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl bg-white p-6 text-center card-shadow"
            >
              <p className="text-3xl md:text-4xl font-bold text-navy">
                {s.value}
              </p>
              <p className="mt-2 text-sm text-text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* The Problem */}
      <section className="bg-surface py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber-dark">
            The Problem
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-navy">
            A growing detailing business trapped by phone-only booking.
          </h2>
          <p className="mt-6 text-lg text-text-muted leading-relaxed">
            Mike T runs a mobile auto detailing business in Cary, NC. Demand
            was growing, but the business was stuck — every new customer had
            to call, leave a voicemail, wait for a call back, and play phone
            tag to confirm an appointment. High-intent buyers were bouncing
            the moment they hit a disconnected phone line.
          </p>
          <ul className="mt-8 space-y-3">
            {PROBLEMS.map((p) => (
              <li key={p} className="flex gap-3 text-text-muted">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber shrink-0" />
                <span className="leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Platform Walkthrough */}
      <section className="bg-surface-muted py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber-dark text-center">
            The Platform
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-navy text-center">
            Built for how mobile service businesses actually operate.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {PLATFORM_WALKTHROUGH.map((module) => (
              <div
                key={module.title}
                className="rounded-[2rem] bg-gradient-to-br from-navy-dark via-navy to-navy-light p-7 text-white card-shadow"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber">
                  Module
                </p>
                <h3 className="mt-4 text-2xl font-bold tracking-tight text-white">
                  {module.title}
                </h3>
                <p className="mt-4 leading-relaxed text-white/75">
                  {module.body}
                </p>
                <div className="mt-8 rounded-2xl border border-white/10 bg-white/8 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                    Why it matters
                  </p>
                  <p className="mt-2 text-sm text-white/80">
                    Each module removes a real piece of friction from booking, paying, communicating,
                    or coming back.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Solution — feature cards */}
      <section className="bg-surface py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber-dark">
            The Solution
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-navy">
            A full-stack platform — not just a website.
          </h2>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SOLUTIONS.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl bg-white border border-gray-100 p-6 card-shadow"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ice-muted text-navy">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-bold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm text-text-muted leading-relaxed">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="bg-surface-muted py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber-dark inline-flex items-center gap-2">
            <Code2 className="h-4 w-4" /> Technology Stack
          </p>
          <h2 className="mt-2 text-2xl md:text-3xl font-bold text-navy">
            Enterprise-grade tools. Startup-speed delivery.
          </h2>
          <p className="mt-4 text-text-muted">
            The same stack we use for every platform client — battle-tested,
            scalable, and fully maintained.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {TECH_STACK.map((t) => (
              <TechBadge key={t} name={t} />
            ))}
          </div>
        </div>
      </section>

      {/* Build Proof */}
      <section className="bg-navy py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber">
            What This Build Proves
          </p>
          <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">
            A local service business does not need “more marketing.”
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-white/70">
            It needs a sharper system. This project proves what happens when booking, payments,
            follow-up, and retention all live inside one coherent platform.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {BUILD_PROOF.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-sm"
              >
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results summary */}
      <section className="bg-surface py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-wider text-amber-dark">
            The Outcome
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-navy">
            From phone calls to a real business system.
          </h2>
          <ul className="mt-8 space-y-4">
            {[
              "Customers book, pay, and rebook without Mike ever touching a phone.",
              "Stripe handles payments and receipts automatically — no more invoicing.",
              "VIP and referral programs turn one-time customers into repeat revenue.",
              "The admin dashboard replaces three different tools (calendar, spreadsheet, invoicing).",
              "Mobile app launched on both iOS and Android app stores for brand presence.",
            ].map((r) => (
              <li key={r} className="flex gap-3 text-text-muted">
                <Check className="h-5 w-5 text-success mt-0.5 shrink-0" />
                <span className="leading-relaxed">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-20 md:py-28 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Want a platform like this for your business?
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Booking, payments, admin dashboard, and a mobile app — live in 2-3
            weeks from signed contract.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact?ref=mike-t-case-study"
              className="inline-flex items-center gap-2 rounded-full bg-amber px-8 py-3.5 font-semibold text-navy-dark hover:bg-amber-dark transition-colors"
            >
              Book a Strategy Call <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 text-white px-8 py-3.5 font-semibold hover:bg-white/10 transition-colors"
            >
              See Pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
