import { ProductCard } from "@/components/products/product-card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import type { Product } from "@/types/product";

interface SimilarProductsProps {
  products: Product[];
}

export function SimilarProducts({ products }: SimilarProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="border-t border-border/60 py-24 lg:py-36">
      <div className="container-premium pb-16 sm:pb-20">
        <ScrollReveal>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Benzer Ürünler
          </p>
          <h2 className="mt-4 font-serif text-3xl font-light text-foreground lg:text-4xl">
            Bunları da Beğenebilirsiniz
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <ScrollReveal key={product.id} delay={index * 0.08}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
