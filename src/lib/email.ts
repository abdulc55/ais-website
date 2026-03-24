import { Resend } from "resend";

function getResendClient() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not configured");
  return new Resend(key);
}

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
  const toEmail = process.env.CONTACT_EMAIL || "abdulcaesar@aintelliagents.com";

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
      <div style="background: linear-gradient(135deg, #1d4ed8, #06b6d4); padding: 24px; border-radius: 12px 12px 0 0;">
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
              <a href="mailto:${escapeHtml(data.email)}" style="color: #2563eb;">${escapeHtml(data.email)}</a>
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
        Sent from the AIS website contact form
      </p>
    </div>
  `;

  const resend = getResendClient();
  const { error } = await resend.emails.send({
    from: "AIS Website <onboarding@resend.dev>",
    to: [toEmail],
    replyTo: data.email,
    subject: `New inquiry from ${data.name}${data.businessName ? ` (${data.businessName})` : ""}`,
    html,
  });

  if (error) {
    throw new Error(error.message);
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
