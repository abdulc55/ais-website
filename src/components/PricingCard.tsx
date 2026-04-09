import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

interface PricingCardProps {
  name: string;
  price: number;
  downPayment: number;
  description: string;
  features: string[];
  popular?: boolean;
}

export function PricingCard({
  name,
  price,
  downPayment,
  description,
  features,
  popular = false,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl card-shadow flex flex-col relative overflow-hidden h-full",
        popular && "border-2 border-amber scale-[1.02]"
      )}
    >
      {popular && (
        <div className="bg-amber text-navy-dark text-center text-xs font-bold uppercase tracking-wider py-2">
          Most Popular
        </div>
      )}

      <div className="p-6 md:p-8 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-navy mb-1">{name}</h3>
        <p className="text-sm text-text-muted mb-5 min-h-[40px]">{description}</p>

        <div className="mb-2">
          <span className="inline-block text-xs font-semibold rounded-full px-3 py-1 mb-3 text-navy bg-ice-muted border border-ice">
            ${downPayment} down payment
          </span>
          <div>
            <span className="text-4xl font-bold text-navy">${price}</span>
            <span className="text-text-muted text-sm ml-1">/month</span>
          </div>
          <p className="text-xs text-text-muted mt-1">12-month partnership</p>
        </div>

        <ul className="space-y-3 mb-8 flex-1 mt-4">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm">
              <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
              <span className="text-text">{feature}</span>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className={cn(
            "block text-center rounded-full px-6 py-3 font-semibold transition-colors",
            popular
              ? "bg-amber text-navy-dark hover:bg-amber-dark"
              : "border-2 border-navy text-navy hover:bg-navy hover:text-white"
          )}
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
