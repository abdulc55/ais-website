import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Check,
  Code2,
  Globe,
  Layers3,
  Search,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Web Development, Booking Platforms & AI Tools",
  description:
    "Custom websites, booking platforms, mobile apps, and AI tools for Raleigh-Durham service businesses. Live in 2-3 weeks, plans from $149/mo.",
};

interface Service {
  id: string;
  title: string;
  price: string;
  lead: string;
  body: string;
  fit: string;
  features: string[];
  icon: LucideIcon;
}

const coreServices: Service[] = [
  {
    id: "websites",
    title: "Custom Websites",
    price: "$99/mo",
    lead: "Designed from scratch. Built to convert.",
    body: "Mobile-responsive, search-optimized websites crafted to reflect your brand and turn visitors into customers. No templates. No page builders. Real code.",
    fit: "Best for businesses that need a sharp first impression, lead capture, and a site they can confidently send people to.",
    features: [
      "Custom design tailored to your brand",
      "Fully mobile responsive",
      "Hosting & SSL included",
      "Basic SEO setup and optimization",
      "Contact forms and lead capture",
      "Monthly edits and updates included",
    ],
    icon: Globe,
  },
  {
    id: "saas",
    title: "Business Platforms & SaaS",
    price: "$149/mo",
    lead: "Booking systems, dashboards, and tools that run your business.",
    body: "Need more than a website? We build full-featured web applications — booking platforms, customer portals, admin dashboards, and subscription-based SaaS products — tailored to the way your business actually works.",
    fit: "Best for businesses ready to automate bookings, logins, payments, customer history, and backend operations in one place.",
    features: [
      "Online booking and scheduling",
      "User accounts and authentication",
      "Admin panel and management tools",
      "Stripe payment processing",
      "Email notifications and alerts",
      "Ongoing updates and maintenance",
    ],
    icon: Layers3,
  },
];

const growthAddOns: Service[] = [
  {
    id: "mobile",
    title: "Mobile Apps",
    price: "+$99/mo add-on",
    lead: "Get your business in your customers' pockets.",
    body: "We build cross-platform mobile apps with React Native that look and feel native on both iOS and Android. From push notifications to offline support, your app is ready for the App Store and Google Play.",
    fit: "Best for brands with repeat buyers, field teams, or customers who rebook often.",
    features: [
      "iOS and Android from a single codebase",
      "Push notifications",
      "Offline support",
      "App Store and Google Play submission",
      "Native performance and feel",
      "Ongoing maintenance included",
    ],
    icon: Smartphone,
  },
  {
    id: "ai",
    title: "AI Business Suite",
    price: "+$99/mo add-on",
    lead: "Intelligence, built in.",
    body: "AI tools that answer customers, surface insights, and write your marketing — a chatbot for 24/7 support, an analytics dashboard that predicts revenue, and a content generator for social posts, emails, and review responses.",
    fit: "Best for businesses that want faster follow-up, smarter insights, and always-on customer support.",
    features: [
      "24/7 AI customer chatbot",
      "Revenue predictions and business insights",
      "Customer churn alerts",
      "Social media post generator",
      "Email campaign creator",
      "Google review response drafts",
    ],
    icon: Brain,
  },
  {
    id: "seo",
    title: "SEO & Digital Marketing",
    price: "+$149/mo add-on",
    lead: "Show up when customers search for you.",
    body: "We help local businesses dominate search results in their area. From Google Business optimization to keyword strategy and content planning, we make sure the right people find you at the right time.",
    fit: "Best for businesses that already have a site or platform and want more qualified traffic every month.",
    features: [
      "Local SEO optimization",
      "Google Business profile setup and management",
      "Keyword research and strategy",
      "Content strategy and guidance",
      "Monthly performance reports",
      "Competitor analysis",
    ],
    icon: Search,
  },
];

export default function ServicesPage() {
  return (
    <>
      <Hero
        title="Built to book, sell, and run smoother."
        highlight="run smoother"
        subtitle="We build the digital layer your business actually needs: a strong site, a real booking or payment workflow, and the systems that keep customers coming back."
        supportingPoints={[
          "Plans from $149/mo",
          "Launch in 2-3 weeks",
          "Web, mobile, and AI in one shop",
        ]}
      />

      <section className="bg-surface px-4 pt-10 pb-16 md:pt-14 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            badge="Choose Your Layer"
            title="Start with the piece that unlocks revenue first."
            highlight="unlocks revenue"
            description="Most clients do not need everything on day one. We help you pick the smallest build that gets the business moving, then add layers as the demand justifies it."
            centered
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Globe,
                title: "Sharpen the front door",
                body: "A polished site for trust, lead capture, and better first impressions.",
              },
              {
                icon: Code2,
                title: "Systemize the backend",
                body: "Booking, payments, dashboards, and account flows that reduce manual work.",
              },
              {
                icon: Brain,
                title: "Layer on growth",
                body: "Mobile, AI, and SEO when you want more retention, better follow-up, and more demand.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl bg-white p-6 card-shadow">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-light text-amber-dark">
                  <item.icon className="h-6 w-6" />
                </div>
                <h2 className="mt-5 text-xl font-bold text-navy">{item.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-muted px-4 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            badge="Core Builds"
            title="The revenue-generating foundation."
            highlight="revenue-generating"
            description="These are the two core offers most clients start with: a site that sells or a platform that runs the business."
            centered={false}
          />

          <div className="mt-12 space-y-8">
            {coreServices.map((service, index) => (
              <article
                key={service.id}
                id={service.id}
                className="grid overflow-hidden rounded-[2rem] bg-white card-shadow md:grid-cols-2"
              >
                <div
                  className={cn(
                    "p-8 md:p-10",
                    index % 2 === 1 && "md:order-2"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ice-muted text-navy">
                      <service.icon className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-amber-dark">
                      Starting at {service.price}
                    </p>
                  </div>

                  <h2 className="mt-6 text-3xl font-bold tracking-tight text-navy md:text-4xl">
                    {service.title}
                  </h2>
                  <p className="mt-4 text-lg font-medium text-navy">{service.lead}</p>
                  <p className="mt-4 leading-relaxed text-text-muted">{service.body}</p>

                  <div className="mt-6 rounded-2xl bg-surface-muted p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-dark">
                      Best fit
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">{service.fit}</p>
                  </div>

                  <Link
                    href="/contact"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3 font-semibold text-white transition-colors hover:bg-navy-light"
                  >
                    Talk Through This Option <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div
                  className={cn(
                    "bg-gradient-to-br from-navy-dark via-navy to-navy-light p-8 md:p-10 text-white",
                    index % 2 === 1 && "md:order-1"
                  )}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber">
                    Included
                  </p>
                  <ul className="mt-6 space-y-4">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-amber" />
                        <span className="leading-relaxed text-white/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface px-4 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            badge="Platform Add-Ons"
            title="Layer in retention, reach, and automation."
            highlight="retention, reach, and automation"
            description="Once the core site or platform is doing its job, these are the upgrades that compound value."
            centered
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {growthAddOns.map((service) => (
              <article
                key={service.id}
                id={service.id}
                className="rounded-[2rem] bg-white p-7 card-shadow"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-light text-amber-dark">
                  <service.icon className="h-6 w-6" />
                </div>

                <p className="mt-5 text-sm font-semibold uppercase tracking-wider text-amber-dark">
                  {service.price}
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-navy">
                  {service.title}
                </h2>
                <p className="mt-3 text-base font-medium text-navy">{service.lead}</p>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">{service.body}</p>

                <div className="mt-5 rounded-2xl bg-surface-muted p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-dark">
                    Best fit
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">{service.fit}</p>
                </div>

                <ul className="mt-6 space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span className="text-text-muted">{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy px-4 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Not sure which layer fits your business?
          </h2>
          <p className="mt-4 text-lg text-white/65">
            We&apos;ll look at where leads are slipping through right now and recommend the smallest
            system that fixes the real bottleneck.
          </p>
          <Link
            href="/contact"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-amber px-8 py-3.5 font-semibold text-navy-dark transition-colors hover:bg-amber-dark"
          >
            Book a Strategy Call <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
