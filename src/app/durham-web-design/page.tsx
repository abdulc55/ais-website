import type { Metadata } from "next";
import { LandingPage, type LandingPageContent } from "@/components/LandingPage";

export const metadata: Metadata = {
  title: "Durham Web Design — Booking Platforms for Local Businesses",
  description:
    "Web design and booking platforms for Durham service businesses. Built by a local Triangle developer. Plans from $149/mo, live in 2 weeks.",
  alternates: { canonical: "https://spiffytec.com/durham-web-design" },
};

const content: LandingPageContent = {
  slug: "durham-web-design",
  eyebrow: "Durham, NC",
  h1: "Durham Web Design for Service Businesses",
  h1Highlight: "Durham",
  subtitle:
    "Custom websites, online booking, and AI business tools for Durham service businesses. Plans from $149/mo, live in 2-3 weeks. Built and maintained by a Triangle-based developer.",
  whoItsFor: [
    "Durham detailers, landscapers, cleaning crews, and mobile service businesses",
    "Bull City restaurants, breweries, and food trucks needing online ordering or reservations",
    "Duke-area professional services (dental, chiro, PT, therapy) needing a modern online presence",
    "Any Durham business stuck with a slow, outdated site that's costing them bookings",
  ],
  offers: [
    {
      title: "Custom Website",
      body: "3-10 pages, mobile-first, fast, and built around your services and branding. Lives on your domain with your email.",
    },
    {
      title: "Online Booking + Payments",
      body: "Stripe-powered booking flow with deposits, recurring billing, and automated receipts. Customers book without the phone tag.",
    },
    {
      title: "Admin Dashboard",
      body: "Manage your schedule, bookings, and customers from one place — on any device.",
    },
    {
      title: "AI Business Tools",
      body: "Claude-powered chatbot, analytics dashboard, and marketing generator — optional AI Suite add-on at +$99/mo.",
    },
    {
      title: "Local SEO",
      body: "Durham-targeted keyword strategy, Google Business Profile setup, local content. SEO package at +$149/mo.",
    },
    {
      title: "Ongoing Support",
      body: "Hosting, SSL, bug fixes, content updates, and monthly edit hours included. No invoices for every small change.",
    },
  ],
  priceRange: "$99 – $599/mo",
  priceBlurb:
    "One monthly price, no upfront cost. Domain, email, hosting, and SSL included. 12-month partnership, month-to-month after that.",
  caseStudy: {
    href: "/portfolio/mike-t-detailing",
    label: "See a live booking platform in the Triangle",
    body:
      "Mike T Detailing, based in nearby Cary, went from phone-only scheduling to a full booking platform with Stripe payments, VIP memberships, admin dashboard, and a mobile app — all built in 3 weeks.",
  },
  faqs: [
    {
      question: "Do you work with Durham businesses?",
      answer:
        "Absolutely. We serve the entire Raleigh-Durham Triangle. Durham, Cary, Raleigh, Chapel Hill, Apex, Morrisville — we're a Triangle-based team.",
    },
    {
      question: "How long until my site is live?",
      answer:
        "Starter sites: 1-2 weeks. Business sites (booking + CMS): 2-3 weeks. Platform platforms (payments + accounts): 3-4 weeks. You'll review a preview link before we go live.",
    },
    {
      question: "Can I keep my existing domain and email?",
      answer:
        "Yes — your domain and email stay in your name. We migrate them over without breaking anything.",
    },
    {
      question: "What's included in the monthly fee?",
      answer:
        "Hosting, SSL, domain management, ongoing support, and a set number of edit hours each month (1 hour on Starter, 2 hours on Business, unlimited on Platform). No hidden costs.",
    },
    {
      question: "Do I own the website?",
      answer:
        "Your subscription gets you full access to a professionally built and managed website. You don't own the underlying platform code unless you choose a separate buyout. Your content, branding, and domain are always yours.",
    },
  ],
  schemaServiceName: "Durham Web Design",
};

export default function DurhamWebDesignPage() {
  return <LandingPage content={content} />;
}
