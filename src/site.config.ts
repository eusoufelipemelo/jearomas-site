import { Inter } from "next/font/google";

/**
 * IDENTIDADE DO CLIENTE: Je Aromas (marketing olfativo, Navegantes/SC).
 * Textos, cores, fonte e links vêm do site anterior (GreatPages), mantidos como estavam.
 */

// A marca usa só a Inter (títulos e texto). As duas variáveis existem porque o modelo separa as funções.
export const displayFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export type NavLink = { label: string; href: string };
export type Service = { title: string; description: string };
export type Faq = { q: string; a: string };

/** Link de orçamento usado em todos os botões do site antigo. */
const ORCAMENTO = "https://wa.link/ho5ke7";

export const siteConfig = {
  name: "Je Aromas",
  legalName: "Je Aromas",
  cnpj: "50.431.579/0001-15",
  tagline: "Marketing olfativo e identidade olfativa personalizada para marcas.",
  description:
    "Descubra como a Je Aromas transforma marcas por meio de fragrâncias exclusivas. Especialistas em marketing olfativo, criamos identidades sensoriais que fortalecem a conexão emocional com seus clientes.",
  url: "https://www.jearomas.com.br",
  locale: "pt_BR",
  language: "pt-BR",
  foundingYear: 2018,

  logo: { src: "/img/logo.svg", width: 80, height: 60 },
  ogImage: "/og.png",

  schemaType: "LocalBusiness",

  /** Links do menu. Âncoras apontam para a Home, então funcionam também dentro do blog. */
  nav: [
    { label: "Início", href: "/#inicio" },
    { label: "Sobre", href: "/#sobre" },
    { label: "Benefícios", href: "/#beneficios" },
    { label: "Processo", href: "/#processo" },
    { label: "Depoimentos", href: "/#depoimentos" },
    { label: "FAQ", href: "/#faq" },
    { label: "Blog", href: "/blog" },
    { label: "Contato", href: "/#contato" },
  ] satisfies NavLink[],

  orcamentoUrl: ORCAMENTO,

  contact: {
    whatsapp: "5547992413328",
    whatsappDisplay: "(47) 9.9241-3328",
    whatsappMessage: "Olá Je Aromas, gostaria de mais informações...",
    phone: "(47) 9.9241-3328",
    phoneHref: "+5547992413328",
    email: "contato@jearomas.com.br",
    address: {
      street: "",
      neighborhood: "",
      city: "Navegantes",
      state: "SC",
      postalCode: "",
      country: "BR",
    },
    mapsUrl: "",
    hours: "",
    openingHoursSpec: [] as string[],
    areaServed: "Brasil",
  },

  social: [] as NavLink[],

  /** Serviços (JSON-LD, llms.txt). */
  services: [
    {
      title: "Identidade olfativa personalizada",
      description:
        "Criação de uma fragrância exclusiva que representa a alma da marca, desenvolvida a partir de um briefing sobre valores, identidade visual e público-alvo.",
    },
    {
      title: "Marketing olfativo",
      description:
        "Estratégia de marketing sensorial que usa fragrâncias para criar conexões emocionais e influenciar o comportamento do consumidor em ambientes comerciais.",
    },
    {
      title: "Aromatização de ambientes",
      description:
        "Implementação do sistema de difusão ideal para cada espaço, com ajuste de intensidade e alcance da fragrância.",
    },
  ] satisfies Service[],

  about: {
    headline: "A Je Aromas é especialista em despertar emoções por meio de fragrâncias exclusivas que representam a alma da sua marca.",
    paragraphs: [
      "A Je Aromas é especialista em despertar emoções por meio de fragrâncias exclusivas que representam a alma da sua marca.",
      "Atuando no mercado de marketing sensorial, desenvolvemos identidades olfativas personalizadas que elevam a experiência dos seus clientes, criando memórias afetivas e fortalecendo o reconhecimento da sua marca.",
    ],
    quote: "O aroma é o meio mais poderoso de criar uma conexão emocional instantânea com seus clientes.",
    facts: [
      { value: "2018", label: "Desde 2018 no mercado" },
      { value: "200+", label: "Mais de 200 clientes satisfeitos" },
    ],
    expert: {
      name: "Jeruza Vieceli",
      credentials: "Fundadora Je Aromas",
      bio: "Fundadora da Je Aromas, especialista em marketing olfativo e criação de identidades olfativas para marcas desde 2018.",
    },
  },

  benefits: [
    { icon: "star", title: "Diferenciação da concorrência", text: "Destaque-se no mercado com uma identidade olfativa exclusiva, criando uma experiência sensorial única que diferencia sua marca." },
    { icon: "clock", title: "Maior permanência no ambiente", text: "Fragrâncias agradáveis estimulam os clientes a permanecerem mais tempo em seu espaço. Aumentando as vendas." },
    { icon: "heart", title: "Conexão emocional com o cliente", text: "O olfato é o sentido mais conectado às emoções e memórias, criando vínculos afetivos profundos entre clientes." },
    { icon: "shield", title: "Reforço da identidade da marca", text: "Uma assinatura olfativa fortalece sua identidade, complementando os elementos visuais e criando uma experiência de marca completa." },
  ],

  stats: [
    { value: 80, text: "Das decisões de compra são influenciadas pelo olfato, aumentando as vendas em até 15%." },
    { value: 75, text: "Das emoções diárias dos seres humanos são influenciadas pelo olfato, que em segundos provoca um estímulo." },
    { value: 35, text: "É a média dos cheiros que lembramos, enquanto apenas lembramos de 5% do que visualizamos." },
    { value: 33, text: "De média adicional de vendas em ambientes profissionalmente aromatizados, e aumento da permanência em 16%." },
  ],

  process: [
    { title: "Entendimento da marca", text: "Conhecemos a fundo os valores, a identidade visual e o público-alvo da sua marca para criar uma fragrância alinhada com seu posicionamento." },
    { title: "Criação da fragrância personalizada", text: "Nossos especialistas desenvolvem opções de fragrâncias exclusivas que representam a essência da sua marca e despertam as emoções desejadas." },
    { title: "Ajustes e aplicação no ambiente", text: "Refinamos a fragrância escolhida e implementamos o sistema de difusão ideal para o seu espaço, garantindo a intensidade e alcance perfeitos." },
    { title: "Testes de feedback e alinhamento final", text: "Realizamos testes com clientes reais e ajustamos os detalhes finais para garantir uma experiência olfativa impecável e memorável." },
  ],

  whyScent: [
    { icon: "arrow", title: "Diferenciação da Concorrência", text: "O marketing olfativo pode ajudar a diferenciar sua marca da concorrência, criando uma identidade olfativa única e memorável." },
    { icon: "link", title: "Conexões Emocionais", text: "Ao utilizar o marketing olfativo, as empresas podem evocar emoções específicas nos consumidores, como felicidade e conforto." },
    { icon: "people", title: "Comportamento do Consumidor", text: "O aroma pode ativar áreas do cérebro relacionadas às emoções e à memória, o que pode influenciar o comportamento." },
    { icon: "flask", title: "Experiência do Cliente", text: "O mkt olfativo pode melhorar a experiência do cliente ao criar um ambiente mais agradável e acolhedor." },
  ],

  testimonials: [
    { text: "Impecáveis, desde o atendimento até os aromas! Nota-se que tudo é feito e pensado com muito amor e carinho! Obrigada por fazerem parte da nossa história através do aroma.", name: "Bottarga Gold", role: "", photo: "/depoimentos/d1.webp" },
    { text: "Sempre um atendimento excelente e diferenciado. A Je é um amor de pessoa e se esforça o máximo para entender a necessidade de cada cliente. Os produtos e as embalagens sempre de muito bom gosto. E a qualidade nem se fala. Dá pra sentir os aromas de verdade nos ambientes. Amo e recomendo!!!", name: "Ana Cláudia", role: "Manicamarin", photo: "/depoimentos/d2.webp" },
    { text: "A Je Aromas é nossa parceira essencial desde 2021! Produtos de qualidade e o atendimento da Je e do Rafa é impecável, sempre superando as expectativas. Recomendo demais!", name: "Letícia Porto Branco", role: "Jeferson Branco Arquitetura", photo: "/depoimentos/d3.webp" },
    { text: "Atendimento personalizado e muito especial!! Somente elogios ao capricho dedicado de sempre!!", name: "Marcella Beltramini", role: "", photo: "/depoimentos/d4.webp" },
  ],

  faq: [
    { q: "O que é Marketing Olfativo?", a: "Marketing Olfativo é uma estratégia que usa fragrâncias para criar conexões emocionais e influenciar o comportamento do consumidor em ambientes comerciais, melhorando a experiência do cliente." },
    { q: "O que é identidade olfativa?", a: "Identidade Olfativa é uma fragrância exclusiva e personalizada criada para representar uma marca ou empresa, proporcionando uma experiência sensorial única aos clientes." },
    { q: "Por que a Identidade olfativa é importante?", a: "A identidade olfativa ajuda a marca a se destacar, criar conexões emocionais com os clientes e reforçar o reconhecimento da marca." },
    { q: "Como desenvolver uma identidade olfativa?", a: "Para desenvolver uma identidade olfativa, você precisa definir as fragrâncias que representarão a marca, criar fragrâncias exclusivas e incorporá-las em produtos e espaços, considerando a estratégia da marca e o público-alvo." },
    { q: "Quanto tempo dura uma identidade olfativa?", a: "A duração de uma identidade olfativa pode ser indefinida, desde que seja mantida e renovada conforme necessário para permanecer relevante para a marca." },
    { q: "Qual é a diferença entre Marketing Olfativo e Identidade Olfativa?", a: "Marketing Olfativo é a estratégia geral de usar fragrâncias para fins comerciais, enquanto Identidade Olfativa se refere à criação de uma fragrância exclusiva que representa uma marca." },
    { q: "A identidade olfativa pode ser usada em qualquer tipo de produto ou ambiente?", a: "A identidade olfativa pode ser adaptada para uma ampla variedade de produtos e ambientes, mas a escolha depende do contexto e dos objetivos da marca." },
    { q: "Como escolher a fragrância certa para minha marca?", a: "A escolha da fragrância certa envolve considerar a personalidade da marca, o público-alvo e os objetivos e sensações desejadas.\n\nCom base no briefing que aplicamos com o cliente e o nosso conhecimento conseguimos ótimos resultados." },
    { q: "A identidade olfativa pode ser alterada ao longo do tempo?", a: "Sim, a identidade olfativa pode ser alterada, mas é um processo que requer planejamento e estratégia." },
    { q: "Como medir o sucesso de uma identidade olfativa?", a: "O sucesso de uma identidade olfativa pode ser medido através de pesquisas de satisfação, análise de aumento de vendas e engajamento dos clientes." },
    { q: "Quanto tempo leva para o desenvolvimento de uma identidade olfativa?", a: "O tempo de desenvolvimento de uma identidade olfativa varia, mas pode levar de algumas semanas a vários meses, dependendo da complexidade, dos objetivos do projeto e da disponibilidade do cliente." },
  ] satisfies Faq[],

  gallery: [
    { src: "/galeria/g1.webp", alt: "Difusor Je Aromas em ambiente decorado", shape: "tall" },
    { src: "/galeria/g2.webp", alt: "Difusor ao lado de poltrona de couro verde", shape: "" },
    { src: "/galeria/g3.webp", alt: "Difusor em sala de estar com poltronas", shape: "" },
    { src: "/galeria/g6.webp", alt: "Difusor ao lado de vaso com planta", shape: "tall" },
    { src: "/galeria/g5.webp", alt: "Difusor sobre aparador de madeira", shape: "wide" },
    { src: "/galeria/g4.webp", alt: "Difusor sobre mesa em ambiente aconchegante", shape: "" },
    { src: "/galeria/g7.webp", alt: "Difusor em sofá com almofadas", shape: "" },
    { src: "/galeria/g8.webp", alt: "Difusor em ambiente com iluminação quente", shape: "wide" },
  ],

  clientLogos: 15,

  blog: {
    title: "Blog",
    description: "Artigos da Je Aromas sobre marketing olfativo, identidade olfativa e aromatização de ambientes.",
    perPage: 12,
  },

  cta: {
    title: "Quer uma fragrância com a cara da sua marca?",
    text: "Conte sobre o seu negócio e receba um orçamento para a identidade olfativa da sua marca.",
    button: "Quero um orçamento",
  },

  /** Cores da marca (site anterior): fundo quase preto, roxo ameixa e cinzas. */
  theme: {
    brand: "#663A8F",
    brandContrast: "#FFFFFF",
    brandSoft: "#1C1426",
    ink: "#EDEDED",
    muted: "#A3A9AD",
    surface: "#0B0B0B",
    surfaceAlt: "#141414",
    line: "#262626",
    radius: "18px",
  },
};

export type SiteConfig = typeof siteConfig;
