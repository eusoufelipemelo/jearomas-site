import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { Container } from "./Container";

/** Cabeçalho das páginas internas: trilha, h1 e texto de apoio. */
export function PageHeader({ title, intro, crumbs, children }: { title: string; intro?: string; crumbs: Crumb[]; children?: ReactNode }) {
  return (
    <header className="pagehead border-b border-line">
      <Container className="py-10 sm:py-14">
        <Breadcrumbs items={crumbs} />
        <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.1] tracking-[-0.025em] text-ink sm:text-5xl">{title}</h1>
        {intro ? <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p> : null}
        {children}
      </Container>
    </header>
  );
}
