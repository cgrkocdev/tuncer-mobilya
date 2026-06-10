import type { AppliedCoupon, CartTotals } from "@/types/checkout";
import type { CartItem } from "@/types/product";

const FREE_SHIPPING_THRESHOLD = 75000;
const SHIPPING_COST = 2500;

export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function calculateShipping(subtotal: number): number {
  if (subtotal === 0) return 0;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
}

export function calculateTotals(
  items: CartItem[],
  coupon?: AppliedCoupon | null
): CartTotals {
  const subtotal = calculateSubtotal(items);
  const discount = coupon?.discountAmount ?? 0;
  const shipping = calculateShipping(subtotal);
  const total = Math.max(0, subtotal - discount + shipping);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return { subtotal, discount, shipping, total, itemCount };
}

export function generateOrderNumber(): string {
  const date = new Date();
  const prefix = "TM";
  const datePart = date.toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${datePart}-${random}`;
}
