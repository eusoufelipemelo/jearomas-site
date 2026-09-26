import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/env";
import { getAllPosts } from "@/lib/outbox";

// Páginas fixas + todos os artigos do CMS. O webhook revalida na hora; 5 min de segurança.
export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const latest = posts.reduce<string | undefined>((acc, p) => {
    const d = p.updatedAt ?? p.publishedAt ?? undefined;
    return d && (!acc || d > acc) ? d : acc;
  }, undefined);

  const pages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/blog"), changeFrequency: "daily", priority: 0.8, ...(latest ? { lastModified: latest } : {}) },
    { url: absoluteUrl("/politica-de-privacidade"), changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/politica-de-cookies"), changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/lgpd"), changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/termos-de-uso"), changeFrequency: "yearly", priority: 0.2 },
  ];

  return [
    ...pages,
    ...posts.map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: p.updatedAt ?? p.publishedAt ?? undefined,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      ...(p.cover ? { images: [p.cover.url] } : {}),
    })),
  ];
}
