"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, MessageSquare } from "lucide-react";
import { StarRating } from "@/components/StarRating";
import { cn } from "@/lib/utils";

interface Review {
  rating: number;
  review: string | null;
  createdAt: string;
  userName: string;
}

interface ProductReviewsListProps {
  productId: string;
  reviewCount: number;
  className?: string;
}

export function ProductReviewsList({
  productId,
  reviewCount,
  className,
}: ProductReviewsListProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  const fetchReviews = () => {
    if (reviewCount === 0) {
      setLoading(false);
      setReviews([]);
      return;
    }
    setLoading(true);
    fetch(`/api/ratings/${productId}/reviews`)
      .then((res) => (res.ok ? res.json() : []))
      .then(setReviews)
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchReviews();
  }, [productId, reviewCount]);

  if (reviewCount === 0) return null;

  const displayReviews = expanded ? reviews : reviews.slice(0, 3);
  const hasMore = reviews.length > 3;

  return (
    <div className={cn("space-y-3", className)}>
      <button
        type="button"
        onClick={() => {
          if (!expanded && reviews.length === 0 && reviewCount > 0) {
            fetchReviews();
          }
          setExpanded(!expanded);
        }}
        className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors w-full text-left"
      >
        <MessageSquare className="w-4 h-4" />
        Customer reviews ({reviewCount})
        {hasMore && (expanded ? <ChevronUp className="w-4 h-4 ml-auto" /> : <ChevronDown className="w-4 h-4 ml-auto" />)}
      </button>

      {expanded && (
        <div className="space-y-4">
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading reviews…</p>
          ) : reviews.length === 0 ? (
            <p className="text-sm text-muted-foreground">No reviews yet.</p>
          ) : (
            <>
              {displayReviews.map((r, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-border bg-muted/30 p-4 space-y-2"
                >
                  <div className="flex items-center gap-3 flex-wrap">
                    <StarRating rating={r.rating} size="sm" starsOnly />
                    <span className="text-xs font-medium text-foreground">{r.userName}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(r.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  {r.review && (
                    <p className="text-sm text-muted-foreground leading-relaxed">{r.review}</p>
                  )}
                </div>
              ))}
              {hasMore && !expanded && (
                <button
                  type="button"
                  onClick={() => setExpanded(true)}
                  className="text-sm text-primary hover:underline font-medium"
                >
                  View all {reviews.length} reviews
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
