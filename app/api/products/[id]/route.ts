import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/Product";
import { Rating } from "@/models/Rating";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();

    const product = await Product.findOne({ id }).lean();
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const ratingAgg = await Rating.aggregate([
      { $match: { productId: id } },
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$rating" },
          count: { $sum: 1 },
        },
      },
    ]);

    const fromDb = ratingAgg[0];
    const rating = fromDb
      ? Math.round(fromDb.avgRating * 10) / 10
      : product.rating ?? 4.5;
    const reviewCount = fromDb?.count ?? product.reviewCount ?? 0;

    return NextResponse.json({
      ...product,
      _id: undefined,
      rating,
      reviewCount,
    });
  } catch (err) {
    console.error("API /products/[id] error:", err);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
