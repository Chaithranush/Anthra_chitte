import Link from "next/link";
import Image from "next/image";
import { existsSync } from "fs";
import { join } from "path";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Heart, Flower2, Sparkles, Pocket } from "lucide-react";

export const metadata = {
  title: "Our Story | Anthra Chitte",
  description:
    "Woven with tradition. Tailored for you. Discover the heart behind Anthra Chitte — handcrafted traditional wear for the modern woman.",
};

export default function AboutPage() {
  const founderPath = join(process.cwd(), "public", "assets", "founder1.jpeg");
  const hasFounderPhoto = existsSync(founderPath);

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Hero */}
        <section className="text-center mb-10 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold tracking-tight text-foreground">
            Woven with Tradition.
            <br />
            <span className="text-primary">Tailored for You.</span>
          </h1>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground">
            Welcome to Anthra Chitte.
          </p>
        </section>

        {/* Intro + Founder Photo */}
        <section className="mb-10 sm:mb-12">
          <div className={`flex flex-col gap-6 ${hasFounderPhoto ? "sm:flex-row sm:gap-8 sm:items-center" : ""}`}>
            {hasFounderPhoto && (
              <div className="relative shrink-0 w-full sm:w-56 md:w-64 aspect-square rounded-xl overflow-hidden ring-1 ring-primary/10 shadow-lg order-first sm:order-none">
                <Image
                  src="/assets/founder1.jpeg"
                  alt="Anthra Chitte Founder"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 256px"
                  priority
                />
              </div>
            )}
            <div className="flex-1 min-w-0 space-y-6">
              <p className="text-base sm:text-lg leading-relaxed text-foreground">
                We believe that true elegance shouldn&apos;t come at the cost of comfort,
                and traditional wear should evolve to meet the needs of the modern woman.
                Anthra Chitte was born from a simple but powerful idea: that every garment
                should feel like it was made specifically for your body and your lifestyle.
              </p>
              <div>
                <div className="flex items-center gap-2 sm:gap-3 mb-3">
                  <div className="rounded-full bg-primary/10 p-2 shrink-0">
                    <Flower2 className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground">
                    The Meaning Behind the Name 🦋
                  </h2>
                </div>
                <p className="text-base sm:text-lg leading-relaxed text-foreground">
                  In our name, &quot;Anthra&quot; represents the soul, and &quot;Chitte&quot; is the
                  butterfly. Together, they embody our philosophy. Just like a butterfly,
                  we want our garments to make you feel beautiful, free, and completely
                  yourself. We pour our soul into every stitch, creating pieces that
                  aren&apos;t just worn, but cherished.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Where Heritage Meets Practicality */}
        <section className="mb-10 sm:mb-12 pb-8 border-b border-border">
          <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-3">
            Where Heritage Meets Practicality
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-foreground mb-6">
            For too long, women have had to choose between looking beautifully
            traditional or feeling practical. We decided you deserve both.
          </p>

          <div className="grid sm:grid-cols-2 gap-5 sm:items-stretch">
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="rounded-full bg-accent w-10 h-10 flex items-center justify-center mb-3 shrink-0">
                <Pocket className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-serif text-base sm:text-lg font-semibold text-foreground mb-2">
                Sarees with Pockets
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Because every modern woman knows the quiet joy of finding a pocket
                in her favorite outfit.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <div className="rounded-full bg-accent w-10 h-10 flex items-center justify-center mb-3 shrink-0">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-serif text-base sm:text-lg font-semibold text-foreground mb-2">
                Maternity Flexifit™
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                We celebrate the transforming female body. Our Flexifit designs ensure
                that expecting and new mothers never have to compromise on style or
                comfort.
              </p>
            </div>
          </div>
        </section>

        {/* Heartcrafted Just for You */}
        <section className="mb-10 sm:mb-12 pb-8 border-b border-border">
          <div className="flex items-center gap-2 sm:gap-3 mb-4">
            <div className="rounded-full bg-secondary/20 p-2 shrink-0">
              <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-secondary" />
            </div>
            <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground">
              Heartcrafted Just for You
            </h2>
          </div>
          <p className="text-base sm:text-lg leading-relaxed text-foreground mb-4">
            We are proudly a slow-fashion, small business. We don&apos;t believe in
            mass production. Instead, we believe in the magic of the
            &quot;handcrafted&quot; touch. From the moment the fabric is cut, to the
            delicate gold threads we weave, right down to the navy blue butterfly
            seal on your butter-paper packaging—every detail is prepared by our
            hands, for yours.
          </p>
          <p className="text-base sm:text-lg font-serif font-medium text-primary">
            When you wear Anthra Chitte, you aren&apos;t just wearing a piece of
            clothing. You are wearing a piece of our heart.
          </p>
        </section>

        {/* Behind the Scenes */}
        <section className="mb-10 sm:mb-12">
          <h2 className="text-lg sm:text-xl font-serif font-bold text-foreground mb-4">
            Behind the Scenes
          </h2>
          <div className="relative aspect-[4/3] sm:aspect-video rounded-xl overflow-hidden shadow-md ring-1 ring-border w-full">
            <Image
              src="/assets/home-hero1.jpeg"
              alt="Handcrafted packaging with butter paper, tags, thread and fabric — prepared by our hands for yours"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 672px"
            />
          </div>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground">
            Every parcel is packed with care. From fabric to the butterfly seal — made by our hands, for yours.
          </p>
        </section>

        {/* Closing + CTA */}
        <section className="text-center pt-2">
          <p className="text-base sm:text-lg font-medium text-foreground mb-5 sm:mb-6">
            Thank you for being part of our journey.
          </p>
          <Button asChild size="lg" className="rounded-full px-6 sm:px-8 min-h-11">
            <Link href="/">Shop Our Heartcrafted Collection</Link>
          </Button>
        </section>
      </div>

      <Footer />
    </main>
  );
}
