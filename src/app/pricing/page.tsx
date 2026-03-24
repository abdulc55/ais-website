"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Smartphone, Search, Brain, Zap } from "lucide-react";
import { Hero } from "@/components/Hero";
import { PricingCard } from "@/components/PricingCard";

const addOns = [
  { icon: Brain, name: "AI Business Suite", price: "+$99/mo", note: "Analytics, chatbot & marketing AI" },
  { icon: Smartphone, name: "Mobile App", price: "+$99/mo", note: "iOS & Android" },
  { icon: Search, name: "SEO Package", price: "+$149/mo", note: "Ongoing optimization" },
  { icon: Zap, name: "Rush Delivery", price: "+50%", note: "First month only" },
];

const faqs = [
  {
    q: "Why monthly instead of a big upfront cost?",
    a: "We believe in removing barriers. Your monthly fee covers hosting, maintenance, security updates, and ongoing edits — everything you need to keep your site running perfectly. Starter plans have $0 setup, so you can get online with zero upfront investment.",
  },
  {
    q: "Is there a commitment period?",
    a: "All plans include a 12-month partnership. This ensures we can invest the time to build your site right and provide ongoing support. After 12 months, you can switch to month-to-month anytime. We keep your business because we earn it.",
  },
  {
    q: "Do you offer annual billing?",
    a: "Yes! Pay annually and save 2 months. For example, Starter is $1,490/year instead of $1,788 — that's like getting 2 months free. Annual billing is available for all tiers.",
  },
  {
    q: "What happens if I cancel?",
    a: "After your 12-month commitment, you can cancel with 30 days notice. Your site goes offline at the end of your billing period. We'll provide a full export of your content so you own everything. There are no cancellation fees.",
  },
  {
    q: "Do you offer payment plans for setup fees?",
    a: "Yes — we can split setup fees across your first 3 months to make it easier. Just let us know during your strategy call and we'll work something out.",
  },
  {
    q: "How long does it take to launch?",
    a: "Most websites launch in 2-3 weeks. Larger platforms with booking systems, payments, or custom features take 4-6 weeks. We'll give you a clear timeline before we start.",
  },
  {
    q: "What is the AI Business Suite?",
    a: "It's a set of AI-powered tools built into your website: a 24/7 customer chatbot that answers questions and helps with booking, a business analytics dashboard with revenue predictions and customer insights, and a marketing generator for social media posts, email campaigns, and review responses.",
  },
  {
    q: "Can I upgrade or downgrade my plan?",
    a: "Absolutely. Upgrade anytime and the new features are added within a few days. Downgrade at the end of any billing cycle. We build every project with scalability in mind.",
  },
  {
    q: "What's included in the monthly edits?",
    a: "Small changes like updating text, swapping images, adding new content sections, or tweaking layouts. Starter includes 1 hour/month, Business includes 2 hours/month, and Premium includes unlimited edits.",
  },
  {
    q: "Do you work with clients outside the US?",
    a: "Yes. We work with clients worldwide. Everything is handled digitally with regular video check-ins, no matter where you are.",
  },
  {
    q: "What about revenue share?",
    a: "For platform clients (Business, Growth, Premium) with payment processing built in, we offer a revenue-aligned model: 0% on your first $5,000/mo in bookings, 2% on $5,001–$15,000, and 3% above $15,000. We only earn more when you earn more — our incentives are aligned with your growth.",
  },
];

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");

  return (
    <>
      <Hero
        title="Transparent Pricing, Real Value"
        highlight="Real Value"
        subtitle="One monthly price that covers everything — design, development, hosting, support, and updates. Starter plans start at $0 setup."
      />

      {/* Billing Toggle */}
      <section className="bg-white pt-20 md:pt-28 px-4">
        <div className="max-w-7xl mx-auto flex justify-center">
          <div className="inline-flex items-center bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                billingPeriod === "monthly"
                  ? "bg-white text-navy shadow-sm"
                  : "text-gray-500 hover:text-navy"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod("annual")}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
                billingPeriod === "annual"
                  ? "bg-white text-navy shadow-sm"
                  : "text-gray-500 hover:text-navy"
              }`}
            >
              Annual
              <span className="text-xs font-bold text-green-600 bg-green-50 border border-green-200 rounded-full px-2 py-0.5">
                Save 2 Months
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="bg-white py-16 md:py-20 px-4">
        <div className="max-w-7xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 items-stretch">
          <PricingCard
            name="Starter"
            price="$149"
            annualPrice="$124"
            annualSavings="$298"
            period="/mo"
            setupFee="$0 setup fee"
            description="Perfect for small businesses getting online for the first time."
            features={[
              "3-5 page website",
              "Mobile responsive design",
              "Hosting & SSL included",
              "Basic SEO setup",
              "Contact form",
              "1 hour/mo of edits",
              "Email support",
            ]}
            cta="Book Your Free Strategy Call"
            href="/contact"
            billingPeriod={billingPeriod}
          />
          <PricingCard
            name="Business"
            price="$249"
            annualPrice="$208"
            annualSavings="$498"
            period="/mo"
            setupFee="$999 one-time setup"
            description="For businesses ready to grow with online booking and analytics."
            features={[
              "5-10 page website",
              "Custom design",
              "Booking / scheduling system",
              "CMS integration",
              "Google Analytics setup",
              "2 hours/mo of edits",
              "Priority email support",
            ]}
            cta="Book Your Free Strategy Call"
            href="/contact"
            popular
            billingPeriod={billingPeriod}
          />
          <PricingCard
            name="Growth"
            price="$399"
            annualPrice="$333"
            annualSavings="$798"
            period="/mo"
            setupFee="$1,999 one-time setup"
            description="Full-featured platforms with payments, accounts, and admin tools."
            features={[
              "Custom UI/UX design",
              "Online payments (Stripe)",
              "User accounts & login",
              "Admin dashboard",
              "Automated email notifications",
              "Priority support",
            ]}
            cta="Book Your Free Strategy Call"
            href="/contact"
            billingPeriod={billingPeriod}
          />
          <PricingCard
            name="Premium"
            price="$599"
            annualPrice="$499"
            annualSavings="$1,198"
            period="/mo"
            setupFee="$3,999 one-time setup"
            description="The complete package — website, app, SEO, and unlimited support."
            features={[
              "Everything in Growth",
              "Mobile app (iOS & Android)",
              "SEO & content strategy",
              "VIP / membership system",
              "Unlimited monthly edits",
              "Dedicated support line",
            ]}
            cta="Book Your Free Strategy Call"
            href="/contact"
            billingPeriod={billingPeriod}
          />
        </div>

        {/* 12-month commitment note */}
        <p className="text-center text-sm text-gray-500 mt-8 max-w-2xl mx-auto">
          All plans include a 12-month partnership. Setup fees cover custom design, development, and launch.
          After 12 months, switch to month-to-month anytime.
        </p>
      </section>

      {/* Add-ons */}
      <section className="bg-surface-muted py-20 md:py-28 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-navy text-center">Add-Ons</h2>
          <p className="mt-3 text-gray-600 text-center">
            Supercharge any plan with these optional services.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {addOns.map((addon) => (
              <div
                key={addon.name}
                className="rounded-2xl bg-white border border-gray-100 p-6 text-center card-shadow"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <addon.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-navy">{addon.name}</h3>
                <p className="mt-1 text-xl font-bold text-primary-600">{addon.price}</p>
                <p className="mt-1 text-sm text-gray-500">{addon.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Revenue Share */}
      <section className="bg-white py-20 md:py-28 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-navy">
            We Grow When You Grow
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            For platform clients with payment processing, we offer a revenue-aligned model.
            We only earn more when your business earns more — our incentives are aligned with your success.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { range: "$0 – $5,000/mo", rate: "0%", note: "Included in your plan" },
              { range: "$5,001 – $15,000/mo", rate: "2%", note: "On amount over $5K" },
              { range: "$15,001+/mo", rate: "3%", note: "On amount over $15K" },
            ].map((tier) => (
              <div key={tier.range} className="rounded-2xl border border-gray-200 p-6">
                <p className="text-sm text-gray-500">{tier.range}</p>
                <p className="text-3xl font-bold text-navy mt-1">{tier.rate}</p>
                <p className="text-xs text-gray-400 mt-1">{tier.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface-muted py-20 md:py-28 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-navy text-center">
            Frequently Asked Questions
          </h2>

          <div className="mt-12 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-2xl border border-gray-200 bg-white overflow-hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 font-semibold text-navy hover:bg-gray-50 transition-colors [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span className="shrink-0 text-gray-400 transition-transform group-open:rotate-180">
                    &#9662;
                  </span>
                </summary>
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-20 md:py-28 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Not Sure Which Plan Fits?</h2>
          <p className="mt-4 text-lg text-gray-300">
            Book a free strategy call and we&apos;ll recommend the right plan for your business. No pressure.
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
