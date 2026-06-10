import type {
  PaymentConfirmResult,
  PaymentIntent,
  PaymentIntentRequest,
  PaymentProvider,
} from "@/lib/payment/types";

export const mockPaymentProvider: PaymentProvider = {
  name: "mock",

  async createIntent(request: PaymentIntentRequest): Promise<PaymentIntent> {
    return {
      id: `mock_pi_${request.orderId}`,
      provider: "mock",
      amount: request.amount,
      currency: request.currency,
      status: "requires_payment",
    };
  },

  async confirmPayment(intentId: string): Promise<PaymentConfirmResult> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
      success: true,
      transactionId: `mock_txn_${intentId.replace("mock_pi_", "")}`,
      status: "succeeded",
    };
  },
};
