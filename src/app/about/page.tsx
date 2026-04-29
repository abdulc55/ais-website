import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HandHeart, Zap, Shield, BarChart3 } from "lucide-react";
import { Hero } from "@/components/Hero";
import { TechBadge } from "@/components/TechBadge";

export const metadata: Metadata = {
  title: "About — A real website shouldn't be a luxury",
  description:
    "Abdul Shakur Caesar started Spiffy Tec to make professional, custom-built websites accessible to every business — not just the ones with a $20K budget. Triangle-based, building for businesses everywhere.",
};

const values = [
  {
    icon: HandHeart,
    title: "Accessible",
    description: "A real, professional website shouldn't cost $20,000 and six months. We built our pricing so a one-person shop can afford the same quality as a growing platform.",
  },
  {
    icon: Zap,
    title: "Fast",
    description: "Live in 2-3 weeks. Your business is losing customers every day you don't have a real online presence — speed isn't a luxury, it's the point.",
  },
  {
    icon: Shield,
    title: "Transparent",
    description: "Monthly pricing, no upfront surprises, clear scope. You always know what you're paying for, what's shipping, and when.",
  },
  {
    icon: BarChart3,
    title: "Built to Sell",
    description: "Every site is engineered to capture leads, book appointments, and earn trust — not just to look pretty. If it doesn't drive customers, we haven't done our job.",
  },
];

const techStack = [
  "Next.js",
  "React",
  "React Native",
  "TypeScript",
  "Tailwind CSS",
  "Stripe",
  "Prisma",
  "PostgreSQL",
  "Node.js",
  "Vercel",
];

export default function AboutPage() {
  return (
    <>
      <Hero
        title="A real website shouldn't be a luxury."
        highlight="real website"
        subtitle="Spiffy Tec exists to put professional, custom-built websites in reach of every business — not just the ones with a $20,000 budget."
      />

      {/* Story */}
      <section className="bg-surface py-20 md:py-28 px-4">
        <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-2 items-center">
          {/* Photo */}
          <div className="relative h-80 md:h-[28rem] rounded-2xl overflow-hidden">
            <Image
              src="/images/abdul.jpg"
              alt="Abdul Shakur Caesar — Founder of Spiffy Tec"
              fill
              className="object-cover object-top"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Content */}
          <div>
            <p className="text-sm font-semibold text-[var(--color-spiffy-orange-dark)] uppercase tracking-wider">Why We Started</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-[var(--color-ink)]">
              Hi, I&apos;m Abdul Shakur Caesar.
            </h2>
            <p className="mt-4 text-[var(--color-ink-muted)] leading-relaxed">
              I started <span className="brand-text text-base">Spiffy Tec</span> because I kept watching
              real businesses lose real customers to a problem they didn&apos;t know they had: a website
              that looked broken, took forever to load, or didn&apos;t exist at all.
            </p>
            <p className="mt-4 text-[var(--color-ink-muted)] leading-relaxed">
              The fix has been the same for years — but it cost $20,000 and six months. Most local
              shops, restaurants, gyms, and service businesses can&apos;t afford that, so they end up
              with a Wix template, a half-finished page, or nothing. And every day, customers go
              somewhere else.
            </p>
            <p className="mt-4 text-[var(--color-ink-muted)] leading-relaxed">
              Spiffy Tec exists to make a real, custom-built website accessible to every business.
              Not a template. Not a page builder. Real code, professional design, monthly pricing
              you can plan around — same standard whether you&apos;re a one-person shop or a growing
              platform.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-surface-muted py-20 md:py-28 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold text-[var(--color-spiffy-orange-dark)] uppercase tracking-wider">Our Mission</p>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-[var(--color-ink)]">
            Good websites should be accessible to everyone.
          </h2>
          <p className="mt-6 text-lg text-[var(--color-ink-muted)] leading-relaxed">
            Every business deserves a professional site that actually sells — booking, payments,
            real design, real code. The price tag shouldn&apos;t decide whether you get one. Every
            project gets the same level of craft, whether it&apos;s a 3-page site or a full platform.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface py-20 md:py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-ink)] text-center">Our Values</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="card-shadow rounded-2xl bg-white p-8 text-center"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--color-spiffy-orange-soft)] text-[var(--color-spiffy-orange-dark)]">
                  <v.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-[var(--color-ink)]">{v.title}</h3>
                <p className="mt-3 text-[var(--color-ink-muted)] leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="bg-surface-muted py-20 md:py-28 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-ink)]">Our Tech Stack</h2>
          <p className="mt-3 text-[var(--color-ink-muted)]">
            We use modern, battle-tested tools to build fast, reliable, and scalable solutions.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {techStack.map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="bg-surface py-20 md:py-28 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold text-[var(--color-spiffy-orange-dark)] uppercase tracking-wider">Location</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-[var(--color-ink)]">
            Based in North Carolina. Serving the World.
          </h2>
          <p className="mt-6 text-lg text-[var(--color-ink-muted)] leading-relaxed">
            Headquartered in Cary, NC — but we work with clients everywhere. From local shops
            to international startups, every project starts with a free strategy call.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--color-surface-muted)] py-20 md:py-28 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-ink)]">Let&apos;s Work Together</h2>
          <p className="mt-4 text-lg text-[var(--color-ink-muted)]">
            Tell us what you&apos;re building.
          </p>
          <Link
            href="/contact"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-[var(--color-spiffy-orange)] px-8 py-3.5 font-semibold text-white hover:bg-[var(--color-spiffy-orange-dark)] transition-colors"
          >
            Get in Touch <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
