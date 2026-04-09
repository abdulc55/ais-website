import { cn } from "@/lib/cn";
import { TechBadge } from "@/components/TechBadge";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  featured?: boolean;
  imagePlaceholder?: string;
}

export function ProjectCard({
  title,
  description,
  tags,
  featured = false,
  imagePlaceholder,
}: ProjectCardProps) {
  const placeholder = (
    <div
      className={cn(
        "bg-gradient-to-br from-navy-dark via-navy to-navy-light flex items-center justify-center",
        featured ? "h-full min-h-[240px]" : "h-48 md:h-56"
      )}
    >
      <span className="text-ice/50 text-sm font-medium">
        {imagePlaceholder ?? "Screenshot coming soon"}
      </span>
    </div>
  );

  if (featured) {
    return (
      <div className="bg-white rounded-2xl card-shadow overflow-hidden grid md:grid-cols-2">
        {placeholder}
        <div className="p-6 md:p-8 flex flex-col justify-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-dark mb-2">
            Featured Project
          </span>
          <h3 className="text-2xl font-bold text-navy mb-3">{title}</h3>
          <p className="text-gray-600 leading-relaxed mb-5">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <TechBadge key={tag} name={tag} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden flex flex-col">
      {placeholder}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-navy mb-2">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <TechBadge key={tag} name={tag} />
          ))}
        </div>
      </div>
    </div>
  );
}
