import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ContactForm } from "@/components/ContactForm";

describe("ContactForm", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it("shows client-side validation errors and does not submit invalid data", async () => {
    render(<ContactForm />);

    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));

    expect(await screen.findByText("Name is required.")).toBeInTheDocument();
    expect(screen.getByText("Email is required.")).toBeInTheDocument();
    expect(screen.getByText("Message is required.")).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("submits successfully and shows the success state", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: true });

    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/^Name\b/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Message/i), {
      target: { value: "I need a new website." },
    });
    fireEvent.change(screen.getByLabelText(/Service Interested In/i), {
      target: { value: "Custom Website" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "John Doe",
          email: "john@example.com",
          phone: "",
          businessName: "",
          service: "Custom Website",
          budget: "",
          message: "I need a new website.",
        }),
      });
    });

    expect(await screen.findByText("Message Sent!")).toBeInTheDocument();
    expect(screen.getByText("Thanks! We'll be in touch within 24 hours.")).toBeInTheDocument();
  });

  it("shows an error banner when the request fails", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: false });

    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/^Name\b/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Message/i), {
      target: { value: "Hello there" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));

    expect(
      await screen.findByText("Something went wrong. Please try again or email us directly.")
    ).toBeInTheDocument();
  });
});
