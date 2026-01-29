import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { Footer } from "@/components/Footer";
import { getProducts } from "@/lib/data";

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen flex flex-col bg-background selection:bg-secondary selection:text-secondary-foreground">
      <Navbar />

      <Hero />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-serif font-bold tracking-tight text-foreground sm:text-4xl text-center mb-12">
          Featured Collection
        </h2>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
