import type { Metadata, Viewport } from "next";
import { Inter, Bowlby_One } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { SiteChrome } from "@/components/SiteChrome";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// Brand wordmark font — close visual match to "Cosmic Octo" until we self-host
// the actual licensed font file. Drop a .woff2 at public/fonts/cosmic-octo.woff2
// and override --font-cosmic-octo in globals.css to use the real one.
const brandFont = Bowlby_One({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-cosmic-octo",
});

export const metadata: Metadata = {
  title: {
    default: "Spiffy Tec — A real website shouldn't be a luxury",
    template: "%s | Spiffy Tec",
  },
  description:
    "Spiffy Tec builds custom-coded websites, booking platforms, and AI tools — accessible to every business, not just the ones with a $20K budget. Live in 2-3 weeks. Plans from $99/mo, no upfront cost.",
  keywords: [
    "affordable web design",
    "small business website",
    "custom website",
    "booking platform",
    "Cary NC web design",
    "Raleigh web design",
    "Durham web design",
    "Triangle web development",
    "Next.js agency",
    "monthly website pricing",
  ],
  authors: [{ name: "Abdul Shakur Caesar" }],
  creator: "Spiffy Tec",
  metadataBase: new URL("https://spiffytec.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://spiffytec.com",
    siteName: "Spiffy Tec",
    title: "Spiffy Tec — A real website shouldn't be a luxury",
    description:
      "Custom-built websites, booking systems, and AI tools — accessible to every business. Live in 2-3 weeks, no upfront cost, plans from $99/mo.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spiffy Tec — A real website shouldn't be a luxury",
    description:
      "Custom-built websites, booking systems, and AI tools — live in 2-3 weeks, no upfront cost.",
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

export const viewport: Viewport = {
  themeColor: "#FF751F",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Spiffy Tec",
  alternateName: "Spiffy Tec",
  description:
    "Spiffy Tec builds custom-coded websites, booking platforms, and AI tools accessible to every business — live in 2-3 weeks, no upfront cost, plans from $99/mo.",
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
    "https://instagram.com/spiffytec",
    "https://github.com/abdulc55",
    "https://linkedin.com/company/spiffytec",
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
    <html lang="en" className={`${inter.variable} ${brandFont.variable} ${inter.className} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>
          <SiteChrome>{children}</SiteChrome>
        </Providers>
      </body>
    </html>
  );
}
