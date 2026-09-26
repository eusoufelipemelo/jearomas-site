# Je Aromas — site

Site institucional da Je Aromas (marketing olfativo, Navegantes/SC) em Next.js 16, feito a partir do
`outbox-site-starter`. Réplica do site anterior (GreatPages) com movimento e diagramação refeitos,
blog ligado ao OutBox CMS e estrutura de SEO/GEO.

- Textos, cores, links e dados: `src/site.config.ts`
- Home (one-page): `src/app/page.tsx` + efeitos em `src/components/HomeEffects.tsx`
- Blog: `/blog` e `/blog/[slug]`, conteúdo vindo da Content API do OutBox CMS
- SEO/GEO: JSON-LD (LocalBusiness, WebSite, FAQPage, HowTo, Review), `/sitemap.xml`, `/robots.txt`,
  `/llms.txt`, `/llms-full.txt`, `/feed.xml`, `/og.png`

## Variáveis de ambiente (Easypanel)

| Variável | Valor |
| --- | --- |
| `SITE_URL` | `https://www.jearomas.com.br` |
| `OUTBOX_SITE_KEY` | chave pública do site no OutBox CMS (`pk_...`) |
| `OUTBOX_WEBHOOK_SECRET` | segredo do webhook do site no OutBox CMS |

No CMS: plataforma **API**, URL `https://www.jearomas.com.br`, caminho do blog `/blog`,
webhook `https://www.jearomas.com.br/api/outbox/revalidate`.

## Comandos

```bash
npm run dev
npm run lint
npm run build && npm start
```
