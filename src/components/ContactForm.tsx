"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

const serviceOptions = [
  "Custom Website",
  "SaaS Platform",
  "Mobile App",
  "AI Business Suite",
  "SEO & Marketing",
  "Not Sure",
];

const budgetOptions = [
  "$149/mo (Starter)",
  "$249/mo (Business)",
  "$399/mo (Growth)",
  "$599/mo (Premium)",
  "Need a custom quote",
];

type FormStatus = "idle" | "loading" | "success" | "error";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const inputBase =
  "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    service: "",
    budget: "",
    message: "",
  });

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!formData.name.trim()) errs.name = "Name is required.";
    if (!formData.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) errs.message = "Message is required.";
    return errs;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        businessName: "",
        service: "",
        budget: "",
        message: "",
      });
    } catch {
      setStatus("error");
    }
  }

  function update(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as keyof FormErrors];
        return next;
      });
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white rounded-2xl card-shadow p-8 md:p-12 text-center">
        <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-navy mb-2">Message Sent!</h3>
        <p className="text-gray-600">
          Thanks! We&apos;ll be in touch within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-primary-600 font-medium hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white rounded-2xl card-shadow p-6 md:p-8 space-y-5"
    >
      {/* Name & Email row */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cf-name" className="block text-sm font-medium text-navy mb-1.5">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="cf-name"
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => update("name", e.target.value)}
            className={cn(inputBase, errors.name && "border-red-400 focus:ring-red-400")}
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="cf-email" className="block text-sm font-medium text-navy mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="cf-email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => update("email", e.target.value)}
            className={cn(inputBase, errors.email && "border-red-400 focus:ring-red-400")}
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>
      </div>

      {/* Phone & Business row */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cf-phone" className="block text-sm font-medium text-navy mb-1.5">
            Phone <span className="text-gray-400 text-xs">(optional)</span>
          </label>
          <input
            id="cf-phone"
            type="tel"
            placeholder="(919) 555-0123"
            value={formData.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputBase}
          />
        </div>
        <div>
          <label htmlFor="cf-biz" className="block text-sm font-medium text-navy mb-1.5">
            Business Name <span className="text-gray-400 text-xs">(optional)</span>
          </label>
          <input
            id="cf-biz"
            type="text"
            placeholder="Acme Corp"
            value={formData.businessName}
            onChange={(e) => update("businessName", e.target.value)}
            className={inputBase}
          />
        </div>
      </div>

      {/* Service & Budget row */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cf-service" className="block text-sm font-medium text-navy mb-1.5">
            Service Interested In
          </label>
          <select
            id="cf-service"
            value={formData.service}
            onChange={(e) => update("service", e.target.value)}
            className={cn(inputBase, !formData.service && "text-gray-400")}
          >
            <option value="">Select a service</option>
            {serviceOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="cf-budget" className="block text-sm font-medium text-navy mb-1.5">
            Budget Range
          </label>
          <select
            id="cf-budget"
            value={formData.budget}
            onChange={(e) => update("budget", e.target.value)}
            className={cn(inputBase, !formData.budget && "text-gray-400")}
          >
            <option value="">Select a range</option>
            {budgetOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="cf-message" className="block text-sm font-medium text-navy mb-1.5">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="cf-message"
          rows={5}
          placeholder="Tell us about your project..."
          value={formData.message}
          onChange={(e) => update("message", e.target.value)}
          className={cn(inputBase, "resize-none", errors.message && "border-red-400 focus:ring-red-400")}
        />
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
      </div>

      {/* Error banner */}
      {status === "error" && (
        <div className="flex items-center gap-2 bg-red-50 text-red-600 text-sm rounded-lg px-4 py-3">
          <AlertCircle className="w-4 h-4 shrink-0" />
          Something went wrong. Please try again or email us directly.
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full cta-gradient text-white rounded-full px-6 py-3.5 font-semibold text-base transition-opacity hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
}
