"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import StepIndicator from "./StepIndicator";
import Step1Business from "./steps/Step1Business";
import Step2Goals from "./steps/Step2Goals";
import Step3Services from "./steps/Step3Services";
import Step4Brand from "./steps/Step4Brand";
import Step5Website from "./steps/Step5Website";
import Step6Customers from "./steps/Step6Customers";
import Step7Budget from "./steps/Step7Budget";
import type { IntakeFormData } from "@/types";
import {
  validateIntakeStep,
  validateIntakeStep1,
  type IntakeStepErrors,
} from "@/lib/intake-validation";

const STEPS = [
  { label: "Business", description: "Your business info" },
  { label: "Goals", description: "What you want" },
  { label: "Services", description: "What you offer" },
  { label: "Brand", description: "Your look & feel" },
  { label: "Website", description: "Pages & features" },
  { label: "Customers", description: "Who you serve" },
  { label: "Budget", description: "Budget & timeline" },
];

const emptyForm: IntakeFormData = {
  businessName: "", industry: "", yearsInBusiness: "", city: "", state: "",
  serviceArea: "", employees: "", currentWebsite: "", contactName: "",
  contactEmail: "", contactPhone: "", preferredContact: "", bestTimeToReach: "",
  goals: [], primaryCta: "",
  services: [], cancellationPolicy: "",
  hasLogo: false, brandColors: { primary: "", accent: "", background: "" },
  stylePreference: "", tagline: "", desiredFeeling: "", inspirationUrls: [],
  pagesNeeded: [], featuresNeeded: [],
  idealCustomer: "", ageRange: "", howCustomersFind: "", competitors: [], differentiator: "",
  existingDomain: "", existingHosting: "",
  socialMedia: { instagram: "", facebook: "", google: "" },
  budgetRange: "", launchDate: "", isUrgent: false, additionalNotes: "",
};

interface Props {
  token: string;
  onSubmitted: () => void;
}

export default function IntakeWizard({ token, onSubmitted }: Props) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<IntakeFormData>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<IntakeStepErrors>({});

  useEffect(() => {
    const saved = localStorage.getItem(`intake-${token}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData({ ...emptyForm, ...parsed.data });
        if (parsed.step) setStep(parsed.step);
      } catch { /* ignore */ }
    }
  }, [token]);

  useEffect(() => {
    localStorage.setItem(`intake-${token}`, JSON.stringify({ data: formData, step }));
  }, [formData, step, token]);

  const updateForm = (updates: Partial<IntakeFormData>) => {
    setFormData((prev) => {
      const next = { ...prev, ...updates };
      if (Object.keys(errors).length > 0) {
        const cleared: IntakeStepErrors = { ...errors };
        for (const key of Object.keys(updates) as (keyof IntakeFormData)[]) {
          delete cleared[key];
        }
        setErrors(cleared);
      }
      return next;
    });
  };

  const handleNext = () => {
    const stepErrors = validateIntakeStep(step, formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      toast.error("Please fix the highlighted fields before continuing.");
      return;
    }
    setErrors({});
    if (step < STEPS.length - 1) setStep(step + 1);
  };

  const handleBack = () => {
    setErrors({});
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = async () => {
    const step1Errors = validateIntakeStep1(formData);
    if (Object.keys(step1Errors).length > 0) {
      setErrors(step1Errors);
      setStep(0);
      toast.error("A required field is missing on step 1. We've taken you back to fix it.");
      return;
    }

    setErrors({});
    setSubmitting(true);
    try {
      const res = await fetch(`/api/intake/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        localStorage.removeItem(`intake-${token}`);
        onSubmitted();
      } else {
        const data = await res.json();
        toast.error(data.error || "Submission failed. Please try again.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    }
    setSubmitting(false);
  };

  const stepComponents = [
    <Step1Business key={0} data={formData} onChange={updateForm} errors={errors} />,
    <Step2Goals key={1} data={formData} onChange={updateForm} />,
    <Step3Services key={2} data={formData} onChange={updateForm} />,
    <Step4Brand key={3} data={formData} onChange={updateForm} />,
    <Step5Website key={4} data={formData} onChange={updateForm} />,
    <Step6Customers key={5} data={formData} onChange={updateForm} />,
    <Step7Budget key={6} data={formData} onChange={updateForm} />,
  ];

  return (
    <div>
      <StepIndicator steps={STEPS} currentStep={step} />

      <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 mt-6">
        {stepComponents[step]}

        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 0}
            className="px-6 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Back
          </button>

          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl px-6 py-2.5 text-sm transition-colors"
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-xl px-8 py-2.5 text-sm transition-colors"
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
