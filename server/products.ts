import { priceRange, productCategories } from "@/lib/products-data";
import {
  getProducts,
  getProductBySlugFromStore,
} from "@/lib/store/product-store";
import type { Product, ProductFilters } from "@/types/product";

export function getAllProducts(): Product[] {
  return getProducts();
}

export function getProductBySlug(slug: string): Product | undefined {
  return getProductBySlugFromStore(slug);
}

export function getSimilarProducts(product: Product, limit = 4): Product[] {
  return getProducts()
    .filter(
      (p) => p.categoryId === product.categoryId && p.id !== product.id
    )
    .slice(0, limit);
}

export function getFeaturedProducts(limit = 4): Product[] {
  return getProducts().filter((p) => p.featured).slice(0, limit);
}

export function getProductCategories() {
  return productCategories;
}

export function getPriceRange() {
  const products = getProducts();
  if (products.length === 0) return priceRange;
  const prices = products.map((p) => p.price);
  return {
    min: Math.min(...prices, 0),
    max: Math.max(...prices, priceRange.max),
  };
}

export function filterProducts(filters: ProductFilters): Product[] {
  return getProducts().filter((product) => {
    if (
      filters.categories.length > 0 &&
      !filters.categories.includes(product.categoryId)
    ) {
      return false;
    }
    if (product.price < filters.priceMin || product.price > filters.priceMax) {
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
}
