import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HomeEffects } from "@/components/HomeEffects";
import { JsonLd } from "@/components/JsonLd";
import { PostCard } from "@/components/PostCard";
import { MailIcon, PinIcon, WhatsAppIcon } from "@/components/icons";
import { absoluteUrl } from "@/lib/env";
import { organizationId } from "@/lib/jsonld";
import { getPosts } from "@/lib/outbox";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";

export const revalidate = 300;

export const metadata: Metadata = {
  ...pageMetadata({
    title: `${siteConfig.name} | Marketing Olfativo Personalizado`,
    description: siteConfig.description,
    path: "/",
  }),
  title: { absolute: `${siteConfig.name} | Marketing Olfativo Personalizado` },
};

const ORC = siteConfig.orcamentoUrl;

const icons: Record<string, React.ReactNode> = {
  star: <path d="m12 3 2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7L12 3Z" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  heart: <path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.3 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z" />,
  shield: (
    <>
      <path d="M12 3 5 6v5c0 4.4 3 8.4 7 9.5 4-1.1 7-5.1 7-9.5V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
};

const solid: Record<string, React.ReactNode> = {
  arrow: <path d="M14 3 5 12l4 4 9-9h-4Zm-5 13 4 4h5l-4-4-2 2-3-2Z" />,
  link: (
    <path
      d="M10 14a4 4 0 0 1 0-5.7l2-2a4 4 0 0 1 5.7 5.7l-1 1M14 10a4 4 0 0 1 0 5.7l-2 2A4 4 0 0 1 6.3 12l1-1"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  ),
  people: (
    <path d="M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-6 1a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm12 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM12 13c-3 0-5 1.5-5 3.5V19h10v-2.5c0-2-2-3.5-5-3.5Zm-6.5.5C3.5 13.7 2 14.8 2 16.3V19h3v-2.5c0-1.1.2-2.1.5-3Zm13 0c.3.9.5 1.9.5 3V19h3v-2.7c0-1.5-1.5-2.6-3.5-2.8Z" />
  ),
  flask: <path d="M9 3h6v2h-1v4.3l5.4 8.9A2 2 0 0 1 17.7 21H6.3a2 2 0 0 1-1.7-2.8L10 9.3V5H9V3Z" />,
};

function SecHead({ title, intro, id }: { title: string; intro?: React.ReactNode; id?: string }) {
  return (
    <header className="sec-head">
      <h2 className="h2 reveal" id={id}>
        {title}
      </h2>
      <span className="rule rule--c reveal" aria-hidden="true" />
      {intro ? <p className="reveal">{intro}</p> : null}
    </header>
  );
}

function homeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${absoluteUrl("/")}#webpage`,
        url: absoluteUrl("/"),
        name: `${siteConfig.name} | Marketing Olfativo Personalizado`,
        description: siteConfig.description,
        inLanguage: siteConfig.language,
        about: { "@id": organizationId() },
        isPartOf: { "@id": `${absoluteUrl("/")}#website` },
      },
      {
        "@type": "FAQPage",
        "@id": `${absoluteUrl("/")}#faq`,
        mainEntity: siteConfig.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a.replace(/\n+/g, " ") } })),
      },
      {
        "@type": "HowTo",
        "@id": `${absoluteUrl("/")}#processo`,
        name: "Como a Je Aromas desenvolve uma identidade olfativa",
        description: "Desenvolvemos sua identidade olfativa em 4 etapas principais, garantindo uma fragrância exclusiva e perfeitamente alinhada com sua marca.",
        step: siteConfig.process.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.text })),
      },
      ...siteConfig.testimonials.map((t) => ({
        "@type": "Review",
        itemReviewed: { "@id": organizationId() },
        reviewBody: t.text,
        author: { "@type": t.role ? "Person" : "Organization", name: t.name, ...(t.role ? { worksFor: { "@type": "Organization", name: t.role } } : {}) },
      })),
    ],
  };
}

export default async function HomePage() {
  const { posts } = await getPosts({ page: 1, perPage: 3 });
  const a = siteConfig.about;
  const logos = Array.from({ length: siteConfig.clientLogos }, (_, i) => `/clientes/c${String(i + 1).padStart(2, "0")}.svg`);

  return (
    <>
      <JsonLd data={homeJsonLd()} />
      <HomeEffects />

      {/* HERO */}
      <section className="hero" id="inicio">
        <div className="hero__bg" aria-hidden="true">
          <Image src="/img/hero.webp" alt="" fill priority sizes="100vw" />
        </div>
        <canvas className="hero__mist" id="mist" aria-hidden="true" />
        <div className="hero__in wrap">
          <h1 className="hero__title">
            <span className="line">
              <span>Transforme sua marca com uma</span>
            </span>
            <span className="line">
              <span>
                <strong>FRAGRÂNCIA</strong> única e memorável.
              </span>
            </span>
          </h1>
          <span className="hero__rule" aria-hidden="true" />
          <p className="hero__lead">
            Assim como uma música ou cor pode evocar memórias e sentimentos, um aroma também tem o poder de criar uma conexão emocional com os consumidores.
          </p>
          <a className="btn hero__cta" href={ORC} target="_blank" rel="noopener">
            Quero um orçamento
          </a>
        </div>
        <a href="#sobre" className="hero__scroll" aria-label="Rolar para Sobre a Je Aromas">
          <span />
        </a>
      </section>

      {/* SOBRE */}
      <section className="sobre" id="sobre" aria-labelledby="sobre-t">
        <div className="sobre__media" aria-hidden="true">
          <Image src="/img/sobre.webp" alt="" fill sizes="(min-width: 960px) 62vw, 100vw" />
        </div>
        <div className="wrap sobre__grid">
          <div className="sobre__text">
            <h2 className="h2 reveal" id="sobre-t">
              Sobre a Je Aromas
            </h2>
            <span className="rule reveal" aria-hidden="true" />
            <p className="lead reveal">{a.paragraphs[0]}</p>
            <p className="reveal">{a.paragraphs[1]}</p>
            <blockquote className="quote reveal">“{a.quote}”</blockquote>
            <ul className="facts reveal">
              <li>
                <span className="facts__ic">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3Zm-1.2 14.2-3.5-3.5 1.4-1.4 2.1 2.1 4.9-4.9 1.4 1.4-6.3 6.3Z" />
                  </svg>
                </span>
                {a.facts[0].label}
              </li>
              <li>
                <span className="facts__ic">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM9 13c-3 0-6 1.5-6 4v2h12v-2c0-2.5-3-4-6-4Zm7 0c-.5 0-1 .05-1.5.13 1.5.9 2.5 2.2 2.5 3.87v2h4v-2c0-2.3-2.5-4-5-4Z" />
                  </svg>
                </span>
                {a.facts[1].label}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CLIENTES */}
      <section className="clientes" id="clientes" aria-labelledby="clientes-t">
        <div className="wrap clientes__head">
          <h2 className="h2 reveal" id="clientes-t">
            Nossos Clientes
          </h2>
          <p className="reveal">
            Temos o privilégio de atender marcas que reconhecem o poder do marketing olfativo para criar experiências inesquecíveis. Conheça algumas das empresas
            que confiam em nosso trabalho.
          </p>
        </div>
        <div className="marquee">
          <ul className="marquee__track" aria-label="Logos de clientes da Je Aromas">
            {logos.map((src) => (
              <li key={src}>
                <Image src={src} alt="Logo de cliente da Je Aromas" width={150} height={150} unoptimized />
              </li>
            ))}
            {logos.map((src) => (
              <li key={`${src}-b`} aria-hidden="true" className="marquee__dup">
                <Image src={src} alt="" width={150} height={150} unoptimized />
              </li>
            ))}
          </ul>
        </div>
        <div className="wrap center">
          <a className="btn reveal" href={ORC} target="_blank" rel="noopener">
            Quero um orçamento
          </a>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="beneficios" id="beneficios" aria-labelledby="beneficios-t">
        <div className="wrap">
          <SecHead
            id="beneficios-t"
            title="Benefícios do Marketing Olfativo"
            intro="Descubra como uma identidade olfativa pode transformar a experiência dos seus clientes e potencializar os resultados do seu negócio."
          />
          <ul className="bgrid">
            {siteConfig.benefits.map((b) => (
              <li key={b.title} className="bcard reveal">
                <svg className="bcard__ic" viewBox="0 0 24 24" aria-hidden="true">
                  {icons[b.icon]}
                </svg>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* NÚMEROS */}
      <section className="numeros" id="numeros" aria-labelledby="numeros-t">
        <div className="wrap">
          <SecHead id="numeros-t" title="O poder do Marketing Olfativo" intro="Dados que comprovam a eficácia" />
          <ul className="ngrid">
            {siteConfig.stats.map((s) => (
              <li key={s.value} className="reveal">
                <span className="num" data-to={s.value}>
                  {s.value}%
                </span>
                <p>{s.text}</p>
              </li>
            ))}
          </ul>
          <div className="center">
            <a className="btn reveal" href={ORC} target="_blank" rel="noopener">
              Conheça nosso processo
            </a>
          </div>
        </div>
      </section>

      {/* PROCESSO */}
      <section className="processo" id="processo" aria-labelledby="processo-t">
        <div className="processo__bg" aria-hidden="true">
          <Image src="/img/processo.webp" alt="" fill sizes="100vw" />
        </div>
        <div className="wrap">
          <SecHead
            id="processo-t"
            title="Nosso Processo"
            intro={
              <>
                Desenvolvemos sua identidade olfativa em <b>4 etapas principais</b>, garantindo uma fragrância exclusiva e perfeitamente alinhada com sua marca.
              </>
            }
          />
          <ol className="timeline" id="timeline">
            <span className="timeline__line" aria-hidden="true">
              <span className="timeline__fill" id="tfill" />
            </span>
            {siteConfig.process.map((s, i) => (
              <li key={s.title} className="step">
                <span className="step__dot" aria-hidden="true" />
                <div className="step__card">
                  <span className="step__n" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="center">
            <a className="btn reveal" href={ORC} target="_blank" rel="noopener">
              Conheça nosso processo
            </a>
          </div>
        </div>
      </section>

      {/* GALERIA */}
      <section className="galeria" id="galeria" aria-labelledby="galeria-t">
        <div className="wrap">
          <SecHead id="galeria-t" title="Galeria Je Aromas" />
          <div className="ggrid" id="ggrid">
            {siteConfig.gallery.map((g) => (
              <button key={g.src} type="button" className={`gi reveal${g.shape ? ` gi--${g.shape}` : ""}`} aria-label={`Ampliar foto: ${g.alt}`}>
                <Image src={g.src} alt={g.alt} fill sizes="(min-width: 1000px) 500px, 50vw" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* POR QUE */}
      <section className="porque" id="porque" aria-labelledby="porque-t">
        <div className="wrap porque__grid">
          <figure className="porque__photo reveal">
            <Image src="/img/jeruza.webp" alt={`${a.expert.name}, ${a.expert.credentials.toLowerCase()}`} fill sizes="(min-width: 960px) 480px, 100vw" />
            <figcaption>
              <strong>{a.expert.name}</strong>
              <span>{a.expert.credentials}</span>
            </figcaption>
          </figure>
          <div className="porque__body">
            <h2 className="h2 reveal" id="porque-t">
              Por que escolher o Marketing Olfativo?
            </h2>
            <span className="rule reveal" aria-hidden="true" />
            <p className="reveal">
              Marketing olfativo é uma estratégia de marketing sensorial que utiliza o poder do olfato para criar conexões emocionais e memoráveis com os consumidores.
            </p>
            <ul className="pgrid">
              {siteConfig.whyScent.map((w) => (
                <li key={w.title} className="pcard reveal">
                  <span className="pcard__ic">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      {solid[w.icon]}
                    </svg>
                  </span>
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="depo" id="depoimentos" aria-labelledby="depo-t">
        <div className="wrap">
          <SecHead id="depo-t" title="O que nossos clientes dizem" intro="Conheça as histórias de sucesso e transformação através do marketing olfativo." />
          <div className="dgrid">
            {siteConfig.testimonials.map((t) => (
              <figure key={t.name} className="dcard reveal">
                <svg className="dcard__q" viewBox="0 0 34 26" aria-hidden="true">
                  <path d="M0 26V15.6C0 6.9 4.6 1.7 13.7 0l1.6 3.5C10.4 5 8 8 7.8 12.3H14V26H0Zm19 0V15.6C19 6.9 23.6 1.7 32.7 0l1.3 3.5c-4.9 1.5-7.3 4.5-7.5 8.8H33V26H19Z" />
                </svg>
                <blockquote>“{t.text}”</blockquote>
                <figcaption>
                  <Image src={t.photo} alt="" width={56} height={56} />
                  <span>
                    <strong>{t.name}</strong>
                    {t.role}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      {posts.length ? (
        <section className="blogsec" id="blog" aria-labelledby="blog-t">
          <div className="wrap">
            <div className="blogsec__head">
              <div>
                <h2 className="h2 reveal" id="blog-t">
                  Blog Je Aromas
                </h2>
                <span className="rule reveal" aria-hidden="true" />
                <p className="reveal">Conteúdos sobre marketing olfativo, identidade olfativa e aromatização de ambientes.</p>
              </div>
              <Link href="/blog" className="btn btn-secondary reveal">
                Ver todos os artigos
              </Link>
            </div>
            <div className="blogsec__grid">
              {posts.map((p) => (
                <div key={p.id} className="reveal">
                  <PostCard post={p} headingLevel="h3" />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* FAQ */}
      <section className="faq" id="faq" aria-labelledby="faq-t">
        <div className="wrap faq__grid">
          <div className="faq__aside">
            <h2 className="h2 reveal" id="faq-t">
              Tem alguma dúvida?
              <br />
              <span className="muted">Nós temos as respostas.</span>
            </h2>
            <span className="rule reveal" aria-hidden="true" />
            <div className="faq__help reveal">
              <p>Ainda tem dúvidas?</p>
              <a className="btn" href={ORC} target="_blank" rel="noopener">
                Entre em contato conosco
              </a>
            </div>
          </div>
          <div className="acc" id="acc">
            {siteConfig.faq.map((f) => (
              <details key={f.q} className="reveal">
                <summary>
                  <h3>{f.q}</h3>
                </summary>
                <div className="acc__b">
                  {f.a.split("\n\n").map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section className="contato" id="contato" aria-labelledby="contato-t">
        <div className="contato__bg" aria-hidden="true">
          <Image src="/img/contato.webp" alt="" fill sizes="100vw" />
        </div>
        <div className="wrap contato__grid">
          <div className="contato__info">
            <h2 className="h2 reveal" id="contato-t">
              Solicite um orçamento
            </h2>
            <span className="rule reveal" aria-hidden="true" />
            <p className="reveal">
              Estamos prontos para desenvolver a identidade olfativa perfeita para sua marca. Preencha o formulário e nossa equipe entrará em contato para entender suas
              necessidades.
            </p>
            <ul className="clist reveal">
              <li>
                <span className="clist__ic">
                  <MailIcon />
                </span>
                <span>
                  <small>E-mail</small>
                  <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
                </span>
              </li>
              <li>
                <span className="clist__ic">
                  <WhatsAppIcon />
                </span>
                <span>
                  <small>WhatsApp</small>
                  <a href={ORC} target="_blank" rel="noopener">
                    {siteConfig.contact.whatsappDisplay}
                  </a>
                </span>
              </li>
              <li>
                <span className="clist__ic">
                  <PinIcon />
                </span>
                <span>
                  <small>Localização</small>
                  Navegantes - SC, Brasil
                </span>
              </li>
            </ul>
          </div>
          <form className="form reveal" id="form" noValidate>
            <h3>Entre em contato conosco</h3>
            <label>
              Nome
              <input name="nome" autoComplete="name" required />
            </label>
            <label>
              E-mail
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label>
              WhatsApp
              <input name="whats" type="tel" autoComplete="tel" inputMode="tel" required />
            </label>
            <label>
              Mensagem
              <textarea name="msg" rows={4} />
            </label>
            <p className="form__err" id="ferr" role="alert" hidden />
            <button className="btn btn--full" type="submit">
              Enviar mensagem
            </button>
            <p className="form__note">
              A mensagem abre no WhatsApp da Je Aromas, pronta para enviar. Veja a <Link href="/politica-de-privacidade">Política de Privacidade</Link>.
            </p>
          </form>
        </div>
      </section>

      <div className="lb" id="lb" hidden role="dialog" aria-modal="true" aria-label="Galeria ampliada">
        <button type="button" className="lb__x" id="lbx" aria-label="Fechar">
          ×
        </button>
        <button type="button" className="lb__nav lb__prev" id="lbp" aria-label="Foto anterior">
          ‹
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img id="lbimg" alt="" />
        <button type="button" className="lb__nav lb__next" id="lbn" aria-label="Próxima foto">
          ›
        </button>
      </div>
    </>
  );
}
