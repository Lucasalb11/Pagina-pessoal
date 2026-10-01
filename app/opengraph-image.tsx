import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "Lucas de Almeida, protocol engineer on Solana and Stellar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const portrait = await readFile(path.join(process.cwd(), "public/portrait-duotone.jpg"));
  const src = `data:image/jpeg;base64,${portrait.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0a0f0d", color: "#e4eee8" }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "72px 64px", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 30, color: "#a3b3ac" }}>Lucas de Almeida</div>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 600, lineHeight: 1.05, letterSpacing: "-0.03em" }}>
            I build protocols on Solana and Stellar, and review them like an attacker would.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, color: "#9df2c9" }}>
            <div style={{ display: "flex", width: 12, height: 12, borderRadius: 999, background: "#9df2c9" }} />
            lucasalmeida.me
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={420} height={630} style={{ objectFit: "cover" }} alt="" />
      </div>
    ),
    size,
  );
}
