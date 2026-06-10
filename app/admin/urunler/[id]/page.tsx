import { notFound } from "next/navigation";

import { AdminHeader } from "@/components/admin/admin-header";
import { ProductForm } from "@/components/admin/product-form";
import { getProductById } from "@/lib/store/product-store";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: EditProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);
  return { title: product ? `${product.name} Düzenle` : "Ürün Bulunamadı" };
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) notFound();

  return (
    <>
      <AdminHeader
        title="Ürün Düzenle"
        description={product.name}
      />
      <div className="flex-1 overflow-y-auto p-8">
        <ProductForm mode="edit" product={product} />
      </div>
    </>
  );
}
