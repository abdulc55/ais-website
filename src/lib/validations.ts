/**
 * Zod validation schemas for all API routes.
 * Per project conventions: "Zod for input validation on all API routes."
 */
import { z } from "zod";

// ─── Contact Form ───────────────────────────────────────────────────────────

const noLineBreaks = (label: string) => ({
  message: `${label} cannot contain line breaks.`,
  test: (value: string) => !/[\r\n]/.test(value),
});

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required.")
    .max(100, "Name is too long.")
    .refine(noLineBreaks("Name").test, noLineBreaks("Name").message),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .max(254, "Email is too long.")
    .email("Invalid email format.")
    .refine(noLineBreaks("Email").test, noLineBreaks("Email").message),
  message: z.string().min(1, "Message is required.").max(5000, "Message is too long (max 5,000 characters).").trim(),
  phone: z.string().trim().max(20, "Phone number is too long.").optional(),
  businessName: z.string().trim().max(100, "Business name is too long.").optional(),
  service: z.string().trim().max(50, "Service value is too long.").optional(),
  budget: z.string().trim().max(50, "Budget value is too long.").optional(),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

// ─── Admin Auth ─────────────────────────────────────────────────────────────

export const adminAuthSchema = z.object({
  password: z.string().min(1, "Password is required.").max(200, "Password is too long."),
});

// ─── Lead Outreach ──────────────────────────────────────────────────────────

export const markContactedSchema = z.object({
  businessId: z.number().int().positive("businessId must be a positive integer."),
  method: z.enum(["email", "phone", "sms"], {
    message: "Method must be email, phone, or sms.",
  }),
  notes: z.string().max(1000, "Notes are too long.").optional(),
});

// ─── Lead Analysis ──────────────────────────────────────────────────────────

export const analyzeUrlsSchema = z.object({
  urls: z
    .array(z.string().url("Each URL must be a valid URL."))
    .min(1, "At least one URL is required.")
    .max(10, "Maximum 10 URLs per request."),
  type: z
    .string()
    .trim()
    .max(50, "Type is too long.")
    .regex(/^[a-zA-Z0-9\-_]*$/, "Type contains invalid characters.")
    .optional(),
});

// ─── Lead Discovery ─────────────────────────────────────────────────────────

export const discoverLeadsSchema = z.object({
  businessType: z.string().min(1, "Business type is required.").max(50, "Business type is too long."),
  location: z
    .string()
    .trim()
    .min(1, "Location is required (e.g., 'Raleigh NC').")
    .max(100, "Location is too long.")
    .regex(/^[a-zA-Z0-9\s,\-\.]+$/, "Location contains invalid characters."),
  limit: z.number().int().min(1).max(25).default(25),
});
