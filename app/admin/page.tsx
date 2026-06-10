import Link from "next/link";
import { AlertTriangle, Package, ShoppingCart, TrendingUp } from "lucide-react";

import { AdminHeader } from "@/components/admin/admin-header";
import { OrdersTable } from "@/components/admin/orders-table";
import { StatCard } from "@/components/admin/stat-card";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { getAdminStats } from "@/server/admin/stats";
import { getAllOrders } from "@/server/orders";
import { getProducts } from "@/lib/store/product-store";

export default function AdminDashboardPage() {
  const stats = getAdminStats();
  const recentOrders = getAllOrders().slice(0, 5);
  const products = getProducts();

  return (
    <>
      <AdminHeader
        title="Dashboard"
        description="Mağaza performansına genel bakış"
        actions={
          <Button size="sm" asChild>
            <Link href="/admin/urunler/yeni">Yeni Ürün</Link>
          </Button>
        }
      />

      <div className="flex-1 overflow-y-auto p-8">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Toplam Ürün"
            value={stats.totalProducts.toString()}
            description={`${products.filter((p) => p.featured).length} öne çıkan`}
            icon={Package}
          />
          <StatCard
            title="Toplam Sipariş"
            value={stats.totalOrders.toString()}
            icon={ShoppingCart}
          />
          <StatCard
            title="Toplam Gelir"
            value={formatPrice(stats.totalRevenue)}
            description="Ödenen siparişler"
            icon={TrendingUp}
            trend={stats.totalOrders > 0 ? "Aktif satış" : undefined}
          />
          <StatCard
            title="Stok Uyarısı"
            value={(stats.lowStockCount + stats.outOfStockCount).toString()}
            description={`${stats.lowStockCount} düşük, ${stats.outOfStockCount} tükendi`}
            icon={AlertTriangle}
          />
        </div>

        <div className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-admin-foreground">
              Son Siparişler
            </h2>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/siparisler">Tümünü Gör</Link>
            </Button>
          </div>
          <OrdersTable orders={recentOrders} />
        </div>
      </div>
    </>
  );
}
