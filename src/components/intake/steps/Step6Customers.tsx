"use client";

import type { IntakeFormData } from "@/types";

interface Props {
  data: IntakeFormData;
  onChange: (updates: Partial<IntakeFormData>) => void;
}

export default function Step6Customers({ data, onChange }: Props) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Your Customers</h2>
      <p className="text-sm text-gray-500 mb-6">Help us understand who your website is for</p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Describe your ideal customer</label>
          <textarea
            value={data.idealCustomer}
            onChange={(e) => onChange({ idealCustomer: e.target.value })}
            rows={3}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Homeowners in the Raleigh area with mid-to-high income, own 2+ cars, value convenience"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Age Range</label>
            <input
              type="text"
              value={data.ageRange}
              onChange={(e) => onChange({ ageRange: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 25-55"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">How do customers find you?</label>
            <input
              type="text"
              value={data.howCustomersFind}
              onChange={(e) => onChange({ howCustomersFind: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Google, word of mouth, Instagram"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">What makes you different from competitors?</label>
          <textarea
            value={data.differentiator}
            onChange={(e) => onChange({ differentiator: e.target.value })}
            rows={2}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., We come to you, we use eco-friendly products, 10+ years experience"
          />
        </div>
      </div>
    </div>
  );
}
