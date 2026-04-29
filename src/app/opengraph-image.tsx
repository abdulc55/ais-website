import { ImageResponse } from "next/og";

export const alt = "Spiffy Tec — A real website shouldn't be a luxury";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Site-wide Open Graph card.
 * Bright off-white surface, orange wordmark, mission-led tagline.
 * Re-renders at build time when this file changes.
 */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#FAF7F2",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          color: "#1A1A1A",
        }}
      >
        {/* Soft orange decoration in upper-right */}
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -180,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: "#FFE0CB",
            opacity: 0.55,
            filter: "blur(40px)",
          }}
        />

        {/* Top: brand wordmark */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, position: "relative" }}>
          <span
            style={{
              fontSize: 64,
              fontWeight: 900,
              color: "#FF751F",
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            Spiffy Tec
          </span>
          <span
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "#FF751F",
              letterSpacing: "0.05em",
              transform: "translateY(-22px)",
            }}
          >
            ™
          </span>
        </div>

        {/* Headline + tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24, position: "relative", maxWidth: 1040 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 68,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#1A1A1A",
            }}
          >
            <span>A real website</span>
            <span style={{ marginLeft: 18 }}>shouldn&apos;t be</span>
            <span style={{ marginLeft: 18, color: "#FF751F" }}>a luxury.</span>
          </div>
          <span
            style={{
              fontSize: 28,
              color: "#5A6878",
              lineHeight: 1.35,
              display: "flex",
            }}
          >
            Custom-built websites, booking systems, and AI tools — live in 2-3 weeks, no upfront cost.
          </span>
        </div>

        {/* Bottom: URL + locality */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 28,
            borderTop: "1px solid #EAE4DA",
            position: "relative",
          }}
        >
          <span style={{ fontSize: 24, fontWeight: 600, color: "#FF751F" }}>
            spiffytec.com
          </span>
          <span style={{ fontSize: 20, color: "#5A6878" }}>
            Raleigh · Durham · Cary, NC · Built for businesses everywhere
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
