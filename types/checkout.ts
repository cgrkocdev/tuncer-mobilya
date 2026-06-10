import type { CartItem } from "@/types/product";

export type PaymentProviderType = "mock" | "stripe" | "iyzico";

export type PaymentMethod =
  | "credit_card"
  | "bank_transfer"
  | "installment";

export interface Coupon {
  code: string;
  type: "percentage" | "fixed";
  value: number;
  minOrderAmount?: number;
  description: string;
}

export interface AppliedCoupon extends Coupon {
  discountAmount: number;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  district: string;
  city: string;
  postalCode: string;
  notes?: string;
}

export interface CheckoutFormData extends ShippingAddress {
  paymentMethod: PaymentMethod;
  paymentProvider: PaymentProviderType;
}

export interface CartTotals {
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  itemCount: number;
}

export interface OrderItem extends CartItem {
  lineTotal: number;
}

export type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  items: OrderItem[];
  customer: ShippingAddress;
  paymentMethod: PaymentMethod;
  paymentProvider: PaymentProviderType;
  transactionId?: string;
  coupon?: AppliedCoupon;
  totals: CartTotals;
  createdAt: string;
  emailSent: boolean;
}

export interface CheckoutRequest {
  items: CartItem[];
  customer: ShippingAddress;
  paymentMethod: PaymentMethod;
  paymentProvider: PaymentProviderType;
  couponCode?: string;
}

export interface CheckoutResponse {
  success: boolean;
  order?: Order;
  error?: string;
  redirectUrl?: string;
}
