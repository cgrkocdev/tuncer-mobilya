"use client";

import { SlidersHorizontal, X } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { availableColors } from "@/lib/products-data";
import type {
  ProductCategory,
  ProductFilters,
  StockStatus,
} from "@/types/product";
import { cn } from "@/lib/utils";

interface ProductFiltersPanelProps {
  filters: ProductFilters;
  categories: ProductCategory[];
  priceRange: { min: number; max: number };
  onChange: (filters: ProductFilters) => void;
  onReset: () => void;
  resultCount: number;
  className?: string;
}

const stockOptions: { value: StockStatus; label: string }[] = [
  { value: "in_stock", label: "Stokta" },
  { value: "low_stock", label: "Son Ürünler" },
  { value: "out_of_stock", label: "Tükendi" },
];

export function ProductFiltersPanel({
  filters,
  categories,
  priceRange,
  onChange,
  onReset,
  resultCount,
  className,
}: ProductFiltersPanelProps) {
  const toggleCategory = (id: ProductFilters["categories"][number]) => {
    const next = filters.categories.includes(id)
      ? filters.categories.filter((c) => c !== id)
      : [...filters.categories, id];
    onChange({ ...filters, categories: next });
  };

  const toggleColor = (color: string) => {
    const next = filters.colors.includes(color)
      ? filters.colors.filter((c) => c !== color)
      : [...filters.colors, color];
    onChange({ ...filters, colors: next });
  };

  const toggleStock = (status: StockStatus) => {
    const next = filters.stockStatus.includes(status)
      ? filters.stockStatus.filter((s) => s !== status)
      : [...filters.stockStatus, status];
    onChange({ ...filters, stockStatus: next });
  };

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.colors.length > 0 ||
    filters.stockStatus.length > 0 ||
    filters.priceMin > priceRange.min ||
    filters.priceMax < priceRange.max;

  return (
    <aside className={cn("space-y-8", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-4 text-muted-foreground" />
          <h2 className="text-sm font-medium">Filtreler</h2>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="h-8 text-xs text-muted-foreground"
          >
            <X className="size-3" />
            Temizle
          </Button>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        {resultCount} ürün bulundu
      </p>

      <div>
        <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Kategori
        </h3>
        <div className="space-y-3">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-3">
              <Checkbox
                id={`cat-${cat.id}`}
                checked={filters.categories.includes(cat.id)}
                onCheckedChange={() => toggleCategory(cat.id)}
              />
              <Label htmlFor={`cat-${cat.id}`} className="cursor-pointer font-normal">
                {cat.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Fiyat Aralığı
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={priceRange.min}
              max={priceRange.max}
              step={5000}
              value={filters.priceMax}
              onChange={(e) =>
                onChange({
                  ...filters,
                  priceMax: Number(e.target.value),
                })
              }
              className="w-full accent-foreground"
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>
              {new Intl.NumberFormat("tr-TR").format(filters.priceMin)} ₺
            </span>
            <span>
              {new Intl.NumberFormat("tr-TR").format(filters.priceMax)} ₺
            </span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Renk
        </h3>
        <div className="flex flex-wrap gap-2">
          {availableColors.map((color) => (
            <button
              key={color.name}
              type="button"
              onClick={() => toggleColor(color.name)}
              className={cn(
                "flex size-9 items-center justify-center rounded-full border-2 transition-all",
                filters.colors.includes(color.name)
                  ? "border-foreground scale-110"
                  : "border-transparent hover:scale-105"
              )}
              title={color.name}
              aria-label={color.name}
            >
              <span
                className="size-7 rounded-full border border-black/10"
                style={{ backgroundColor: color.hex }}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Stok Durumu
        </h3>
        <div className="space-y-3">
          {stockOptions.map((opt) => (
            <div key={opt.value} className="flex items-center gap-3">
              <Checkbox
                id={`stock-${opt.value}`}
                checked={filters.stockStatus.includes(opt.value)}
                onCheckedChange={() => toggleStock(opt.value)}
              />
              <Label
                htmlFor={`stock-${opt.value}`}
                className="cursor-pointer font-normal"
              >
                {opt.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
