import { sendContactEmail } from "@/lib/email";
import { contactFormSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
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
