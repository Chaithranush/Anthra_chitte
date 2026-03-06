"use client";

import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function BlousesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 container mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold tracking-tight text-foreground sm:text-5xl mb-4">
            Blouses
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Designer blouses to complement your sarees—coming soon.
          </p>
        </div>

        <div className="text-center py-20 bg-muted/30 rounded-lg border border-dashed">
          <Sparkles className="w-16 h-16 text-muted-foreground opacity-50 mx-auto mb-4" />
          <p className="text-xl text-muted-foreground mb-6">
            Our blouse collection is launching soon. Stay tuned!
          </p>
          <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <Link href="/category/sarees-by-fabric">Browse Sarees</Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
