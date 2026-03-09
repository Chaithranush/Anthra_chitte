import mongoose, { Schema, model, models } from "mongoose";

export interface IRating {
  _id: mongoose.Types.ObjectId;
  productId: string;
  userId: mongoose.Types.ObjectId;
  rating: number;
  review?: string;
  createdAt: Date;
}

const RatingSchema = new Schema<IRating>(
  {
    productId: { type: String, required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Compound index for one rating per user per product
RatingSchema.index({ productId: 1, userId: 1 }, { unique: true });

export const Rating = models.Rating ?? model<IRating>("Rating", RatingSchema);
