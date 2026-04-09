import Database from "better-sqlite3";
import path from "path";

const DB_PATH = path.resolve(process.cwd(), "../tools/lead-scraper/leads.db");

function getDb(readonly = true): Database.Database {
  const db = new Database(DB_PATH, { readonly });
  db.pragma("journal_mode = WAL");
  return db;
}

// ─── Row Types ──────────────────────────────────────────────────────────────

interface CountRow {
  c: number;
}

interface AvgRow {
  avg: number | null;
}

interface SumRow {
  t: number;
}

export interface LeadStats {
  total: number;
  avgScore: number;
  hotLeads: number;
  potentialMRR: number;
}

export interface ScoreLabelCount {
  label: string;
  count: number;
}

export interface BusinessTypeStats {
  type: string;
  count: number;
  avgScore: number;
}

export interface LeadRow {
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

interface LeadRowRaw extends Omit<LeadRow, "contacted"> {
  contacted: number;
}

export interface NoWebsiteLead {
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

interface NoWebsiteLeadRaw extends Omit<NoWebsiteLead, "contacted"> {
  contacted: number;
}

// ─── Queries (Latest Scan Subquery) ─────────────────────────────────────────

/** Common subquery: get only the latest scan per business */
const LATEST_SCAN = "SELECT MAX(id) FROM scans GROUP BY business_id";

// ─── Public API ─────────────────────────────────────────────────────────────

/**
 * Fetch all dashboard data in a single database connection.
 * Returns stats, score distribution, business types, leads, and no-website leads.
 */
export function getAllDashboardData(options?: {
  type?: string;
  label?: string;
  sort?: string;
  order?: string;
}): {
  stats: LeadStats;
  byLabel: ScoreLabelCount[];
  byType: BusinessTypeStats[];
  leads: LeadRow[];
  noWebsiteLeads: NoWebsiteLead[];
  noWebsiteCount: number;
} {
  const db = getDb();
  try {
    // Stats
    const total = (db.prepare(`SELECT COUNT(DISTINCT business_id) as c FROM scans`).get() as CountRow).c;
    const avgRaw = (db.prepare(`SELECT AVG(opportunity_score) as avg FROM scans WHERE id IN (${LATEST_SCAN})`).get() as AvgRow).avg || 0;
    const hotLeads = (db.prepare(`SELECT COUNT(*) as c FROM scans WHERE id IN (${LATEST_SCAN}) AND opportunity_score >= 6`).get() as CountRow).c;
    const potentialMRR = (db.prepare(`SELECT COALESCE(SUM(estimated_mrr), 0) as t FROM scans WHERE id IN (${LATEST_SCAN}) AND score_label IN ('critical', 'poor')`).get() as SumRow).t;

    const stats: LeadStats = {
      total,
      avgScore: Math.round(avgRaw * 10) / 10,
      hotLeads,
      potentialMRR,
    };

    // Score distribution
    const byLabel = db
      .prepare(
        `SELECT score_label as label, COUNT(*) as count
         FROM scans
         WHERE id IN (${LATEST_SCAN})
         GROUP BY score_label
         ORDER BY CASE score_label
           WHEN 'critical' THEN 1 WHEN 'poor' THEN 2
           WHEN 'fair' THEN 3 WHEN 'decent' THEN 4 WHEN 'good' THEN 5
         END`
      )
      .all() as ScoreLabelCount[];

    // Business types
    const byType = db
      .prepare(
        `SELECT COALESCE(b.business_type, 'untagged') as type,
                COUNT(DISTINCT b.id) as count,
                ROUND(AVG(s.opportunity_score), 1) as avgScore
         FROM businesses b
         JOIN scans s ON s.business_id = b.id
         WHERE s.id IN (${LATEST_SCAN})
         GROUP BY b.business_type
         ORDER BY avgScore DESC`
      )
      .all() as BusinessTypeStats[];

    // Leads (with filtering & sorting)
    let where = `WHERE s.id IN (${LATEST_SCAN})`;
    const params: (string | number)[] = [];

    if (options?.type) {
      where += " AND b.business_type = ?";
      params.push(options.type);
    }
    if (options?.label) {
      const labels = options.label.split(",").map((l) => l.trim());
      where += ` AND s.score_label IN (${labels.map(() => "?").join(",")})`;
      params.push(...labels);
    }

    const sortCol =
      options?.sort === "name"
        ? "b.name"
        : options?.sort === "date"
          ? "s.scanned_at"
          : "s.opportunity_score";
    const sortDir = options?.order === "asc" ? "ASC" : "DESC";

    const rawLeads = db
      .prepare(
        `SELECT
           b.id, b.name, b.website, b.phone, b.address,
           b.business_type as businessType,
           b.google_rating as googleRating,
           b.google_reviews as googleReviews,
           s.opportunity_score as score,
           s.score_label as scoreLabel,
           s.load_time_ms as loadTimeMs,
           s.page_size_kb as pageSizeKb,
           s.finding_count as findingCount,
           s.critical_count as criticalCount,
           s.recommended_tier as recommendedTier,
           s.monthly_price as monthlyPrice,
           s.estimated_mrr as estimatedMrr,
           s.findings_json as findings,
           s.pitch_points_json as pitchPoints,
           s.scanned_at as scannedAt,
           CASE WHEN EXISTS(SELECT 1 FROM outreach o WHERE o.business_id = b.id) THEN 1 ELSE 0 END as contacted,
           (SELECT MAX(o.contacted_at) FROM outreach o WHERE o.business_id = b.id) as lastContactedAt
         FROM scans s
         JOIN businesses b ON b.id = s.business_id
         ${where}
         ORDER BY ${sortCol} ${sortDir}`
      )
      .all(...params) as LeadRowRaw[];

    const leads: LeadRow[] = rawLeads.map((r) => ({
      ...r,
      contacted: r.contacted === 1,
    }));

    // No-website leads
    const rawNoWebsite = db
      .prepare(
        `SELECT
           b.id, b.name, b.phone, b.address,
           b.business_type as businessType,
           b.google_rating as googleRating,
           b.google_reviews as googleReviews,
           b.created_at as createdAt,
           CASE WHEN EXISTS(SELECT 1 FROM outreach o WHERE o.business_id = b.id) THEN 1 ELSE 0 END as contacted,
           (SELECT MAX(o.contacted_at) FROM outreach o WHERE o.business_id = b.id) as lastContactedAt
         FROM businesses b
         WHERE b.website LIKE 'no-website://%'
         ORDER BY b.google_rating DESC NULLS LAST`
      )
      .all() as NoWebsiteLeadRaw[];

    const noWebsiteLeads: NoWebsiteLead[] = rawNoWebsite.map((r) => ({
      ...r,
      contacted: r.contacted === 1,
    }));

    const noWebsiteCount = (
      db.prepare("SELECT COUNT(*) as c FROM businesses WHERE website LIKE 'no-website://%'").get() as CountRow
    ).c;

    return { stats, byLabel, byType, leads, noWebsiteLeads, noWebsiteCount };
  } finally {
    db.close();
  }
}

/** Legacy individual query functions (for backward compatibility) */

export function getLeadStats(): LeadStats {
  return getAllDashboardData().stats;
}

export function getScoreDistribution(): ScoreLabelCount[] {
  return getAllDashboardData().byLabel;
}

export function getBusinessTypes(): BusinessTypeStats[] {
  return getAllDashboardData().byType;
}

export function getLeads(options?: {
  type?: string;
  label?: string;
  sort?: string;
  order?: string;
}): LeadRow[] {
  return getAllDashboardData(options).leads;
}

export function getNoWebsiteLeads(): NoWebsiteLead[] {
  return getAllDashboardData().noWebsiteLeads;
}

export function getNoWebsiteCount(): number {
  return getAllDashboardData().noWebsiteCount;
}

/** Mark a business as contacted (writes to DB — not readonly) */
export function markContacted(businessId: number, method: string, notes?: string): void {
  const dbPath = path.resolve(process.cwd(), "../tools/lead-scraper/leads.db");
  const db = new Database(dbPath);
  try {
    db.prepare(
      "INSERT INTO outreach (business_id, method, notes) VALUES (?, ?, ?)"
    ).run(businessId, method, notes || null);
  } finally {
    db.close();
  }
}
