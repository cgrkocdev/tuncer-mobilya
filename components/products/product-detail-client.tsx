"use client";

import { Check, MessageCircle, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { ProductGallery } from "@/components/products/product-gallery";
import { StockBadge } from "@/components/products/stock-badge";
import { VariantSelector } from "@/components/products/variant-selector";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/format";
import { siteConfig } from "@/lib/site-config";
import { getWhatsAppOrderUrl } from "@/lib/product-utils";
import type { Product } from "@/types/product";

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0] ?? "");
  const [selectedFabric, setSelectedFabric] = useState(
    product.fabrics[0] ?? ""
  );
  const [added, setAdded] = useState(false);

  const whatsappUrl = getWhatsAppOrderUrl(
    product.name,
    formatPrice(product.price),
    siteConfig.whatsapp,
    {
      color: selectedColor || undefined,
      fabric: selectedFabric || undefined,
    }
  );

  const handleAddToCart = () => {
    if (product.stockStatus === "out_of_stock") return;
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
      selectedColor: selectedColor || undefined,
      selectedFabric: selectedFabric || undefined,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-16">
      <ProductGallery images={product.images} productName={product.name} />

      <div className="flex flex-col">
        <div className="flex items-center gap-3">
          <Link
            href="/urunler"
            className="text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            {product.category}
          </Link>
          <StockBadge status={product.stockStatus} />
        </div>

        <h1 className="mt-4 font-serif text-2xl font-light leading-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
          {product.name}
        </h1>

        <div className="mt-6 flex items-baseline gap-3">
          <p className="text-2xl font-medium text-foreground">
            {formatPrice(product.price)}
          </p>
          {product.compareAtPrice && (
            <p className="text-lg text-muted-foreground line-through">
              {formatPrice(product.compareAtPrice)}
            </p>
          )}
        </div>

        <p className="mt-8 text-base leading-relaxed text-muted-foreground">
          {product.description}
        </p>

        <div className="mt-10 space-y-6">
          {product.colors.length > 0 && (
            <VariantSelector
              label="Renk"
              options={product.colors}
              value={selectedColor}
              onChange={setSelectedColor}
              type="color"
            />
          )}
          {product.fabrics.length > 0 && (
            <VariantSelector
              label="Kumaş"
              options={product.fabrics}
              value={selectedFabric}
              onChange={setSelectedFabric}
              type="fabric"
            />
          )}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button
            size="lg"
            className="flex-1"
            onClick={handleAddToCart}
            disabled={product.stockStatus === "out_of_stock"}
          >
            {added ? (
              <>
                <Check className="size-4" />
                Sepete Eklendi
              </>
            ) : (
              <>
                <ShoppingBag className="size-4" />
                Sepete Ekle
              </>
            )}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="flex-1 border-emerald-600 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
            asChild
          >
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="size-4" />
              WhatsApp ile Sipariş
            </a>
          </Button>
        </div>

        <div className="mt-12 space-y-6 border-t border-border/60 pt-10">
          <div>
            <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Ölçüler
            </h2>
            <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { label: "Genişlik", value: product.dimensions.width },
                { label: "Yükseklik", value: product.dimensions.height },
                { label: "Derinlik", value: product.dimensions.depth },
                { label: "Ağırlık", value: product.dimensions.weight },
              ].map((dim) => (
                <div key={dim.label}>
                  <dt className="text-xs text-muted-foreground">{dim.label}</dt>
                  <dd className="mt-1 text-sm font-medium">{dim.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Teknik Bilgiler
            </h2>
            <dl className="mt-4 space-y-3">
              {product.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex justify-between border-b border-border/40 pb-3 text-sm"
                >
                  <dt className="text-muted-foreground">{spec.label}</dt>
                  <dd className="font-medium">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
