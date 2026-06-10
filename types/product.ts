export type ProductCategoryId =
  | "oturma-odasi"
  | "yemek-odasi"
  | "yatak-odasi"
  | "ofis";

export type StockStatus = "in_stock" | "low_stock" | "out_of_stock";

export interface ProductCategory {
  id: ProductCategoryId;
  name: string;
  slug: string;
}

export interface ProductVariant {
  id: string;
  type: "color" | "fabric";
  name: string;
  value: string;
  hex?: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductDimensions {
  width: string;
  height: string;
  depth: string;
  weight: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  categoryId: ProductCategoryId;
  category: string;
  price: number;
  compareAtPrice?: number;
  description: string;
  seoDescription: string;
  images: string[];
  colors: string[];
  fabrics: string[];
  variants: ProductVariant[];
  dimensions: ProductDimensions;
  specs: ProductSpec[];
  stockStatus: StockStatus;
  stockCount: number;
  featured?: boolean;
}

export interface ProductFilters {
  categories: ProductCategoryId[];
  priceMin: number;
  priceMax: number;
  colors: string[];
  stockStatus: StockStatus[];
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedColor?: string;
  selectedFabric?: string;
}

export interface ProductFAQ {
  id: string;
  question: string;
  answer: string;
}
