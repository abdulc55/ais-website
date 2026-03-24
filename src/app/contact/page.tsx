import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Hero } from "@/components/Hero";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch for a free consultation. We build custom websites, SaaS platforms, and mobile apps for businesses in the Raleigh-Durham Triangle.",
};

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "abdulcaesar@aintelliagents.com",
    href: "mailto:abdulcaesar@aintelliagents.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "(984) 215-1498",
    href: "tel:+19842151498",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Cary, NC — Raleigh-Durham Triangle",
    href: null,
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Monday – Friday, 9am – 6pm EST",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <>
      <Hero
        title="Let's Build Something Together"
        highlight="Together"
        subtitle="Free strategy call, no strings attached. Tell us about your project and we'll get back to you within 24 hours."
      />

      <section className="bg-white py-20 md:py-28 px-4">
        <div className="max-w-6xl mx-auto grid gap-16 lg:grid-cols-5">
          {/* Left — Form */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold text-navy">Send Us a Message</h2>
            <p className="mt-2 text-gray-600">
              Fill out the form below and we&apos;ll be in touch shortly.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          {/* Right — Info Panel */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-surface-muted border border-gray-100 p-8">
              <h3 className="text-xl font-bold text-navy">Contact Info</h3>

              <div className="mt-6 space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-navy font-medium hover:text-primary-600 transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-navy font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Response time note */}
              <div className="mt-8 rounded-xl bg-primary-50 p-4">
                <p className="text-sm font-medium text-primary-700">
                  We respond to every inquiry within 24 hours. Usually much sooner.
                </p>
              </div>

              {/* Social links */}
              <div className="mt-8">
                <h4 className="text-sm font-semibold text-gray-500">Follow Us</h4>
                <div className="mt-3 flex gap-3">
                  {[
                    { name: "LinkedIn", url: "https://linkedin.com/in/abdulcaesar" },
                    { name: "GitHub", url: "https://github.com/abdulc55" },
                  ].map((platform) => (
                    <a
                      key={platform.name}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-white border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:border-primary-300 hover:text-primary-600 transition-colors"
                    >
                      {platform.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
