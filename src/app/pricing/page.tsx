import Link from "next/link";
import { ArrowRight, Smartphone, Search, Brain, Zap, Check, Shield, Globe, Headphones } from "lucide-react";
import { Hero } from "@/components/Hero";
import { PricingCard } from "@/components/PricingCard";

const tiers = [
  {
    name: "Starter",
    price: 149,
    description: "Perfect for new businesses that need a professional online presence.",
    features: [
      "3-5 page website",
      "Mobile responsive design",
      "Basic SEO optimization",
      "Contact form",
      "SSL certificate",
      "Hosting included",
      "1 hour/month edits",
      "48-hour support response",
    ],
  },
  {
    name: "Business",
    price: 249,
    popular: true,
    description: "For businesses ready to book clients and grow online.",
    features: [
      "Everything in Starter",
      "5-10 page website",
      "Online booking & scheduling",
      "Content management system",
      "Google Analytics",
      "Blog functionality",
      "2 hours/month edits",
      "24-hour support response",
    ],
  },
  {
    name: "Growth",
    price: 399,
    description: "Full platform with payments, user accounts, and custom features.",
    features: [
      "Everything in Business",
      "10-20 page website",
      "Stripe payment integration",
      "User accounts & login",
      "Admin dashboard",
      "Custom UI/UX design",
      "Unlimited edits",
      "Priority support",
    ],
  },
];

const addOns = [
  { icon: Brain, name: "AI Business Suite", price: "+$99/mo", note: "Chatbot, analytics & marketing AI" },
  { icon: Smartphone, name: "Mobile App", price: "+$99/mo", note: "iOS & Android companion app" },
  { icon: Search, name: "SEO Package", price: "+$149/mo", note: "Ongoing optimization & content" },
  { icon: Zap, name: "Rush Delivery", price: "+50%", note: "First month only" },
];

const includedInEvery = [
  { icon: Globe, label: "Premium Hosting" },
  { icon: Shield, label: "SSL Certificate" },
  { icon: Smartphone, label: "Mobile Responsive" },
  { icon: Headphones, label: "Ongoing Support" },
];

const faqs = [
  {
    q: "Why $0 down? What's the catch?",
    a: "No catch. Your monthly fee covers everything — design, development, hosting, SSL, and ongoing support. We invest in building your site because we earn your business every month. If we don't deliver value, you leave after 12 months.",
  },
  {
    q: "Is there a commitment period?",
    a: "All plans include a 12-month partnership. This ensures we can invest the time to build your site right and provide ongoing support. After 12 months, you switch to month-to-month — cancel anytime with 30 days notice.",
  },
  {
    q: "Do I own my website?",
    a: "Yes. After your 12-month commitment, you fully own all content, designs, and code. If you ever leave, we provide a complete export of everything.",
  },
  {
    q: "How long does it take to launch?",
    a: "Starter sites launch in 1-2 weeks. Business sites take 2-3 weeks. Growth platforms with payments and accounts take 3-4 weeks. You get a preview link to review before we go live.",
  },
  {
    q: "What happens if I cancel?",
    a: "After your 12-month commitment, cancel with 30 days notice. Your site goes offline at the end of your billing period. We provide a full export of your content — no hostage situations.",
  },
  {
    q: "What are the monthly edits?",
    a: "Text updates, image swaps, adding new sections, layout tweaks — anything that keeps your site fresh. Starter includes 1 hour/month, Business includes 2 hours/month, Growth includes unlimited edits.",
  },
  {
    q: "Can I upgrade my plan later?",
    a: "Absolutely. Upgrade anytime and new features are added within days. We build every project with scalability in mind so upgrades are seamless.",
  },
  {
    q: "What is the AI Business Suite?",
    a: "A set of AI tools built into your site: a 24/7 chatbot that answers questions and helps with booking, a business analytics dashboard with revenue predictions, and a marketing generator for social posts, emails, and review responses.",
  },
];

export default function PricingPage() {
  return (
    <>
      <Hero
        title="Zero Down. Zero Hassle."
        highlight="Zero Hassle"
        subtitle="Simple monthly pricing. No setup fees. No surprises. Just a website that makes you money."
      />

      {/* Included in Every Plan */}
      <section className="bg-white pt-20 md:pt-28 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {includedInEvery.map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-sm text-gray-600">
                <item.icon className="h-5 w-5 text-primary-600" />
                <span className="font-medium">{item.label}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-3">Included in every plan at no extra cost</p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="bg-white py-16 md:py-20 px-4">
        <div className="max-w-5xl mx-auto grid gap-8 grid-cols-1 md:grid-cols-3 items-stretch">
          {tiers.map((tier) => (
            <PricingCard key={tier.name} {...tier} />
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 mt-8 max-w-2xl mx-auto">
          All plans include a 12-month partnership. No setup fees. No hidden costs.
          After 12 months, switch to month-to-month anytime.
        </p>
      </section>

      {/* Feature Comparison Table */}
      <section className="bg-surface-muted py-20 md:py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-navy text-center mb-12">
            Compare Plans
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 pr-4 font-semibold text-navy">Feature</th>
                  <th className="text-center py-3 px-4 font-semibold text-navy">Starter</th>
                  <th className="text-center py-3 px-4 font-semibold text-primary-600">Business</th>
                  <th className="text-center py-3 px-4 font-semibold text-navy">Growth</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ["Pages", "3-5", "5-10", "10-20"],
                  ["Custom Design", false, true, true],
                  ["Mobile Responsive", true, true, true],
                  ["SEO Optimization", "Basic", "Advanced", "Advanced"],
                  ["Contact Form", true, true, true],
                  ["Booking System", false, true, true],
                  ["CMS / Blog", false, true, true],
                  ["Google Analytics", false, true, true],
                  ["Payment Processing", false, false, true],
                  ["User Accounts", false, false, true],
                  ["Admin Dashboard", false, false, true],
                  ["Monthly Edits", "1 hr", "2 hrs", "Unlimited"],
                  ["Support Response", "48 hrs", "24 hrs", "Priority"],
                ].map(([feature, ...values]) => (
                  <tr key={feature as string}>
                    <td className="py-3 pr-4 text-gray-700">{feature}</td>
                    {values.map((val, i) => (
                      <td key={i} className="text-center py-3 px-4">
                        {val === true ? (
                          <Check className="h-4 w-4 text-green-500 mx-auto" />
                        ) : val === false ? (
                          <span className="text-gray-300">—</span>
                        ) : (
                          <span className="text-gray-700 font-medium">{val}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="bg-white py-20 md:py-28 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-navy text-center">Supercharge Any Plan</h2>
          <p className="mt-3 text-gray-600 text-center">
            Add these optional services to any tier.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {addOns.map((addon) => (
              <div
                key={addon.name}
                className="rounded-2xl bg-white border border-gray-100 p-6 text-center card-shadow"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <addon.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-navy">{addon.name}</h3>
                <p className="mt-1 text-xl font-bold text-primary-600">{addon.price}</p>
                <p className="mt-1 text-sm text-gray-500">{addon.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface-muted py-20 md:py-28 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-navy text-center">
            Frequently Asked Questions
          </h2>

          <div className="mt-12 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-2xl border border-gray-200 bg-white overflow-hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 font-semibold text-navy hover:bg-gray-50 transition-colors [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span className="shrink-0 text-gray-400 transition-transform group-open:rotate-180">
                    &#9662;
                  </span>
                </summary>
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-20 md:py-28 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to Get Started?</h2>
          <p className="mt-4 text-lg text-gray-300">
            $0 down. Live in 2 weeks. Support every month.
          </p>
          <Link
            href="/contact"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-amber-500 px-8 py-3.5 font-semibold text-navy hover:bg-amber-400 transition-colors"
          >
            Book Your Free Strategy Call <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
