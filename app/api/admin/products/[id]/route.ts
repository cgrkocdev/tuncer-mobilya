import { NextResponse } from "next/server";

import {
  deleteProduct,
  getProductById,
  updateProduct,
  updateStock,
  type ProductInput,
} from "@/lib/store/product-store";
import type { ProductCategoryId } from "@/types/product";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return NextResponse.json(
      { success: false, error: "Ürün bulunamadı." },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, product });
}

export async function PUT(request: Request, { params }: RouteParams) {
  const { id } = await params;

  try {
    const body = (await request.json()) as Partial<ProductInput> & {
      stockCount?: number;
    };

    const product = body.stockCount !== undefined && Object.keys(body).length === 1
      ? updateStock(id, body.stockCount)
      : updateProduct(id, {
          ...body,
          categoryId: body.categoryId as ProductCategoryId | undefined,
        });

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Ürün bulunamadı." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, product });
  } catch {
    return NextResponse.json(
      { success: false, error: "Güncelleme başarısız." },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const deleted = deleteProduct(id);

  if (!deleted) {
    return NextResponse.json(
      { success: false, error: "Ürün bulunamadı." },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true });
}
