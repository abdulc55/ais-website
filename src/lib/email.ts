import { Resend } from "resend";

function getResendClient() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not configured");
  return new Resend(key);
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const BRAND_GRADIENT = "linear-gradient(135deg, #FF751F, #D85F12)";
const BRAND_LINK_COLOR = "#FF751F";

// ─── Marketing site contact form ────────────────────────────────────────────

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  businessName?: string;
  service?: string;
  budget?: string;
  message: string;
}

export async function sendContactEmail(data: ContactFormData) {
  const toEmail = process.env.CONTACT_EMAIL || "abdul@spiffytec.com";

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
      <div style="background: ${BRAND_GRADIENT}; padding: 24px; border-radius: 12px 12px 0 0;">
        <h1 style="color: #ffffff; margin: 0; font-size: 20px;">New Contact Form Submission</h1>
      </div>
      <div style="border: 1px solid #e5e7eb; border-top: none; padding: 24px; border-radius: 0 0 12px 12px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px; width: 140px; vertical-align: top;">Name</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">${escapeHtml(data.name)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px; vertical-align: top;">Email</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">
              <a href="mailto:${escapeHtml(data.email)}" style="color: ${BRAND_LINK_COLOR};">${escapeHtml(data.email)}</a>
            </td>
          </tr>
          ${
            data.phone
              ? `<tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px; vertical-align: top;">Phone</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">${escapeHtml(data.phone)}</td>
          </tr>`
              : ""
          }
          ${
            data.businessName
              ? `<tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px; vertical-align: top;">Business</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">${escapeHtml(data.businessName)}</td>
          </tr>`
              : ""
          }
          ${
            data.service
              ? `<tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px; vertical-align: top;">Service</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">${escapeHtml(data.service)}</td>
          </tr>`
              : ""
          }
          ${
            data.budget
              ? `<tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px; vertical-align: top;">Budget</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">${escapeHtml(data.budget)}</td>
          </tr>`
              : ""
          }
          <tr>
            <td style="padding: 10px 0; color: #6b7280; font-size: 14px; vertical-align: top;">Message</td>
            <td style="padding: 10px 0; color: #111827; font-size: 14px; white-space: pre-wrap;">${escapeHtml(data.message)}</td>
          </tr>
        </table>
      </div>
      <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 16px;">
        Sent from the Spiffy Tec website contact form
      </p>
    </div>
  `;

  const resend = getResendClient();
  const { error } = await resend.emails.send({
    from: "Spiffy Tec <support@spiffytec.com>",
    to: [toEmail],
    replyTo: data.email,
    subject: `New inquiry from ${data.name}${data.businessName ? ` (${data.businessName})` : ""}`,
    html,
  });

  if (error) {
    throw new Error(error.message);
  }
}

// ─── Admin portal — client intake submission notification ───────────────────

interface SubmissionNotification {
  businessName: string;
  industry: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  city?: string;
  state?: string;
}

export async function sendSubmissionNotification(data: SubmissionNotification) {
  const toEmail = process.env.NOTIFICATION_EMAIL || "abdul@spiffytec.com";

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
      <div style="background: ${BRAND_GRADIENT}; padding: 24px; border-radius: 12px 12px 0 0;">
        <h1 style="color: #ffffff; margin: 0; font-size: 20px;">New Client Submission</h1>
        <p style="color: #e0e7ff; margin: 4px 0 0; font-size: 14px;">${escapeHtml(data.businessName)} — ${escapeHtml(data.industry)}</p>
      </div>
      <div style="border: 1px solid #e5e7eb; border-top: none; padding: 24px; border-radius: 0 0 12px 12px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px; width: 140px;">Business</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">${escapeHtml(data.businessName)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px;">Industry</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">${escapeHtml(data.industry)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px;">Contact</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">${escapeHtml(data.contactName)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px;">Email</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">
              <a href="mailto:${escapeHtml(data.contactEmail)}" style="color: ${BRAND_LINK_COLOR};">${escapeHtml(data.contactEmail)}</a>
            </td>
          </tr>
          ${data.contactPhone ? `<tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px;">Phone</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px;">${escapeHtml(data.contactPhone)}</td>
          </tr>` : ""}
          ${data.city ? `<tr>
            <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Location</td>
            <td style="padding: 10px 0; color: #111827; font-size: 14px;">${escapeHtml(data.city)}${data.state ? `, ${escapeHtml(data.state)}` : ""}</td>
          </tr>` : ""}
        </table>
        <div style="margin-top: 20px; text-align: center;">
          <a href="${process.env.NEXTAUTH_URL ?? ""}/admin/submissions" style="display: inline-block; background: ${BRAND_GRADIENT}; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-size: 14px;">View in Admin</a>
        </div>
      </div>
      <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 16px;">
        Spiffy Tec Admin Portal
      </p>
    </div>
  `;

  const resend = getResendClient();
  const { error } = await resend.emails.send({
    from: "Spiffy Tec <support@spiffytec.com>",
    to: [toEmail],
    replyTo: data.contactEmail,
    subject: `New Client Submission: ${data.businessName} (${data.industry})`,
    html,
  });

  if (error) {
    console.error("Failed to send notification email:", error.message);
  }
}
