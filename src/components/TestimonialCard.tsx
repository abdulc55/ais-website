import { Star, Quote } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  business: string;
  quote: string;
  rating: number;
}

export function TestimonialCard({
  name,
  business,
  quote,
  rating,
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
                ? "fill-amber text-amber"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </div>

      {/* Quote icon */}
      <Quote className="w-8 h-8 text-ice mb-3" />

      {/* Quote text */}
      <p className="text-gray-700 italic leading-relaxed flex-1 mb-5">
        &ldquo;{quote}&rdquo;
      </p>

      {/* Author */}
      <div>
        <p className="font-semibold text-navy">{name}</p>
        <p className="text-sm text-gray-500">{business}</p>
      </div>
    </div>
  );
}
