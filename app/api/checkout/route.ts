import { NextResponse } from "next/server";

import { processCheckout } from "@/server/orders";
import type { CheckoutRequest } from "@/types/checkout";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CheckoutRequest;

    if (!body.items?.length) {
      return NextResponse.json(
        { success: false, error: "Sepet boş." },
        { status: 400 }
      );
    }

    if (!body.customer?.email || !body.customer?.firstName) {
      return NextResponse.json(
        { success: false, error: "Eksik müşteri bilgileri." },
        { status: 400 }
      );
    }

    const result = await processCheckout(body);

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { success: false, error: "Sunucu hatası." },
      { status: 500 }
    );
  }
}
