import type { StockStatus } from "@/types/product";

export function getStockLabel(status: StockStatus): string {
  const labels: Record<StockStatus, string> = {
    in_stock: "Stokta",
    low_stock: "Son Ürünler",
    out_of_stock: "Tükendi",
  };
  return labels[status];
}

export function getWhatsAppOrderUrl(
  productName: string,
  price: string,
  phone: string,
  options?: { color?: string; fabric?: string }
): string {
  let message = `Merhaba, ${productName} (${price}) hakkında sipariş vermek istiyorum.`;
  if (options?.color) message += ` Renk: ${options.color}.`;
  if (options?.fabric) message += ` Kumaş: ${options.fabric}.`;

  const encoded = encodeURIComponent(message);
  const cleanPhone = phone.replace(/\D/g, "");
  return `https://wa.me/${cleanPhone}?text=${encoded}`;
}
