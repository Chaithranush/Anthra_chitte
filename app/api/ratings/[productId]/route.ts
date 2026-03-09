import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Rating } from "@/models/Rating";
import { verifyToken } from "@/lib/auth";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params;
    await connectDB();

    const agg = await Rating.aggregate([
      { $match: { productId } },
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$rating" },
          count: { $sum: 1 },
        },
      },
    ]);

    const result = agg[0]
      ? {
          rating: Math.round(agg[0].avgRating * 10) / 10,
          reviewCount: agg[0].count,
        }
      : { rating: 0, reviewCount: 0 };

    return NextResponse.json(result);
  } catch (err) {
    console.error("API /ratings/[productId] GET error:", err);
    return NextResponse.json(
      { error: "Failed to fetch ratings" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params;
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const body = await request.json();
    const { rating, review } = body;
    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    await connectDB();

    const userId = new mongoose.Types.ObjectId(payload.userId);
    await Rating.findOneAndUpdate(
      { productId, userId },
      {
        productId,
        userId,
        rating,
        review: typeof review === "string" ? review : undefined,
      },
      { upsert: true, new: true }
    );

    const agg = await Rating.aggregate([
      { $match: { productId } },
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$rating" },
          count: { $sum: 1 },
        },
      },
    ]);

    const result = agg[0]
      ? {
          rating: Math.round(agg[0].avgRating * 10) / 10,
          reviewCount: agg[0].count,
        }
      : { rating, reviewCount: 1 };

    return NextResponse.json(result);
  } catch (err) {
    console.error("API /ratings/[productId] POST error:", err);
    return NextResponse.json(
      { error: "Failed to save rating" },
      { status: 500 }
    );
  }
}
