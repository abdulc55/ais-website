import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AIS — Web Development & AI Agency | Custom Websites Starting at $149/mo",
    template: "%s | AIS — Abdul Intelligent Solutions",
  },
  description:
    "AIS builds custom websites, SaaS platforms, and AI-powered business tools — starting at $149/mo with $0 setup. Live in 2 weeks, not 2 months. Serving businesses worldwide.",
  keywords: [
    "web development",
    "SaaS agency",
    "Cary NC",
    "Triangle area",
    "custom websites",
    "mobile apps",
    "Next.js",
    "React",
    "software development",
  ],
  authors: [{ name: "Abdul Intelligent Solutions" }],
  creator: "Abdul Intelligent Solutions",
  metadataBase: new URL("https://aintelliagents.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aintelliagents.com",
    siteName: "Abdul Intelligent Solutions",
    title: "AIS — Web Development & SaaS Agency | Cary, NC",
    description:
      "Custom websites, SaaS platforms, and mobile apps for businesses in the Triangle area and beyond.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Abdul Intelligent Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AIS — Web Development & SaaS Agency | Cary, NC",
    description:
      "Custom websites, SaaS platforms, and mobile apps for businesses in the Triangle area and beyond.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Abdul Intelligent Solutions",
  alternateName: "AIS",
  description:
    "Web development and SaaS agency specializing in custom websites, SaaS platforms, and mobile apps.",
  url: "https://aintelliagents.com",
  telephone: "(984) 215-1498",
  email: "abdulcaesar@aintelliagents.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cary",
    addressRegion: "NC",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 35.7915,
    longitude: -78.7811,
  },
  openingHours: "Mo-Fr 09:00-18:00",
  priceRange: "$$",
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 35.7915,
      longitude: -78.7811,
    },
    geoRadius: "50000",
  },
  sameAs: [
    "https://github.com/aintelliagents",
    "https://linkedin.com/company/aintelliagents",
    "https://x.com/aintelliagents",
  ],
  serviceType: [
    "Web Development",
    "SaaS Development",
    "Mobile App Development",
    "SEO & Digital Marketing",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
