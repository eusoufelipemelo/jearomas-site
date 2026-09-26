import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = pageMetadata({
  title: "LGPD: seus direitos",
  description: "Quais são os seus direitos sobre dados pessoais pela LGPD e como pedir cada um à Je Aromas.",
  path: "/lgpd",
});

const rights = [
  ["Confirmação e acesso", "saber se tratamos dados seus e receber uma cópia deles."],
  ["Correção", "corrigir dados incompletos, inexatos ou desatualizados."],
  ["Anonimização, bloqueio ou eliminação", "de dados desnecessários, excessivos ou tratados em desacordo com a lei."],
  ["Portabilidade", "receber os seus dados em formato que permita levá-los a outro fornecedor."],
  ["Eliminação", "apagar os dados tratados com base no seu consentimento, salvo quando a lei exigir guardá-los."],
  ["Informação sobre compartilhamento", "saber com quais empresas e órgãos os seus dados foram compartilhados."],
  ["Revogação do consentimento", "retirar a autorização dada, a qualquer momento."],
  ["Oposição e revisão", "se opor a um tratamento irregular e pedir revisão de decisões automatizadas."],
];

export default function LgpdPage() {
  const c = siteConfig.contact;
  return (
    <LegalPage title="LGPD: seus direitos" path="/lgpd" intro="O que a Lei Geral de Proteção de Dados garante a você e como fazer o pedido.">
      <h2>Seus direitos</h2>
      <p>Pelo art. 18 da LGPD, você pode pedir à {siteConfig.name}, a qualquer momento e sem custo:</p>
      <ul>
        {rights.map(([t, d]) => (
          <li key={t}>
            <strong>{t}:</strong> {d}
          </li>
        ))}
      </ul>

      <h2>Como fazer o pedido</h2>
      <p>
        Envie o pedido para {c.email} ou pelo WhatsApp {c.whatsappDisplay}, dizendo qual direito quer exercer. Podemos pedir uma confirmação de identidade para
        proteger os seus dados. Respondemos em até 15 dias.
      </p>

      <h2>Autoridade Nacional</h2>
      <p>
        Se não ficar satisfeito com a resposta, você pode procurar a Autoridade Nacional de Proteção de Dados (ANPD), em{" "}
        <a href="https://www.gov.br/anpd" target="_blank" rel="noopener">
          gov.br/anpd
        </a>
        .
      </p>
    </LegalPage>
  );
}
