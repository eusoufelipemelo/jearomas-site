import { siteConfig } from "@/site.config";
import { MailIcon, PhoneIcon, WhatsAppIcon } from "./icons";

/** Chamada de contato (WhatsApp, telefone, e-mail) com os textos do site.config.ts > cta. */
export function CtaBlock({ title = siteConfig.cta.title, text = siteConfig.cta.text, as: Heading = "h2" }: { title?: string; text?: string; as?: "h2" | "h3" }) {
  const c = siteConfig.contact;
  const wa = siteConfig.orcamentoUrl;
  return (
    <section aria-label="Fale com a gente" className="ctablock overflow-hidden rounded-[calc(var(--radius)*1.6)] text-brand-contrast">
      <div className="grid gap-6 p-7 sm:p-10 md:grid-cols-[1.3fr_1fr] md:items-center">
        <div>
          <Heading className="font-display text-2xl font-bold leading-tight sm:text-3xl">{title}</Heading>
          <p className="mt-3 max-w-xl text-brand-contrast/85">{text}</p>
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          {wa ? (
            <a href={wa} target="_blank" rel="noopener" className="btn btn-inverse w-full md:w-auto">
              <WhatsAppIcon />
              {siteConfig.cta.button}
            </a>
          ) : null}
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-[0.95rem] md:justify-end">
            {c.phone ? (
              <a href={`tel:${c.phoneHref}`} className="inline-flex min-h-11 items-center gap-2 underline-offset-4 hover:underline">
                <PhoneIcon /> {c.phone}
              </a>
            ) : null}
            {c.email ? (
              <a href={`mailto:${c.email}`} className="inline-flex min-h-11 items-center gap-2 underline-offset-4 hover:underline">
                <MailIcon /> {c.email}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
