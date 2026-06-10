"use client";

import { Loader2, Upload } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { productCategories } from "@/lib/products-data";
import type { Product } from "@/types/product";

interface ProductFormProps {
  product?: Product;
  mode: "create" | "edit";
}

export function ProductForm({ product, mode }: ProductFormProps) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: product?.name ?? "",
    description: product?.description ?? "",
    price: product?.price?.toString() ?? "",
    categoryId: product?.categoryId ?? "oturma-odasi",
    image: product?.images[0] ?? "",
    stockCount: product?.stockCount?.toString() ?? "10",
    featured: product?.featured ?? false,
  });

  const update = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.success) {
        update("image", data.url);
      } else {
        setError(data.error ?? "Yükleme başarısız.");
      }
    } catch {
      setError("Dosya yüklenemedi.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      categoryId: form.categoryId,
      image: form.image,
      stockCount: Number(form.stockCount),
      featured: form.featured,
    };

    try {
      const url =
        mode === "create"
          ? "/api/admin/products"
          : `/api/admin/products/${product!.id}`;
      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!data.success) {
        setError(data.error ?? "İşlem başarısız.");
        return;
      }

      router.push("/admin/urunler");
      router.refresh();
    } catch {
      setError("Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
      <div className="rounded-xl border border-admin-border bg-admin-card p-6 space-y-6">
        <div>
          <Label htmlFor="name">Ürün Adı</Label>
          <Input
            id="name"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="mt-2 bg-admin-bg"
          />
        </div>

        <div>
          <Label htmlFor="description">Açıklama</Label>
          <Textarea
            id="description"
            required
            rows={4}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            className="mt-2 bg-admin-bg"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <Label htmlFor="price">Fiyat (₺)</Label>
            <Input
              id="price"
              type="number"
              required
              min={0}
              value={form.price}
              onChange={(e) => update("price", e.target.value)}
              className="mt-2 bg-admin-bg"
            />
          </div>
          <div>
            <Label htmlFor="category">Kategori</Label>
            <select
              id="category"
              value={form.categoryId}
              onChange={(e) => update("categoryId", e.target.value)}
              className="mt-2 flex h-11 w-full rounded-lg border border-input bg-admin-bg px-4 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30"
            >
              {productCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <Label htmlFor="stock">Stok Adedi</Label>
            <Input
              id="stock"
              type="number"
              required
              min={0}
              value={form.stockCount}
              onChange={(e) => update("stockCount", e.target.value)}
              className="mt-2 bg-admin-bg"
            />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => update("featured", e.target.checked)}
                className="size-4 rounded border-input"
              />
              Öne çıkan ürün
            </label>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-admin-border bg-admin-card p-6 space-y-4">
        <Label>Ürün Görseli</Label>

        {form.image && (
          <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-lg bg-admin-hover">
            <Image
              src={form.image}
              alt="Önizleme"
              fill
              className="object-cover"
              sizes="400px"
            />
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          <Input
            placeholder="Görsel URL'si"
            value={form.image}
            onChange={(e) => update("image", e.target.value)}
            className="bg-admin-bg"
          />
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleUpload(file);
            }}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="shrink-0"
          >
            {uploading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Upload className="size-4" />
            )}
            Yükle
          </Button>
        </div>
      </div>

      {error && (
        <p className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="size-4 animate-spin" />}
          {mode === "create" ? "Ürün Ekle" : "Değişiklikleri Kaydet"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          İptal
        </Button>
      </div>
    </form>
  );
}
