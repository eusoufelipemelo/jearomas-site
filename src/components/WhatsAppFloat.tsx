import { siteConfig } from "@/site.config";
import { WhatsAppIcon } from "./icons";

/** Botão fixo de WhatsApp: mesmo link de orçamento do site anterior. */
export function WhatsAppFloat() {
  return (
    <a className="wa" href={siteConfig.orcamentoUrl} target="_blank" rel="noopener" aria-label="Falar com a Je Aromas no WhatsApp">
      <WhatsAppIcon width={30} height={30} />
    </a>
  );
}
