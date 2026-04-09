interface TechBadgeProps {
  name: string;
}

export function TechBadge({ name }: TechBadgeProps) {
  return (
    <span className="bg-surface-muted text-text border border-border px-3 py-1 rounded-full text-sm font-medium">
      {name}
    </span>
  );
}
