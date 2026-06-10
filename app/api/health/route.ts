import { NextResponse } from "next/server";

import { healthCheck } from "@/server";

export async function GET() {
  const result = await healthCheck();
  return NextResponse.json(result);
}
