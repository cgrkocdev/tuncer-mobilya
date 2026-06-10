import dynamic from "next/dynamic";
import { preload } from "react-dom";

import { Hero } from "@/components/home/hero";
import { SiteLayout } from "@/components/layout/site-layout";
import { JsonLd } from "@/components/seo/json-ld";
import { showroomImages } from "@/lib/images";
import { organizationSchema, websiteSchema } from "@/lib/seo/schema";
import { getFeaturedProducts } from "@/server/products";

const ShowroomBanner = dynamic(
  () =>
    import("@/components/home/showroom-banner").then((m) => m.ShowroomBanner),
  { loading: () => <div className="min-h-[400px] bg-muted" /> }
);

const CategoriesSection = dynamic(
  () =>
    import("@/components/home/categories-section").then(
      (m) => m.CategoriesSection
    )
);

const FeaturedProductsSection = dynamic(
  () =>
    import("@/components/home/featured-products-section").then(
      (m) => m.FeaturedProductsSection
    ),
  { loading: () => <div className="section-premium min-h-[400px]" /> }
);

const BrandStorySection = dynamic(
  () =>
    import("@/components/home/brand-story-section").then(
      (m) => m.BrandStorySection
    )
);

const TestimonialsSection = dynamic(
  () =>
    import("@/components/home/testimonials-section").then(
      (m) => m.TestimonialsSection
    )
);

const InstagramSection = dynamic(
  () =>
    import("@/components/home/instagram-section").then(
      (m) => m.InstagramSection
    )
);

export default function HomePage() {
  preload(showroomImages.hero, { as: "image" });
  const featuredProducts = getFeaturedProducts();

  return (
    <>
      <JsonLd data={[organizationSchema(), websiteSchema()]} />
      <SiteLayout navVariant="transparent">
        <Hero />
        <ShowroomBanner />
        <CategoriesSection />
        <FeaturedProductsSection products={featuredProducts} />
        <BrandStorySection />
        <TestimonialsSection />
        <InstagramSection />
      </SiteLayout>
    </>
  );
}
