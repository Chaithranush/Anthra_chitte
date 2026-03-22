import type { Metadata } from "next";
import { getProducts } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getSiteUrl, SITE_NAME } from "@/lib/seo";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const title = slug.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    const desc = `Shop ${title} at ${SITE_NAME}. Handcrafted traditional wear, sarees with pockets, and Maternity Flexifit™.`;
    const base = getSiteUrl().replace(/\/$/, "");
    const path = `/category/${slug}`;
    return {
        title: `${title} | ${SITE_NAME}`,
        description: desc,
        alternates: { canonical: path },
        openGraph: {
            title: `${title} | ${SITE_NAME}`,
            description: desc,
            url: `${base}${path}`,
            type: "website",
            locale: "en_IN",
            siteName: SITE_NAME,
        },
        twitter: { card: "summary_large_image", title: `${title} | ${SITE_NAME}`, description: desc },
        robots: { index: true, follow: true },
    };
}

export default async function CategoryPage({ params }: PageProps) {
    const { slug } = await params;
    const products = await getProducts();
    const title = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <main className="flex-1 container mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-serif font-bold tracking-tight text-foreground sm:text-5xl mb-12 text-center">
                    {title}
                </h1>

                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                    {/* Displaying all products for placeholder purposes */}
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
