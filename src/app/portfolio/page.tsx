import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Hero } from "@/components/Hero";
import { TechBadge } from "@/components/TechBadge";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "See the websites, platforms, and mobile apps we've built for businesses in the Raleigh-Durham Triangle.",
};

const techStack = [
  "Next.js",
  "React",
  "React Native",
  "TypeScript",
  "Tailwind CSS",
  "Stripe",
  "Prisma",
];

const keyFeatures = [
  "Online Booking",
  "Stripe Payments",
  "VIP Memberships",
  "Referral System",
  "Admin Dashboard",
  "Mobile App",
];

export default function PortfolioPage() {
  return (
    <>
      <Hero
        title="Real Projects. Real Revenue."
        highlight="Revenue"
        subtitle="Real projects, real results. Here's what we've built for our clients."
      />

      {/* Featured Project — Mike T Detailing */}
      <section className="bg-white py-20 md:py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider text-center">
            Featured Project
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-navy text-center">
            Mike T Detailing
          </h2>

          {/* Image placeholder */}
          <div className="mt-12 h-72 md:h-96 rounded-2xl bg-gradient-to-br from-primary-600 via-cyan-500 to-primary-800 flex items-center justify-center">
            <span className="text-white/70 text-lg font-medium">Project Screenshot</span>
          </div>

          {/* Challenge / Solution / Results */}
          <div className="mt-16 grid gap-12 md:grid-cols-3">
            <div>
              <h3 className="text-lg font-bold text-navy">The Challenge</h3>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Mike T Detailing needed a complete online presence — booking, payments, customer
                management — to replace phone-only scheduling that was costing them leads every day.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-navy">Our Solution</h3>
              <p className="mt-3 text-gray-600 leading-relaxed">
                We built a full-stack Next.js platform with a 5-step booking flow, Stripe payment
                processing, VIP memberships, a referral program, an admin dashboard, and a React
                Native mobile app.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-navy">The Results</h3>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Online bookings replaced phone calls, automated payments eliminated invoicing
                headaches, VIP subscriptions created recurring revenue, and a mobile app launched on
                both app stores.
              </p>
            </div>
          </div>

          {/* Tech stack */}
          <div className="mt-14">
            <h3 className="text-lg font-bold text-navy text-center">Tech Stack</h3>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              {techStack.map((tech) => (
                <TechBadge key={tech} name={tech} />
              ))}
            </div>
          </div>

          {/* Key features */}
          <div className="mt-14">
            <h3 className="text-lg font-bold text-navy text-center">Key Features</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 max-w-3xl mx-auto">
              {keyFeatures.map((feat) => (
                <div key={feat} className="flex items-center gap-3">
                  <Check className="h-5 w-5 shrink-0 text-primary-600" />
                  <span className="text-gray-700 font-medium">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* More Projects Coming Soon */}
      <section className="bg-surface-muted py-20 md:py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-navy text-center">
            Currently Accepting 3 New Clients
          </h2>
          <p className="mt-3 text-gray-600 text-center max-w-2xl mx-auto">
            We keep our client roster small so every project gets our full attention.
          </p>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white/50 p-12 text-center"
              >
                <div className="h-12 w-12 rounded-xl bg-gray-100 mb-4" />
                <p className="text-gray-400 font-semibold">Your Business Could Be Next</p>
                <p className="mt-2 text-sm text-gray-400">Book a free strategy call to get started.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-20 md:py-28 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Want Results Like These?</h2>
          <p className="mt-4 text-lg text-gray-300">
            Let&apos;s talk about your project. Every engagement starts with a free consultation.
          </p>
          <Link
            href="/contact"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-amber-500 px-8 py-3.5 font-semibold text-navy hover:bg-amber-400 transition-colors"
          >
            Book Your Free Strategy Call <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
