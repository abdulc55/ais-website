import Link from "next/link";
import {
  Globe,
  Code,
  Smartphone,
  Search,
  Zap,
  Shield,
  ArrowRight,
  Phone,
  Brain,
  MessageCircle,
  TrendingUp,
  Sparkles,
  CalendarDays,
  CreditCard,
  Layers3,
} from "lucide-react";
import { Hero } from "@/components/Hero";
import { SectionHeader } from "@/components/SectionHeader";
import { ServiceCard } from "@/components/ServiceCard";
import { ProjectCard } from "@/components/ProjectCard";
import { TestimonialCard } from "@/components/TestimonialCard";

export default function Home() {
  return (
    <>
      {/* Section 1 — Hero */}
      <Hero
        badge="Websites, Platforms & AI Systems"
        title="Websites that look sharp and book real work."
        highlight="book real work"
        subtitle="Spiffy Tec designs, builds, and supports the websites, booking systems, and AI tools local service businesses need to stop leaking leads and start closing faster."
        supportingPoints={[
          "Launch-ready in 2-3 weeks",
          "Booking, payments, and automation",
          "Built in Cary, NC for service businesses",
        ]}
        primaryCta={{ label: "Book a Strategy Call", href: "/contact" }}
        secondaryCta={{ label: "See Our Work", href: "/portfolio" }}
        tall
      />

      {/* Section 2 — Services Overview */}
      <section className="bg-surface py-20 md:py-28 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            badge="What We Do"
            title="From first website to full operating system."
            highlight="operating system"
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
            description="A real service-business system: online booking, Stripe payments, recurring memberships, customer history, admin controls, and a companion mobile app."
            centered
          />

          <div className="mt-14 max-w-5xl mx-auto">
            <ProjectCard
              title="Mike T Detailing"
              description="Full-stack booking platform with online scheduling, Stripe payments, VIP memberships, referral program, admin dashboard, and a React Native mobile app."
              tags={["Next.js", "React", "TypeScript", "Stripe", "Prisma", "Tailwind CSS", "React Native"]}
              featured
              metrics={[
                { value: "3 weeks", label: "Strategy call to live platform" },
                { value: "24/7", label: "Booking availability for customers" },
                { value: "Stripe", label: "Payments and receipts automated" },
                { value: "iOS + Android", label: "Companion app shipped" },
              ]}
              proofPoints={[
                "5-step booking flow built for fast mobile checkout",
                "VIP memberships and referrals to create repeat revenue",
                "Admin dashboard to run schedule, customers, and payments in one place",
              ]}
              primaryCta={{ label: "Read the Case Study", href: "/portfolio/mike-t-detailing" }}
              secondaryCta={{ label: "See Pricing", href: "/pricing" }}
            />
          </div>
        </div>
      </section>

      {/* Section 4 — Delivery Model */}
      <section className="bg-navy py-20 md:py-28 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <span className="inline-block rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber">
              How We Build
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-white md:text-4xl">
              Built for the way local service businesses sell.
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-ice/65">
              We focus on the moments that actually change revenue: first impression, first booking,
              first payment, and the repeat follow-up that keeps customers coming back.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                icon: Globe,
                title: "Win the first impression",
                description:
                  "Custom pages, sharp messaging, and local SEO so customers trust you before they ever call.",
              },
              {
                icon: CalendarDays,
                title: "Capture the booking",
                description:
                  "Scheduling, deposits, and clear offers so buyers can act while they still have intent.",
              },
              {
                icon: CreditCard,
                title: "Get paid with less friction",
                description:
                  "Stripe payments, receipts, and automated reminders so revenue feels systemized instead of manual.",
              },
              {
                icon: Layers3,
                title: "Keep the backend clean",
                description:
                  "Dashboards, automations, and support that replace the spreadsheet-and-voicemail chaos.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/6 p-6 text-left backdrop-blur-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-amber">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ice/65">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 — Why Choose Us */}
      <section className="bg-surface py-20 md:py-28 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            badge="Why Spiffy Tec"
            title="Why owners hire us instead of juggling three vendors."
            highlight="three vendors"
            centered
          />

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Zap,
                title: "Fast without feeling rushed",
                description:
                  "We move quickly, but the work still feels considered. Strategy, design, build, and launch stay in one lane.",
              },
              {
                icon: Shield,
                title: "Clear scope and honest guidance",
                description:
                  "We steer clients toward the smallest thing that makes money first, not the biggest package we can sell.",
              },
              {
                icon: TrendingUp,
                title: "Built around revenue moments",
                description:
                  "Pages, bookings, payments, automations, and follow-up all work together so the site earns its keep.",
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
            Tell us what needs to book, sell, or run smoother.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-amber px-8 py-3.5 font-semibold text-navy-dark hover:bg-amber-dark transition-colors"
            >
              Book a Strategy Call <ArrowRight className="h-4 w-4" />
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
