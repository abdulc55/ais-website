import { sendContactEmail } from "@/lib/email";
import { contactFormSchema } from "@/lib/validations";

// ─── Rate Limiter (In-Memory) ───────────────────────────────────────────────
// NOTE: Resets on cold starts — acceptable for launch, migrate to Redis if needed.

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const contactAttempts = new Map<string, RateLimitEntry>();
const MAX_CONTACT = 5;
const CONTACT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function checkContactLimit(ip: string): number {
  const now = Date.now();
  const entry = contactAttempts.get(ip);

  if (!entry || now > entry.resetAt) {
    contactAttempts.set(ip, { count: 1, resetAt: now + CONTACT_WINDOW_MS });
    return 0;
  }

  if (entry.count >= MAX_CONTACT) {
    return entry.resetAt - now;
  }

  entry.count++;
  return 0;
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const retryAfterMs = checkContactLimit(ip);
    if (retryAfterMs > 0) {
      const retryAfterSeconds = Math.ceil(retryAfterMs / 1000);
      return Response.json(
        { error: "Too many submissions. Please try again later." },
        {
          status: 429,
          headers: { "Retry-After": String(retryAfterSeconds) },
        }
      );
    }

    const body = await request.json();

    const result = contactFormSchema.safeParse(body);
    if (!result.success) {
      const errors = result.error.issues.map((i) => i.message);
      return Response.json({ errors }, { status: 400 });
    }

    const { name, email, message, phone, businessName, service, budget } = result.data;

    await sendContactEmail({
      name,
      email,
      phone: phone || undefined,
      businessName: businessName || undefined,
      service: service || undefined,
      budget: budget || undefined,
      message,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return Response.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
