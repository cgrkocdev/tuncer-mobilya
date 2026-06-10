import { NextResponse } from "next/server";

import { getOrderById } from "@/server/orders";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const order = getOrderById(id);

  if (!order) {
    return NextResponse.json(
      { success: false, error: "Sipariş bulunamadı." },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, order });
}
