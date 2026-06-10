import { getOrders } from "@/lib/store/order-store";
import { getProducts } from "@/lib/store/product-store";
import type { AdminStats } from "@/types/admin";

export function getAdminStats(): AdminStats {
  const products = getProducts();
  const orders = getOrders();

  const totalRevenue = orders
    .filter((o) => o.status === "paid")
    .reduce((sum, o) => sum + o.totals.total, 0);

  return {
    totalProducts: products.length,
    totalOrders: orders.length,
    totalRevenue,
    lowStockCount: products.filter((p) => p.stockStatus === "low_stock").length,
    outOfStockCount: products.filter((p) => p.stockStatus === "out_of_stock")
      .length,
  };
}
