"use client";

import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
  /** When true, only show stars (no numeric rating or review count) */
  starsOnly?: boolean;
}

export function StarRating({
  rating,
  reviewCount,
  className = "",
  size = "md",
  starsOnly = false,
}: StarRatingProps) {
  const clamped = Math.min(5, Math.max(0, rating));
  const full = Math.floor(clamped);
  const empty = 5 - full;

  const iconSize = size === "sm" ? "w-3.5 h-3.5" : size === "lg" ? "w-5 h-5" : "w-4 h-4";

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center gap-0.5" aria-label={`Rating: ${clamped} out of 5 stars`}>
        {Array.from({ length: full }).map((_, i) => (
          <Star key={`full-${i}`} className={`${iconSize} fill-amber-400 text-amber-400`} />
        ))}
        {Array.from({ length: empty }).map((_, i) => (
          <Star key={`empty-${i}`} className={`${iconSize} text-amber-400/30`} />
        ))}
      </div>
      {!starsOnly && (
        <span className="text-sm text-muted-foreground">
          {clamped % 1 === 0 ? String(clamped) : clamped.toFixed(1)}
          {reviewCount != null && reviewCount > 0 && (
            <span className="ml-1">({reviewCount} {reviewCount === 1 ? "review" : "reviews"})</span>
          )}
        </span>
      )}
    </div>
  );
}
