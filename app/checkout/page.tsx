"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { PriceDisplay } from "@/components/PriceDisplay";
import { useCartStore } from "@/store/useCartStore";
import { ShoppingBag, ArrowLeft } from "lucide-react";

export default function CheckoutPage() {
  const { items, totalPrice, totalItems } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-16 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
          <ShoppingBag className="w-16 h-16 text-muted-foreground opacity-50 mb-4" />
          <h1 className="text-xl font-serif font-bold text-foreground mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Add items from our collection to checkout.</p>
          <Button asChild>
            <Link href="/">Shop Now</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const formatItemDetails = (i: (typeof items)[0]) => {
    let details = `${i.name} x ${i.quantity} - ₹${(i.price * i.quantity).toLocaleString()}`;
    if (i.config) {
      const opts: string[] = [];
      if (i.config.sareeType) opts.push(`Type: ${i.config.sareeType}`);
      if (i.config.skirtLength) opts.push(`Skirt: ${i.config.skirtLength === "free" ? "Free size" : i.config.skirtLength + " inch"}`);
      if (i.config.pockets) opts.push(`Pockets: ${i.config.pockets}`);
      if (i.config.palluType) opts.push(`Pallu: ${i.config.palluType}`);
      if (i.config.palluType === "pleated" && i.config.palluLength && i.config.palluWidth)
        opts.push(`Pallu size: ${i.config.palluLength}x${i.config.palluWidth} inch`);
      if (opts.length) details += ` (${opts.join(", ")})`;
    }
    return details;
  };
  const orderSummary = items.map(formatItemDetails).join("\n");
  const total = totalPrice();
  const whatsappMessage = encodeURIComponent(
    `Hi, I'd like to place an order:\n\n${orderSummary}\n\nTotal: ₹${total.toLocaleString()}`
  );
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919876543210";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8" role="main">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Continue shopping
        </Link>

        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-6">
          Checkout
        </h1>

        <div className="space-y-4 mb-8">
          {items.map((item) => (
            <div
              key={`${item.id}-${item.size ?? ""}-${JSON.stringify(item.config || {})}`}
              className="flex gap-4 rounded-lg border border-border bg-card p-4"
            >
              <div className="relative w-20 h-24 shrink-0 rounded-md overflow-hidden bg-muted">
                <Image src={item.image} alt={item.id.includes("-") ? "Saree" : item.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-medium text-foreground">{item.id.includes("-") ? "Saree" : item.name}</h2>
                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                {item.config && (
                  <div className="text-xs text-muted-foreground mt-1 space-y-0.5">
                    <p>Type: {item.config.sareeType}</p>
                    {item.config.skirtLength && (
                      <p>Skirt length: {item.config.skirtLength === "free" ? "Free size" : `${item.config.skirtLength} inch`}</p>
                    )}
                    {item.config.pockets && <p>Pockets: {item.config.pockets}</p>}
                    {item.config.palluType && <p>Pallu: {item.config.palluType}</p>}
                    {item.config.palluType === "pleated" && item.config.palluLength && item.config.palluWidth && (
                      <p>Pallu: {item.config.palluLength} x {item.config.palluWidth} inch</p>
                    )}
                  </div>
                )}
                <PriceDisplay price={item.price} quantity={item.quantity} variant="compact" className="mt-1" />
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-6 space-y-4">
          <div className="flex justify-between text-lg font-semibold text-foreground">
            <span>Total ({totalItems()} items)</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Complete your order by contacting us. We&apos;ll confirm availability and payment details.
          </p>
          <Button asChild size="lg" className="w-full rounded-full text-lg py-6">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              Complete order via WhatsApp
            </a>
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Or email us at hello@anthrachitte.com with your cart details.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
