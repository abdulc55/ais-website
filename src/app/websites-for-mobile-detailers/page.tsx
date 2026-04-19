import type { Metadata } from "next";
import { LandingPage, type LandingPageContent } from "@/components/LandingPage";

export const metadata: Metadata = {
  title: "Websites & Booking Platforms for Mobile Detailers",
  description:
    "Booking platform websites built for mobile auto detailing businesses. Online scheduling, Stripe payments, mobile app. See the Mike T Detailing case study.",
  alternates: {
    canonical: "https://spiffytec.com/websites-for-mobile-detailers",
  },
};

const content: LandingPageContent = {
  slug: "websites-for-mobile-detailers",
  eyebrow: "Mobile Auto Detailing",
  h1: "Websites Built for Mobile Detailing Businesses",
  h1Highlight: "Mobile Detailing Businesses",
  subtitle:
    "A booking platform, not a brochure. Online scheduling, Stripe payments, VIP memberships, admin dashboard, and an optional mobile app — all built specifically for the way mobile detailers actually operate.",
  whoItsFor: [
    "Mobile detailers booking customers by phone, DM, or Instagram and losing bookings because of it",
    "Shops ready to graduate from a Squarespace site that can't take payments",
    "Detailers building a recurring revenue base with memberships or packages",
    "Operators growing past solo work and needing real scheduling + customer tracking",
  ],
  offers: [
    {
      title: "5-Step Booking Flow",
      body: "Package → add-ons → date/time → address → review. Mobile-optimized. Customers book in under 2 minutes, no phone tag.",
    },
    {
      title: "Stripe Payments + Deposits",
      body: "Charge deposits to prevent no-shows. Automatic receipts. Refunds in two clicks. No more Venmo chasing.",
    },
    {
      title: "VIP & Referral System",
      body: "Monthly subscribers get priority booking and discounts. Customers refer friends and earn credits — real retention engine.",
    },
    {
      title: "Admin Dashboard",
      body: "See today's schedule. Manage bookings. Look up customer history. Handle refunds. All from your phone on the job site.",
    },
    {
      title: "AI Chatbot",
      body: "Claude-powered assistant trained on your services, pricing, and FAQs. Handles customer questions 24/7 while you're detailing.",
    },
    {
      title: "iOS + Android App",
      body: "Native mobile app for repeat customers. Push notifications for bookings. Lets regulars rebook their usual service in two taps.",
    },
  ],
  priceRange: "$249 – $599/mo",
  priceBlurb:
    "Platform or Premium tier required for the full booking platform. Includes website, booking, payments, admin dashboard, and ongoing support. Add mobile app for +$99/mo.",
  caseStudy: {
    href: "/portfolio/mike-t-detailing",
    label: "Mike T Detailing — Cary, NC",
    body:
      "Mike T replaced phone-only scheduling with the exact platform described above. Stripe payments, VIP memberships, admin dashboard, and a mobile app on both iOS and Android. Built in 3 weeks. See the full case study with screenshots.",
  },
  faqs: [
    {
      question: "How long does it take to launch a detailing booking site?",
      answer:
        "Typically 2-3 weeks from signed contract to live site. Day 1-2 is onboarding and gathering your services, pricing, and photos. Days 3-14 are template customization, booking setup, Stripe integration, and admin dashboard. Days 15-21 are review, revisions, and launch.",
    },
    {
      question: "Do you support mobile-only detailers who travel to the customer?",
      answer:
        "Yes — our booking flow explicitly captures the customer's address and maps it for you. The system is designed around mobile operators, not shop-based detailers. (Shop-based works too.)",
    },
    {
      question: "How much does a detailing booking website cost?",
      answer:
        "Our Platform tier starts at $249/mo and includes the full booking platform with payments and admin dashboard. Add a mobile app for +$99/mo. No upfront setup fees — just monthly billing. Traditional custom-built booking platforms usually run $15K-$50K upfront.",
    },
    {
      question: "Can I take deposits and prevent no-shows?",
      answer:
        "Yes. Stripe deposits are built-in. You decide the deposit amount per service. Customers who no-show forfeit the deposit automatically. This alone typically pays for the platform within 1-2 months.",
    },
    {
      question: "Will customers use an online booking tool?",
      answer:
        "Yes — the data is overwhelming on this. 70%+ of consumers prefer online booking over calling. Mike T's customers book online at all hours, including evenings and weekends when Mike can't answer the phone. Online booking captures the bookings phone calls lose.",
    },
  ],
  schemaServiceName: "Booking Platform Websites for Mobile Detailers",
};

export default function WebsitesForMobileDetailersPage() {
  return <LandingPage content={content} />;
}
