import { parseMarkdownDocument } from "@/lib/admin-docs";

describe("parseMarkdownDocument", () => {
  it("extracts sections, nested list depth, quotes, and code blocks", () => {
    const doc = parseMarkdownDocument(`# Sales Playbook

Updated: April 12, 2026

## Core Offer

Lead with outcome, not deliverable.

- Parent item
  - Child item

> Keep this open during calls.

\`\`\`text
Hey [Name]
\`\`\`
`);

    expect(doc.title).toBe("Sales Playbook");
    expect(doc.updated).toBe("April 12, 2026");
    expect(doc.sections).toEqual([{ id: "core-offer", title: "Core Offer" }]);

    const listBlock = doc.blocks.find((block) => block.type === "list");
    expect(listBlock).toEqual({
      type: "list",
      ordered: false,
      items: [
        { depth: 0, text: "Parent item" },
        { depth: 1, text: "Child item" },
      ],
    });

    expect(doc.blocks).toContainEqual({
      type: "quote",
      text: "Keep this open during calls.",
    });

    expect(doc.blocks).toContainEqual({
      type: "code",
      code: "Hey [Name]",
      language: "text",
    });
  });
});
