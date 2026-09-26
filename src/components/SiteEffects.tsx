"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Entradas escalonadas (.reveal) e o brilho que segue o cursor nos botões, em todas as páginas. */
export function SiteEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((en) => {
          if (!en.isIntersecting) return;
          en.target.classList.add("in");
          io.unobserve(en.target);
        }),
      { rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll<HTMLElement>(".reveal:not(.in)").forEach((el) => {
      const sibs = [...(el.parentElement?.children ?? [])].filter((c) => c.classList.contains("reveal"));
      el.style.setProperty("--d", `${Math.min(sibs.indexOf(el), 6) * 0.08}s`);
      io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const b = (e.target as HTMLElement | null)?.closest?.<HTMLElement>(".btn");
      if (!b) return;
      const r = b.getBoundingClientRect();
      b.style.setProperty("--mx", `${e.clientX - r.left}px`);
      b.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", move);
    return () => document.removeEventListener("pointermove", move);
  }, []);

  return null;
}
