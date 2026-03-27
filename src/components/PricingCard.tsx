import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

interface PricingCardProps {
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
}

export function PricingCard({
  name,
  price,
  description,
  features,
  popular = false,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl card-shadow flex flex-col relative overflow-hidden h-full",
        popular && "border-2 border-primary-500 scale-[1.02]"
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

        <div className="mb-2">
          <span className="inline-block text-xs font-semibold rounded-full px-3 py-1 mb-3 text-green-600 bg-green-50 border border-green-200">
            $0 down payment
          </span>
          <div>
            <span className="text-4xl font-bold text-navy">${price}</span>
            <span className="text-gray-500 text-sm ml-1">/month</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">12-month partnership</p>
        </div>

        <ul className="space-y-3 mb-8 flex-1 mt-4">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm">
              <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className={cn(
            "block text-center rounded-full px-6 py-3 font-semibold transition-colors",
            popular
              ? "cta-gradient text-white hover:opacity-90"
              : "border-2 border-primary-500 text-primary-700 hover:bg-primary-50"
          )}
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
