"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const KEY = "jearomas-aviso-cookies";

/** Aviso discreto: o site não usa cookies de publicidade nem de rastreamento. */
export function CookieNotice() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) {
        const t = setTimeout(() => setShow(true), 2400);
        return () => clearTimeout(t);
      }
    } catch {
      // armazenamento bloqueado: não mostra o aviso a cada página
    }
  }, []);

  if (!show) return null;

  function dismiss() {
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
    setShow(false);
  }

  return (
    <div role="region" aria-label="Aviso sobre cookies" className="cookie">
      <p>
        Este site não usa cookies de publicidade nem de rastreamento, só o necessário para funcionar. Saiba mais na{" "}
        <Link href="/politica-de-cookies">Política de Cookies</Link>.
      </p>
      <button type="button" onClick={dismiss} className="btn btn--sm">
        Entendi
      </button>
    </div>
  );
}
