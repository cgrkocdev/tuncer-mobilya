import type { StockStatus } from "@/types/product";
import { getStockLabel } from "@/lib/product-utils";
import { cn } from "@/lib/utils";

const styles: Record<StockStatus, string> = {
  in_stock: "bg-emerald-50 text-emerald-700 border-emerald-200",
  low_stock: "bg-amber-50 text-amber-700 border-amber-200",
  out_of_stock: "bg-neutral-100 text-neutral-500 border-neutral-200",
};

interface StockBadgeProps {
  status: StockStatus;
  className?: string;
}

export function StockBadge({ status, className }: StockBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider",
        styles[status],
        className
      )}
    >
      {getStockLabel(status)}
    </span>
  );
}
