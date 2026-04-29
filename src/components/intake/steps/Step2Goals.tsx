"use client";

import type { IntakeFormData } from "@/types";
import { GOALS_OPTIONS } from "@/lib/constants";

interface Props {
  data: IntakeFormData;
  onChange: (updates: Partial<IntakeFormData>) => void;
}

export default function Step2Goals({ data, onChange }: Props) {
  const toggleGoal = (goal: string) => {
    const goals = data.goals.includes(goal)
      ? data.goals.filter((g) => g !== goal)
      : [...data.goals, goal];
    onChange({ goals });
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Your Goals</h2>
      <p className="text-sm text-gray-500 mb-6">What do you want your website to achieve?</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {GOALS_OPTIONS.map((goal) => (
          <label
            key={goal}
            className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
              data.goals.includes(goal)
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <input
              type="checkbox"
              checked={data.goals.includes(goal)}
              onChange={() => toggleGoal(goal)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-900">{goal}</span>
          </label>
        ))}
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          What&apos;s the #1 action you want visitors to take?
        </label>
        <input
          type="text"
          value={data.primaryCta}
          onChange={(e) => onChange({ primaryCta: e.target.value })}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., Book an appointment, Call us, Request a quote"
        />
      </div>
    </div>
  );
}
