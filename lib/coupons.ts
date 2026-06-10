import type { AppliedCoupon, Coupon } from "@/types/checkout";

export const mockCoupons: Coupon[] = [
  {
    code: "TUNCER10",
    type: "percentage",
    value: 10,
    description: "%10 indirim",
  },
  {
    code: "LUXURY15",
    type: "percentage",
    value: 15,
    minOrderAmount: 50000,
    description: "50.000₺ üzeri %15 indirim",
  },
  {
    code: "WELCOME500",
    type: "fixed",
    value: 500,
    minOrderAmount: 10000,
    description: "10.000₺ üzeri 500₺ indirim",
  },
];

export function validateCoupon(
  code: string,
  subtotal: number
): { valid: true; coupon: AppliedCoupon } | { valid: false; message: string } {
  const normalized = code.trim().toUpperCase();
  const coupon = mockCoupons.find((c) => c.code === normalized);

  if (!coupon) {
    return { valid: false, message: "Geçersiz kupon kodu." };
  }

  if (coupon.minOrderAmount && subtotal < coupon.minOrderAmount) {
    return {
      valid: false,
      message: `Bu kupon minimum ${coupon.minOrderAmount.toLocaleString("tr-TR")}₺ siparişlerde geçerlidir.`,
    };
  }

  const discountAmount =
    coupon.type === "percentage"
      ? Math.round(subtotal * (coupon.value / 100))
      : coupon.value;

  return {
    valid: true,
    coupon: { ...coupon, discountAmount },
  };
}
