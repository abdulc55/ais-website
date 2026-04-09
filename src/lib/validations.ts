/**
 * Zod validation schemas for all API routes.
 * Per project conventions: "Zod for input validation on all API routes."
 */
import { z } from "zod";

// ─── Contact Form ───────────────────────────────────────────────────────────

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required.").trim(),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Invalid email format."),
  message: z.string().min(1, "Message is required.").trim(),
  phone: z.string().trim().optional(),
  businessName: z.string().trim().optional(),
  service: z.string().optional(),
  budget: z.string().optional(),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

// ─── Admin Auth ─────────────────────────────────────────────────────────────

export const adminAuthSchema = z.object({
  password: z.string().min(1, "Password is required."),
});

// ─── Lead Outreach ──────────────────────────────────────────────────────────

export const markContactedSchema = z.object({
  businessId: z.number().int().positive("businessId must be a positive integer."),
  method: z.enum(["email", "phone", "sms"], {
    message: "Method must be email, phone, or sms.",
  }),
  notes: z.string().optional(),
});

// ─── Lead Analysis ──────────────────────────────────────────────────────────

export const analyzeUrlsSchema = z.object({
  urls: z
    .array(z.string().url("Each URL must be a valid URL."))
    .min(1, "At least one URL is required.")
    .max(10, "Maximum 10 URLs per request."),
  type: z.string().optional(),
});

// ─── Lead Discovery ─────────────────────────────────────────────────────────

export const discoverLeadsSchema = z.object({
  businessType: z.string().min(1, "Business type is required."),
  location: z.string().trim().min(1, "Location is required (e.g., 'Raleigh NC')."),
  limit: z.number().int().min(1).max(25).default(25),
});
