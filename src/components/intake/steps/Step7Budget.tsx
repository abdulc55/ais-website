"use client";

import type { IntakeFormData } from "@/types";
import { BUDGET_RANGES } from "@/lib/constants";

interface Props {
  data: IntakeFormData;
  onChange: (updates: Partial<IntakeFormData>) => void;
}

export default function Step7Budget({ data, onChange }: Props) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Budget & Details</h2>
      <p className="text-sm text-gray-500 mb-6">Almost done! A few final details</p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Budget</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {BUDGET_RANGES.map((range) => (
              <label
                key={range}
                className={`flex items-center justify-center p-3 rounded-xl border cursor-pointer text-sm transition-colors ${
                  data.budgetRange === range
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 text-gray-700 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="budgetRange"
                  value={range}
                  checked={data.budgetRange === range}
                  onChange={(e) => onChange({ budgetRange: e.target.value })}
                  className="sr-only"
                />
                {range}
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Existing Domain</label>
            <input
              type="text"
              value={data.existingDomain}
              onChange={(e) => onChange({ existingDomain: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., mybusiness.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Target Launch Date</label>
            <input
              type="text"
              value={data.launchDate}
              onChange={(e) => onChange({ launchDate: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., ASAP, Next month, April 2026"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={data.isUrgent}
              onChange={(e) => onChange({ isUrgent: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-900">This is urgent / time-sensitive</span>
          </label>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Social Media (optional)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              value={data.socialMedia.instagram}
              onChange={(e) => onChange({ socialMedia: { ...data.socialMedia, instagram: e.target.value } })}
              placeholder="Instagram URL"
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={data.socialMedia.facebook}
              onChange={(e) => onChange({ socialMedia: { ...data.socialMedia, facebook: e.target.value } })}
              placeholder="Facebook URL"
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={data.socialMedia.google}
              onChange={(e) => onChange({ socialMedia: { ...data.socialMedia, google: e.target.value } })}
              placeholder="Google Business URL"
              className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Anything else we should know?</label>
          <textarea
            value={data.additionalNotes}
            onChange={(e) => onChange({ additionalNotes: e.target.value })}
            rows={4}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Special requirements, deadlines, inspiration sites, or anything we should know..."
          />
        </div>
      </div>
    </div>
  );
}
