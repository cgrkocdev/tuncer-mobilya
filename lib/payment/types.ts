import type { PaymentProviderType } from "@/types/checkout";

export interface PaymentIntentRequest {
  amount: number;
  currency: string;
  orderId: string;
  orderNumber: string;
  customerEmail: string;
  metadata?: Record<string, string>;
}

export interface PaymentIntent {
  id: string;
  provider: PaymentProviderType;
  amount: number;
  currency: string;
  clientSecret?: string;
  paymentPageUrl?: string;
  status: "requires_payment" | "processing" | "succeeded" | "failed";
}

export interface PaymentConfirmResult {
  success: boolean;
  transactionId: string;
  status: "succeeded" | "failed";
  error?: string;
}

export interface PaymentProvider {
  name: PaymentProviderType;
  createIntent(request: PaymentIntentRequest): Promise<PaymentIntent>;
  confirmPayment(intentId: string): Promise<PaymentConfirmResult>;
}
