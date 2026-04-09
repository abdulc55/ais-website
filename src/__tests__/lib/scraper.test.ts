import { isValidUrl } from "@/lib/scraper";

describe("isValidUrl()", () => {
  it("accepts valid https URL", () => {
    expect(isValidUrl("https://example.com")).toBe(true);
  });

  it("accepts valid http URL", () => {
    expect(isValidUrl("http://example.com")).toBe(true);
  });

  it("accepts URL with path", () => {
    expect(isValidUrl("https://example.com/path/to/page")).toBe(true);
  });

  it("accepts URL with query params", () => {
    expect(isValidUrl("https://example.com?foo=bar&baz=1")).toBe(true);
  });

  it("rejects FTP protocol", () => {
    expect(isValidUrl("ftp://example.com")).toBe(false);
  });

  it("rejects javascript protocol", () => {
    expect(isValidUrl("javascript:alert(1)")).toBe(false);
  });

  it("rejects empty string", () => {
    expect(isValidUrl("")).toBe(false);
  });

  it("rejects plain text", () => {
    expect(isValidUrl("not a url")).toBe(false);
  });

  // Security: Control character injection
  it("rejects URLs with null bytes", () => {
    expect(isValidUrl("https://example.com/\x00malicious")).toBe(false);
  });

  it("rejects URLs with newlines", () => {
    expect(isValidUrl("https://example.com/\nmalicious")).toBe(false);
  });

  it("rejects URLs with carriage returns", () => {
    expect(isValidUrl("https://example.com/\rmalicious")).toBe(false);
  });

  it("rejects URLs with tabs", () => {
    expect(isValidUrl("https://example.com/\tmalicious")).toBe(false);
  });

  // Security: Excessively long URLs
  it("rejects URLs longer than 2048 characters", () => {
    const longUrl = "https://example.com/" + "a".repeat(2030);
    expect(isValidUrl(longUrl)).toBe(false);
  });

  it("accepts URLs at exactly 2048 characters", () => {
    const url = "https://example.com/" + "a".repeat(2028);
    expect(url.length).toBe(2048);
    expect(isValidUrl(url)).toBe(true);
  });
});
