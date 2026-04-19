import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone, ClipboardList, Code2, Rocket, Headphones } from "lucide-react";
import { Hero } from "@/components/Hero";

export const metadata: Metadata = {
  title: "Our 5-Step Process — From Strategy Call to Launch in 2 Weeks",
  description:
    "How Spiffy Tec builds your website: strategy call, discovery, design, build, launch. 2-3 weeks from signed contract to live site.",
};

const steps = [
  {
    number: 1,
    icon: Phone,
    title: "Book a Free Call",
    description:
      "Schedule a 15-minute discovery call. We learn about your business, your goals, and what you need. No pressure, no sales pitch — just a conversation about how we can help.",
    detail: "We'll ask about your services, target customers, competitors, and what's not working with your current online presence.",
  },
  {
    number: 2,
    icon: ClipboardList,
    title: "Complete the Onboarding Form",
    description:
      "Fill out a quick form with your business info, branding, photos, and service details. Takes about 5 minutes. No back-and-forth emails — everything we need in one place.",
    detail: "Upload your logo, choose your colors, list your services and pricing, and share any inspiration sites you love.",
  },
  {
    number: 3,
    icon: Code2,
    title: "We Design & Build",
    description:
      "Our team builds your website in 1-3 weeks depending on your plan. You get a private preview link to review before anything goes live.",
    detail: "Starter sites launch in 1-2 weeks. Business sites take 2-3 weeks. Platform platforms take 3-4 weeks.",
  },
  {
    number: 4,
    icon: Rocket,
    title: "Launch Day",
    description:
      "We connect your domain, set up SSL, and push your site live. You start getting customers from day one. We handle all the technical details.",
    detail: "We also set up Google Analytics, submit your sitemap to search engines, and verify everything works perfectly on mobile.",
  },
  {
    number: 5,
    icon: Headphones,
    title: "Ongoing Support",
    description:
      "We don't build and walk away. Hosting, maintenance, edits, and support are included every month. Your site keeps growing with your business.",
    detail: "Monthly edits, security updates, performance monitoring, and a team that picks up the phone when you need us.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Hero
        title="Simple Process, Stunning Results"
        highlight="Stunning Results"
        subtitle="From first call to live website in as little as 2 weeks. Here's exactly how it works."
      />

      {/* Steps */}
      <section className="bg-surface py-20 md:py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-16 md:space-y-24">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className={`flex flex-col md:flex-row items-start gap-8 md:gap-12 ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Number + Icon */}
                <div className="shrink-0 flex flex-col items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-navy text-white text-2xl font-bold shadow-lg">
                    {step.number}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="hidden md:block w-px h-24 bg-gradient-to-b from-border to-transparent mt-4" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <step.icon className="h-5 w-5 text-amber-dark" />
                    <h3 className="text-xl md:text-2xl font-bold text-navy">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {step.description}
                  </p>
                  <p className="mt-3 text-sm text-gray-500 bg-surface-muted rounded-xl px-4 py-3">
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-surface-muted py-16 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {[
            { stat: "$100", label: "Starting Down Payment", sub: "Domain & email included" },
            { stat: "2 Weeks", label: "Average Launch Time", sub: "From onboarding to live" },
            { stat: "12 Months", label: "Partnership", sub: "Then month-to-month" },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl bg-white p-6 card-shadow">
              <p className="text-3xl font-bold gradient-text">{item.stat}</p>
              <p className="mt-1 font-semibold text-navy">{item.label}</p>
              <p className="mt-1 text-sm text-gray-500">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-20 md:py-28 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to Get Started?</h2>
          <p className="mt-4 text-lg text-ice/60">
            Book a free 15-minute call. No commitment, no pressure.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-amber px-8 py-3.5 font-semibold text-navy-dark hover:bg-amber-dark transition-colors"
            >
              Book Your Free Call <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 px-8 py-3.5 font-semibold text-white hover:bg-white/10 transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
