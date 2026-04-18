import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Hero } from "@/components/Hero";
import { TechBadge } from "@/components/TechBadge";

export const metadata: Metadata = {
  title: "Client Work — Web Design & Booking Platforms",
  description:
    "See the websites, booking platforms, and mobile apps Spiffy Tec has built for service businesses in the Raleigh-Durham Triangle.",
};

const projects = [
  {
    name: "Mike T Detailing",
    label: "Featured Project",
    description:
      "Full-stack booking platform with online scheduling, Stripe payments, VIP memberships, referral program, admin dashboard, and a React Native mobile app.",
    challenge:
      "Mike T Detailing needed a complete online presence — booking, payments, customer management — to replace phone-only scheduling that was costing them leads every day.",
    solution:
      "We built a full-stack Next.js platform with a 5-step booking flow, Stripe payment processing, VIP memberships, a referral program, an admin dashboard, and a React Native mobile app.",
    results:
      "Online bookings replaced phone calls, automated payments eliminated invoicing headaches, VIP subscriptions created recurring revenue, and a mobile app launched on both app stores.",
    tech: ["Next.js", "React", "React Native", "TypeScript", "Tailwind CSS", "Stripe", "Prisma"],
    features: ["Online Booking", "Stripe Payments", "VIP Memberships", "Referral System", "Admin Dashboard", "Mobile App"],
    featured: true,
  },
  {
    name: "ProspectIQ",
    label: "SaaS Platform",
    description:
      "Lead intelligence platform that crawls websites, analyzes 16 dimensions, and scores prospects with AI to help sales teams find their best opportunities.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Stripe", "Claude API", "Crawlee"],
    features: ["16 Website Analyzers", "AI Lead Scoring", "Multi-Source Discovery", "Stripe Billing", "Smart Deduplication"],
  },
  {
    name: "Booking Template",
    label: "White-Label Platform",
    description:
      "Reusable booking platform for service businesses — fork and configure via environment variables for instant deployment. Zero code changes needed.",
    tech: ["Next.js", "TypeScript", "Prisma", "Stripe", "NextAuth", "Claude API", "Tailwind CSS"],
    features: ["White-Label Config", "Booking Flow", "VIP & Referral System", "AI Business Suite", "162 Tests"],
  },
  {
    name: "Client Portal",
    label: "Internal Tool",
    description:
      "Sales intake and site generator — sales team creates shareable forms, clients complete a 7-step wizard, and the system auto-generates starter websites.",
    tech: ["Next.js", "TypeScript", "Prisma", "NextAuth", "Zod", "Tailwind CSS"],
    features: ["7-Step Intake Wizard", "Shareable Form Links", "Auto Site Generation", "Industry Presets", "Pipeline Tracking"],
  },
  {
    name: "ValueAti",
    label: "Education Platform",
    description:
      "Coding interview prep platform with 40+ algorithm problems, step-by-step breakdowns, and solutions in Python, JavaScript, and Java across 22 categories.",
    tech: ["Express", "Node.js", "EJS", "MongoDB", "Firebase"],
    features: ["40+ Problems", "22 Categories", "3 Languages", "Step-by-Step Breakdowns", "Category Navigation"],
  },
];

export default function PortfolioPage() {
  const featured = projects[0];
  const others = projects.slice(1);

  return (
    <>
      <Hero
        title="Real Projects. Real Revenue."
        highlight="Revenue"
        subtitle="Real projects, real results. Here's what we've built."
      />

      {/* Featured Project — Mike T Detailing */}
      <section className="bg-surface py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-semibold text-amber-dark uppercase tracking-wider text-center">
            {featured.label}
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-navy text-center">
            {featured.name}
          </h2>

          {/* Image placeholder */}
          <div className="mt-10 h-72 md:h-96 rounded-2xl bg-gradient-to-br from-navy-dark via-navy to-navy-light flex items-center justify-center">
            <span className="text-ice/50 text-lg font-medium">Project Screenshot</span>
          </div>

          {/* Challenge / Solution / Results */}
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            <div>
              <h3 className="text-lg font-bold text-navy">The Challenge</h3>
              <p className="mt-3 text-text-muted leading-relaxed">{featured.challenge}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-navy">Our Solution</h3>
              <p className="mt-3 text-text-muted leading-relaxed">{featured.solution}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-navy">The Results</h3>
              <p className="mt-3 text-text-muted leading-relaxed">{featured.results}</p>
            </div>
          </div>

          {/* Tech stack */}
          <div className="mt-10">
            <h3 className="text-lg font-bold text-navy text-center">Tech Stack</h3>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              {featured.tech.map((tech) => (
                <TechBadge key={tech} name={tech} />
              ))}
            </div>
          </div>

          {/* Key features */}
          <div className="mt-10">
            <h3 className="text-lg font-bold text-navy text-center">Key Features</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 max-w-3xl mx-auto">
              {featured.features.map((feat) => (
                <div key={feat} className="flex items-center gap-3">
                  <Check className="h-5 w-5 shrink-0 text-success" />
                  <span className="text-text font-medium">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Read full case study CTA */}
          <div className="mt-12 text-center">
            <Link
              href="/portfolio/mike-t-detailing"
              className="inline-flex items-center gap-2 rounded-full bg-navy text-white px-8 py-3.5 font-semibold hover:bg-navy-light transition-colors"
            >
              Read the Full Case Study <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Other Projects */}
      <section className="bg-surface-muted py-16 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-navy text-center mb-10">
            More Projects
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {others.map((project) => (
              <div key={project.name} className="bg-white rounded-2xl card-shadow p-6 flex flex-col">
                <span className="text-xs font-semibold text-amber-dark uppercase tracking-wider mb-2">
                  {project.label}
                </span>
                <h3 className="text-xl font-bold text-navy mb-2">{project.name}</h3>
                <p className="text-text-muted text-sm leading-relaxed mb-5 flex-1">
                  {project.description}
                </p>

                <ul className="space-y-2 mb-5">
                  {project.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 shrink-0 text-success" />
                      <span className="text-text">{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <TechBadge key={tech} name={tech} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-16 md:py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Want Results Like These?</h2>
          <p className="mt-4 text-lg text-ice/60">
            Let&apos;s talk about your project. Every engagement starts with a free consultation.
          </p>
          <Link
            href="/contact"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-amber px-8 py-3.5 font-semibold text-navy-dark hover:bg-amber-dark transition-colors"
          >
            Book Your Free Strategy Call <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
