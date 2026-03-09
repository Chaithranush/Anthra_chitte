import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Rating } from "@/models/Rating";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params;
    await connectDB();

    const reviews = await Rating.aggregate([
      { $match: { productId } },
      { $sort: { createdAt: -1 } },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          rating: 1,
          review: 1,
          createdAt: 1,
          userName: {
            $cond: {
              if: { $ne: ["$user.name", null] },
              then: { $arrayElemAt: [{ $split: ["$user.name", " "] }, 0] },
              else: "Customer",
            },
          },
        },
      },
    ]);

    return NextResponse.json(
      reviews.map((r) => ({
        rating: r.rating,
        review: r.review || null,
        createdAt: r.createdAt,
        userName: r.userName || "Customer",
      }))
    );
  } catch (err) {
    console.error("API /ratings/[productId]/reviews GET error:", err);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}
