"use client";

import { useEffect } from "react";
import { siteConfig } from "@/site.config";

/**
 * Interações da Home, ligadas ao HTML renderizado no servidor:
 * névoa aromática do topo, contadores, linha do processo, parallax, FAQ animado,
 * galeria ampliada e formulário que abre o WhatsApp.
 */
export function HomeEffects() {
  useEffect(() => {
    const d = document;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: (() => void)[] = [];
    const on = <K extends keyof WindowEventMap>(t: Window, ev: K, fn: (e: WindowEventMap[K]) => void, opt?: AddEventListenerOptions) => {
      t.addEventListener(ev, fn, opt);
      cleanups.push(() => t.removeEventListener(ev, fn));
    };

    /* Contadores */
    const numIO = new IntersectionObserver(
      (es) =>
        es.forEach((en) => {
          if (!en.isIntersecting) return;
          numIO.unobserve(en.target);
          const el = en.target as HTMLElement;
          const to = Number(el.dataset.to);
          if (reduce) return;
          const t0 = performance.now();
          const tick = (t: number) => {
            const p = Math.min((t - t0) / 1800, 1);
            el.textContent = `${Math.round(to * (1 - Math.pow(1 - p, 4)))}%`;
            if (p < 1) requestAnimationFrame(tick);
          };
          el.textContent = "0%";
          requestAnimationFrame(tick);
        }),
      { threshold: 0.6 },
    );
    d.querySelectorAll(".num").forEach((n) => numIO.observe(n));
    cleanups.push(() => numIO.disconnect());

    /* Linha do processo + parallax */
    const tl = d.getElementById("timeline");
    const fill = d.getElementById("tfill");
    const steps = tl ? [...tl.querySelectorAll<HTMLElement>(".step")] : [];
    const sobre = d.querySelector<HTMLElement>(".sobre__media");
    const heroBg = d.querySelector<HTMLElement>(".hero__bg");
    let ticking = false;
    const frame = () => {
      ticking = false;
      const vh = innerHeight;
      if (tl && fill) {
        const r = tl.getBoundingClientRect();
        fill.style.height = `${Math.min(Math.max((vh * 0.6 - r.top) / r.height, 0), 1) * 100}%`;
        steps.forEach((s) => {
          const dot = s.querySelector(".step__dot")!.getBoundingClientRect();
          s.classList.toggle("lit", dot.top < vh * 0.62);
        });
      }
      if (reduce) return;
      if (sobre) {
        const sr = sobre.getBoundingClientRect();
        if (sr.bottom > 0 && sr.top < vh) sobre.style.transform = `translateY(${(sr.top / vh) * -6}%)`;
      }
      if (heroBg && scrollY < vh) heroBg.style.transform = `translateY(${scrollY * 0.25}px)`;
    };
    const req = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(frame);
      }
    };
    on(window, "scroll", req, { passive: true });
    on(window, "resize", req);
    frame();

    /* FAQ: altura animada ao abrir e fechar */
    d.querySelectorAll<HTMLDetailsElement>(".acc details").forEach((det) => {
      const sum = det.querySelector("summary")!;
      const body = det.querySelector<HTMLElement>(".acc__b")!;
      const click = (e: Event) => {
        if (reduce) return;
        e.preventDefault();
        if (det.open) {
          const h = body.scrollHeight;
          body.animate([{ height: `${h}px`, opacity: 1 }, { height: "0px", opacity: 0 }], { duration: 380, easing: "cubic-bezier(.22,.61,.36,1)" }).onfinish = () => {
            det.open = false;
          };
        } else {
          det.open = true;
          const h = body.scrollHeight;
          body.animate([{ height: "0px", opacity: 0 }, { height: `${h}px`, opacity: 1 }], { duration: 480, easing: "cubic-bezier(.16,1,.3,1)" });
        }
      };
      sum.addEventListener("click", click);
      cleanups.push(() => sum.removeEventListener("click", click));
    });

    /* Galeria ampliada */
    const items = [...d.querySelectorAll<HTMLButtonElement>(".gi")];
    const lb = d.getElementById("lb");
    const lbImg = d.getElementById("lbimg") as HTMLImageElement | null;
    if (lb && lbImg && items.length) {
      let cur = 0;
      let lastFocus: HTMLElement | null = null;
      const show = (i: number) => {
        cur = (i + items.length) % items.length;
        const img = items[cur].querySelector("img")!;
        lbImg.src = img.getAttribute("src")!.includes("/_next/image") ? img.currentSrc : img.src;
        lbImg.alt = img.alt;
      };
      const open = (i: number) => {
        lastFocus = d.activeElement as HTMLElement;
        show(i);
        lb.hidden = false;
        d.body.style.overflow = "hidden";
        requestAnimationFrame(() => lb.classList.add("open"));
        d.getElementById("lbx")!.focus();
      };
      const close = () => {
        lb.classList.remove("open");
        d.body.style.overflow = "";
        setTimeout(() => (lb.hidden = true), 350);
        lastFocus?.focus();
      };
      items.forEach((it, i) => it.addEventListener("click", () => open(i)));
      d.getElementById("lbx")!.addEventListener("click", close);
      d.getElementById("lbp")!.addEventListener("click", () => show(cur - 1));
      d.getElementById("lbn")!.addEventListener("click", () => show(cur + 1));
      lb.addEventListener("click", (e) => e.target === lb && close());
      on(window, "keydown", (e) => {
        if (lb.hidden) return;
        if (e.key === "Escape") close();
        if (e.key === "ArrowLeft") show(cur - 1);
        if (e.key === "ArrowRight") show(cur + 1);
      });
    }

    /* Formulário → WhatsApp */
    const form = d.getElementById("form") as HTMLFormElement | null;
    const err = d.getElementById("ferr");
    if (form && err) {
      const submit = (e: SubmitEvent) => {
        e.preventDefault();
        const f = form.elements as unknown as Record<string, HTMLInputElement>;
        const falta: string[] = [];
        (
          [
            ["nome", "nome"],
            ["email", "e-mail"],
            ["whats", "WhatsApp"],
          ] as const
        ).forEach(([n, rot]) => {
          const bad = !f[n].value.trim() || (n === "email" && !f[n].checkValidity());
          f[n].setAttribute("aria-invalid", String(bad));
          if (bad) falta.push(rot);
        });
        if (falta.length) {
          err.textContent = `Preencha ${falta.join(", ").replace(/, ([^,]*)$/, " e $1")} para enviar.`;
          err.hidden = false;
          form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
          return;
        }
        err.hidden = true;
        const msg = f.msg.value.trim();
        const txt =
          `Olá Je Aromas, gostaria de um orçamento.\n\nNome: ${f.nome.value.trim()}\nE-mail: ${f.email.value.trim()}\nWhatsApp: ${f.whats.value.trim()}` +
          (msg ? `\nMensagem: ${msg}` : "");
        window.open(`https://api.whatsapp.com/send?phone=${siteConfig.contact.whatsapp}&text=${encodeURIComponent(txt)}`, "_blank", "noopener");
      };
      const input = (e: Event) => {
        const t = e.target as HTMLInputElement;
        if (t.getAttribute("aria-invalid") === "true" && t.value.trim()) t.setAttribute("aria-invalid", "false");
      };
      form.addEventListener("submit", submit);
      form.addEventListener("input", input);
      cleanups.push(() => {
        form.removeEventListener("submit", submit);
        form.removeEventListener("input", input);
      });
    }

    /* Névoa aromática do topo */
    const cv = d.getElementById("mist") as HTMLCanvasElement | null;
    if (cv && !reduce) {
      const ctx = cv.getContext("2d")!;
      let W = 0;
      let H = 0;
      let running = true;
      let mx = 0.5;
      let my = 0.5;
      let raf = 0;
      type Wisp = { x: number; y: number; r: number; vy: number; ph: number; amp: number; hue: number[]; a: number };
      const make = (fresh: boolean): Wisp => ({
        x: Math.random(),
        y: fresh ? 1.15 + Math.random() * 0.2 : Math.random() * 1.2,
        r: 0.12 + Math.random() * 0.22,
        vy: 0.00018 + Math.random() * 0.00035,
        ph: Math.random() * Math.PI * 2,
        amp: 0.03 + Math.random() * 0.06,
        hue: Math.random() < 0.7 ? [121, 70, 168] : [165, 127, 208],
        a: 0.05 + Math.random() * 0.08,
      });
      const size = () => {
        const dpr = Math.min(devicePixelRatio || 1, 1.5);
        W = cv.clientWidth;
        H = cv.clientHeight;
        cv.width = W * dpr;
        cv.height = H * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };
      size();
      on(window, "resize", size);
      const wisps = Array.from({ length: innerWidth < 720 ? 9 : 16 }, () => make(false));
      const hero = cv.parentElement!;
      const pm = (e: PointerEvent) => {
        mx = e.clientX / W;
        my = e.clientY / H;
      };
      hero.addEventListener("pointermove", pm);
      cleanups.push(() => hero.removeEventListener("pointermove", pm));
      let last = performance.now();
      const draw = (t: number) => {
        if (!running) return;
        const dt = Math.min(t - last, 50);
        last = t;
        ctx.clearRect(0, 0, W, H);
        for (const w of wisps) {
          w.y -= w.vy * dt;
          w.ph += dt * 0.0004;
          const dx = w.x - mx;
          const dy = w.y - my;
          w.x += Math.sign(dx) * Math.max(0, 0.18 - Math.hypot(dx, dy)) * 0.0004 * dt;
          const x = (w.x + Math.sin(w.ph) * w.amp) * W;
          const y = w.y * H;
          const R = w.r * Math.max(W, H);
          const fade = Math.min(1, (1.2 - w.y) * 2) * Math.min(1, (w.y + 0.1) * 3);
          const g = ctx.createRadialGradient(x, y, 0, x, y, R);
          const [r, gg, b] = w.hue;
          g.addColorStop(0, `rgba(${r},${gg},${b},${w.a * fade})`);
          g.addColorStop(1, `rgba(${r},${gg},${b},0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.ellipse(x, y, R, R * 0.62, Math.sin(w.ph) * 0.4, 0, Math.PI * 2);
          ctx.fill();
          if (w.y < -0.3) Object.assign(w, make(true));
        }
        raf = requestAnimationFrame(draw);
      };
      const vis = new IntersectionObserver(([en]) => {
        running = en.isIntersecting;
        if (running) {
          last = performance.now();
          raf = requestAnimationFrame(draw);
        } else cancelAnimationFrame(raf);
      });
      vis.observe(cv);
      cleanups.push(() => {
        vis.disconnect();
        cancelAnimationFrame(raf);
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
