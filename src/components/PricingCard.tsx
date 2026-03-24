import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

interface PricingCardProps {
  name: string;
  price: string;
  annualPrice?: string;
  annualSavings?: string;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  popular?: boolean;
  setupFee?: string;
  billingPeriod?: "monthly" | "annual";
}

export function PricingCard({
  name,
  price,
  annualPrice,
  annualSavings,
  period,
  description,
  features,
  cta,
  href,
  popular = false,
  setupFee,
  billingPeriod = "monthly",
}: PricingCardProps) {
  const isAnnual = billingPeriod === "annual" && annualPrice;
  const displayPrice = isAnnual ? annualPrice : price;
  const isFreeTier = setupFee === "$0 setup fee";

  return (
    <div
      className={cn(
        "bg-white rounded-2xl card-shadow flex flex-col relative overflow-hidden h-full",
        popular && "border-2 border-primary-500"
      )}
    >
      {popular && (
        <div className="cta-gradient text-white text-center text-xs font-bold uppercase tracking-wider py-2">
          Most Popular
        </div>
      )}

      <div className="p-6 md:p-8 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-navy mb-1">{name}</h3>
        <p className="text-sm text-gray-500 mb-5 min-h-[40px]">{description}</p>

        <div className="mb-6">
          {setupFee && (
            <span
              className={cn(
                "inline-block text-xs font-semibold rounded-full px-3 py-1 mb-3",
                isFreeTier
                  ? "text-green-600 bg-green-50 border border-green-200"
                  : "text-gray-600 bg-gray-50 border border-gray-200"
              )}
            >
              {setupFee}
            </span>
          )}
          <div>
            {isAnnual && (
              <span className="text-gray-400 text-sm line-through mr-2">
                {price}
              </span>
            )}
            <span className="text-4xl font-bold text-navy">{displayPrice}</span>
            {period && (
              <span className="text-gray-500 text-sm ml-1">{period}</span>
            )}
          </div>
          {isAnnual && annualSavings && (
            <span className="inline-block mt-2 text-xs font-semibold text-green-600 bg-green-50 border border-green-200 rounded-full px-3 py-1">
              Save {annualSavings}/yr
            </span>
          )}
        </div>

        <ul className="space-y-3 mb-8 flex-1">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm">
              <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>

        <Link
          href={href}
          className={cn(
            "block text-center rounded-full px-6 py-3 font-semibold transition-colors",
            popular
              ? "cta-gradient text-white hover:opacity-90"
              : "border-2 border-primary-500 text-primary-700 hover:bg-primary-50"
          )}
        >
          {cta}
        </Link>
      </div>
    </div>
  );
}
