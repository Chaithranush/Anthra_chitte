"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { PriceDisplay } from "@/components/PriceDisplay";
import { Heart, X, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

export function FavoritesSheet() {
    const { favorites, removeFavorite, addItem } = useCartStore();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return (
            <Button variant="ghost" size="icon" className="relative text-foreground">
                <Heart className="h-5 w-5" />
            </Button>
        );
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-foreground">
                    <Heart className="h-5 w-5" />
                    {favorites.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                            {favorites.length}
                        </span>
                    )}
                    <span className="sr-only">Favorites</span>
                </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-background border-l-border">
                <SheetHeader>
                    <SheetTitle className="font-serif text-2xl text-primary">Favorites</SheetTitle>
                </SheetHeader>

                {favorites.length === 0 ? (
                    <div className="flex flex-col items-center justify-center flex-1 space-y-4">
                        <Heart className="w-16 h-16 text-muted-foreground opacity-50" />
                        <p className="text-muted-foreground text-lg">No favorites yet</p>
                        <Button asChild variant="outline" className="mt-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                            <Link href="/category/sarees-by-fabric">Shop Sarees by Fabric</Link>
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="flex-1 overflow-y-auto py-4 space-y-4">
                            {favorites.map((item) => {
                                const isFabricSaree = item.id.includes("-");
                                const productHref = `/product/${item.id}`;
                                const handleAddToCart = () => {
                                    if (isFabricSaree) {
                                        router.push(productHref);
                                    } else {
                                        addItem(item);
                                    }
                                };
                                return (
                                <div key={item.id} className="flex gap-4 items-start">
                                    <Link href={productHref} className="relative w-20 h-24 rounded-md overflow-hidden bg-muted shrink-0">
                                        <Image
                                            src={item.image}
                                            alt={isFabricSaree ? "Saree" : item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </Link>
                                    <div className="flex-1 min-w-0 space-y-2">
                                        <Link href={productHref}>
                                            <h4 className="font-medium text-foreground text-sm line-clamp-2 hover:text-primary">
                                                {isFabricSaree ? "Saree" : item.name}
                                            </h4>
                                        </Link>
                                        <PriceDisplay price={item.price} variant="compact" />
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            className="h-8 text-xs gap-1"
                                            onClick={handleAddToCart}
                                            asChild={isFabricSaree}
                                        >
                                            {isFabricSaree ? (
                                                <Link href={productHref}>
                                                    <ShoppingCart className="w-4 h-4" />
                                                    Add to Cart
                                                </Link>
                                            ) : (
                                                <>
                                                    <ShoppingCart className="w-4 h-4" />
                                                    Add to Cart
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-muted-foreground hover:text-destructive shrink-0"
                                        onClick={() => removeFavorite(item.id)}
                                        aria-label="Remove from favorites"
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                                );
                            })}
                        </div>
                        <Button asChild className="w-full">
                            <Link href="/category/sarees-by-fabric">View All Sarees</Link>
                        </Button>
                    </>
                )}
            </SheetContent>
        </Sheet>
    );
}
