import { cn, slugify, formatDate } from "@/lib/utils";

describe("cn (className merger)", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", "active")).toBe("base active");
  });

  it("deduplicates conflicting tailwind classes", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("handles empty input", () => {
    expect(cn()).toBe("");
  });

  it("handles undefined and null", () => {
    expect(cn("base", undefined, null, "end")).toBe("base end");
  });
});

describe("slugify", () => {
  it("converts to lowercase kebab-case", () => {
    expect(slugify("Mike T Detailing")).toBe("mike-t-detailing");
  });

  it("removes special characters", () => {
    expect(slugify("Carter & Associates!")).toBe("carter-associates");
  });

  it("collapses multiple dashes", () => {
    expect(slugify("The   Oak   Table")).toBe("the-oak-table");
  });

  it("handles already slugified text", () => {
    expect(slugify("my-slug")).toBe("my-slug");
  });

  it("handles empty string", () => {
    expect(slugify("")).toBe("");
  });

  it("handles numbers", () => {
    expect(slugify("123 Business")).toBe("123-business");
  });
});

describe("formatDate", () => {
  it("formats Date object", () => {
    const result = formatDate(new Date("2026-03-15"));
    expect(result).toContain("Mar");
    expect(result).toContain("2026");
  });

  it("formats ISO string", () => {
    const result = formatDate("2026-06-15T12:00:00Z");
    expect(result).toContain("2026");
  });

  it("returns consistent format with month and year", () => {
    const result = formatDate(new Date("2026-06-15T12:00:00Z"));
    expect(result).toContain("Jun");
    expect(result).toContain("2026");
  });
});
