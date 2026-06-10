"use client";

import { Eye, Heart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { QuickViewModal } from "@/components/products/quick-view-modal";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { StockBadge } from "@/components/products/stock-badge";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/hooks/use-wishlist";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types/product";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const wished = isInWishlist(product.id);

  return (
    <>
      <article
        className={cn("group relative", className)}
      >
        <div className="card-hover glass-card overflow-hidden rounded-2xl">
          <div className="relative aspect-[4/5] overflow-hidden bg-muted">
            <Link
              href={`/urunler/${product.slug}`}
              className="relative block h-full w-full"
            >
              <OptimizedImage
                src={product.images[0]}
                alt={product.name}
                fill
                quality={68}
                cinematic
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </Link>

            <div className="absolute top-4 left-4">
              <StockBadge status={product.stockStatus} />
            </div>

            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <Button
                variant="secondary"
                size="icon"
                className="size-9 rounded-full bg-white/90 shadow-md backdrop-blur-sm hover:bg-white"
                onClick={() => toggleWishlist(product.id)}
                aria-label={wished ? "Favorilerden çıkar" : "Favorilere ekle"}
              >
                <Heart
                  className={cn(
                    "size-4",
                    wished && "fill-red-500 text-red-500"
                  )}
                />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="size-9 rounded-full bg-white/90 shadow-md backdrop-blur-sm hover:bg-white"
                onClick={() => setQuickViewOpen(true)}
                aria-label="Hızlı görünüm"
              >
                <Eye className="size-4" />
              </Button>
            </div>
          </div>

          <div className="p-5">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {product.category}
            </p>
            <Link href={`/urunler/${product.slug}`}>
              <h3 className="mt-1.5 font-serif text-lg text-foreground transition-colors hover:text-foreground/70">
                {product.name}
              </h3>
            </Link>
            <div className="mt-3 flex items-baseline gap-2">
              <p className="text-sm font-medium text-foreground">
                {formatPrice(product.price)}
              </p>
              {product.compareAtPrice && (
                <p className="text-xs text-muted-foreground line-through">
                  {formatPrice(product.compareAtPrice)}
                </p>
              )}
            </div>
          </div>
        </div>
      </article>

      <QuickViewModal
        product={product}
        open={quickViewOpen}
        onOpenChange={setQuickViewOpen}
      />
    </>
  );
}
