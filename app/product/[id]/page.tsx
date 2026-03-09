import { getAllProductIds } from "@/lib/data";
import { getProductById, isFabricProduct } from "@/lib/products";

// Ensure fresh product data (including ratings) on each request
export const dynamic = "force-dynamic";
import { ProductDetails } from "@/components/ProductDetails";
import { FabricProductDetails } from "@/components/FabricProductDetails";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Image from "next/image";
import { notFound } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anthrachitte.com";

interface PageProps {
    params: Promise<{ id: string }>;
}

function absoluteImageUrl(path: string) {
    return path.startsWith("http") ? path : `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;
}

export async function generateStaticParams() {
    const ids = await getAllProductIds();
    return ids.map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps) {
    const { id } = await params;
    const product = await getProductById(id);
    if (!product) return { title: "Product Not Found" };

    const displayName = isFabricProduct(product) ? "Saree" : product.name;
    const imageUrl = absoluteImageUrl(product.image);
    return {
        title: `${displayName} | Anthra Chitte`,
        description: product.description,
        openGraph: {
            title: displayName,
            description: product.description,
            images: [{ url: imageUrl, width: 800, height: 1000, alt: displayName }],
            type: "website",
        },
        twitter: { card: "summary_large_image", title: displayName, description: product.description },
    };
}

export default async function ProductPage({ params }: PageProps) {
    const { id } = await params;
    const product = await getProductById(id);

    if (!product) notFound();

    const imageUrl = absoluteImageUrl(product.image);
    const displayName = isFabricProduct(product) ? "Saree" : product.name;
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: displayName,
        description: product.description,
        image: imageUrl,
        sku: product.id,
        offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
        },
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-10 sm:px-6 lg:px-8" role="main">
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                    {/* Product Image */}
                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-gray-100 lg:aspect-[3/4]">
                        <Image
                            src={product.image}
                            alt={displayName}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Product Info */}
                    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                        {isFabricProduct(product) ? (
                            <FabricProductDetails product={product} />
                        ) : (
                            <ProductDetails product={product} />
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
