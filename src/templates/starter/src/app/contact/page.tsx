import { Phone, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/siteConfig";

export default function ContactPage() {
  return (
    <>
      <section className="bg-canvas pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-6xl text-primary tracking-tight mb-4">
            {siteConfig.contact.title}
          </h1>
          <p className="text-secondary text-lg">{siteConfig.contact.subtitle}</p>
        </div>
      </section>

      <section className="bg-canvas pb-20 md:pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-display text-2xl text-primary mb-6">
                Contact information
              </h2>
              <div className="space-y-4">
                {siteConfig.business.phone && (
                  <a
                    href={`tel:${siteConfig.business.phone}`}
                    className="flex items-center gap-3 text-secondary hover:text-primary transition"
                  >
                    <div className="w-10 h-10 bg-accent-soft rounded-md flex items-center justify-center">
                      <Phone className="w-5 h-5 text-accent" />
                    </div>
                    {siteConfig.business.phone}
                  </a>
                )}
                <a
                  href={`mailto:${siteConfig.business.email}`}
                  className="flex items-center gap-3 text-secondary hover:text-primary transition"
                >
                  <div className="w-10 h-10 bg-accent-soft rounded-md flex items-center justify-center">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  {siteConfig.business.email}
                </a>
                {siteConfig.business.address && (
                  <div className="flex items-center gap-3 text-secondary">
                    <div className="w-10 h-10 bg-accent-soft rounded-md flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                    {siteConfig.business.address}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-surface border border-border-subtle rounded-2xl p-8 shadow-sm">
              <h3 className="text-lg font-semibold text-primary mb-4">
                Send us a message
              </h3>
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full bg-surface border border-border-subtle rounded-md px-4 py-3 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full bg-surface border border-border-subtle rounded-md px-4 py-3 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
                  />
                </div>
                <div>
                  <textarea
                    rows={4}
                    placeholder="Your message"
                    className="w-full bg-surface border border-border-subtle rounded-md px-4 py-3 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent-dark text-white font-semibold rounded-md px-6 py-3 text-sm transition shadow-sm"
                >
                  Send message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
