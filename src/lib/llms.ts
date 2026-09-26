import "server-only";
import { absoluteUrl } from "@/lib/env";
import type { PostSummary } from "@/lib/outbox";
import { siteConfig } from "@/site.config";

/** llms.txt de reserva (quando o CMS não responde), montado com o site.config.ts. */
export function fallbackLlms(posts: PostSummary[], full: boolean): string {
  const c = siteConfig.contact;
  const a = siteConfig.about;
  const lines: string[] = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    `${siteConfig.name} é uma empresa de marketing olfativo de Navegantes (SC), no mercado desde ${siteConfig.foundingYear}, com mais de 200 clientes atendidos. Fundadora: ${a.expert.name}. Cria identidades olfativas personalizadas (fragrâncias exclusivas para marcas) e faz a aromatização de ambientes comerciais.`,
    "",
    "## Contato",
    "",
    `- WhatsApp: ${c.whatsappDisplay} (https://wa.me/${c.whatsapp})`,
    `- Orçamento: ${siteConfig.orcamentoUrl}`,
    `- E-mail: ${c.email}`,
    `- Localização: ${c.address.city} - ${c.address.state}, Brasil`,
    `- CNPJ: ${siteConfig.cnpj}`,
    "",
    "## Páginas",
    "",
    `- [Início](${absoluteUrl("/")}): marketing olfativo, benefícios, dados, processo, galeria, depoimentos e perguntas frequentes`,
    `- [Blog](${absoluteUrl("/blog")}): ${siteConfig.blog.description}`,
    `- [Política de Privacidade](${absoluteUrl("/politica-de-privacidade")})`,
    "",
    "## Serviços",
    "",
    ...siteConfig.services.map((s) => `- ${s.title}: ${s.description}`),
  ];
  if (full) {
    lines.push("", "## Sobre", "", ...a.paragraphs.flatMap((p) => [p, ""]), `"${a.quote}"`, "");
    lines.push("## Benefícios do marketing olfativo", "", ...siteConfig.benefits.map((b) => `- ${b.title}: ${b.text}`), "");
    lines.push("## O poder do marketing olfativo (dados)", "", ...siteConfig.stats.map((s) => `- ${s.value}%: ${s.text}`), "");
    lines.push("## Processo de criação da identidade olfativa (4 etapas)", "");
    siteConfig.process.forEach((s, i) => lines.push(`${i + 1}. ${s.title}: ${s.text}`));
    lines.push("", "## Por que escolher o marketing olfativo", "", ...siteConfig.whyScent.map((w) => `- ${w.title}: ${w.text}`), "");
    lines.push("## Depoimentos de clientes", "", ...siteConfig.testimonials.map((t) => `- "${t.text}" (${t.name}${t.role ? `, ${t.role}` : ""})`), "");
    lines.push("## Perguntas frequentes", "", ...siteConfig.faq.flatMap((f) => [`### ${f.q}`, "", f.a, ""]));
  }
  if (posts.length) {
    lines.push("", "## Artigos", "");
    for (const p of posts) {
      const summary = (full ? (p.answerSummary ?? p.excerpt) : p.excerpt).replace(/\s+/g, " ").trim();
      lines.push(`- [${p.title}](${absoluteUrl(`/blog/${p.slug}`)})${summary ? `: ${summary}` : ""}`);
    }
  }
  return `${lines.filter((l, i, arr) => !(l === "" && arr[i - 1] === "")).join("\n").trim()}\n`;
}
