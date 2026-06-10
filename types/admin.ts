export interface AdminStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  lowStockCount: number;
  outOfStockCount: number;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  categoryId: string;
  image: string;
  stockCount: number;
  featured: boolean;
}
