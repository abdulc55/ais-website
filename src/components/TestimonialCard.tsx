import { Star, Quote, ExternalLink } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  business: string;
  quote: string;
  rating: number;
  /** Optional URL — if provided, the business name renders as a link to it. */
  businessUrl?: string;
}

export function TestimonialCard({
  name,
  business,
  quote,
  rating,
  businessUrl,
}: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-2xl card-shadow p-6 md:p-8 flex flex-col">
      {/* Stars */}
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating
                ? "fill-[var(--color-spiffy-orange)] text-[var(--color-spiffy-orange)]"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </div>

      {/* Quote icon — soft orange so it's visible on white */}
      <Quote className="w-8 h-8 text-[var(--color-spiffy-orange-soft)] mb-3" />

      {/* Quote text */}
      <p className="text-[var(--color-ink)] italic leading-relaxed flex-1 mb-5">
        &ldquo;{quote}&rdquo;
      </p>

      {/* Author */}
      <div>
        <p className="font-semibold text-[var(--color-ink)]">{name}</p>
        {businessUrl ? (
          <a
            href={businessUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--color-spiffy-orange)] hover:text-[var(--color-spiffy-orange-dark)] transition-colors font-medium"
          >
            {business}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        ) : (
          <p className="text-sm text-[var(--color-ink-muted)]">{business}</p>
        )}
      </div>
    </div>
  );
}
