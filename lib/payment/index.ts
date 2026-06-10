import { iyzicoPaymentProvider } from "@/lib/payment/providers/iyzico";
import { mockPaymentProvider } from "@/lib/payment/providers/mock";
import { stripePaymentProvider } from "@/lib/payment/providers/stripe";
import type { PaymentProvider } from "@/lib/payment/types";
import type { PaymentProviderType } from "@/types/checkout";

const providers: Record<PaymentProviderType, PaymentProvider> = {
  mock: mockPaymentProvider,
  stripe: stripePaymentProvider,
  iyzico: iyzicoPaymentProvider,
};

export function getPaymentProvider(
  type?: PaymentProviderType
): PaymentProvider {
  const providerType =
    type ??
    (process.env.PAYMENT_PROVIDER as PaymentProviderType) ??
    "mock";
  return providers[providerType] ?? mockPaymentProvider;
}

export type {
  PaymentConfirmResult,
  PaymentIntent,
  PaymentIntentRequest,
  PaymentProvider,
} from "@/lib/payment/types";
