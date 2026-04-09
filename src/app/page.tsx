import Link from "next/link";
import { Globe, Code, Smartphone, Search, Zap, Shield, BarChart3, ArrowRight, Phone, Brain, MessageCircle, TrendingUp, Sparkles } from "lucide-react";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { ServiceCard } from "@/components/ServiceCard";
import { ProjectCard } from "@/components/ProjectCard";
import { StatCounter } from "@/components/StatCounter";
import { TestimonialCard } from "@/components/TestimonialCard";

export default function Home() {
  return (
    <>
      {/* Section 1 — Hero */}
      <Hero
        badge="Web Development & AI"
        title="Smart Websites. Real Revenue."
        highlight="Real Revenue"
        subtitle="In a jiffy, your website will be spiffy. We design, build, and run your entire web presence — you focus on your business."
        primaryCta={{ label: "Start a Project", href: "/contact" }}
        secondaryCta={{ label: "See Our Work", href: "/portfolio" }}
        tall
      />

      {/* Section 2 — Services Overview */}
      <section className="bg-surface py-20 md:py-28 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            badge="What We Do"
            title="Everything You Need Online. Nothing You Don't."
            highlight="Need"
            centered
          />

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <ServiceCard
              icon={<Globe className="w-6 h-6" />}
              title="Custom Websites"
              description="Professional, mobile-responsive websites designed to convert visitors into customers."
              features={["Responsive Design", "SEO Optimized", "Fast Loading", "Custom Design"]}
              price="$99/mo"
              href="/services"
            />
            <ServiceCard
              icon={<Code className="w-6 h-6" />}
              title="SaaS Platforms"
              description="Full-featured web applications with user accounts, dashboards, and payment processing."
              features={["User Accounts", "Admin Dashboard", "Stripe Payments", "Custom Logic"]}
              price="$149/mo"
              href="/services"
              popular
            />
            <ServiceCard
              icon={<Smartphone className="w-6 h-6" />}
              title="Mobile Apps"
              description="Cross-platform mobile applications that put your business in your customers' pockets."
              features={["iOS & Android", "Push Notifications", "Offline Support", "App Store Ready"]}
              price="+$99/mo"
              priceLabel="add-on"
              href="/services"
            />
            <ServiceCard
              icon={<Search className="w-6 h-6" />}
              title="SEO & Marketing"
              description="Get found by the right customers with search optimization and digital marketing."
              features={["Local SEO", "Google Business", "Content Strategy", "Monthly Reports"]}
              price="+$149/mo"
              priceLabel="add-on"
              href="/services"
            />
          </div>
        </div>
      </section>

      {/* AI Business Suite Banner */}
      <section className="bg-gradient-to-br from-navy-dark via-navy to-navy-dark py-16 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-4">
                <Brain className="w-4 h-4 text-ice" />
                <span className="text-sm font-medium text-ice">AI-Powered</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                AI Business Suite
              </h2>
              <p className="mt-3 text-lg text-ice/60 leading-relaxed">
                AI, built in. Our tools answer customer questions, surface revenue insights, and generate marketing content. Every plan includes what most agencies charge extra for.
              </p>
              <Link
                href="/services"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber px-7 py-3 font-semibold text-navy-dark hover:bg-amber-dark transition-colors"
              >
                Learn More <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              {[
                { icon: MessageCircle, title: "AI Chatbot", desc: "24/7 customer support that books appointments" },
                { icon: TrendingUp, title: "AI Analytics", desc: "Revenue predictions and customer insights" },
                { icon: Sparkles, title: "AI Marketing", desc: "Social posts, emails, and review responses" },
              ].map((item) => (
                <div key={item.title} className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 p-5 text-center">
                  <item.icon className="w-8 h-8 text-ice mx-auto mb-3" />
                  <h3 className="font-semibold text-white text-sm">{item.title}</h3>
                  <p className="mt-1 text-xs text-ice/50">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 — Featured Project */}
      <section className="bg-surface-muted py-20 md:py-28 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            badge="Featured Project"
            title="Mike T Detailing"
            highlight="Mike T Detailing"
            description="A complete mobile car detailing booking platform built from scratch — online scheduling, payments, VIP memberships, and more."
            centered
          />

          <div className="mt-14 max-w-4xl mx-auto">
            <ProjectCard
              title="Mike T Detailing"
              description="Full-stack booking platform with online scheduling, Stripe payments, VIP memberships, referral program, admin dashboard, and a React Native mobile app."
              tags={["Next.js", "React", "TypeScript", "Stripe", "Prisma", "Tailwind CSS", "React Native"]}
              featured
              imagePlaceholder="gradient"
            />
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-navy font-semibold hover:text-amber-dark transition-colors"
            >
              View Case Study <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 4 — Stats */}
      <section className="bg-navy py-20 md:py-28 px-4">
        <div className="max-w-7xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-4 text-center">
          <StatCounter value={2} suffix=" Weeks" label="Launch Time" />
          <StatCounter value={100} suffix="%" label="Client Retention" />
          <StatCounter value={24} suffix="/7" label="Your Site Never Sleeps" />
          <StatCounter value={24} suffix="hr" label="Response Time" />
        </div>
      </section>

      {/* Section 5 — Why Choose Us */}
      <section className="bg-surface py-20 md:py-28 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            badge="Why Spiffy Tec"
            title="Why 10 out of 10 Clients Stay"
            highlight="Stay"
            centered
          />

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Zap,
                title: "Speed",
                description:
                  "Most agencies take 2-3 months. We deliver in 2-3 weeks without cutting corners on quality.",
              },
              {
                icon: Shield,
                title: "Transparency",
                description:
                  "No hidden fees, no vague timelines. You know exactly what you're paying for and when it ships.",
              },
              {
                icon: BarChart3,
                title: "Results",
                description:
                  "Every site is built to convert visitors into customers. Great design meets real business outcomes.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="card-shadow rounded-2xl bg-white p-8 text-center"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-amber-light text-amber-dark">
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-navy">{item.title}</h3>
                <p className="mt-3 text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6 — Testimonial */}
      <section className="bg-surface-muted py-20 md:py-28 px-4">
        <div className="max-w-3xl mx-auto">
          <TestimonialCard
            name="Mike T."
            business="Mike T Detailing"
            quote="Spiffy Tec built our entire booking platform from scratch. Online scheduling, payments, VIP memberships — everything we needed to run our business. The quality is incredible and they delivered fast."
            rating={5}
          />
        </div>
      </section>

      {/* Section 7 — CTA Banner */}
      <section className="bg-navy py-20 md:py-28 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready when you are.
          </h2>
          <p className="mt-4 text-lg text-ice/60">
            Tell us what you&apos;re building.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-amber px-8 py-3.5 font-semibold text-navy-dark hover:bg-amber-dark transition-colors"
            >
              Get in Touch <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="tel:+19842151498"
              className="inline-flex items-center gap-2 text-ice/60 hover:text-white transition-colors font-medium"
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
