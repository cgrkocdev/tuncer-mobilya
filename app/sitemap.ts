import type { MetadataRoute } from "next";

import { blogPosts } from "@/lib/blog-data";
import { siteConfig } from "@/lib/site-config";
import { getAllProducts } from "@/server/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/urunler`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/ozel-tasarim`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/hakkimizda`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/iletisim`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/sepet`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
  ];

  const productPages: MetadataRoute.Sitemap = getAllProducts().map(
    (product) => ({
      url: `${base}/urunler/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })
  );

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...productPages, ...blogPages];
}
