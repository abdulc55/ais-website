import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import { TechBadge } from "@/components/TechBadge";

export const metadata: Metadata = {
  title: "Client Work — Web Design & Booking Platforms",
  description:
    "See the websites, booking platforms, and mobile apps Spiffy Tec has built — full case studies and live projects.",
};

const projects = [
  {
    name: "Valueati",
    label: "Featured Project",
    href: "https://valueati.com",
    description:
      "A coding-education platform built end-to-end — auth, curriculum engine, practice runner, and a spaced-review system that surfaces past problems for long-term retention.",
    challenge:
      "Most coding-prep tools dump problems on you and disappear. Valueati needed structured lessons, guided practice, and a review loop that actually keeps the material — without becoming another bloated SaaS.",
    solution:
      "Custom-built on Next.js + TypeScript + Tailwind + Prisma. Auth, content management, problem engine, and the spaced-review queue all built in-house. No third-party platform stitched together.",
    results:
      "Live at valueati.com. The same architecture, code quality, and production standard that ships on every Spiffy Tec client site. Open it in another tab — that&apos;s the proof.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma"],
    features: ["Curriculum Engine", "Guided Practice", "Spaced Review", "Custom Auth", "Responsive Web", "Built End-to-End"],
    metrics: [
      { value: "Live", label: "valueati.com is up right now" },
      { value: "End-to-end", label: "Auth, content, practice, review" },
      { value: "Custom built", label: "No templates, no page builders" },
      { value: "Web-ready", label: "Responsive across devices" },
    ],
    proofPoints: [
      "Curriculum-driven lessons with embedded code editor and inline checks",
      "Guided practice problems with hints, walkthroughs, and graded solutions",
      "Spaced-review queue that surfaces past problems for retention",
    ],
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
    name: "Mike T Detailing",
    label: "Booking Platform Build",
    description:
      "Full-stack booking platform with online scheduling, Stripe payments, VIP memberships, referral program, admin dashboard, and a React Native mobile app.",
    tech: ["Next.js", "React", "React Native", "TypeScript", "Stripe", "Prisma"],
    features: ["Online Booking", "Stripe Payments", "VIP Memberships", "Referral System", "Admin Dashboard", "iOS + Android App"],
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
        subtitle="Not just brochure sites. These are the systems we build when the website has to win trust, capture the booking, and make operations easier."
        supportingPoints={[
          "Service-business websites and platforms",
          "Payments, dashboards, and mobile apps",
          "Built in North Carolina",
        ]}
      />

      {/* Featured Project — Valueati */}
      <section className="bg-surface py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-semibold text-[var(--color-spiffy-orange-dark)] uppercase tracking-wider text-center">
            {featured.label}
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-[var(--color-ink)] text-center">
            {featured.name}
          </h2>

          <div className="mt-10">
            <ProjectCard
              title={featured.name}
              description={featured.description}
              tags={featured.tech}
              featured
              metrics={featured.metrics}
              proofPoints={featured.proofPoints}
              primaryCta={{ label: "Visit Valueati", href: "https://valueati.com" }}
              secondaryCta={{ label: "Book a Strategy Call", href: "/contact" }}
            />
          </div>

          {/* Challenge / Solution / Results */}
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            <div>
              <h3 className="text-lg font-bold text-[var(--color-ink)]">The Challenge</h3>
              <p className="mt-3 text-[var(--color-ink-muted)] leading-relaxed">{featured.challenge}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[var(--color-ink)]">Our Solution</h3>
              <p className="mt-3 text-[var(--color-ink-muted)] leading-relaxed">{featured.solution}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[var(--color-ink)]">The Results</h3>
              <p className="mt-3 text-[var(--color-ink-muted)] leading-relaxed">{featured.results}</p>
            </div>
          </div>

          {/* Tech stack */}
          <div className="mt-10">
            <h3 className="text-lg font-bold text-[var(--color-ink)] text-center">Tech Stack</h3>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              {featured.tech.map((tech) => (
                <TechBadge key={tech} name={tech} />
              ))}
            </div>
          </div>

          {/* Key features */}
          <div className="mt-10">
            <h3 className="text-lg font-bold text-[var(--color-ink)] text-center">Key Features</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 max-w-3xl mx-auto">
              {featured.features.map((feat) => (
                <div key={feat} className="flex items-center gap-3">
                  <Check className="h-5 w-5 shrink-0 text-[var(--color-success)]" />
                  <span className="text-[var(--color-ink)] font-medium">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visit live site CTA */}
          <div className="mt-12 text-center">
            <a
              href="https://valueati.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-spiffy-orange)] text-white px-8 py-3.5 font-semibold hover:bg-[var(--color-spiffy-orange-dark)] transition-colors"
            >
              See Valueati Live <ArrowRight className="h-4 w-4" />
            </a>
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
      <section className="bg-[var(--color-surface-muted)] py-16 md:py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-ink)]">Want Results Like These?</h2>
          <p className="mt-4 text-lg text-[var(--color-ink-muted)]">
            Let&apos;s talk about your project. Every engagement starts with a free consultation.
          </p>
          <Link
            href="/contact"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-[var(--color-spiffy-orange)] px-8 py-3.5 font-semibold text-white hover:bg-[var(--color-spiffy-orange-dark)] transition-colors"
          >
            Book Your Free Strategy Call <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
