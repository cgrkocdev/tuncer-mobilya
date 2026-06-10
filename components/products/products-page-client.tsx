"use client";

import { useMemo, useState } from "react";

import { ProductCard } from "@/components/products/product-card";
import { ProductFiltersPanel } from "@/components/products/product-filters";
import type { Product, ProductCategory, ProductFilters } from "@/types/product";

interface ProductsPageClientProps {
  products: Product[];
  categories: ProductCategory[];
  priceRange: { min: number; max: number };
}

const defaultFilters = (
  range: { min: number; max: number }
): ProductFilters => ({
  categories: [],
  priceMin: range.min,
  priceMax: range.max,
  colors: [],
  stockStatus: [],
});

export function ProductsPageClient({
  products,
  categories,
  priceRange,
}: ProductsPageClientProps) {
  const [filters, setFilters] = useState<ProductFilters>(
    defaultFilters(priceRange)
  );
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (
        filters.categories.length > 0 &&
        !filters.categories.includes(product.categoryId)
      ) {
        return false;
      }
      if (
        product.price < filters.priceMin ||
        product.price > filters.priceMax
      ) {
        return false;
      }
      if (filters.colors.length > 0) {
        if (!filters.colors.some((c) => product.colors.includes(c))) {
          return false;
        }
      }
      if (filters.stockStatus.length > 0) {
        if (!filters.stockStatus.includes(product.stockStatus)) {
          return false;
        }
      }
      return true;
    });
  }, [products, filters]);

  return (
    <div className="page-container">
      <div className="mb-12">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
          Koleksiyonlar
        </p>
        <h1 className="mt-4 font-serif text-3xl font-light text-foreground sm:text-4xl lg:text-5xl">
          Tüm Ürünler
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Zamansız tasarımlar ve usta işçilikle üretilen mobilya koleksiyonumuzu
          keşfedin.
        </p>
      </div>

      <div className="mb-6 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium"
        >
          {mobileFiltersOpen ? "Filtreleri Gizle" : "Filtreleri Göster"}
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-12">
        <div className={`${mobileFiltersOpen ? "block" : "hidden"} lg:block`}>
          <div className="glass-card rounded-2xl p-5 sm:p-6 lg:sticky lg:top-24">
            <ProductFiltersPanel
              filters={filters}
              categories={categories}
              priceRange={priceRange}
              onChange={setFilters}
              onReset={() => setFilters(defaultFilters(priceRange))}
              resultCount={filteredProducts.length}
            />
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-24 text-center">
            <p className="font-serif text-xl text-foreground">
              Ürün bulunamadı
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Filtreleri değiştirerek tekrar deneyin.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
