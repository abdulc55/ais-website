import type { Metadata } from "next";
import { LandingPage, type LandingPageContent } from "@/components/LandingPage";

export const metadata: Metadata = {
  title: "Web Design for Raleigh Service Businesses",
  description:
    "Affordable web design for Raleigh service businesses. Booking platforms, payments, AI tools — live in 2 weeks. Plans from $149/mo, no upfront cost.",
  alternates: { canonical: "https://spiffytec.com/raleigh-web-design" },
};

const content: LandingPageContent = {
  slug: "raleigh-web-design",
  eyebrow: "Raleigh, NC",
  h1: "Web Design Built for Raleigh Service Businesses",
  h1Highlight: "Raleigh Service Businesses",
  subtitle:
    "Custom websites, online booking, payments, and AI tools for Raleigh service businesses. Plans from $149/mo, live in 2 weeks. Built and maintained by a Triangle-based team.",
  whoItsFor: [
    "Raleigh detailers, cleaners, landscapers, and home service businesses tired of losing leads to voicemail",
    "Professional practices (law, dental, chiropractic, med spas) that need a modern online presence",
    "Restaurants, gyms, and retail owners who want online booking or memberships without the $10K agency bill",
    "Anyone running their business off DMs, a Facebook page, or a Wix site that's 5 years old",
  ],
  offers: [
    {
      title: "Custom Website (3-10 pages)",
      body: "Mobile-first, fast, SEO-optimized. Built around your services, not a template. Lives on your domain with your email.",
    },
    {
      title: "Online Booking + Payments",
      body: "Stripe integration, deposits, recurring billing, automated receipts. Customers book 24/7 without you touching a phone.",
    },
    {
      title: "Admin Dashboard",
      body: "See your schedule, manage bookings, track revenue, review customer history — from any phone or laptop.",
    },
    {
      title: "AI Business Tools",
      body: "24/7 chatbot, AI analytics dashboard, and marketing content generator powered by Claude. Included in AI Suite add-on.",
    },
    {
      title: "Mobile App (optional)",
      body: "iOS + Android companion app for repeat customers. Push notifications for bookings. Adds +$99/mo.",
    },
    {
      title: "Hosting, SSL, Support",
      body: "Premium Vercel hosting, automatic SSL, and ongoing support — all included. No surprise invoices.",
    },
  ],
  priceRange: "$99 – $599/mo",
  priceBlurb:
    "One flat monthly price. No upfront cost. No $10K setup invoice. Domain, email, hosting, and SSL included. Live in 2-3 weeks from signed contract.",
  caseStudy: {
    href: "/portfolio/mike-t-detailing",
    label: "Mike T Detailing — Cary, NC",
    body:
      "Mike T went from phone-only scheduling to a 24/7 booking platform with Stripe payments, VIP memberships, admin dashboard, and a React Native mobile app on both iOS and Android. Built in 3 weeks.",
  },
  faqs: [
    {
      question: "Do you only work with Raleigh businesses?",
      answer:
        "No — we serve the entire Raleigh-Durham Triangle, including Cary, Durham, Chapel Hill, Apex, Morrisville, and Wake Forest. Our team is Triangle-based so we're happy to meet in person when helpful.",
    },
    {
      question: "How fast can you launch my site?",
      answer:
        "Starter sites launch in 1-2 weeks. Business sites (with booking and CMS) take 2-3 weeks. Platform platforms with payments and user accounts take 3-4 weeks. You get a preview link to review before we go live.",
    },
    {
      question: "Do I own my website?",
      answer:
        "Your monthly subscription includes access to a professionally built and maintained website — you don't own the underlying platform or code. If you want full ownership, we handle that as a separate buyout at market rate.",
    },
    {
      question: "What if I already have a domain?",
      answer:
        "Perfect. We'll migrate it over and keep your existing email working. You never lose your domain or email — those always stay in your name.",
    },
    {
      question: "What's the commitment?",
      answer:
        "All plans include a 12-month partnership so we can invest the time to build and support your site properly. After 12 months, you switch to month-to-month — cancel anytime with 30 days notice.",
    },
  ],
  schemaServiceName: "Web Design for Raleigh Service Businesses",
};

export default function RaleighWebDesignPage() {
  return <LandingPage content={content} />;
}
