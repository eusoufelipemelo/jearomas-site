import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/site.config";

// Imagem padrão de compartilhamento (1200x630) na identidade Je Aromas.
export const dynamic = "force-static";

export async function GET() {
  const svg = await readFile(path.join(process.cwd(), "public", siteConfig.logo.src));
  const logo = `data:image/svg+xml;base64,${svg.toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          color: "#EDEDED",
          background: "radial-gradient(ellipse 70% 90% at 80% 110%, rgba(121,70,168,0.55), rgba(11,11,11,0) 70%), radial-gradient(ellipse 50% 60% at 10% -10%, rgba(102,58,143,0.35), rgba(11,11,11,0) 70%), #0B0B0B",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} width={128} height={96} alt="" />
        <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 68, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2 }}>
          <span>Transforme sua marca com uma</span>
          <span style={{ display: "flex", gap: 20 }}>
            <span style={{ color: "#9A6BD0" }}>FRAGRÂNCIA</span>
            <span>única e memorável.</span>
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#A3A9AD" }}>
          <span>Marketing olfativo e identidade olfativa</span>
          <span>jearomas.com.br</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
