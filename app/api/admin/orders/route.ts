import { NextResponse } from "next/server";

import { getAllOrders } from "@/server/orders";

export async function GET() {
  const orders = getAllOrders();
  return NextResponse.json({ success: true, orders });
}
