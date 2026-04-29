import { SUBMISSION_STATUSES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function StatusBadge({ status }: { status: string }) {
  const found = SUBMISSION_STATUSES.find((s) => s.value === status);
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        found?.color || "bg-gray-100 text-gray-800"
      )}
    >
      {found?.label || status}
    </span>
  );
}
