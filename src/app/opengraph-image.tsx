import { ImageResponse } from "next/og";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, rgba(16,185,129,0.95), rgba(59,130,246,0.90))",
          color: "white",
          fontSize: 48,
          fontWeight: 800,
          padding: 64,
          boxSizing: "border-box",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
        }}
      >
        <div style={{ maxWidth: 980, display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "14px 18px",
              borderRadius: 9999,
              background: "rgba(0,0,0,0.18)",
              border: "1px solid rgba(255,255,255,0.25)",
            }}
          >
            <span
              style={{
                width: 14,
                height: 14,
                borderRadius: 9999,
                background: "rgba(255,255,255,0.95)",
                boxShadow: "0 0 0 6px rgba(255,255,255,0.12)",
              }}
            />
            <span style={{ fontSize: 26, fontWeight: 700 }}>Xhamia Mati 1</span>
          </div>
          <div
            style={{
              marginTop: 26,
              lineHeight: 1.05,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ fontSize: 62, letterSpacing: -1 }}>
              Orari, Akademia & Video
            </div>
            <div style={{ marginTop: 16, fontSize: 26, fontWeight: 650, opacity: 0.95 }}>
              Platformë zyrtare për komunitetin në Prishtinë
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}

