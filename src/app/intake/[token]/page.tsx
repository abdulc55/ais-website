"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import IntakeWizard from "@/components/intake/IntakeWizard";
import { Zap, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function IntakePage() {
  const params = useParams();
  const token = params.token as string;
  const [, setFormLabel] = useState("");
  const [status, setStatus] = useState<"loading" | "ready" | "expired" | "not-found" | "submitted">("loading");

  useEffect(() => {
    fetch(`/api/intake/${token}`)
      .then((res) => {
        if (res.status === 404) { setStatus("not-found"); return null; }
        if (res.status === 410) { setStatus("expired"); return null; }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setFormLabel(data.label);
          setStatus("ready");
        }
      })
      .catch(() => setStatus("not-found"));
  }, [token]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (status === "not-found") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-gray-900 mb-2">Form Not Found</h1>
          <p className="text-gray-500">This intake form link is invalid or has been removed.</p>
        </div>
      </div>
    );
  }

  if (status === "expired") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-gray-900 mb-2">Form Expired</h1>
          <p className="text-gray-500">This intake form link has expired. Please contact us for a new one.</p>
        </div>
      </div>
    );
  }

  if (status === "submitted") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h1>
          <p className="text-gray-500 mb-4">
            Your information has been submitted successfully. Our team will review it and get back to you shortly.
          </p>
          <div className="inline-flex items-center gap-2 text-sm text-gray-400">
            <Zap className="w-4 h-4" />
            Powered by Spiffy Tec
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="brand-text text-4xl mb-2">Spiffy Tec</h1>
          <p className="text-[var(--color-ink-muted)] mt-3">Tell us about your business and we&apos;ll handle the rest</p>
        </div>
        <IntakeWizard token={token} onSubmitted={() => setStatus("submitted")} />
      </div>
    </div>
  );
}
