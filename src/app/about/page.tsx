import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Zap, Shield, BarChart3 } from "lucide-react";
import { Hero } from "@/components/Hero";
import { TechBadge } from "@/components/TechBadge";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Abdul Shakur Caesar, founder of Spiffy Tec — building websites, platforms, and AI tools for service businesses.",
};

const values = [
  {
    icon: Star,
    title: "Quality",
    description: "Every line of code is written with care. We don't cut corners and we don't ship junk.",
  },
  {
    icon: Zap,
    title: "Speed",
    description: "We deliver in weeks, not months. Your business can't afford to wait — and it shouldn't have to.",
  },
  {
    icon: Shield,
    title: "Transparency",
    description: "Clear pricing, honest communication, no surprises. You always know where your project stands.",
  },
  {
    icon: BarChart3,
    title: "Results",
    description: "Built to convert visitors into customers. If it doesn't drive results, we haven't done our job.",
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
        title="Meet the Builder Behind Spiffy Tec"
        highlight="Spiffy Tec"
        subtitle="The people behind the product."
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
            <p className="text-sm font-semibold text-amber-dark uppercase tracking-wider">Our Story</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-navy">
              Hi, I&apos;m Abdul Shakur Caesar
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Developer, problem solver, and the founder of Spiffy Tec. I started
              Spiffy Tec after watching local businesses in the Raleigh-Durham area lose customers every
              day because they had no website — or worse, a terrible one.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              I built Spiffy Tec to do one thing: build software that makes businesses money.
              Whether you need a landing page or a full SaaS platform, we
              build it right, we build it fast, and we stand behind it.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Every business deserves a professional online presence. That&apos;s not a tagline —
              it&apos;s the belief that drives everything we do.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-surface-muted py-20 md:py-28 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold text-amber-dark uppercase tracking-wider">Our Mission</p>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-navy">
            Better tools. Better businesses.
          </h2>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Every project gets the same level of craft and attention to detail —
            whether it&apos;s a 3-page site or a full-featured platform.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface py-20 md:py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-navy text-center">Our Values</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="card-shadow rounded-2xl bg-white p-8 text-center"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-amber-light text-amber-dark">
                  <v.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-navy">{v.title}</h3>
                <p className="mt-3 text-gray-600 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="bg-surface-muted py-20 md:py-28 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-navy">Our Tech Stack</h2>
          <p className="mt-3 text-gray-600">
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
          <p className="text-sm font-semibold text-amber-dark uppercase tracking-wider">Location</p>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-navy">
            Based in North Carolina. Serving the World.
          </h2>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Headquartered in Cary, NC — but we work with clients everywhere. From local shops
            to international startups, every project starts with a free strategy call.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-20 md:py-28 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Let&apos;s Work Together</h2>
          <p className="mt-4 text-lg text-ice/60">
            Tell us what you&apos;re building.
          </p>
          <Link
            href="/contact"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-amber px-8 py-3.5 font-semibold text-navy-dark hover:bg-amber-dark transition-colors"
          >
            Get in Touch <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
