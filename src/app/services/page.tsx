import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Hero } from "@/components/Hero";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom websites, SaaS platforms, mobile apps, AI business tools, and SEO services — starting at $149/mo.",
};

const services = [
  {
    title: "Custom Websites",
    price: "$149/mo",
    lead: "Your business deserves more than a template.",
    body: "We design and build professional, mobile-responsive websites optimized for search engines and built to convert visitors into paying customers. Every site is hand-crafted to reflect your brand and serve your goals. $0 setup — just one simple monthly price.",
    features: [
      "Custom design tailored to your brand",
      "Fully mobile responsive",
      "Hosting & SSL included",
      "Basic SEO setup and optimization",
      "Contact forms and lead capture",
      "Monthly edits and updates included",
    ],
  },
  {
    title: "Business Platforms & SaaS",
    price: "$249/mo",
    lead: "Booking systems, dashboards, and tools that run your business.",
    body: "Need more than a website? We build full-featured web applications — booking platforms, customer portals, admin dashboards, and subscription-based SaaS products — tailored to the way your business actually works.",
    features: [
      "Online booking and scheduling",
      "User accounts and authentication",
      "Admin panel and management tools",
      "Stripe payment processing",
      "Email notifications and alerts",
      "Ongoing updates and maintenance",
    ],
  },
  {
    title: "Mobile Apps",
    price: "+$99/mo add-on",
    lead: "Get your business in your customers' pockets.",
    body: "We build cross-platform mobile apps with React Native that look and feel native on both iOS and Android. From push notifications to offline support, your app will be ready for the App Store and Google Play.",
    features: [
      "iOS and Android from a single codebase",
      "Push notifications",
      "Offline support",
      "App Store and Google Play submission",
      "Native performance and feel",
      "Ongoing maintenance included",
    ],
  },
  {
    title: "AI Business Suite",
    price: "+$99/mo add-on",
    lead: "Let AI work for your business 24/7.",
    body: "Our AI-powered tools give your business superpowers. A chatbot that answers customer questions and helps with booking around the clock, an analytics dashboard that predicts revenue and spots trends, and a marketing generator that creates social posts, emails, and review responses in seconds.",
    features: [
      "24/7 AI customer chatbot",
      "Revenue predictions and business insights",
      "Customer churn alerts",
      "Social media post generator",
      "Email campaign creator",
      "Google review response drafts",
    ],
  },
  {
    title: "SEO & Digital Marketing",
    price: "+$149/mo add-on",
    lead: "Show up when customers search for you.",
    body: "We help local businesses dominate search results in their area. From Google Business optimization to keyword strategy and content planning, we make sure the right people find you at the right time.",
    features: [
      "Local SEO optimization",
      "Google Business profile setup and management",
      "Keyword research and strategy",
      "Content strategy and guidance",
      "Monthly performance reports",
      "Competitor analysis",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <Hero
        title="Built to Book, Built to Sell"
        highlight="Sell"
        subtitle="From landing pages to full booking platforms with AI — everything your business needs to grow online."
      />

      {services.map((service, idx) => (
        <section
          key={service.title}
          className={`${idx % 2 === 0 ? "bg-white" : "bg-surface-muted"} py-20 md:py-28 px-4`}
        >
          <div className="max-w-5xl mx-auto grid gap-12 md:grid-cols-2 items-center">
            {/* Text column */}
            <div>
              <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-2">
                Starting at {service.price}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-navy">{service.title}</h2>
              <p className="mt-4 text-lg font-medium text-navy">{service.lead}</p>
              <p className="mt-3 text-gray-600 leading-relaxed">{service.body}</p>

              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary-600 px-7 py-3 font-semibold text-white hover:bg-primary-700 transition-colors"
              >
                Get a Quote <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Feature list column */}
            <ul className="space-y-4">
              {service.features.map((feat) => (
                <li key={feat} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" />
                  <span className="text-gray-700">{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      {/* Bottom CTA */}
      <section className="bg-navy py-20 md:py-28 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Not Sure What You Need?</h2>
          <p className="mt-4 text-lg text-gray-300">
            No problem. Book a free consultation and we&apos;ll help you figure out the best plan
            for your business. No commitment, no pressure.
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
