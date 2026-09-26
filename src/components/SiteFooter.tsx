import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/site.config";

const legal = [
  { label: "Política de Privacidade", href: "/politica-de-privacidade" },
  { label: "Política de Cookies", href: "/politica-de-cookies" },
  { label: "LGPD", href: "/lgpd" },
  { label: "Termos de Uso", href: "/termos-de-uso" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="foot">
      <span className="foot__line" aria-hidden="true" />
      <div className="wrap foot__top">
        <Link href="/" aria-label={`${siteConfig.name}, página inicial`}>
          <Image src={siteConfig.logo.src} alt={siteConfig.name} width={64} height={48} />
        </Link>
        <nav aria-label="Rodapé" className="foot__nav">
          {siteConfig.nav.slice(1).map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="wrap foot__in">
        <p>
          {siteConfig.name} | © Copyright {year}. CNPJ: {siteConfig.cnpj}
        </p>
        <nav aria-label="Documentos legais" className="foot__legal">
          {legal.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
        <p>
          Desenvolvido por:{" "}
          <a href="https://www.outboxgroup.com.br/" target="_blank" rel="noopener" className="foot__credit">
            OutBox Group
          </a>
        </p>
      </div>
    </footer>
  );
}
