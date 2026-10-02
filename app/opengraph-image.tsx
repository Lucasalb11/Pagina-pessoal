import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "Lucas de Almeida, Computer Engineering student focused on Blockchain & DeFi security";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const portrait = await readFile(path.join(process.cwd(), "public/portrait.jpg"));
  const src = `data:image/jpeg;base64,${portrait.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", gap: 56, padding: "0 96px", background: "#ffffff", color: "#161616" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={220} height={220} style={{ borderRadius: 999, objectFit: "cover" }} alt="" />
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 600, letterSpacing: "-0.02em" }}>Lucas de Almeida</div>
          <div style={{ display: "flex", fontSize: 32, color: "#5f5f5f", maxWidth: 720 }}>
            Computer Engineering student focused on Blockchain &amp; DeFi security
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#1a56db", marginTop: 12 }}>lucasalmeida.me</div>
        </div>
      </div>
    ),
    size,
  );
}
