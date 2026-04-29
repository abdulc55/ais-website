import { siteConfig } from "@/siteConfig";

export default function ServicesPage() {
  return (
    <>
      <section className="bg-canvas pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-6xl text-primary tracking-tight mb-4">
            {siteConfig.services.sectionTitle}
          </h1>
        </div>
      </section>

      <section className="bg-muted py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteConfig.services.items.map((service, i) => (
              <div
                key={i}
                className="bg-surface rounded-xl border border-border-subtle p-7 transition hover:border-border-strong hover:shadow-sm"
              >
                <div className="w-10 h-10 bg-accent-soft rounded-md flex items-center justify-center mb-4">
                  <span className="text-accent font-display text-lg">
                    {service.icon.charAt(0)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  {service.title}
                </h3>
                <p className="text-secondary text-sm mb-3 leading-relaxed">
                  {service.description}
                </p>
                {service.price && (
                  <p className="text-accent font-semibold text-lg">
                    {service.price}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
