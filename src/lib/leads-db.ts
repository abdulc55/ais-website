import Database from "better-sqlite3";
import path from "path";

const DB_PATH = path.resolve(process.cwd(), "../tools/lead-scraper/leads.db");

function getDb(): Database.Database {
  const db = new Database(DB_PATH, { readonly: true });
  db.pragma("journal_mode = WAL");
  return db;
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

export function getLeadStats(): LeadStats {
  const db = getDb();
  try {
    const total = (
      db.prepare("SELECT COUNT(DISTINCT business_id) as c FROM scans").get() as any
    ).c;
    const avgScore = (
      db
        .prepare(
          "SELECT AVG(opportunity_score) as avg FROM scans WHERE id IN (SELECT MAX(id) FROM scans GROUP BY business_id)"
        )
        .get() as any
    ).avg || 0;
    const hotLeads = (
      db
        .prepare(
          "SELECT COUNT(*) as c FROM scans WHERE id IN (SELECT MAX(id) FROM scans GROUP BY business_id) AND opportunity_score >= 6"
        )
        .get() as any
    ).c;
    const potentialMRR = (
      db
        .prepare(
          "SELECT COALESCE(SUM(estimated_mrr), 0) as t FROM scans WHERE id IN (SELECT MAX(id) FROM scans GROUP BY business_id) AND score_label IN ('critical', 'poor')"
        )
        .get() as any
    ).t;

    return { total, avgScore: Math.round(avgScore * 10) / 10, hotLeads, potentialMRR };
  } finally {
    db.close();
  }
}

export function getScoreDistribution(): ScoreLabelCount[] {
  const db = getDb();
  try {
    return db
      .prepare(
        `SELECT score_label as label, COUNT(*) as count
         FROM scans
         WHERE id IN (SELECT MAX(id) FROM scans GROUP BY business_id)
         GROUP BY score_label
         ORDER BY CASE score_label
           WHEN 'critical' THEN 1 WHEN 'poor' THEN 2
           WHEN 'fair' THEN 3 WHEN 'decent' THEN 4 WHEN 'good' THEN 5
         END`
      )
      .all() as ScoreLabelCount[];
  } finally {
    db.close();
  }
}

export function getBusinessTypes(): BusinessTypeStats[] {
  const db = getDb();
  try {
    return db
      .prepare(
        `SELECT COALESCE(b.business_type, 'untagged') as type,
                COUNT(DISTINCT b.id) as count,
                ROUND(AVG(s.opportunity_score), 1) as avgScore
         FROM businesses b
         JOIN scans s ON s.business_id = b.id
         WHERE s.id IN (SELECT MAX(id) FROM scans GROUP BY business_id)
         GROUP BY b.business_type
         ORDER BY avgScore DESC`
      )
      .all() as BusinessTypeStats[];
  } finally {
    db.close();
  }
}

export function getLeads(options?: {
  type?: string;
  label?: string;
  sort?: string;
  order?: string;
}): LeadRow[] {
  const db = getDb();
  try {
    let where = "WHERE s.id IN (SELECT MAX(id) FROM scans GROUP BY business_id)";
    const params: any[] = [];

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

    const rows = db
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
      .all(...params) as any[];

    return rows.map((r) => ({
      ...r,
      contacted: r.contacted === 1,
    }));
  } finally {
    db.close();
  }
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

export function getNoWebsiteLeads(): NoWebsiteLead[] {
  const db = getDb();
  try {
    const rows = db
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
      .all() as any[];

    return rows.map((r) => ({
      ...r,
      contacted: r.contacted === 1,
    }));
  } finally {
    db.close();
  }
}

export function getNoWebsiteCount(): number {
  const db = getDb();
  try {
    return (db.prepare("SELECT COUNT(*) as c FROM businesses WHERE website LIKE 'no-website://%'").get() as any).c;
  } finally {
    db.close();
  }
}

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
