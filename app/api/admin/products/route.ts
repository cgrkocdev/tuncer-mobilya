import { NextResponse } from "next/server";

import {
  createProduct,
  getProducts,
  type ProductInput,
} from "@/lib/store/product-store";
import type { ProductCategoryId } from "@/types/product";

export async function GET() {
  const products = getProducts();
  return NextResponse.json({ success: true, products });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ProductInput;

    if (!body.name || !body.price || !body.categoryId) {
      return NextResponse.json(
        { success: false, error: "Zorunlu alanlar eksik." },
        { status: 400 }
      );
    }

    const product = createProduct({
      ...body,
      categoryId: body.categoryId as ProductCategoryId,
      stockCount: body.stockCount ?? 0,
    });

    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch {
    return NextResponse.json(
      { success: false, error: "Ürün oluşturulamadı." },
      { status: 500 }
    );
  }
}
