"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/site.config";

/**
 * Cabeçalho fixo que fica sólido ao rolar. O menu do celular é irmão do <header>:
 * o backdrop-filter do cabeçalho prenderia um filho position:fixed dentro dele.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [lastPath, setLastPath] = useState(pathname);

  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40 || pathname !== "/");
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // link ativo conforme a seção visível (só na Home)
  useEffect(() => {
    if (pathname !== "/") return;
    const ids = siteConfig.nav.map((l) => l.href.split("#")[1]).filter(Boolean);
    const io = new IntersectionObserver(
      (es) => es.forEach((en) => en.isIntersecting && setActive(en.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname]);

  // menu aberto: trava a rolagem e fecha com Esc
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isOn = (href: string) => {
    if (href.startsWith("/#")) return pathname === "/" && active === href.slice(2);
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <header className={`nav${solid ? " solid" : ""}`}>
        <div className="nav__in wrap">
          <Link href="/" className="nav__logo" aria-label={`${siteConfig.name}, página inicial`}>
            <Image src={siteConfig.logo.src} alt={siteConfig.name} width={siteConfig.logo.width} height={siteConfig.logo.height} priority />
          </Link>
          <nav className="nav__links" aria-label="Principal">
            {siteConfig.nav.map((l) => (
              <Link key={l.href} href={l.href} className={isOn(l.href) ? "on" : undefined} aria-current={isOn(l.href) && !l.href.includes("#") ? "page" : undefined}>
                {l.label}
              </Link>
            ))}
          </nav>
          <a className="btn btn--sm nav__cta" href={siteConfig.orcamentoUrl} target="_blank" rel="noopener">
            Quero um orçamento
          </a>
          <button
            type="button"
            className="nav__burger"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>
      <div className="menu" id="menu" hidden={!open}>
        <nav aria-label="Menu do celular" onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)}>
          {siteConfig.nav.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
        <a className="btn" href={siteConfig.orcamentoUrl} target="_blank" rel="noopener">
          Quero um orçamento
        </a>
      </div>
    </>
  );
}
