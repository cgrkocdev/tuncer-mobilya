import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";

import { SiteLayout } from "@/components/layout/site-layout";
import { JsonLd } from "@/components/seo/json-ld";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { blogPosts, getBlogPost } from "@/lib/blog-data";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site-config";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Yazı Bulunamadı" };

  return buildPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) notFound();

  const paragraphs = post.content.split("\n\n");

  return (
    <>
      <JsonLd
        data={[
          articleSchema(post),
          breadcrumbSchema([
            { name: "Ana Sayfa", url: siteConfig.url },
            { name: "Blog", url: `${siteConfig.url}/blog` },
            {
              name: post.title,
              url: `${siteConfig.url}/blog/${post.slug}`,
            },
          ]),
        ]}
      />
      <SiteLayout>
        <article className="section-premium mx-auto max-w-4xl px-4 sm:px-6 md:px-8 lg:px-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Blog
          </Link>

          <header className="mt-10">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <span className="uppercase tracking-wider">{post.category}</span>
              <span>·</span>
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("tr-TR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="size-3" />
                {post.readTime} dk okuma
              </span>
            </div>
            <h1 className="mt-6 font-serif text-3xl font-light leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
              {post.title}
            </h1>
            <p className="mt-8 text-xl leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>
          </header>

          <div className="relative mt-12 aspect-[21/9] overflow-hidden rounded-2xl">
            <OptimizedImage
              src={post.image}
              alt={post.title}
              fill
              priority
              cinematic
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          <div className="prose-premium mt-16 space-y-6 text-lg leading-relaxed text-muted-foreground">
            {paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </article>
      </SiteLayout>
    </>
  );
}
