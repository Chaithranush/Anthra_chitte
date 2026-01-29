"use client";

import { useState } from "react";
import { Product } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { Heart, Info, Ruler } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ProductDetailsProps {
    product: Product;
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL", "Free Size"];

export function ProductDetails({ product }: ProductDetailsProps) {
    const [selectedSize, setSelectedSize] = useState<string | undefined>();
    const { addItem } = useCartStore();

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("Please select a size"); // Better to use toast
            return;
        }
        addItem(product, selectedSize);
        // Ideally show a toast here
    };

    return (
        <div className="flex flex-col space-y-6">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold font-serif text-foreground">{product.name}</h1>
                <p className="text-xl text-primary font-medium">₹{product.price.toLocaleString()}</p>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-foreground">Select Size (Flexifit™)</h3>
                    <Button variant="link" className="text-xs text-muted-foreground p-0 h-auto">
                        <Ruler className="w-3 h-3 mr-1" /> Size Guide
                    </Button>
                </div>
                <div className="flex flex-wrap gap-3">
                    {sizes.map((size) => (
                        <Button
                            key={size}
                            variant={selectedSize === size ? "default" : "outline"}
                            onClick={() => setSelectedSize(size)}
                            className={`w-12 h-12 rounded-full ${selectedSize === size ? 'bg-primary text-primary-foreground' : 'text-foreground hover:border-primary'}`}
                        >
                            {size}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="flex gap-4 pt-4">
                <Button onClick={handleAddToCart} size="lg" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 text-lg">
                    Add to Cart
                </Button>
                <Button variant="outline" size="icon" className="h-12 w-12 rounded-full border-muted-foreground/30 text-muted-foreground hover:text-red-500 hover:border-red-500">
                    <Heart className="w-6 h-6" />
                </Button>
            </div>

            <Separator />

            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>{product.description}</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Handcrafted with care</li>
                    <li>Premium breathable fabric</li>
                    <li>Perfect for all-day comfort</li>
                    {product.category === 'Maternity' && <li>Nursing-friendly access</li>}
                    {(product.category === 'Sarees' || product.category === 'Maternity') && <li>Featuring deep pockets</li>}
                </ul>
            </div>

            <div className="flex items-center space-x-2 text-xs text-muted-foreground bg-muted p-3 rounded-lg">
                <Info className="w-4 h-4" />
                <span>Free shipping on orders above ₹2000. Easy returns within 7 days.</span>
            </div>
        </div>
    );
}
