import { notFound } from "next/navigation";

import { ProductDetailClient } from "@/components/products/product-detail-client";
import { ProductFAQSection } from "@/components/products/product-faq";
import { SimilarProducts } from "@/components/products/similar-products";
import { SiteLayout } from "@/components/layout/site-layout";
import { JsonLd } from "@/components/seo/json-ld";
import { productFAQs } from "@/lib/products-data";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, productSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/site-config";
import {
  getAllProducts,
  getProductBySlug,
  getSimilarProducts,
} from "@/server/products";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProducts().map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) return { title: "Ürün Bulunamadı" };

  return buildPageMetadata({
    title: product.name,
    description: product.seoDescription,
    path: `/urunler/${product.slug}`,
    image: product.images[0],
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const similar = getSimilarProducts(product);

  return (
    <>
      <JsonLd
        data={[
          productSchema(product),
          breadcrumbSchema([
            { name: "Ana Sayfa", url: siteConfig.url },
            { name: "Ürünler", url: `${siteConfig.url}/urunler` },
            {
              name: product.name,
              url: `${siteConfig.url}/urunler/${product.slug}`,
            },
          ]),
        ]}
      />
      <SiteLayout>
        <article className="page-container lg:py-20 xl:py-28">
          <ProductDetailClient product={product} />
        </article>
        <SimilarProducts products={similar} />
        <ProductFAQSection faqs={productFAQs} />
      </SiteLayout>
    </>
  );
}
