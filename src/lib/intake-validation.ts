import type { IntakeFormData } from "@/types";

export type IntakeStepErrors = Partial<Record<keyof IntakeFormData, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateIntakeStep1(data: IntakeFormData): IntakeStepErrors {
  const errors: IntakeStepErrors = {};
  if (!data.businessName.trim()) {
    errors.businessName = "Business name is required";
  }
  if (!data.contactEmail.trim()) {
    errors.contactEmail = "Email is required";
  } else if (!EMAIL_RE.test(data.contactEmail.trim())) {
    errors.contactEmail = "Enter a valid email address";
  }
  return errors;
}

export function validateIntakeStep(step: number, data: IntakeFormData): IntakeStepErrors {
  if (step === 0) return validateIntakeStep1(data);
  return {};
}
