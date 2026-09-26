import type { Metadata, Viewport } from "next";
import type { CSSProperties } from "react";
import { CookieNotice } from "@/components/CookieNotice";
import { JsonLd } from "@/components/JsonLd";
import { SiteEffects } from "@/components/SiteEffects";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { siteUrl } from "@/lib/env";
import { siteGraph } from "@/lib/jsonld";
import { defaultOgImage } from "@/lib/seo";
import { bodyFont, displayFont, siteConfig } from "@/site.config";
import "./globals.css";

export function generateMetadata(): Metadata {
  return {
    metadataBase: new URL(siteUrl()),
    title: { default: `${siteConfig.name} | Marketing Olfativo Personalizado`, template: `%s | ${siteConfig.name}` },
    description: siteConfig.description,
    applicationName: siteConfig.name,
    keywords: [
      "marketing olfativo",
      "identidade olfativa",
      "fragrância personalizada",
      "branding sensorial",
      "aromatização de ambientes",
      "marketing sensorial",
      "Je Aromas",
    ],
    // canonical fica em cada página (herdar "/" daqui faria todas apontarem para a Home)
    alternates: {
      types: { "application/rss+xml": [{ url: "/feed.xml", title: `${siteConfig.name}: blog` }] },
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      url: "/",
      images: [{ url: defaultOgImage(), width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: siteConfig.theme.surface,
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

/** Cores do site.config.ts como variáveis CSS (ver globals.css). */
const themeVars = {
  "--brand": siteConfig.theme.brand,
  "--brand-contrast": siteConfig.theme.brandContrast,
  "--brand-soft": siteConfig.theme.brandSoft,
  "--ink": siteConfig.theme.ink,
  "--muted": siteConfig.theme.muted,
  "--surface": siteConfig.theme.surface,
  "--surface-alt": siteConfig.theme.surfaceAlt,
  "--line": siteConfig.theme.line,
  "--radius": siteConfig.theme.radius,
} as CSSProperties;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={siteConfig.language} style={themeVars} className={`${displayFont.variable} ${bodyFont.variable}`} suppressHydrationWarning>
      <head>
        {/* Marca que o JS está ativo antes da pintura: as entradas animadas só escondem conteúdo com JS. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a className="skip" href="#conteudo">
          Pular para o conteúdo
        </a>
        <SiteHeader />
        <main id="conteudo">{children}</main>
        <SiteFooter />
        <WhatsAppFloat />
        <CookieNotice />
        <SiteEffects />
        <JsonLd data={siteGraph()} />
      </body>
    </html>
  );
}
