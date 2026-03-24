import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  features: string[];
  price: string;
  priceLabel?: string;
  href: string;
  popular?: boolean;
}

export function ServiceCard({
  icon,
  title,
  description,
  features,
  price,
  priceLabel,
  href,
  popular = false,
}: ServiceCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl card-shadow p-6 md:p-8 relative flex flex-col",
        popular && "border-2 border-primary-500 ring-1 ring-primary-500/20"
      )}
    >
      {popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full">
          Most Popular
        </span>
      )}

      <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 mb-5">
        {icon}
      </div>

      <h3 className="text-xl font-bold text-navy mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-5">
        {description}
      </p>

      <ul className="space-y-2.5 mb-6 flex-1">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm">
            <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mb-5">
        <span className="text-3xl font-bold text-navy">{price}</span>
        {priceLabel && (
          <span className="text-gray-500 text-sm ml-1">{priceLabel}</span>
        )}
      </div>

      <Link
        href={href}
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
  );
}
