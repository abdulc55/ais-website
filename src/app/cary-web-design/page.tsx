import type { Metadata } from "next";
import { LandingPage, type LandingPageContent } from "@/components/LandingPage";

export const metadata: Metadata = {
  title: "Cary NC Web Development for Local Businesses",
  description:
    "Cary-based web developer building booking platforms for service businesses. Monthly plans from $149/mo, no upfront cost. Live in 2 weeks.",
  alternates: { canonical: "https://spiffytec.com/cary-web-design" },
};

const content: LandingPageContent = {
  slug: "cary-web-design",
  eyebrow: "Cary, NC",
  h1: "Cary NC Web Development for Local Businesses",
  h1Highlight: "Cary NC",
  subtitle:
    "Spiffy Tec is based right here in Cary. We build custom websites, booking platforms, and AI tools for local service businesses. Plans from $149/mo, no upfront cost.",
  whoItsFor: [
    "Cary-based detailers, landscapers, cleaners, and mobile service businesses",
    "Professional offices (law, dental, med spa, chiropractic) near Cary Parkway or Kildaire Farm",
    "Restaurants, food trucks, and retail shops in downtown Cary or Waverly Place",
    "Any Cary business tired of their current website looking like it was built in 2015",
  ],
  offers: [
    {
      title: "Custom Website",
      body: "3-10 pages designed around your services, your branding, your customers. Fast, mobile-first, and SEO-optimized out of the gate.",
    },
    {
      title: "Online Booking + Stripe",
      body: "Let customers book and pay online 24/7. Deposits, recurring billing, automated receipts. Works on phones and desktops.",
    },
    {
      title: "Admin Dashboard",
      body: "One place to see your schedule, manage bookings, track revenue, and review customer history. Works from any device.",
    },
    {
      title: "AI Business Suite",
      body: "Claude-powered chatbot handling FAQs and booking, AI analytics dashboard, and marketing content generator. +$99/mo add-on.",
    },
    {
      title: "Local Meetings",
      body: "We're in Cary. Want to meet in person at a coffee shop to talk through what you need? That's easy to arrange.",
    },
    {
      title: "Local SEO",
      body: "Google Business Profile setup, local keyword targeting, and review collection — optional SEO package for +$149/mo.",
    },
  ],
  priceRange: "$99 – $599/mo",
  priceBlurb:
    "Simple monthly pricing. Domain, email, hosting, and SSL all included. No upfront $10K invoice. 12-month partnership, month-to-month after that.",
  caseStudy: {
    href: "/portfolio/mike-t-detailing",
    label: "Mike T Detailing — Cary, NC",
    body:
      "A Cary-based mobile detailer who replaced phone-only scheduling with a full booking platform, Stripe payments, VIP memberships, admin dashboard, and a mobile app. Real local client, live production platform.",
  },
  faqs: [
    {
      question: "Are you actually based in Cary?",
      answer:
        "Yes — Spiffy Tec is headquartered in Cary. We serve clients across the Raleigh-Durham Triangle but Cary is home.",
    },
    {
      question: "Can I see an example of your work?",
      answer:
        "Yes — Mike T Detailing is a Cary-based mobile auto detailer running our full booking platform. Check out the full case study linked above, or visit miketdetailing.com to see it live.",
    },
    {
      question: "Do you build for non-Cary businesses?",
      answer:
        "Absolutely. We serve the whole Triangle — Raleigh, Durham, Chapel Hill, Apex, Morrisville, Wake Forest. We can work with clients anywhere in the US, but Triangle clients get the benefit of in-person meetings when needed.",
    },
    {
      question: "How does billing work?",
      answer:
        "Simple monthly subscription. No setup fees, no multi-thousand-dollar upfront invoice. Your first month's fee gets you live. After that, one monthly charge covers hosting, SSL, support, and included edits.",
    },
    {
      question: "What if I want to leave?",
      answer:
        "After your 12-month commitment, 30 days notice cancels your subscription. We export your content (copy, images, data) so you're not stuck. Want to keep the actual platform? We offer a buyout at market rate.",
    },
  ],
  schemaServiceName: "Cary NC Web Development",
};

export default function CaryWebDesignPage() {
  return <LandingPage content={content} />;
}
