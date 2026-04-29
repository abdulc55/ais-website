"use client";

import type { IntakeFormData } from "@/types";
import { STYLE_OPTIONS } from "@/lib/constants";

interface Props {
  data: IntakeFormData;
  onChange: (updates: Partial<IntakeFormData>) => void;
}

export default function Step4Brand({ data, onChange }: Props) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Your Brand</h2>
      <p className="text-sm text-gray-500 mb-6">Help us match your website to your brand identity</p>

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={data.hasLogo}
              onChange={(e) => onChange({ hasLogo: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-900">I have a logo ready to use</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Brand Colors</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Primary Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={data.brandColors.primary || "#3b82f6"}
                  onChange={(e) => onChange({ brandColors: { ...data.brandColors, primary: e.target.value } })}
                  className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer"
                />
                <input
                  type="text"
                  value={data.brandColors.primary}
                  onChange={(e) => onChange({ brandColors: { ...data.brandColors, primary: e.target.value } })}
                  placeholder="#3b82f6"
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Accent Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={data.brandColors.accent || "#06b6d4"}
                  onChange={(e) => onChange({ brandColors: { ...data.brandColors, accent: e.target.value } })}
                  className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer"
                />
                <input
                  type="text"
                  value={data.brandColors.accent}
                  onChange={(e) => onChange({ brandColors: { ...data.brandColors, accent: e.target.value } })}
                  placeholder="#06b6d4"
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Background</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={data.brandColors.background || "#ffffff"}
                  onChange={(e) => onChange({ brandColors: { ...data.brandColors, background: e.target.value } })}
                  className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer"
                />
                <input
                  type="text"
                  value={data.brandColors.background}
                  onChange={(e) => onChange({ brandColors: { ...data.brandColors, background: e.target.value } })}
                  placeholder="#ffffff"
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">Leave blank and we&apos;ll choose colors based on your industry</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Style Preference</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {STYLE_OPTIONS.map((style) => (
              <label
                key={style}
                className={`flex items-center justify-center p-3 rounded-xl border cursor-pointer text-sm transition-colors ${
                  data.stylePreference === style
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 text-gray-700 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="stylePreference"
                  value={style}
                  checked={data.stylePreference === style}
                  onChange={(e) => onChange({ stylePreference: e.target.value })}
                  className="sr-only"
                />
                {style}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tagline / Slogan</label>
          <input
            type="text"
            value={data.tagline}
            onChange={(e) => onChange({ tagline: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 'Quality work, every time' or 'Your trusted partner'"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            How should your website make visitors feel?
          </label>
          <input
            type="text"
            value={data.desiredFeeling}
            onChange={(e) => onChange({ desiredFeeling: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Professional, trustworthy, premium"
          />
        </div>
      </div>
    </div>
  );
}
