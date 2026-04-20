import { cn } from "@/lib/cn";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  highlight?: string;
  description?: string;
  centered?: boolean;
}

export function SectionHeader({
  badge,
  title,
  highlight,
  description,
  centered = true,
}: SectionHeaderProps) {
  const renderedTitle = highlight
    ? title.split(highlight).map((part, i, arr) => (
        <span key={i}>
          {part}
          {i < arr.length - 1 && (
            <span className="text-amber-dark">{highlight}</span>
          )}
        </span>
      ))
    : title;

  return (
    <div className={cn(centered && "text-center")}>
      {badge && (
        <span className="inline-block bg-amber-light text-amber-dark text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-navy leading-tight">
        {renderedTitle}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-gray-600 text-lg leading-relaxed max-w-2xl",
            centered && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
