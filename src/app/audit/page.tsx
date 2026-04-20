import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, Phone, Eye, AlertTriangle, CalendarDays,
  CreditCard, Search, Repeat, CheckCircle, Clock,
} from "lucide-react";
import { Hero } from "@/components/Hero";

export const metadata: Metadata = {
  title: "Free Revenue Leak Audit — Find Out Where You're Losing Customers",
  description:
    "15-minute audit for service businesses. We'll show you exactly where your online presence is costing you leads, bookings, and revenue — and how to fix it.",
};

const auditAreas = [
  {
    icon: Eye,
    title: "Visibility",
    question: "Can customers actually find you?",
    checks: [
      "Do you show up on Google for your services?",
      "Is your Google Business Profile set up and optimized?",
      "Are you visible in the areas you serve?",
    ],
    tone: "blue",
  },
  {
    icon: AlertTriangle,
    title: "First Impression",
    question: "Do visitors trust you in 5 seconds?",
    checks: [
      "Does your site look professional on mobile?",
      "Are reviews, credentials, and proof visible?",
      "Is it clear what you do and who you serve?",
    ],
    tone: "amber",
  },
  {
    icon: CalendarDays,
    title: "Conversion",
    question: "Can visitors actually book or contact you?",
    checks: [
      "Is there a clear call-to-action above the fold?",
      "Can customers book online or request a quote?",
      "Is the contact flow fast on mobile?",
    ],
    tone: "emerald",
  },
  {
    icon: CreditCard,
    title: "Operations",
    question: "Are you still running everything manually?",
    checks: [
      "Do you accept payments online?",
      "Is scheduling automated or text-based?",
      "Do you have a dashboard to manage customers?",
    ],
    tone: "violet",
  },
  {
    icon: Search,
    title: "SEO & Content",
    question: "Is your site working for you 24/7?",
    checks: [
      "Are your pages optimized for local search?",
      "Do you have service-area pages?",
      "Is the site fast and mobile-friendly?",
    ],
    tone: "cyan",
  },
  {
    icon: Repeat,
    title: "Retention",
    question: "Do customers come back?",
    checks: [
      "Do you have a follow-up or reminder system?",
      "Is there a membership or loyalty offer?",
      "Can repeat customers rebook easily?",
    ],
    tone: "red",
  },
];

// Consistent brand styling — all cards use the same navy/amber palette
const cardStyle = {
  border: "border-gray-200",
  bg: "bg-white",
  icon: "text-amber-dark bg-amber-light",
};

export default function AuditPage() {
  return (
    <>
      <Hero
        title="Where is your business leaking revenue?"
        highlight="leaking revenue"
        subtitle="Most service businesses lose leads, bookings, and repeat customers because of gaps they can't see. Our free 15-minute audit shows you exactly what's costing you — and how to fix it."
        primaryCta={{ label: "Book Your Free Audit", href: "/contact" }}
      />

      {/* What We Audit */}
      <section className="bg-surface py-20 md:py-28 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-navy">
              6 areas we check in every audit
            </h2>
            <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
              Each area is a potential revenue leak. We score your business across all six and show you where the biggest opportunities are.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {auditAreas.map((area) => (
                <div key={area.title} className={`rounded-2xl border ${cardStyle.border} ${cardStyle.bg} p-6 card-shadow`}>
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${cardStyle.icon}`}>
                    <area.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-navy text-lg">{area.title}</h3>
                  <p className="mt-1 text-sm font-medium text-gray-700">{area.question}</p>
                  <ul className="mt-4 space-y-2">
                    {area.checks.map((check) => (
                      <li key={check} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                        {check}
                      </li>
                    ))}
                  </ul>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-surface-muted py-20 md:py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-navy text-center mb-14">
            How the audit works
          </h2>

          <div className="space-y-8">
            {[
              {
                step: "1",
                title: "Book a 15-minute call",
                desc: "Tell us about your business and what's not working. No prep needed.",
                icon: Phone,
              },
              {
                step: "2",
                title: "We audit your online presence",
                desc: "We check your website, Google visibility, booking flow, and operations against the 6 areas above.",
                icon: Search,
              },
              {
                step: "3",
                title: "Get your action plan",
                desc: "We walk you through exactly what's costing you leads and what to fix first — with or without us.",
                icon: CheckCircle,
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-navy flex items-center justify-center text-white font-bold text-lg">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold text-navy text-lg">{item.title}</h3>
                  <p className="mt-1 text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="bg-surface py-20 md:py-28 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-navy text-center mb-4">
            Built for service businesses like yours
          </h2>
          <p className="text-center text-gray-500 max-w-2xl mx-auto mb-14">
            The audit works for any business that gets customers through its website — or should be.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { industry: "Auto Detailing", focus: "Online booking with upfront deposits" },
              { industry: "Pressure Washing", focus: "Local SEO and instant quote requests" },
              { industry: "Law Firms", focus: "Consultation funnels that build trust" },
              { industry: "CPAs & Accountants", focus: "Secure client onboarding and document intake" },
              { industry: "Salons & Med Spas", focus: "Frictionless booking and memberships" },
              { industry: "Contractors & Trades", focus: "Project galleries and online quote flow" },
              { industry: "Restaurants & Food", focus: "Mobile-first ordering and reservations" },
              { industry: "Gyms & Fitness", focus: "Class booking and member portals" },
              { industry: "Cleaning Services", focus: "Recurring bookings that grow retention" },
            ].map((item) => (
              <div key={item.industry} className="rounded-xl border border-gray-200 bg-white p-5 card-shadow">
                <h3 className="font-bold text-navy">{item.industry}</h3>
                <p className="mt-1 text-sm text-gray-500">{item.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-20 md:py-28 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Clock className="h-10 w-10 text-amber mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            15 minutes. Zero obligation.
          </h2>
          <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
            We&apos;ll show you where your business is losing leads online — and give you an action plan to fix it. Whether you hire us or not.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-amber px-8 py-3.5 font-semibold text-navy-dark hover:bg-amber-dark transition-colors"
            >
              Book Your Free Audit <ArrowRight className="h-4 w-4" />
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
