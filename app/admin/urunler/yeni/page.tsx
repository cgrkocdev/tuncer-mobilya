import { AdminHeader } from "@/components/admin/admin-header";
import { ProductForm } from "@/components/admin/product-form";

export const metadata = { title: "Yeni Ürün" };

export default function NewProductPage() {
  return (
    <>
      <AdminHeader
        title="Yeni Ürün"
        description="Kataloğa yeni ürün ekleyin"
      />
      <div className="flex-1 overflow-y-auto p-8">
        <ProductForm mode="create" />
      </div>
    </>
  );
}
