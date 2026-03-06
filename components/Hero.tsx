import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Hero() {
    return (
        <section className="relative w-full min-h-[calc(100vh-64px)] flex items-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/home-hero1.jpeg"
                    alt="Handcrafted saree packaging with butter paper, navy blue butterfly sticker, tags, thread and measuring tape"
                    fill
                    className="object-cover filter brightness-[1.05] contrast-[1.08] saturate-[1.1]"
                    sizes="100vw"
                    priority
                />
                {/* Darker overlay for text readability - stronger on left where text sits */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16 sm:py-20">
                <div className="max-w-2xl space-y-6">
                    <h1
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
                        style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5), 0 0 40px rgba(0,0,0,0.3)" }}
                    >
                        Elegance in Every <span className="text-secondary">Stitch</span>
                    </h1>
                    <p
                        className="text-lg sm:text-xl leading-relaxed text-white/95 max-w-xl"
                        style={{ textShadow: "0 1px 12px rgba(0,0,0,0.6)" }}
                    >
                        Discover Anthra Chitte&apos;s exclusive collection of handcrafted traditional wear, Maternity Flexifit™ dresses, and Sarees designed for the modern woman—now with pockets.
                    </p>
                    <div className="flex flex-wrap items-center gap-4 pt-2">
                        <Button asChild size="lg" className="rounded-full px-8 text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl transition-all hover:scale-105">
                            <Link href="/category/new-arrivals">Shop New Arrivals</Link>
                        </Button>
                        <Link
                            href="/about"
                            className="inline-flex items-center text-base font-semibold text-white hover:text-secondary transition-colors"
                            style={{ textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
                        >
                            Our Story <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
