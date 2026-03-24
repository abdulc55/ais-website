interface TechBadgeProps {
  name: string;
}

export function TechBadge({ name }: TechBadgeProps) {
  return (
    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
      {name}
    </span>
  );
}
