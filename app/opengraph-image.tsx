import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Lucas de Almeida — Blockchain Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "hsl(40 28% 96%)",
          color: "hsl(30 12% 12%)",
          display: "flex",
          flexDirection: "column",
          padding: "72px",
          fontFamily: "Georgia, 'Times New Roman', serif",
          position: "relative",
        }}
      >
        {/* Top eyebrow */}
        <div
          style={{
            display: "flex",
            fontFamily: "ui-monospace, SFMono-Regular, monospace",
            fontSize: 20,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "hsl(30 6% 42%)",
            marginBottom: 24,
          }}
        >
          Recife · Brazil · 2026
        </div>

        {/* Name */}
        <div
          style={{
            display: "flex",
            fontSize: 148,
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            marginBottom: 32,
          }}
        >
          Lucas de Almeida.
        </div>

        {/* Role + thesis */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            fontSize: 32,
            lineHeight: 1.3,
            color: "hsl(30 12% 12%)",
            maxWidth: 980,
          }}
        >
          <div style={{ display: "flex", fontFamily: "system-ui, sans-serif", letterSpacing: "-0.02em" }}>
            Blockchain engineer — Rust · Anchor · Solidity · Soroban.
          </div>
          <div
            style={{
              display: "flex",
              fontStyle: "italic",
              color: "hsl(30 12% 25%)",
            }}
          >
            Bringing the Brazilian real economy on-chain.
          </div>
        </div>

        {/* Bottom row: purple on-chain badge + URL */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 20px",
              border: "1px solid hsl(264 70% 48% / 0.4)",
              background: "hsl(264 70% 48% / 0.1)",
              color: "hsl(264 70% 40%)",
              fontFamily: "ui-monospace, SFMono-Regular, monospace",
              fontSize: 18,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              borderRadius: 999,
            }}
          >
            <span
              style={{
                display: "flex",
                width: 8,
                height: 8,
                borderRadius: 999,
                background: "hsl(264 70% 48%)",
              }}
            />
            SOLANA · DEVNET · MINTED CREDENTIALS
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "ui-monospace, SFMono-Regular, monospace",
              fontSize: 20,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "hsl(156 70% 30%)",
            }}
          >
            lucasalmeida.me
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
