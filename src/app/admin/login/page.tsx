"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Lock } from "lucide-react";

function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/admin/leads";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push(redirect);
      } else {
        const data = await res.json();
        setError(data.error || "Invalid password");
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-muted px-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center">
              <Lock className="w-6 h-6 text-primary-600" />
            </div>
          </div>
          <h1 className="text-xl font-bold text-navy text-center mb-1">
            Admin Access
          </h1>
          <p className="text-sm text-gray-500 text-center mb-6">
            Enter your password to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoFocus
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-navy focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />

            {error && (
              <p className="text-sm text-red-600 text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full py-3 rounded-xl font-semibold text-white cta-gradient disabled:opacity-50 transition"
            >
              {loading ? "Verifying..." : "Sign In"}
            </button>
          </form>
        </div>
        <p className="text-xs text-gray-400 text-center mt-4">
          Spiffy Tec Admin Panel
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
