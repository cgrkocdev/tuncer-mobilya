import type {
  PaymentConfirmResult,
  PaymentIntent,
  PaymentIntentRequest,
  PaymentProvider,
} from "@/lib/payment/types";

/**
 * Iyzico entegrasyonu için hazır adapter.
 * Gerçek entegrasyon: IYZICO_API_KEY ve IYZICO_SECRET_KEY gerekir.
 *
 * iyzipay npm paketi ile checkout form initialize edilir.
 */
export const iyzicoPaymentProvider: PaymentProvider = {
  name: "iyzico",

  async createIntent(request: PaymentIntentRequest): Promise<PaymentIntent> {
    // Iyzico checkout form initialize noktası
    return {
      id: `iyzico_pi_${request.orderId}`,
      provider: "iyzico",
      amount: request.amount,
      currency: request.currency,
      paymentPageUrl: `https://sandbox-merchant.iyzipay.com/pay/mock/${request.orderId}`,
      status: "requires_payment",
    };
  },

  async confirmPayment(intentId: string): Promise<PaymentConfirmResult> {
    // Iyzico callback/webhook doğrulama noktası
    return {
      success: true,
      transactionId: `iyzico_txn_${intentId}`,
      status: "succeeded",
    };
  },
};
