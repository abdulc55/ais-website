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
    default: "Spiffy Tec — Web Development & AI Agency",
    template: "%s | Spiffy Tec",
  },
  description:
    "Spiffy Tec builds custom websites, SaaS platforms, and AI-powered tools for service businesses.",
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
  authors: [{ name: "Spiffy Tec" }],
  creator: "Spiffy Tec",
  metadataBase: new URL("https://spiffytec.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://spiffytec.com",
    siteName: "Spiffy Tec",
    title: "Spiffy Tec — Web Development & SaaS Agency | Cary, NC",
    description:
      "Custom websites, SaaS platforms, and mobile apps for businesses in the Triangle area and beyond.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Spiffy Tec",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spiffy Tec — Web Development & SaaS Agency | Cary, NC",
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
  name: "Spiffy Tec",
  alternateName: "Spiffy Tec",
  description:
    "Web development and SaaS agency specializing in custom websites, SaaS platforms, and mobile apps.",
  url: "https://spiffytec.com",
  telephone: "(984) 215-1498",
  email: "abdul@spiffytec.com",
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
    "https://github.com/spiffytec",
    "https://linkedin.com/company/spiffytec",
    "https://x.com/spiffytec",
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
