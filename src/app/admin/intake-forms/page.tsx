"use client";

import { useState, useEffect } from "react";
import { Plus, Copy, ExternalLink, FileText } from "lucide-react";
import toast from "react-hot-toast";

interface IntakeForm {
  id: string;
  token: string;
  label: string;
  expiresAt: string | null;
  createdAt: string;
  _count: { submissions: number };
}

export default function FormsPage() {
  const [forms, setForms] = useState<IntakeForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [label, setLabel] = useState("");
  const [creating, setCreating] = useState(false);

  const fetchForms = async () => {
    const res = await fetch("/api/intake");
    if (res.ok) {
      const data = await res.json();
      setForms(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchForms();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!label.trim()) return;
    setCreating(true);

    const res = await fetch("/api/intake", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label: label.trim() }),
    });

    if (res.ok) {
      toast.success("Intake form created");
      setLabel("");
      setShowCreate(false);
      fetchForms();
    } else {
      const data = await res.json();
      toast.error(data.error || "Failed to create form");
    }
    setCreating(false);
  };

  const copyLink = (token: string) => {
    const url = `${window.location.origin}/intake/${token}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Intake Forms</h1>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Form Link
        </button>
      </div>

      {showCreate && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Create Intake Form Link</h3>
          <form onSubmit={handleCreate} className="flex gap-3">
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g., Mike T Detailing Intake, Law Firm Prospect"
              className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              disabled={creating}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-xl px-6 py-3 text-sm transition-colors"
            >
              {creating ? "Creating..." : "Create"}
            </button>
            <button
              type="button"
              onClick={() => setShowCreate(false)}
              className="text-gray-500 hover:text-gray-700 px-4 py-3 text-sm"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200">
        {loading ? (
          <div className="p-12 text-center text-gray-400">Loading...</div>
        ) : forms.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <FileText className="w-10 h-10 mx-auto mb-3 opacity-50" />
            <p>No intake forms yet</p>
            <p className="text-sm mt-1">Create one to share with your clients</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {forms.map((form) => (
              <div key={form.id} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{form.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {form._count.submissions} submission{form._count.submissions !== 1 ? "s" : ""} &middot;
                    Created {new Date(form.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyLink(form.token)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    Copy Link
                  </button>
                  <a
                    href={`/intake/${form.token}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Preview
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
