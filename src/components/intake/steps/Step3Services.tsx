"use client";

import { useEffect, useRef } from "react";
import type { IntakeFormData } from "@/types";
import { Plus, RefreshCcw, Trash2 } from "lucide-react";
import { DEFAULT_SERVICE_TEMPLATE, INDUSTRY_SERVICE_TEMPLATES } from "@/lib/constants";

interface Props {
  data: IntakeFormData;
  onChange: (updates: Partial<IntakeFormData>) => void;
}

function templateFor(industry: string) {
  const tpl = INDUSTRY_SERVICE_TEMPLATES[industry];
  if (tpl) return tpl.map((s) => ({ ...s }));
  return DEFAULT_SERVICE_TEMPLATE.map((s) => ({ ...s }));
}

export default function Step3Services({ data, onChange }: Props) {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    if (data.services.length === 0) {
      onChange({ services: templateFor(data.industry) });
    }
  }, [data.industry, data.services.length, onChange]);

  const addService = () => {
    onChange({ services: [...data.services, { name: "", price: "", duration: "" }] });
  };

  const removeService = (index: number) => {
    onChange({ services: data.services.filter((_, i) => i !== index) });
  };

  const updateService = (index: number, field: string, value: string) => {
    const updated = data.services.map((s, i) =>
      i === index ? { ...s, [field]: value } : s
    );
    onChange({ services: updated });
  };

  const useTemplate = () => {
    onChange({ services: templateFor(data.industry) });
  };

  const hasIndustryTemplate = data.industry !== "" && Boolean(INDUSTRY_SERVICE_TEMPLATES[data.industry]);

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Your Services</h2>
      <p className="text-sm text-gray-500 mb-6">
        {hasIndustryTemplate
          ? `We pre-filled common ${data.industry} services — edit, add, or remove anything below.`
          : "List the services or products you offer. Skip this step if you'd rather we suggest items based on your business."}
      </p>

      {data.services.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <p className="text-sm text-gray-500 mb-3">No services added yet</p>
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={addService}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 text-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Your First Service
            </button>
            {data.industry && (
              <button
                type="button"
                onClick={useTemplate}
                className="inline-flex items-center gap-2 border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium rounded-lg px-4 py-2 text-sm transition-colors"
              >
                <RefreshCcw className="w-4 h-4" />
                Use {hasIndustryTemplate ? data.industry : "Generic"} Template
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {data.services.map((service, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  value={service.name}
                  onChange={(e) => updateService(i, "name", e.target.value)}
                  placeholder="Service name"
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={service.price}
                  onChange={(e) => updateService(i, "price", e.target.value)}
                  placeholder="Price (e.g., $99)"
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={service.duration}
                  onChange={(e) => updateService(i, "duration", e.target.value)}
                  placeholder="Duration (e.g., 1-2 hrs)"
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="button"
                onClick={() => removeService(i)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Remove service"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={addService}
              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              <Plus className="w-4 h-4" />
              Add Another Service
            </button>
            {data.industry && (
              <button
                type="button"
                onClick={useTemplate}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 font-medium"
              >
                <RefreshCcw className="w-4 h-4" />
                Reset to {hasIndustryTemplate ? data.industry : "Generic"} Template
              </button>
            )}
          </div>
        </div>
      )}

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Cancellation Policy</label>
        <input
          type="text"
          value={data.cancellationPolicy}
          onChange={(e) => onChange({ cancellationPolicy: e.target.value })}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., Free cancellation up to 24 hours before"
        />
      </div>
    </div>
  );
}
