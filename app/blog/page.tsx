import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

import { SiteLayout } from "@/components/layout/site-layout";
import { JsonLd } from "@/components/seo/json-ld";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { blogPosts } from "@/lib/blog-data";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildPageMetadata({
  title: "Blog — Mobilya & İç Mimari",
  description:
    "Premium mobilya trendleri, bakım rehberleri ve özel tasarım ipuçları. Tuncer Mobilya blog.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Ana Sayfa", url: siteConfig.url },
          { name: "Blog", url: `${siteConfig.url}/blog` },
        ])}
      />
      <SiteLayout>
        <div className="section-premium container-premium">
          <ScrollReveal>
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-muted-foreground">
              Blog
            </p>
            <h1 className="mt-6 max-w-3xl font-serif text-4xl font-light leading-tight sm:text-5xl lg:text-6xl">
              İlham & Rehberler
            </h1>
            <p className="mt-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Mobilya trendleri, bakım ipuçları ve yaşam alanı tasarımı hakkında
              uzman içerikler.
            </p>
          </ScrollReveal>

          <div className="mt-24 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, index) => (
              <ScrollReveal key={post.slug} delay={index * 0.08}>
                <article className="card-hover group flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <OptimizedImage
                      src={post.image}
                      alt={post.title}
                      fill
                      cinematic
                      className="object-cover transition-transform duration-[900ms] group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-8">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="uppercase tracking-wider">
                        {post.category}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" />
                        {post.readTime} dk
                      </span>
                    </div>
                    <h2 className="mt-4 font-serif text-xl leading-snug text-foreground transition-colors group-hover:text-foreground/70">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-muted-foreground"
                    >
                      Devamını Oku
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </SiteLayout>
    </>
  );
}
