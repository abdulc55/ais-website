/**
 * ServiceSchema — reusable JSON-LD Service schema component.
 * Drop into any service-specific or offer-specific page to add structured data
 * for richer search result treatment. Complements the LocalBusiness schema in layout.
 *
 * @example
 * <ServiceSchema
 *   name="Booking Platform Websites"
 *   description="Custom booking platforms with payments and admin dashboard."
 *   priceRange="$149-$599/mo"
 *   url="https://spiffytec.com/services"
 * />
 */
export function ServiceSchema({
  name,
  description,
  priceRange,
  url,
  serviceType = "Web Development",
  areaServed = ["Raleigh", "Cary", "Durham", "Chapel Hill", "Apex", "Morrisville"],
}: {
  name: string;
  description: string;
  priceRange?: string;
  url: string;
  serviceType?: string;
  areaServed?: string[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType,
    url,
    provider: {
      "@type": "LocalBusiness",
      name: "Spiffy Tec",
      url: "https://spiffytec.com",
      telephone: "(984) 215-1498",
      email: "abdul@spiffytec.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Cary",
        addressRegion: "NC",
        addressCountry: "US",
      },
    },
    areaServed: areaServed.map((city) => ({
      "@type": "City",
      name: city,
    })),
    ...(priceRange && {
      offers: {
        "@type": "Offer",
        priceSpecification: {
          "@type": "PriceSpecification",
          price: priceRange,
          priceCurrency: "USD",
        },
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
