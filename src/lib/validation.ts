import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const createIntakeFormSchema = z.object({
  label: z.string().min(1, "Label is required").max(200),
  expiresAt: z.string().datetime().optional(),
});

export const intakeStep1Schema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  industry: z.string().optional().default(""),
  yearsInBusiness: z.string().optional().default(""),
  city: z.string().optional().default(""),
  state: z.string().optional().default(""),
  serviceArea: z.string().optional().default(""),
  employees: z.string().optional().default(""),
  currentWebsite: z.string().optional().default(""),
  contactName: z.string().optional().default(""),
  contactEmail: z.string().email("Valid email is required"),
  contactPhone: z.string().optional().default(""),
  preferredContact: z.string().optional().default(""),
  bestTimeToReach: z.string().optional().default(""),
});

export const intakeStep2Schema = z.object({
  goals: z.array(z.string()).optional().default([]),
  primaryCta: z.string().optional().default(""),
});

export const intakeStep3Schema = z.object({
  services: z.array(z.object({
    name: z.string().min(1),
    price: z.string().optional().default(""),
    duration: z.string().optional().default(""),
  })).optional().default([]),
  cancellationPolicy: z.string().optional().default(""),
});

export const intakeStep4Schema = z.object({
  hasLogo: z.boolean().optional().default(false),
  brandColors: z.object({
    primary: z.string().optional().default(""),
    accent: z.string().optional().default(""),
    background: z.string().optional().default(""),
  }).optional().default({ primary: "", accent: "", background: "" }),
  stylePreference: z.string().optional().default(""),
  tagline: z.string().optional().default(""),
  desiredFeeling: z.string().optional().default(""),
  inspirationUrls: z.array(z.string()).optional().default([]),
});

export const intakeStep5Schema = z.object({
  pagesNeeded: z.array(z.string()).optional().default([]),
  featuresNeeded: z.array(z.string()).optional().default([]),
});

export const intakeStep6Schema = z.object({
  idealCustomer: z.string().optional().default(""),
  ageRange: z.string().optional().default(""),
  howCustomersFind: z.string().optional().default(""),
  competitors: z.array(z.string()).optional().default([]),
  differentiator: z.string().optional().default(""),
});

export const intakeStep7Schema = z.object({
  existingDomain: z.string().optional().default(""),
  existingHosting: z.string().optional().default(""),
  socialMedia: z.object({
    instagram: z.string().optional().default(""),
    facebook: z.string().optional().default(""),
    google: z.string().optional().default(""),
  }).optional().default({ instagram: "", facebook: "", google: "" }),
  budgetRange: z.string().optional().default(""),
  launchDate: z.string().optional().default(""),
  isUrgent: z.boolean().optional().default(false),
  additionalNotes: z.string().optional().default(""),
});

export const fullIntakeSchema = intakeStep1Schema
  .merge(intakeStep2Schema)
  .merge(intakeStep3Schema)
  .merge(intakeStep4Schema)
  .merge(intakeStep5Schema)
  .merge(intakeStep6Schema)
  .merge(intakeStep7Schema);
