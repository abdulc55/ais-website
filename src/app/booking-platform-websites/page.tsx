import type { Metadata } from "next";
import { LandingPage, type LandingPageContent } from "@/components/LandingPage";

export const metadata: Metadata = {
  title: "Booking Platform Websites for Service Businesses",
  description:
    "Custom booking platforms with online scheduling, Stripe payments, admin dashboard, and AI tools. Plans from $249/mo. Built in 2-3 weeks.",
  alternates: {
    canonical: "https://spiffytec.com/booking-platform-websites",
  },
};

const content: LandingPageContent = {
  slug: "booking-platform-websites",
  eyebrow: "Booking Platform Websites",
  h1: "Booking Platform Websites for Service Businesses",
  h1Highlight: "Booking Platform Websites",
  subtitle:
    "Not just a website — a real booking platform. Online scheduling, Stripe payments, admin dashboard, customer accounts, AI tools, and an optional mobile app. Built in 2-3 weeks.",
  whoItsFor: [
    "Service businesses taking bookings by phone, text, or DMs and losing customers to the friction",
    "Detailers, cleaners, landscapers, pressure washers, dog groomers, home services",
    "Salons, barber shops, massage studios, tattoo shops, nail salons",
    "Any operator ready to treat booking and payments as real software, not a spreadsheet",
  ],
  offers: [
    {
      title: "Customer Booking Flow",
      body: "Mobile-first, multi-step wizard. Service selection, add-ons, date/time, customer info, review. Customers book without picking up a phone.",
    },
    {
      title: "Stripe Payments",
      body: "Deposits, recurring billing, subscriptions, automated receipts, refunds. Real payment processing — not Venmo or Square tacked on.",
    },
    {
      title: "Admin Dashboard",
      body: "Your business command center. Manage schedule, bookings, customers, revenue, and refunds from any device — desktop or phone.",
    },
    {
      title: "VIP & Membership Tiers",
      body: "Recurring monthly memberships with perks. Priority booking, discounts, priority support. Recurring revenue built into the platform.",
    },
    {
      title: "AI Business Suite",
      body: "Claude-powered chatbot handling customer questions 24/7, AI analytics dashboard, and AI marketing content generator. Optional +$99/mo.",
    },
    {
      title: "Mobile App (optional)",
      body: "Native iOS + Android companion app for repeat customers. Push notifications. Two-tap rebooking. Adds +$99/mo.",
    },
  ],
  priceRange: "$249 – $599/mo",
  priceBlurb:
    "Platform or Premium tier required. Includes booking, payments, admin dashboard, and ongoing support. No upfront $15K-$50K setup fee. Just a monthly subscription.",
  caseStudy: {
    href: "/portfolio/mike-t-detailing",
    label: "Mike T Detailing — Booking Platform Case Study",
    body:
      "A Cary, NC mobile detailing business running our full booking platform. Stripe payments, VIP memberships, admin dashboard, and a React Native mobile app on both stores. Live, in production, and serving real customers.",
  },
  faqs: [
    {
      question: "How is this different from Calendly or Square Appointments?",
      answer:
        "Calendly and Square are bolt-on tools sitting on top of someone else's website. Our booking platform IS your website — fully branded, custom-designed, and built around your exact services, packages, and pricing. You also get a real admin dashboard, VIP memberships, referrals, and optional AI and mobile app. Tools like Calendly can't touch that.",
    },
    {
      question: "Can I integrate with my existing POS or CRM?",
      answer:
        "Yes — we support integrations with common tools. Stripe is built in. For custom integrations (MindBody, Jobber, Housecall Pro, ServiceTitan, etc.) we discuss scope and pricing during the strategy call.",
    },
    {
      question: "How much does a booking platform cost to build?",
      answer:
        "Traditional custom-built booking platforms cost $15,000 – $50,000 upfront plus monthly maintenance. Our platform is $249 – $599/mo with no upfront cost — because we've already built the booking engine once. New clients get the full platform in 2-3 weeks.",
    },
    {
      question: "Do I need the mobile app?",
      answer:
        "No — it's optional. The booking platform works beautifully in a mobile browser without the app. Add the native app when you have enough repeat customers that push notifications and two-tap rebooking will move the needle for you.",
    },
    {
      question: "What if I outgrow the platform?",
      answer:
        "You won't — it's built on the same stack (Next.js, Stripe, PostgreSQL) used by startups that scale to millions in revenue. If you need custom features beyond the standard platform, we build them as add-ons and factor that into your tier.",
    },
  ],
  schemaServiceName: "Booking Platform Websites",
};

export default function BookingPlatformWebsitesPage() {
  return <LandingPage content={content} />;
}
