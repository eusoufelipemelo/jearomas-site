import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Política de Cookies",
  description: "Quais cookies e armazenamentos locais o site da Je Aromas usa. O site não usa cookies de publicidade nem de rastreamento.",
  path: "/politica-de-cookies",
});

export default function CookiesPage() {
  return (
    <LegalPage title="Política de Cookies" path="/politica-de-cookies" intro="O que o site guarda no seu navegador e por quê.">
      <h2>1. O que são cookies</h2>
      <p>
        Cookies são pequenos arquivos que um site grava no navegador. Tecnologias parecidas, como o armazenamento local (localStorage), guardam informações da
        mesma forma.
      </p>

      <h2>2. O que este site usa</h2>
      <p>
        <strong>O site da Je Aromas não usa cookies de publicidade, de redes sociais nem ferramentas de rastreamento de terceiros.</strong> Usamos apenas:
      </p>
      <ul>
        <li>
          <strong>Registro do aviso de cookies</strong> (armazenamento local, chave <code>jearomas-aviso-cookies</code>): lembra que você já viu o aviso, para
          não mostrá-lo de novo. Não identifica você.
        </li>
        <li>
          <strong>Contagem de leituras do blog</strong>: ao abrir um artigo, o navegador avisa a plataforma de conteúdo (OutBox CMS) que houve uma leitura. Não
          grava cookies e não identifica você pelo nome.
        </li>
      </ul>

      <h2>3. Serviços externos</h2>
      <p>
        Ao tocar nos botões de WhatsApp, você sai do site e passa a usar o WhatsApp, que segue a política de privacidade da Meta. As fontes do site são servidas
        pelo próprio domínio, sem chamadas ao Google.
      </p>

      <h2>4. Como gerenciar</h2>
      <p>
        Você pode apagar os dados do site nas configurações do navegador a qualquer momento. O site continua funcionando normalmente, apenas o aviso volta a
        aparecer.
      </p>
      <p>
        Mais informações sobre o tratamento de dados na <Link href="/politica-de-privacidade">Política de Privacidade</Link>.
      </p>
    </LegalPage>
  );
}
