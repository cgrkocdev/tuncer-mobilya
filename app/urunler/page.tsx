import { ProductsPageClient } from "@/components/products/products-page-client";
import { SiteLayout } from "@/components/layout/site-layout";
import { buildPageMetadata } from "@/lib/seo/metadata";
import {
  getAllProducts,
  getPriceRange,
  getProductCategories,
} from "@/server/products";

export const metadata = buildPageMetadata({
  title: "Koleksiyonlar — Premium Mobilya",
  description:
    "Tuncer Mobilya premium mobilya koleksiyonu. Oturma odası, yemek odası, yatak odası ve ofis mobilyaları.",
  path: "/urunler",
});

export default function ProductsPage() {
  const products = getAllProducts();
  const categories = getProductCategories();
  const priceRange = getPriceRange();

  return (
    <SiteLayout>
      <ProductsPageClient
        products={products}
        categories={categories}
        priceRange={priceRange}
      />
    </SiteLayout>
  );
}
