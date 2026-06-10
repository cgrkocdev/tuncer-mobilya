import { NextResponse } from "next/server";

import { getAdminStats } from "@/server/admin/stats";

export async function GET() {
  const stats = getAdminStats();
  return NextResponse.json({ success: true, stats });
}
