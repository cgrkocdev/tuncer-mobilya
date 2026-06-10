"use client";

import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/format";
import { getStockLabel } from "@/lib/product-utils";
import type { Product } from "@/types/product";
import { cn } from "@/lib/utils";

interface ProductsTableProps {
  products: Product[];
}

const stockStyles = {
  in_stock: "bg-emerald-500/10 text-emerald-600",
  low_stock: "bg-amber-500/10 text-amber-600",
  out_of_stock: "bg-red-500/10 text-red-600",
};

export function ProductsTable({ products }: ProductsTableProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [stockEdits, setStockEdits] = useState<Record<string, string>>({});

  const handleDelete = async (id: string) => {
    if (!confirm("Bu ürünü silmek istediğinize emin misiniz?")) return;
    setDeletingId(id);
    try {
      await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setDeletingId(null);
    }
  };

  const handleStockUpdate = async (id: string) => {
    const count = Number(stockEdits[id]);
    if (isNaN(count) || count < 0) return;

    await fetch(`/api/admin/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stockCount: count }),
    });
    router.refresh();
    setStockEdits((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-admin-border py-16 text-center text-admin-muted">
        Henüz ürün yok. İlk ürününüzü ekleyin.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-admin-border bg-admin-card">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-admin-border bg-admin-hover/50">
            <th className="px-4 py-3 text-left font-medium text-admin-muted">
              Ürün
            </th>
            <th className="hidden px-4 py-3 text-left font-medium text-admin-muted md:table-cell">
              Kategori
            </th>
            <th className="px-4 py-3 text-left font-medium text-admin-muted">
              Fiyat
            </th>
            <th className="px-4 py-3 text-left font-medium text-admin-muted">
              Stok
            </th>
            <th className="px-4 py-3 text-right font-medium text-admin-muted">
              İşlemler
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-b border-admin-border last:border-0"
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-admin-hover">
                    {product.images[0] ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center text-xs text-admin-muted">
                        —
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-admin-foreground">
                      {product.name}
                    </p>
                    <p className="text-xs text-admin-muted">{product.slug}</p>
                  </div>
                </div>
              </td>
              <td className="hidden px-4 py-3 text-admin-muted md:table-cell">
                {product.category}
              </td>
              <td className="px-4 py-3 font-medium">
                {formatPrice(product.price)}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min={0}
                    className="h-8 w-16 bg-admin-bg text-center text-xs"
                    value={stockEdits[product.id] ?? product.stockCount}
                    onChange={(e) =>
                      setStockEdits((prev) => ({
                        ...prev,
                        [product.id]: e.target.value,
                      }))
                    }
                    onBlur={() => {
                      if (stockEdits[product.id] !== undefined) {
                        handleStockUpdate(product.id);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleStockUpdate(product.id);
                    }}
                  />
                  <span
                    className={cn(
                      "hidden rounded-full px-2 py-0.5 text-[10px] font-medium sm:inline",
                      stockStyles[product.stockStatus]
                    )}
                  >
                    {getStockLabel(product.stockStatus)}
                  </span>
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-1">
                  <Button variant="ghost" size="icon" className="size-8" asChild>
                    <Link href={`/admin/urunler/${product.id}`}>
                      <Edit className="size-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 text-destructive hover:text-destructive"
                    onClick={() => handleDelete(product.id)}
                    disabled={deletingId === product.id}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
