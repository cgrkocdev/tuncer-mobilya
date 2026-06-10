import Link from "next/link";
import { Plus } from "lucide-react";

import { AdminHeader } from "@/components/admin/admin-header";
import { ProductsTable } from "@/components/admin/products-table";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/lib/store/product-store";

export const metadata = { title: "Ürünler" };

export default function AdminProductsPage() {
  const products = getProducts();

  return (
    <>
      <AdminHeader
        title="Ürünler"
        description={`${products.length} ürün listeleniyor`}
        actions={
          <Button size="sm" asChild>
            <Link href="/admin/urunler/yeni">
              <Plus className="size-4" />
              Yeni Ürün
            </Link>
          </Button>
        }
      />

      <div className="flex-1 overflow-y-auto p-8">
        <ProductsTable products={products} />
      </div>
    </>
  );
}
