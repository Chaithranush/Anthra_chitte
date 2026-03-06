"use client";

import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import fabricSareesData from "@/lib/fabric-sarees.json";
import { Button } from "@/components/ui/button";
import { PriceDisplay } from "@/components/PriceDisplay";
import { Heart } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

type FabricItem = {
    id: string;
    name: string;
    fabric: string;
    price: number;
    image: string;
    description: string;
    isNew?: boolean;
};

export default function NewArrivalsPage() {
    const { addFavorite, removeFavorite, isFavorite } = useCartStore();
    const newArrivals = (fabricSareesData as FabricItem[]).filter((s) => s.isNew === true);

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <main className="flex-1 container mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-serif font-bold tracking-tight text-foreground sm:text-5xl mb-4">
                        New Arrivals
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Discover our latest additions across Linen Digital Prints, Ganga Pattu, and Jaipuri Cotton.
                    </p>
                </div>

                {/* Product Grid */}
                {newArrivals.length > 0 ? (
                    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                        {newArrivals.map((product) => (
                            <div
                                key={product.id}
                                className="group relative border rounded-lg overflow-hidden bg-card hover:shadow-lg transition-all duration-300"
                            >
                                <Link
                                    href={`/product/${product.id}`}
                                    className="block aspect-[3/4] w-full overflow-hidden bg-gray-100 relative"
                                >
                                    <div className="absolute top-2 left-2 z-10 flex gap-1.5">
                                        <span className="rounded-md bg-amber-500 px-2 py-0.5 text-xs font-semibold text-white shadow">
                                            NEW
                                        </span>
                                        <span className="rounded-md bg-emerald-600 px-2 py-0.5 text-xs font-semibold text-white shadow">
                                            20% OFF
                                        </span>
                                    </div>
                                    <Image
                                        src={product.image}
                                        alt="Saree"
                                        fill
                                        className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-2 right-2 z-10">
                                        <Button
                                            variant={isFavorite(product.id) ? "secondary" : "ghost"}
                                            size="icon"
                                            className="rounded-full bg-white/80 backdrop-blur-sm text-gray-600 hover:text-red-500 hover:bg-white transition-colors"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                if (isFavorite(product.id)) removeFavorite(product.id);
                                                else
                                                    addFavorite({
                                                        id: product.id,
                                                        name: product.name,
                                                        category: "Sarees",
                                                        price: product.price,
                                                        image: product.image,
                                                        description: product.description,
                                                    });
                                            }}
                                            aria-label={
                                                isFavorite(product.id)
                                                    ? "Remove from favorites"
                                                    : "Add to favorites"
                                            }
                                        >
                                            <Heart
                                                className={`h-5 w-5 ${isFavorite(product.id) ? "fill-current" : ""}`}
                                            />
                                        </Button>
                                    </div>
                                </Link>
                                <div className="p-4 flex flex-col gap-2">
                                    <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
                                        {product.description}
                                    </p>
                                    <div className="mt-2 flex items-center justify-between gap-2">
                                        <PriceDisplay price={product.price} variant="default" />
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            className="font-medium"
                                            asChild
                                        >
                                            <Link href={`/product/${product.id}`}>Add to Cart</Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-muted/30 rounded-lg border border-dashed">
                        <p className="text-xl text-muted-foreground">
                            No new arrivals at the moment. Check back soon!
                        </p>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
