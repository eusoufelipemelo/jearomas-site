import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = pageMetadata({
  title: "Termos de Uso",
  description: "Regras de uso do site da Je Aromas: conteúdo, propriedade intelectual, links externos e responsabilidades.",
  path: "/termos-de-uso",
});

export default function TermsPage() {
  return (
    <LegalPage title="Termos de Uso" path="/termos-de-uso" intro="As regras para usar este site.">
      <h2>1. Sobre o site</h2>
      <p>
        Este site é mantido pela {siteConfig.name} (CNPJ {siteConfig.cnpj}) para apresentar os serviços de marketing olfativo e identidade olfativa e publicar
        conteúdos sobre o tema. Ao navegar, você concorda com estes termos.
      </p>

      <h2>2. Conteúdo informativo</h2>
      <p>
        Os textos do site e do blog têm caráter informativo. Os dados de mercado citados vêm de estudos e publicações sobre marketing sensorial e podem variar
        conforme o segmento e o ambiente. Orçamentos, prazos e condições são definidos caso a caso, na conversa com a equipe.
      </p>

      <h2>3. Propriedade intelectual</h2>
      <p>
        A marca {siteConfig.name}, o logotipo, as fotos, os textos e o layout do site pertencem à {siteConfig.name} ou são usados com autorização. Os logotipos de
        clientes pertencem às respectivas empresas. É proibido copiar ou reproduzir esse conteúdo sem autorização, exceto para citação com indicação da fonte.
      </p>

      <h2>4. Links externos</h2>
      <p>O site tem links para serviços de terceiros, como o WhatsApp. A {siteConfig.name} não controla esses serviços nem responde pelas políticas deles.</p>

      <h2>5. Privacidade</h2>
      <p>
        O tratamento de dados pessoais segue a <Link href="/politica-de-privacidade">Política de Privacidade</Link> e a{" "}
        <Link href="/politica-de-cookies">Política de Cookies</Link>.
      </p>

      <h2>6. Alterações e foro</h2>
      <p>
        Estes termos podem ser atualizados a qualquer momento. Fica eleito o foro da comarca de Navegantes (SC) para resolver questões relacionadas ao uso do site,
        observada a legislação de defesa do consumidor.
      </p>
    </LegalPage>
  );
}
