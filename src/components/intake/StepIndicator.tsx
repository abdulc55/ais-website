import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Props {
  steps: { label: string; description: string }[];
  currentStep: number;
}

export default function StepIndicator({ steps, currentStep }: Props) {
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                i < currentStep
                  ? "bg-blue-600 text-white"
                  : i === currentStep
                  ? "bg-blue-600 text-white ring-4 ring-blue-100"
                  : "bg-gray-100 text-gray-400"
              )}
            >
              {i < currentStep ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <span className={cn(
              "text-[10px] mt-1 hidden sm:block",
              i <= currentStep ? "text-blue-600 font-medium" : "text-gray-400"
            )}>
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={cn(
              "w-8 sm:w-12 h-0.5 mx-1",
              i < currentStep ? "bg-blue-600" : "bg-gray-200"
            )} />
          )}
        </div>
      ))}
    </div>
  );
}
