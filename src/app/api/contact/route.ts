import { sendContactEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, message, phone, businessName, service, budget } = body;

    // Validate required fields
    const errors: string[] = [];
    if (!name || typeof name !== "string" || !name.trim()) {
      errors.push("Name is required.");
    }
    if (!email || typeof email !== "string" || !email.trim()) {
      errors.push("Email is required.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push("Invalid email format.");
    }
    if (!message || typeof message !== "string" || !message.trim()) {
      errors.push("Message is required.");
    }

    if (errors.length > 0) {
      return Response.json({ errors }, { status: 400 });
    }

    await sendContactEmail({
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || undefined,
      businessName: businessName?.trim() || undefined,
      service: service || undefined,
      budget: budget || undefined,
      message: message.trim(),
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
