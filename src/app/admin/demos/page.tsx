"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, ExternalLink, Eye, Copy, Check } from "lucide-react";
import toast from "react-hot-toast";

interface Demo {
  id: string;
  businessName: string;
  industry: string;
  city: string | null;
  previewToken: string | null;
  previewUrl: string | null;
  viewCount: number;
  lastViewedAt: string | null;
  expiresAt: string | null;
  createdAt: string;
}

export default function DemosPage() {
  const [demos, setDemos] = useState<Demo[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/demos")
      .then((r) => r.json())
      .then((data) => {
        setDemos(data.demos || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  function copyLink(url: string, id: string) {
    const fullUrl = `${window.location.origin}${url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    toast.success("Preview link copied!");
    setTimeout(() => setCopiedId(null), 2000);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales Demos</h1>
          <p className="text-sm text-gray-500 mt-1">Generate branded preview sites for prospects.</p>
        </div>
        <Link
          href="/admin/demos/new"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
        >
          <Plus size={16} />
          New Demo
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading...</div>
      ) : demos.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-gray-300 rounded-xl">
          <Eye size={32} className="mx-auto mb-3 text-gray-300" />
          <p className="text-gray-500 mb-4">No demos yet. Create one to start closing deals.</p>
          <Link
            href="/admin/demos/new"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            <Plus size={14} />
            Create Your First Demo
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {demos.map((demo) => (
            <div key={demo.id} className="border border-gray-200 rounded-xl bg-white p-5 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">{demo.businessName}</h3>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                  <span className="capitalize">{demo.industry}</span>
                  {demo.city && <span>· {demo.city}</span>}
                  <span>· {new Date(demo.createdAt).toLocaleDateString()}</span>
                  {demo.viewCount > 0 && (
                    <span className="text-blue-600 font-medium">
                      {demo.viewCount} view{demo.viewCount !== 1 ? "s" : ""}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {demo.previewUrl && (
                  <>
                    <button
                      onClick={() => copyLink(demo.previewUrl!, demo.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 transition"
                    >
                      {copiedId === demo.id ? <Check size={12} className="text-green-600" /> : <Copy size={12} />}
                      {copiedId === demo.id ? "Copied" : "Copy Link"}
                    </button>
                    <a
                      href={demo.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition"
                    >
                      <ExternalLink size={12} />
                      Preview
                    </a>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
