import { Check } from "lucide-react";
import { siteConfig } from "@/siteConfig";

export default function AboutPage() {
  return (
    <>
      <section className="bg-canvas pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-6xl text-primary tracking-tight mb-4">
            {siteConfig.about.title}
          </h1>
        </div>
      </section>

      <section className="bg-canvas pb-20 md:pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-secondary leading-relaxed mb-10">
            {siteConfig.about.description}
          </p>
          <div className="space-y-3">
            {siteConfig.about.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-primary">{h}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
