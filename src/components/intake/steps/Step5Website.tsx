"use client";

import type { IntakeFormData } from "@/types";
import { PAGES_OPTIONS, FEATURES_OPTIONS } from "@/lib/constants";

interface Props {
  data: IntakeFormData;
  onChange: (updates: Partial<IntakeFormData>) => void;
}

export default function Step5Website({ data, onChange }: Props) {
  const toggleItem = (key: "pagesNeeded" | "featuresNeeded", item: string) => {
    const current = data[key];
    const updated = current.includes(item)
      ? current.filter((i) => i !== item)
      : [...current, item];
    onChange({ [key]: updated });
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Your Website</h2>
      <p className="text-sm text-gray-500 mb-6">Select the pages and features you need</p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Pages</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {PAGES_OPTIONS.map((page) => (
              <label
                key={page}
                className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer text-sm transition-colors ${
                  data.pagesNeeded.includes(page)
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="checkbox"
                  checked={data.pagesNeeded.includes(page)}
                  onChange={() => toggleItem("pagesNeeded", page)}
                  className="w-3.5 h-3.5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-gray-900">{page}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Features</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {FEATURES_OPTIONS.map((feature) => (
              <label
                key={feature}
                className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer text-sm transition-colors ${
                  data.featuresNeeded.includes(feature)
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="checkbox"
                  checked={data.featuresNeeded.includes(feature)}
                  onChange={() => toggleItem("featuresNeeded", feature)}
                  className="w-3.5 h-3.5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-gray-900">{feature}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
