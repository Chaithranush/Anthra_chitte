import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
    return (
        <div className="relative isolate overflow-hidden bg-background">
            <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
                    <h1 className="mt-10 text-4xl font-serif font-bold tracking-tight text-foreground sm:text-6xl">
                        Elegance in Every <span className="text-secondary">Stitch</span>
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-muted-foreground font-sans">
                        Discover Anthra Chitte's exclusive collection of handcrafted traditional wear, Maternity Flexifit™ dresses, and Sarees designed for the modern woman—now with pockets.
                    </p>
                    <div className="mt-10 flex items-center gap-x-6">
                        <Button asChild size="lg" className="rounded-full px-8 text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-transform hover:scale-105">
                            <Link href="/category/new-arrivals">Shop New Arrivals</Link>
                        </Button>
                        <Link href="/about" className="text-sm font-semibold leading-6 text-foreground hover:text-secondary transition-colors">
                            Our Story <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>
                <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mt-0 lg:mr-0 lg:max-w-none lg:flex-none xl:ml-32">
                    <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                        <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                            <img
                                src="https://images.unsplash.com/photo-1550614000-4b9519e49a27?q=80&w=2600&auto=format&fit=crop"
                                alt="Anthra Chitte Collection"
                                width={2432}
                                height={1442}
                                className="w-[76rem] rounded-md shadow-2xl ring-1 ring-gray-900/10 opacity-90 hover:opacity-100 transition-opacity duration-500"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
