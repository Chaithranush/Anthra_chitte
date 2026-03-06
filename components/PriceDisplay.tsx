"use client";

interface PriceDisplayProps {
  price: number;
  quantity?: number;
  discountPercent?: number;
  /** Compact: single line. Default: vertical stack */
  variant?: "default" | "compact" | "inline";
  className?: string;
}

const DEFAULT_DISCOUNT = 20;

export function PriceDisplay({
  price,
  quantity = 1,
  discountPercent = DEFAULT_DISCOUNT,
  variant = "default",
  className = "",
}: PriceDisplayProps) {
  const originalPrice = Math.round(price / (1 - discountPercent / 100));
  const displayPrice = price * quantity;
  const displayOriginal = originalPrice * quantity;

  if (variant === "compact") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className="text-sm text-muted-foreground line-through">
          ₹{displayOriginal.toLocaleString("en-IN")}
        </span>
        <span className="font-bold text-foreground">
          ₹{displayPrice.toLocaleString("en-IN")}
        </span>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <span className={className}>
        <span className="text-muted-foreground line-through text-sm mr-1">
          ₹{displayOriginal.toLocaleString("en-IN")}
        </span>
        <span className="font-bold">₹{displayPrice.toLocaleString("en-IN")}</span>
      </span>
    );
  }

  return (
    <div className={`flex flex-col gap-0.5 ${className}`}>
      <p className="text-sm text-muted-foreground line-through">
        ₹{displayOriginal.toLocaleString("en-IN")}
      </p>
      <p className="text-lg font-bold text-foreground">
        ₹{displayPrice.toLocaleString("en-IN")}
      </p>
    </div>
  );
}
