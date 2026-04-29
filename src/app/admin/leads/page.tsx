"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  BarChart3,
  Users,
  TrendingUp,
  DollarSign,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Copy,
  Check,
  Phone,
  Mail,
  MessageSquare,
  Filter,
  ArrowUpDown,
  RefreshCw,
  AlertTriangle,
  AlertCircle,
  Info,
  Search,
  Plus,
  Loader2,
  Globe,
  X,
  Flame,
  MapPin,
  Star,
  BookOpenText,
} from "lucide-react";
import { cn } from "@/lib/cn";

interface Finding {
  category: string;
  issue: string;
  severity: "critical" | "warning" | "info";
  penalty: number;
  pitchPoint: string;
}

interface Lead {
  id: number;
  name: string;
  website: string;
  phone: string | null;
  address: string | null;
  businessType: string | null;
  googleRating: number | null;
  googleReviews: number | null;
  score: number;
  scoreLabel: string;
  loadTimeMs: number;
  pageSizeKb: number;
  findingCount: number;
  criticalCount: number;
  recommendedTier: string;
  monthlyPrice: number;
  estimatedMrr: number;
  findings: string;
  pitchPoints: string;
  scannedAt: string;
  contacted: boolean;
  lastContactedAt: string | null;
}

interface NoWebsiteLead {
  id: number;
  name: string;
  phone: string | null;
  address: string | null;
  businessType: string | null;
  googleRating: number | null;
  googleReviews: number | null;
  createdAt: string;
  contacted: boolean;
  lastContactedAt: string | null;
}

interface DashboardData {
  stats: { total: number; avgScore: number; hotLeads: number; potentialMRR: number };
  byLabel: { label: string; count: number }[];
  byType: { type: string; count: number; avgScore: number }[];
  leads: Lead[];
  noWebsiteLeads: NoWebsiteLead[];
  noWebsiteCount: number;
}

const SCORE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  critical: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
  poor: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  fair: { bg: "bg-cyan-50", text: "text-cyan-700", border: "border-cyan-200" },
  decent: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
  good: { bg: "bg-gray-50", text: "text-gray-500", border: "border-gray-200" },
};

const BAR_COLORS: Record<string, string> = {
  critical: "bg-red-500",
  poor: "bg-amber-500",
  fair: "bg-cyan-500",
  decent: "bg-green-500",
  good: "bg-gray-400",
};

const SEVERITY_ICONS = {
  critical: AlertTriangle,
  warning: AlertCircle,
  info: Info,
};

export default function LeadsDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [filterLabel, setFilterLabel] = useState("");
  const [filterType, setFilterType] = useState("");
  const [sortField, setSortField] = useState("score");
  const [sortOrder, setSortOrder] = useState("desc");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  // ── Scanner Form State ────────────────────────────────────────────────
  const [showScanner, setShowScanner] = useState(false);
  const [scannerTab, setScannerTab] = useState<"search" | "urls">("search");

  // Search by Area state
  const [searchType, setSearchType] = useState("detailing");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchLimit, setSearchLimit] = useState(25);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [searchSuccess, setSearchSuccess] = useState("");

  // Main view tab
  const [viewTab, setViewTab] = useState<"scanned" | "no-website">("scanned");

  // Analyze URLs state
  const [analyzeUrls, setAnalyzeUrls] = useState("");
  const [analyzeType, setAnalyzeType] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzeError, setAnalyzeError] = useState("");
  const [analyzeSuccess, setAnalyzeSuccess] = useState("");

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setSearchError("");
    setSearchSuccess("");

    if (!searchLocation.trim()) {
      setSearchError("Enter a location (e.g., Raleigh NC)");
      return;
    }

    setSearching(true);
    try {
      const res = await fetch("/api/admin/leads/discover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessType: searchType,
          location: searchLocation.trim(),
          limit: searchLimit,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Search failed");

      setSearchSuccess(
        `Found and analyzed ${data.count} business(es) for "${data.query}". Results added to dashboard.`
      );
      setSearchLocation("");
      fetchData();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Search failed";
      setSearchError(message);
    } finally {
      setSearching(false);
    }
  }

  async function handleAnalyze(e: React.FormEvent) {
    e.preventDefault();
    setAnalyzeError("");
    setAnalyzeSuccess("");

    // Parse URLs from textarea (one per line or comma-separated)
    const urls = analyzeUrls
      .split(/[\n,]+/)
      .map((u) => u.trim())
      .filter(Boolean)
      .map((u) => (u.startsWith("http") ? u : `https://${u}`));

    if (urls.length === 0) {
      setAnalyzeError("Enter at least one URL");
      return;
    }
    if (urls.length > 10) {
      setAnalyzeError("Maximum 10 URLs at a time");
      return;
    }

    setAnalyzing(true);
    try {
      const res = await fetch("/api/admin/leads/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls, type: analyzeType || undefined }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Analysis failed");

      const count = data.report?.totalBusinesses || urls.length;
      setAnalyzeSuccess(`Analyzed ${count} website(s). Results added to dashboard.`);
      setAnalyzeUrls("");
      setAnalyzeType("");
      fetchData(); // Refresh the dashboard
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Analysis failed";
      setAnalyzeError(message);
    } finally {
      setAnalyzing(false);
    }
  }

  async function fetchData() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterLabel) params.set("label", filterLabel);
      if (filterType) params.set("type", filterType);
      if (sortField) params.set("sort", sortField);
      if (sortOrder) params.set("order", sortOrder);

      const res = await fetch(`/api/admin/leads?${params}`);
      if (!res.ok) throw new Error("Failed to load");
      setData(await res.json());
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load leads");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterLabel, filterType, sortField, sortOrder]);

  async function handleMarkContacted(businessId: number, method: string) {
    await fetch("/api/admin/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ businessId, method }),
    });
    fetchData();
  }

  function copyPitch(text: string, idx: number) {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  }

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-surface-muted flex items-center justify-center">
        <div className="animate-spin"><RefreshCw className="w-8 h-8 text-primary-500" /></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-surface-muted flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-medium mb-2">Error loading leads</p>
          <p className="text-gray-500 text-sm">{error}</p>
          <button onClick={fetchData} className="mt-4 text-primary-600 underline text-sm">Retry</button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const maxBarCount = Math.max(...data.byLabel.map((b) => b.count), 1);

  return (
    <div className="min-h-screen bg-surface-muted">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-navy">Lead Scanner</h1>
              <p className="text-sm text-gray-500 mt-1">
                Website audit results and sales opportunities
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/admin/docs"
                className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm text-gray-600 transition hover:bg-gray-50"
              >
                <BookOpenText className="w-4 h-4" /> Docs
              </Link>
              <button
                onClick={() => setShowScanner(!showScanner)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition",
                  showScanner
                    ? "bg-primary-600 text-white"
                    : "bg-primary-50 text-primary-700 hover:bg-primary-100 border border-primary-200"
                )}
              >
                {showScanner ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                {showScanner ? "Close" : "Find Leads"}
              </button>
              <button
                onClick={fetchData}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition"
              >
                <RefreshCw className="w-4 h-4" /> Refresh
              </button>
            </div>
          </div>

          {/* ── Scanner Panel (Tabbed) ─────────────────────────── */}
          {showScanner && (
            <div className="mt-6 bg-primary-50/50 border border-primary-100 rounded-2xl overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-primary-100">
                <button
                  onClick={() => setScannerTab("search")}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition",
                    scannerTab === "search"
                      ? "bg-white text-primary-700 border-b-2 border-primary-600"
                      : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  <Search className="w-4 h-4" /> Search by Area
                </button>
                <button
                  onClick={() => setScannerTab("urls")}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition",
                    scannerTab === "urls"
                      ? "bg-white text-primary-700 border-b-2 border-primary-600"
                      : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  <Globe className="w-4 h-4" /> Analyze URLs
                </button>
              </div>

              <div className="p-6">
                {/* ── Tab 1: Search by Area ──────────────────────── */}
                {scannerTab === "search" && (
                  <form onSubmit={handleSearch}>
                    <p className="text-sm text-gray-500 mb-4">
                      Search Google for businesses in a specific area. We&apos;ll find them, analyze their websites, and show you which ones need an upgrade.
                    </p>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Business Type</label>
                        <select
                          value={searchType}
                          onChange={(e) => setSearchType(e.target.value)}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-navy bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                          disabled={searching}
                        >
                          <option value="detailing">Auto Detailing</option>
                          <option value="pressure-washing">Pressure Washing</option>
                          <option value="lawn-care">Lawn Care</option>
                          <option value="cleaning">House Cleaning</option>
                          <option value="restaurant">Restaurant</option>
                          <option value="law-firm">Law Firm</option>
                          <option value="dental">Dental Practice</option>
                          <option value="salon">Salon / Barbershop</option>
                          <option value="gym">Gym / Fitness</option>
                          <option value="boutique">Boutique / Retail</option>
                          <option value="plumber">Plumber</option>
                          <option value="electrician">Electrician</option>
                          <option value="hvac">HVAC</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Location</label>
                        <input
                          type="text"
                          value={searchLocation}
                          onChange={(e) => setSearchLocation(e.target.value)}
                          placeholder="Raleigh NC"
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                          disabled={searching}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Max Results</label>
                        <select
                          value={searchLimit}
                          onChange={(e) => setSearchLimit(Number(e.target.value))}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-navy bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                          disabled={searching}
                        >
                          <option value={5}>5 businesses</option>
                          <option value={10}>10 businesses</option>
                          <option value={15}>15 businesses</option>
                          <option value={20}>20 businesses</option>
                          <option value={25}>25 businesses</option>
                        </select>
                      </div>
                      <div className="flex items-end">
                        <button
                          type="submit"
                          disabled={searching || !searchLocation.trim()}
                          className={cn(
                            "w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition",
                            searching
                              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                              : "bg-[var(--color-spiffy-orange)] text-white hover:bg-[var(--color-spiffy-orange-dark)]"
                          )}
                        >
                          {searching ? (
                            <><Loader2 className="w-4 h-4 animate-spin" /> Scanning area...</>
                          ) : (
                            <><Search className="w-4 h-4" /> Find Leads</>
                          )}
                        </button>
                      </div>
                    </div>

                    {searching && (
                      <div className="mt-4 px-4 py-3 rounded-lg bg-primary-50 border border-primary-200 text-primary-700 text-sm flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                        Searching Google Places for {searchType.replace("-", " ")} businesses near {searchLocation}. Analyzing each website (this can take 1-2 minutes for {searchLimit} sites)...
                      </div>
                    )}

                    {searchError && (
                      <div className="mt-3 px-4 py-2 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" /> {searchError}
                      </div>
                    )}
                    {searchSuccess && (
                      <div className="mt-3 px-4 py-2 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm flex items-center gap-2">
                        <Check className="w-4 h-4 shrink-0" /> {searchSuccess}
                      </div>
                    )}
                  </form>
                )}

                {/* ── Tab 2: Analyze URLs ────────────────────────── */}
                {scannerTab === "urls" && (
                  <form onSubmit={handleAnalyze}>
                    <p className="text-sm text-gray-500 mb-4">
                      Enter specific website URLs to scan. We&apos;ll analyze 16 categories and generate a score + sales pitch.
                    </p>
                    <div className="grid gap-4 md:grid-cols-[1fr_200px_auto]">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Website URL(s) — one per line</label>
                        <textarea
                          value={analyzeUrls}
                          onChange={(e) => setAnalyzeUrls(e.target.value)}
                          placeholder={"https://example.com\nhttps://another-site.com"}
                          rows={3}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                          disabled={analyzing}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Business Type (optional)</label>
                        <select
                          value={analyzeType}
                          onChange={(e) => setAnalyzeType(e.target.value)}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-navy bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                          disabled={analyzing}
                        >
                          <option value="">Auto-detect</option>
                          <option value="detailing">Auto Detailing</option>
                          <option value="pressure-washing">Pressure Washing</option>
                          <option value="lawn-care">Lawn Care</option>
                          <option value="cleaning">House Cleaning</option>
                          <option value="restaurant">Restaurant</option>
                          <option value="law-firm">Law Firm</option>
                          <option value="dental">Dental Practice</option>
                          <option value="salon">Salon / Barbershop</option>
                          <option value="gym">Gym / Fitness</option>
                          <option value="boutique">Boutique / Retail</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="flex items-end">
                        <button
                          type="submit"
                          disabled={analyzing || !analyzeUrls.trim()}
                          className={cn(
                            "flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition h-[46px]",
                            analyzing
                              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                              : "bg-[var(--color-spiffy-orange)] text-white hover:bg-[var(--color-spiffy-orange-dark)]"
                          )}
                        >
                          {analyzing ? (
                            <><Loader2 className="w-4 h-4 animate-spin" /> Analyzing...</>
                          ) : (
                            <><Search className="w-4 h-4" /> Scan Now</>
                          )}
                        </button>
                      </div>
                    </div>

                    {analyzeError && (
                      <div className="mt-3 px-4 py-2 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" /> {analyzeError}
                      </div>
                    )}
                    {analyzeSuccess && (
                      <div className="mt-3 px-4 py-2 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm flex items-center gap-2">
                        <Check className="w-4 h-4 shrink-0" /> {analyzeSuccess}
                      </div>
                    )}
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Users} label="Businesses" value={data.stats.total} />
          <StatCard icon={BarChart3} label="Avg Score" value={`${data.stats.avgScore}/10`} />
          <StatCard icon={TrendingUp} label="Hot Leads" value={data.stats.hotLeads} color="text-red-600" />
          <StatCard icon={DollarSign} label="Potential MRR" value={`$${data.stats.potentialMRR.toLocaleString()}`} color="text-green-600" />
        </div>

        {/* View Tabs: Scanned Sites vs No Website */}
        <div className="flex gap-2 border-b border-gray-200 pb-0">
          <button
            onClick={() => setViewTab("scanned")}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition -mb-px",
              viewTab === "scanned"
                ? "border-primary-600 text-primary-700"
                : "border-transparent text-gray-500 hover:text-gray-700"
            )}
          >
            <Globe className="w-4 h-4" /> Scanned Sites ({data.leads.length})
          </button>
          <button
            onClick={() => setViewTab("no-website")}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition -mb-px",
              viewTab === "no-website"
                ? "border-amber-500 text-amber-700"
                : "border-transparent text-gray-500 hover:text-gray-700"
            )}
          >
            <Flame className="w-4 h-4" /> No Website ({data.noWebsiteCount})
            {data.noWebsiteCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">HOT</span>
            )}
          </button>
        </div>

        {/* ── No Website Leads Tab ──────────────────────────── */}
        {viewTab === "no-website" && (
          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <Flame className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h2 className="font-semibold text-navy">Businesses With No Website</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    These businesses were found during area searches but have <strong>zero web presence</strong>.
                    They&apos;re the easiest sells — they literally have nothing. Start with the Starter plan pitch.
                  </p>
                </div>
              </div>
            </div>

            {data.noWebsiteLeads.length === 0 ? (
              <div className="bg-white rounded-2xl card-shadow py-12 text-center text-gray-400">
                <Flame className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                <p>No website-less businesses found yet.</p>
                <p className="text-sm mt-1">Run a &quot;Search by Area&quot; scan — businesses without websites will appear here automatically.</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl card-shadow overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 text-left">
                      <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Business</th>
                      <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden sm:table-cell">Phone</th>
                      <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Location</th>
                      <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden lg:table-cell">Google Rating</th>
                      <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden lg:table-cell">Type</th>
                      <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.noWebsiteLeads.map((lead) => (
                      <tr key={lead.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                        <td className="px-4 py-3">
                          <div className="font-medium text-navy text-sm">{lead.name}</div>
                          <span className="text-xs text-amber-600 font-medium">No website</span>
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          {lead.phone ? (
                            <a href={`tel:${lead.phone}`} className="text-sm text-primary-600 hover:underline flex items-center gap-1">
                              <Phone className="w-3 h-3" /> {lead.phone}
                            </a>
                          ) : (
                            <span className="text-sm text-gray-400">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          {lead.address ? (
                            <span className="text-sm text-gray-600 flex items-center gap-1">
                              <MapPin className="w-3 h-3 shrink-0" /> {lead.address}
                            </span>
                          ) : (
                            <span className="text-sm text-gray-400">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          {lead.googleRating ? (
                            <span className="text-sm text-gray-700 flex items-center gap-1">
                              <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {lead.googleRating}/5
                              {lead.googleReviews && <span className="text-xs text-gray-400">({lead.googleReviews})</span>}
                            </span>
                          ) : (
                            <span className="text-sm text-gray-400">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <span className="text-sm text-gray-600 capitalize">{lead.businessType || "—"}</span>
                        </td>
                        <td className="px-4 py-3">
                          {lead.contacted ? (
                            <span className="inline-flex items-center gap-1 text-xs text-green-600">
                              <Check className="w-3 h-3" /> Contacted
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs text-amber-600 font-medium">
                              <Flame className="w-3 h-3" /> Ready
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {!lead.contacted && (
                            <div className="flex gap-1">
                              {[
                                { method: "call", icon: Phone, title: "Mark as Called" },
                                { method: "email", icon: Mail, title: "Mark as Emailed" },
                                { method: "dm", icon: MessageSquare, title: "Mark as DM'd" },
                              ].map(({ method, icon: Icon, title }) => (
                                <button
                                  key={method}
                                  onClick={() => handleMarkContacted(lead.id, method)}
                                  className="p-1.5 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition"
                                  title={title}
                                >
                                  <Icon className="w-4 h-4" />
                                </button>
                              ))}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Score Distribution + Business Types */}
        {viewTab === "scanned" && <div className="grid md:grid-cols-2 gap-6">
          {/* Score Distribution */}
          <div className="bg-white rounded-2xl p-6 card-shadow">
            <h2 className="font-semibold text-navy mb-4">Score Distribution</h2>
            <div className="space-y-3">
              {data.byLabel.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className={cn("text-xs font-medium uppercase w-16", SCORE_COLORS[item.label]?.text || "text-gray-500")}>
                    {item.label}
                  </span>
                  <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all", BAR_COLORS[item.label] || "bg-gray-400")}
                      style={{ width: `${(item.count / maxBarCount) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-navy w-8 text-right">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Business Types */}
          <div className="bg-white rounded-2xl p-6 card-shadow">
            <h2 className="font-semibold text-navy mb-4">By Business Type</h2>
            {data.byType.length === 0 ? (
              <p className="text-gray-400 text-sm">No types tagged yet. Use <code className="bg-gray-100 px-1 rounded">--type</code> when scanning.</p>
            ) : (
              <div className="space-y-3">
                {data.byType.map((t) => (
                  <div key={t.type} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div>
                      <span className="font-medium text-navy capitalize">{t.type}</span>
                      <span className="text-xs text-gray-400 ml-2">{t.count} businesses</span>
                    </div>
                    <span className={cn(
                      "text-sm font-semibold",
                      t.avgScore >= 6 ? "text-red-600" : t.avgScore >= 4 ? "text-amber-600" : "text-green-600"
                    )}>
                      {t.avgScore}/10
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>}

        {/* Filters (scanned tab only) */}
        <div className={cn("flex flex-wrap gap-3 items-center", viewTab !== "scanned" && "hidden")}>
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={filterLabel}
            onChange={(e) => setFilterLabel(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-navy bg-white"
          >
            <option value="">All Scores</option>
            <option value="critical">Critical</option>
            <option value="poor">Poor</option>
            <option value="fair">Fair</option>
            <option value="decent">Decent</option>
            <option value="good">Good</option>
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-navy bg-white"
          >
            <option value="">All Types</option>
            {data.byType.map((t) => (
              <option key={t.type} value={t.type}>{t.type}</option>
            ))}
          </select>
          <button
            onClick={() => {
              setSortField(sortField === "score" ? "name" : sortField === "name" ? "date" : "score");
            }}
            className="flex items-center gap-1 border border-gray-200 rounded-lg px-3 py-2 text-sm text-navy bg-white hover:bg-gray-50"
          >
            <ArrowUpDown className="w-3 h-3" />
            Sort: {sortField === "score" ? "Score" : sortField === "name" ? "Name" : "Date"}
          </button>
          <button
            onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-navy bg-white hover:bg-gray-50"
          >
            {sortOrder === "desc" ? "High → Low" : "Low → High"}
          </button>
        </div>

        {/* Leads Table (scanned tab only) */}
        <div className={cn("bg-white rounded-2xl card-shadow overflow-hidden", viewTab !== "scanned" && "hidden")}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 text-left">
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Business</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Score</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden sm:table-cell">Type</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Issues</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden lg:table-cell">Tier</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden lg:table-cell">Status</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {data.leads.map((lead) => {
                  const colors = SCORE_COLORS[lead.scoreLabel] || SCORE_COLORS.good;
                  const isExpanded = expandedId === lead.id;
                  let findings: Finding[] = [];
                  let pitchPoints: string[] = [];
                  try {
                    findings = JSON.parse(lead.findings || "[]");
                    pitchPoints = JSON.parse(lead.pitchPoints || "[]");
                  } catch {}

                  return (
                    <React.Fragment key={lead.id}>
                      <tr
                        className={cn(
                          "border-b border-gray-50 cursor-pointer hover:bg-gray-50/50 transition",
                          isExpanded && "bg-primary-50/30"
                        )}
                        onClick={() => setExpandedId(isExpanded ? null : lead.id)}
                      >
                        <td className="px-4 py-3">
                          <div className="font-medium text-navy text-sm">{lead.name}</div>
                          <a
                            href={lead.website}
                            target="_blank"
                            rel="noopener"
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs text-primary-500 hover:underline flex items-center gap-1"
                          >
                            {new URL(lead.website).hostname}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>
                        <td className="px-4 py-3">
                          <span className={cn("inline-flex px-2 py-1 rounded-full text-xs font-semibold", colors.bg, colors.text, "border", colors.border)}>
                            {lead.score}/10
                          </span>
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          <span className="text-sm text-gray-600 capitalize">{lead.businessType || "—"}</span>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <span className="text-sm text-navy">{lead.findingCount}</span>
                          {lead.criticalCount > 0 && (
                            <span className="text-xs text-red-500 ml-1">({lead.criticalCount} critical)</span>
                          )}
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          <span className="text-sm font-medium text-navy">{lead.recommendedTier}</span>
                          <span className="text-xs text-gray-400 ml-1">${lead.monthlyPrice}/mo</span>
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          {lead.contacted ? (
                            <span className="inline-flex items-center gap-1 text-xs text-green-600">
                              <Check className="w-3 h-3" /> Contacted
                            </span>
                          ) : (
                            <span className="text-xs text-gray-400">Not contacted</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right">
                          {isExpanded ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
                        </td>
                      </tr>

                      {/* Expanded Detail */}
                      {isExpanded && (
                        <tr>
                          <td colSpan={7} className="bg-gray-50/70 px-4 py-6">
                            <div className="max-w-4xl space-y-6">
                              {/* Business Info */}
                              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                {lead.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{lead.phone}</span>}
                                {lead.address && <span>{lead.address}</span>}
                                {lead.googleRating && <span>Google: {lead.googleRating}/5 ({lead.googleReviews} reviews)</span>}
                                <span>Load: {(lead.loadTimeMs / 1000).toFixed(1)}s</span>
                                <span>Size: {lead.pageSizeKb}KB</span>
                                <span>Scanned: {new Date(lead.scannedAt).toLocaleDateString()}</span>
                              </div>

                              {/* Pitch Points */}
                              {pitchPoints.length > 0 && (
                                <div>
                                  <h3 className="text-sm font-semibold text-navy mb-2">Top Pitch Points</h3>
                                  <div className="space-y-2">
                                    {pitchPoints.map((point, i) => (
                                      <div key={i} className="flex items-start gap-2 bg-white rounded-lg p-3 border border-gray-100">
                                        <p className="text-sm text-gray-700 flex-1">&ldquo;{point}&rdquo;</p>
                                        <button
                                          onClick={(e) => { e.stopPropagation(); copyPitch(point, i); }}
                                          className="shrink-0 p-1 text-gray-400 hover:text-primary-500"
                                          title="Copy to clipboard"
                                        >
                                          {copiedIdx === i ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Findings by Category */}
                              <div>
                                <h3 className="text-sm font-semibold text-navy mb-2">All Findings ({findings.length})</h3>
                                <div className="grid gap-2">
                                  {findings.map((f, i) => {
                                    const SevIcon = SEVERITY_ICONS[f.severity];
                                    return (
                                      <div key={i} className="flex items-start gap-2 text-sm bg-white rounded-lg p-3 border border-gray-100">
                                        <SevIcon className={cn("w-4 h-4 mt-0.5 shrink-0",
                                          f.severity === "critical" ? "text-red-500" :
                                          f.severity === "warning" ? "text-amber-500" : "text-gray-400"
                                        )} />
                                        <div className="flex-1">
                                          <span className="text-xs uppercase text-gray-400 font-medium">{f.category}</span>
                                          <p className="text-gray-700">{f.issue}</p>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* Actions */}
                              {!lead.contacted && (
                                <div>
                                  <h3 className="text-sm font-semibold text-navy mb-2">Mark as Contacted</h3>
                                  <div className="flex gap-2">
                                    {[
                                      { method: "call", icon: Phone, label: "Called" },
                                      { method: "email", icon: Mail, label: "Emailed" },
                                      { method: "dm", icon: MessageSquare, label: "DM'd" },
                                    ].map(({ method, icon: Icon, label }) => (
                                      <button
                                        key={method}
                                        onClick={(e) => { e.stopPropagation(); handleMarkContacted(lead.id, method); }}
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm text-navy hover:bg-primary-50 hover:border-primary-200 transition"
                                      >
                                        <Icon className="w-4 h-4" /> {label}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {lead.contacted && lead.lastContactedAt && (
                                <p className="text-xs text-green-600 flex items-center gap-1">
                                  <Check className="w-3 h-3" />
                                  Last contacted: {new Date(lead.lastContactedAt).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          {data.leads.length === 0 && (
            <div className="py-12 text-center text-gray-400">
              <p>No leads found. Run the scraper first:</p>
              <code className="text-sm bg-gray-100 px-3 py-1 rounded mt-2 inline-block">
                cd tools/lead-scraper && npx tsx src/index.ts --urls https://example.com
              </code>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  color?: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 card-shadow">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary-600" />
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase font-medium">{label}</p>
          <p className={cn("text-xl font-bold", color || "text-navy")}>{value}</p>
        </div>
      </div>
    </div>
  );
}
