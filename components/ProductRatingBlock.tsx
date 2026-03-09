"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import { StarRating } from "@/components/StarRating";
import { ProductReviewsList } from "@/components/ProductReviewsList";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";

interface ProductRatingBlockProps {
  productId: string;
  rating: number;
  reviewCount: number;
  size?: "sm" | "md" | "lg";
}

export function ProductRatingBlock({
  productId,
  rating,
  reviewCount,
  size = "lg",
}: ProductRatingBlockProps) {
  const { isLoggedIn, token, userName } = useAuthStore();
  const [displayRating, setDisplayRating] = useState(rating);
  const [displayCount, setDisplayCount] = useState(reviewCount);
  const [selectedStars, setSelectedStars] = useState(0);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Sync from props when product changes (e.g. navigation)
  useEffect(() => {
    setDisplayRating(rating);
    setDisplayCount(reviewCount);
  }, [productId, rating, reviewCount]);

  // Fetch live rating from API so we show user-submitted ratings (overrides static/cached data)
  useEffect(() => {
    fetch(`/api/ratings/${productId}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setDisplayRating(data.rating);
          setDisplayCount(data.reviewCount);
        }
      })
      .catch(() => {});
  }, [productId]);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async () => {
    if (selectedStars < 1) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/ratings/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ rating: selectedStars, review: review.trim() || undefined }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Failed to save rating");
        return;
      }
      setDisplayRating(data.rating);
      setDisplayCount(data.reviewCount);
      setSelectedStars(0);
      setReview("");
      const displayName = userName?.trim().split(/\s+/)[0] || "you";
      setSuccessMessage(`Thanks, ${displayName}! Your rating has been saved.`);
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <StarRating
        rating={displayRating}
        reviewCount={displayCount}
        size={size}
      />
      {displayCount > 0 && (
        <ProductReviewsList productId={productId} reviewCount={displayCount} />
      )}
      {isLoggedIn ? (
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Rate this product</p>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setSelectedStars(n)}
                  className="p-1 focus:outline-none focus:ring-2 focus:ring-ring rounded"
                  aria-label={`${n} stars`}
                >
                  <Star
                    className={`w-6 h-6 ${
                      n <= selectedStars ? "fill-amber-400 text-amber-400" : "text-amber-400/30"
                    }`}
                  />
                </button>
              ))}
            </div>
            <textarea
              placeholder="Write a review (optional)"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring max-h-24 resize-y"
              rows={2}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
            {successMessage && (
              <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">{successMessage}</p>
            )}
            <Button
              size="sm"
              onClick={handleSubmit}
              disabled={loading || selectedStars < 1}
            >
              {loading ? "Saving…" : "Submit rating"}
            </Button>
          </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          <Link href={`/login?redirect=${encodeURIComponent(`/product/${productId}`)}`} className="font-medium text-primary hover:underline">
            Log in
          </Link>
          {" "}to rate this product.
        </p>
      )}
    </div>
  );
}
