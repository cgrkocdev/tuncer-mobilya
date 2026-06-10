import { products as seedProducts, productCategories } from "@/lib/products-data";
import { readJsonFile, writeJsonFile } from "@/lib/store/fs";
import type { Product, ProductCategoryId, StockStatus } from "@/types/product";

const FILE = "products.json";
const CATALOG_VERSION = 6;

let cache: Product[] | null = null;

function persistProducts(products: Product[]) {
  writeJsonFile(FILE, { version: CATALOG_VERSION, items: products });
}

export function loadProducts(): Product[] {
  if (cache) return cache;

  const stored = readJsonFile<{ version?: number; items?: Product[] } | Product[]>(
    FILE,
    seedProducts
  );

  if (Array.isArray(stored)) {
    cache = stored;
    persistProducts(stored);
    return cache;
  }

  if (!stored.version || stored.version < CATALOG_VERSION) {
    cache = seedProducts;
    persistProducts(seedProducts);
    return cache;
  }

  cache = stored.items ?? seedProducts;
  return cache;
}

export function saveProducts(products: Product[]): Product[] {
  cache = products;
  persistProducts(products);
  return products;
}

export function getProducts(): Product[] {
  return loadProducts();
}

export function getProductById(id: string): Product | undefined {
  return loadProducts().find((p) => p.id === id);
}

export function getProductBySlugFromStore(slug: string): Product | undefined {
  return loadProducts().find((p) => p.slug === slug);
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function resolveStockStatus(count: number): StockStatus {
  if (count <= 0) return "out_of_stock";
  if (count <= 5) return "low_stock";
  return "in_stock";
}

function categoryName(id: ProductCategoryId): string {
  return productCategories.find((c) => c.id === id)?.name ?? id;
}

function nextId(products: Product[]): string {
  const max = products.reduce((m, p) => Math.max(m, Number(p.id) || 0), 0);
  return String(max + 1);
}

export interface ProductInput {
  name: string;
  description: string;
  price: number;
  categoryId: ProductCategoryId;
  image?: string;
  images?: string[];
  stockCount: number;
  featured?: boolean;
  compareAtPrice?: number;
  colors?: string[];
  fabrics?: string[];
}

function buildProduct(input: ProductInput, existing?: Product): Product {
  const slug = existing?.slug ?? slugify(input.name);
  const images =
    input.images?.length
      ? input.images
      : input.image
        ? [input.image]
        : (existing?.images ?? []);

  return {
    id: existing?.id ?? nextId(loadProducts()),
    slug,
    name: input.name,
    categoryId: input.categoryId,
    category: categoryName(input.categoryId),
    price: input.price,
    compareAtPrice: input.compareAtPrice ?? existing?.compareAtPrice,
    description: input.description,
    seoDescription:
      existing?.seoDescription ??
      `${input.name} — premium mobilya. Tuncer Mobilya'da keşfedin.`,
    images,
    colors: input.colors ?? existing?.colors ?? [],
    fabrics: input.fabrics ?? existing?.fabrics ?? [],
    variants: existing?.variants ?? [],
    dimensions: existing?.dimensions ?? {
      width: "—",
      height: "—",
      depth: "—",
      weight: "—",
    },
    specs: existing?.specs ?? [
      { label: "Garanti", value: "5 Yıl" },
      { label: "Üretim", value: "Türkiye" },
    ],
    stockCount: input.stockCount,
    stockStatus: resolveStockStatus(input.stockCount),
    featured: input.featured ?? existing?.featured ?? false,
  };
}

export function createProduct(input: ProductInput): Product {
  const products = loadProducts();
  const product = buildProduct(input);
  saveProducts([...products, product]);
  return product;
}

export function updateProduct(
  id: string,
  input: Partial<ProductInput>
): Product | undefined {
  const products = loadProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return undefined;

  const existing = products[index];
  const merged: ProductInput = {
    name: input.name ?? existing.name,
    description: input.description ?? existing.description,
    price: input.price ?? existing.price,
    categoryId: input.categoryId ?? existing.categoryId,
    images: input.images ?? existing.images,
    image: input.image,
    stockCount: input.stockCount ?? existing.stockCount,
    featured: input.featured ?? existing.featured,
    compareAtPrice: input.compareAtPrice ?? existing.compareAtPrice,
    colors: input.colors ?? existing.colors,
    fabrics: input.fabrics ?? existing.fabrics,
  };

  const updated = buildProduct(merged, existing);
  products[index] = updated;
  saveProducts(products);
  return updated;
}

export function updateStock(id: string, stockCount: number): Product | undefined {
  return updateProduct(id, { stockCount });
}

export function deleteProduct(id: string): boolean {
  const products = loadProducts();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length === products.length) return false;
  saveProducts(filtered);
  return true;
}
