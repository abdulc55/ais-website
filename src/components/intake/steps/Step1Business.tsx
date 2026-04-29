"use client";

import type { IntakeFormData } from "@/types";
import { INDUSTRIES } from "@/lib/constants";
import type { IntakeStepErrors } from "@/lib/intake-validation";

interface Props {
  data: IntakeFormData;
  onChange: (updates: Partial<IntakeFormData>) => void;
  errors?: IntakeStepErrors;
}

const baseInput =
  "w-full border rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2";
const okBorder = "border-gray-200 focus:ring-blue-500";
const errBorder = "border-red-400 focus:ring-red-500";

function fieldClass(hasError: boolean) {
  return `${baseInput} ${hasError ? errBorder : okBorder}`;
}

export default function Step1Business({ data, onChange, errors = {} }: Props) {
  const isOther =
    data.industry === "Other" ||
    (data.industry !== "" && !INDUSTRIES.includes(data.industry as (typeof INDUSTRIES)[number]));
  const dropdownValue = isOther ? "Other" : data.industry;
  const customValue = isOther && data.industry !== "Other" ? data.industry : "";

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Your Business</h2>
      <p className="text-sm text-gray-500 mb-6">
        Only <span className="font-medium text-gray-700">Business Name</span> and{" "}
        <span className="font-medium text-gray-700">Email</span> are required — we&apos;ll fill in the
        rest from sensible defaults if you skip them.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Business Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.businessName}
            onChange={(e) => onChange({ businessName: e.target.value })}
            className={fieldClass(!!errors.businessName)}
            placeholder="e.g., Mike T Detailing"
            required
          />
          {errors.businessName && (
            <p className="mt-1 text-xs text-red-500">{errors.businessName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
          <select
            value={dropdownValue}
            onChange={(e) => onChange({ industry: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select industry...</option>
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
          {isOther && (
            <input
              type="text"
              value={customValue}
              onChange={(e) => onChange({ industry: e.target.value || "Other" })}
              className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Please specify your industry"
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Years in Business</label>
          <input
            type="text"
            value={data.yearsInBusiness}
            onChange={(e) => onChange({ yearsInBusiness: e.target.value })}
            className={fieldClass(false)}
            placeholder="e.g., 5 years"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <input
            type="text"
            value={data.city}
            onChange={(e) => onChange({ city: e.target.value })}
            className={fieldClass(false)}
            placeholder="e.g., Raleigh"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
          <input
            type="text"
            value={data.state}
            onChange={(e) => onChange({ state: e.target.value })}
            className={fieldClass(false)}
            placeholder="e.g., NC"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Service Area</label>
          <input
            type="text"
            value={data.serviceArea}
            onChange={(e) => onChange({ serviceArea: e.target.value })}
            className={fieldClass(false)}
            placeholder="e.g., Raleigh-Durham Triangle, 30 mile radius"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Current Website</label>
          <input
            type="text"
            value={data.currentWebsite}
            onChange={(e) => onChange({ currentWebsite: e.target.value })}
            className={fieldClass(false)}
            placeholder="e.g., www.example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Employees</label>
          <input
            type="text"
            value={data.employees}
            onChange={(e) => onChange({ employees: e.target.value })}
            className={fieldClass(false)}
            placeholder="e.g., 1-5"
          />
        </div>
      </div>

      <hr className="my-6 border-gray-100" />

      <h3 className="text-sm font-semibold text-gray-900 mb-4">Contact Information</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
          <input
            type="text"
            value={data.contactName}
            onChange={(e) => onChange({ contactName: e.target.value })}
            className={fieldClass(false)}
            placeholder="Full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={data.contactEmail}
            onChange={(e) => onChange({ contactEmail: e.target.value })}
            className={fieldClass(!!errors.contactEmail)}
            placeholder="you@business.com"
            required
          />
          {errors.contactEmail && (
            <p className="mt-1 text-xs text-red-500">{errors.contactEmail}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="tel"
            value={data.contactPhone}
            onChange={(e) => onChange({ contactPhone: e.target.value })}
            className={fieldClass(false)}
            placeholder="(555) 123-4567"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Best Time to Reach</label>
          <input
            type="text"
            value={data.bestTimeToReach}
            onChange={(e) => onChange({ bestTimeToReach: e.target.value })}
            className={fieldClass(false)}
            placeholder="e.g., Mornings, After 5pm"
          />
        </div>
      </div>
    </div>
  );
}
