import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = pageMetadata({
  title: "Política de Privacidade",
  description: "Como a Je Aromas trata os dados pessoais de quem visita o site e pede um orçamento, de acordo com a LGPD.",
  path: "/politica-de-privacidade",
});

export default function PrivacyPage() {
  const c = siteConfig.contact;
  return (
    <LegalPage title="Política de Privacidade" path="/politica-de-privacidade" intro="Como são tratados os dados de quem visita o site e pede um orçamento à Je Aromas.">
      <h2>1. Quem é a controladora</h2>
      <p>
        Este site é da {siteConfig.name}, inscrita no CNPJ {siteConfig.cnpj}, com sede em Navegantes (SC). Para os fins da Lei Geral de Proteção de Dados
        Pessoais (Lei nº 13.709/2018, a LGPD), a {siteConfig.name} é a controladora dos dados pessoais tratados a partir deste site.
      </p>
      <p>
        Para qualquer assunto de privacidade, fale com a gente pelo e-mail {c.email} ou pelo WhatsApp {c.whatsappDisplay}.
      </p>

      <h2>2. Quais dados são tratados</h2>
      <h3>Dados que você envia pelo formulário</h3>
      <p>
        No formulário de orçamento, você informa nome, e-mail, número de WhatsApp e, se quiser, uma mensagem sobre a sua marca.{" "}
        <strong>Esses dados não ficam guardados no site.</strong> O formulário apenas monta uma mensagem e abre o WhatsApp no seu aparelho; ela só chega à{" "}
        {siteConfig.name} se você decidir enviá-la.
      </p>
      <h3>Dados da conversa e do projeto</h3>
      <p>
        Nas conversas por WhatsApp e e-mail e durante o desenvolvimento da identidade olfativa, tratamos as informações que você compartilhar sobre a sua empresa,
        como dados de contato, endereço de entrega e informações para emissão de nota fiscal.
      </p>
      <h3>Dados de navegação</h3>
      <p>
        O servidor de hospedagem registra dados técnicos de acesso, como endereço IP, data e hora, página visitada e tipo de navegador, para manter o site
        funcionando e seguro. Nos artigos do blog, a plataforma de conteúdo (OutBox CMS) conta as leituras usando dados técnicos da conexão, apenas para evitar
        contagem repetida, sem identificar você pelo nome.
      </p>
      <p>
        O site não usa cookies de publicidade nem ferramentas de rastreamento de terceiros. Veja os detalhes na{" "}
        <Link href="/politica-de-cookies">Política de Cookies</Link>.
      </p>

      <h2>3. Para que os dados são usados</h2>
      <ul>
        <li>Responder ao seu contato e enviar o orçamento;</li>
        <li>Desenvolver, entregar e dar suporte à identidade olfativa e aos produtos contratados;</li>
        <li>Emitir documentos fiscais e cumprir obrigações legais;</li>
        <li>Manter o site funcionando, seguro e com estatísticas agregadas de leitura do blog.</li>
      </ul>

      <h2>4. Bases legais</h2>
      <p>
        Tratamos dados com base no consentimento (ao enviar a mensagem), na execução de contrato ou de procedimentos preliminares a pedido do titular, no
        cumprimento de obrigação legal e no legítimo interesse de manter o site seguro, conforme o art. 7º da LGPD.
      </p>

      <h2>5. Com quem os dados são compartilhados</h2>
      <p>Dados pessoais não são vendidos. Eles podem passar por fornecedores que ajudam a operar o site e o atendimento:</p>
      <ul>
        <li>WhatsApp (Meta), por onde a conversa acontece, conforme a política de privacidade do próprio aplicativo;</li>
        <li>Empresa de hospedagem do site e OutBox Group, que desenvolve e mantém o site e a plataforma do blog;</li>
        <li>Transportadoras e serviços de entrega, quando houver envio de produtos;</li>
        <li>Contabilidade e autoridades públicas, quando houver obrigação legal ou ordem judicial.</li>
      </ul>

      <h2>6. Por quanto tempo os dados são guardados</h2>
      <p>
        As mensagens de orçamento são mantidas pelo tempo necessário ao atendimento. Dados de clientes são guardados enquanto durar a relação comercial e pelos
        prazos exigidos pela legislação fiscal. Registros técnicos de acesso ao site são mantidos por seis meses, como prevê o Marco Civil da Internet.
      </p>

      <h2>7. Seus direitos</h2>
      <p>
        Você pode pedir confirmação do tratamento, acesso, correção, anonimização, portabilidade, informação sobre compartilhamento, revogação do consentimento e
        eliminação dos dados, entre outros direitos do art. 18 da LGPD. Veja como exercer cada um na página <Link href="/lgpd">LGPD: seus direitos</Link>.
      </p>

      <h2>8. Segurança</h2>
      <p>O site usa conexão criptografada (HTTPS) e não armazena os dados do formulário. As informações recebidas no atendimento têm acesso restrito à equipe.</p>

      <h2>9. Alterações</h2>
      <p>Esta política pode ser atualizada. A data da última versão aparece no início da página.</p>
    </LegalPage>
  );
}
