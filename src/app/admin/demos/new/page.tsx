"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Sparkles, Plus, X } from "lucide-react";
import { INDUSTRIES } from "@/lib/constants";
import toast from "react-hot-toast";

export default function NewDemoPage() {
  return (
    <Suspense>
      <NewDemoForm />
    </Suspense>
  );
}

function NewDemoForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const leadId = searchParams.get("leadId");

  const [loading, setLoading] = useState(false);
  const [prefilling, setPrefilling] = useState(false);
  const [serviceInput, setServiceInput] = useState("");
  const [form, setForm] = useState({
    businessName: "",
    industry: "",
    city: "",
    phone: "",
    email: "",
    tagline: "",
    services: [] as string[],
    primaryCta: "",
    colorPrimary: "",
    colorAccent: "",
    style: "",
    notes: "",
  });

  // Prefill from ProspectIQ if leadId is provided
  async function handlePrefill() {
    if (!leadId) return;
    setPrefilling(true);
    try {
      const res = await fetch(`/api/demos/prefill?leadId=${leadId}`);
      if (!res.ok) throw new Error("Prefill failed");
      const data = await res.json();
      setForm((prev) => ({ ...prev, ...data }));
      toast.success("Prefilled from ProspectIQ");
    } catch {
      toast.error("Could not prefill from ProspectIQ");
    } finally {
      setPrefilling(false);
    }
  }

  function addService() {
    if (!serviceInput.trim()) return;
    setForm((prev) => ({ ...prev, services: [...prev.services, serviceInput.trim()] }));
    setServiceInput("");
  }

  function removeService(index: number) {
    setForm((prev) => ({ ...prev, services: prev.services.filter((_, i) => i !== index) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.businessName || !form.industry || !form.city) {
      toast.error("Business name, industry, and city are required");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/demos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, prospectiqLeadId: leadId || undefined }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create demo");
      }

      const data = await res.json();
      toast.success("Demo created!");

      // Copy preview link to clipboard
      const fullUrl = `${window.location.origin}${data.previewUrl}`;
      navigator.clipboard.writeText(fullUrl).catch(() => {});

      router.push("/admin/demos");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const inputClass = "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition";

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Sales Demo</h1>
      <p className="text-sm text-gray-500 mb-8">
        Fill in the prospect&apos;s details to generate a branded preview site.
      </p>

      {leadId && (
        <button
          onClick={handlePrefill}
          disabled={prefilling}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-700 text-sm font-medium hover:bg-blue-100 transition disabled:opacity-60"
        >
          {prefilling ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
          {prefilling ? "Loading from ProspectIQ..." : "Prefill from ProspectIQ"}
        </button>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Required fields */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Business Name *</label>
            <input value={form.businessName} onChange={(e) => setForm({ ...form, businessName: e.target.value })} required placeholder="Mike T Detailing" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry *</label>
            <select value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} required className={inputClass}>
              <option value="">Select industry</option>
              {INDUSTRIES.map((ind) => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">City / Area *</label>
          <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} required placeholder="Cary, NC" className={inputClass} />
        </div>

        {/* Optional fields */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="(919) 555-0123" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="info@business.com" className={inputClass} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
          <input value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} placeholder="Auto-generated from industry if left blank" className={inputClass} />
        </div>

        {/* Services */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Services</label>
          <div className="flex gap-2 mb-2">
            <input value={serviceInput} onChange={(e) => setServiceInput(e.target.value)} placeholder="e.g. Full Detail" className={`${inputClass} flex-1`}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addService(); } }} />
            <button type="button" onClick={addService} className="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition">
              <Plus size={16} />
            </button>
          </div>
          {form.services.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {form.services.map((s, i) => (
                <span key={i} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-700">
                  {s}
                  <button type="button" onClick={() => removeService(i)} className="text-gray-400 hover:text-red-500">
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Primary CTA</label>
          <input value={form.primaryCta} onChange={(e) => setForm({ ...form, primaryCta: e.target.value })} placeholder="Auto from industry (e.g. Book Now)" className={inputClass} />
        </div>

        {/* Colors */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color</label>
            <div className="flex items-center gap-2">
              <input type="color" value={form.colorPrimary || "#1e3a5f"} onChange={(e) => setForm({ ...form, colorPrimary: e.target.value })} className="w-10 h-10 rounded border cursor-pointer" />
              <input value={form.colorPrimary} onChange={(e) => setForm({ ...form, colorPrimary: e.target.value })} placeholder="Use industry default" className={`${inputClass} flex-1`} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Accent Color</label>
            <div className="flex items-center gap-2">
              <input type="color" value={form.colorAccent || "#c9a84c"} onChange={(e) => setForm({ ...form, colorAccent: e.target.value })} className="w-10 h-10 rounded border cursor-pointer" />
              <input value={form.colorAccent} onChange={(e) => setForm({ ...form, colorAccent: e.target.value })} placeholder="Use industry default" className={`${inputClass} flex-1`} />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Internal Notes</label>
          <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} placeholder="Sales notes (not shown on preview)" className={inputClass} />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {loading ? <><Loader2 size={16} className="animate-spin" /> Generating...</> : <><Sparkles size={16} /> Generate Demo Preview</>}
        </button>
      </form>
    </div>
  );
}
