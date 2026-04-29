import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * Apple touch icon for iOS home screens. Orange wordmark on warm off-white.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FAF7F2",
          color: "#FF751F",
          fontSize: 110,
          fontWeight: 800,
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          letterSpacing: "-0.05em",
        }}
      >
        S
      </div>
    ),
    { ...size }
  );
}
