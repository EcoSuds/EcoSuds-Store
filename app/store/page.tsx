import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { CategoryTiles } from "@/components/CategoryTiles";
import { FeatureBento } from "@/components/FeatureBento";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { StepFlow } from "@/components/StepFlow";
import { getCategories, getPage, getProducts, getSiteData, getStorefront } from "@/lib/content";
import { makeMetadata } from "@/lib/seo";

const page = getPage("store");
const site = getSiteData();

export const metadata = makeMetadata({ title: page.seoTitle, description: page.seoDescription, path: "/store/", image: page.hero.image });

export default function StorePage() {
  const products = getProducts();
  const categories = getCategories();
  const storefront = getStorefront();
  const trust = page.trust as string[];

  return (
    <>
      <Hero
        hero={page.hero}
        site={site}
        badges={storefront.heroBadges}
        stats={[
          { value: `${products.length}`, label: "catalog items across soap and spa categories" },
          { value: `${categories.length}`, label: "clear shopping categories" },
          { value: "Chat", label: "order confirmation through WhatsApp" }
        ]}
      />

      <section id="content" className="section-pad-tight">
        <div className="container-page">
          <Reveal><SectionHeader eyebrow="Shop by category" title="Find the right EcoSuds ritual faster." description="Each category has a dedicated page and product filters, so customers can browse the range without feeling lost." align="center" /></Reveal>
          <div className="mt-10"><CategoryTiles categories={categories} products={products} /></div>
        </div>
      </section>

      <section className="section-pad-tight">
        <div className="container-page">
          <div className="surface overflow-hidden rounded-[2.4rem] p-5 md:p-8">
            <div className="grid gap-8 lg:grid-cols-[.95fr_1.05fr] lg:items-center">
              <Reveal>
                <SectionHeader eyebrow="How ordering works" title="A simple store flow for early and growing EcoSuds sales." description="Customers can browse, add products and send one clean WhatsApp message. Stock, delivery and payment stay confirmed by a real person." />
                <div className="mt-6 grid gap-3">
                  {trust.map((item) => (
                    <div key={item} className="flex gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--sage-strong)]" />
                      <span className="text-sm font-bold leading-6 text-[color:var(--muted)]">{item}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="grid grid-cols-2 gap-4">
                  {["/images/ecosuds/soap-turmeric.webp", "/images/ecosuds/soap-tomato-fruit.webp", "/images/ecosuds/soap-lemon-aloe.webp", "/images/ecosuds/soap-range-shelf.webp"].map((src) => (
                    <div key={src} className="image-frame rounded-[1.8rem]"><div className="relative aspect-square"><Image src={src} alt="EcoSuds product" fill sizes="(min-width: 1024px) 20vw, 44vw" className="object-cover" /></div></div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad-tight">
        <div className="container-page">
          <Reveal><SectionHeader eyebrow="Trust cues" title="Built around clarity, mobile shopping and careful product language." description="The customer sees what matters: product type, price, category, stock label and direct support." align="center" /></Reveal>
          <div className="mt-10"><FeatureBento features={storefront.trustCues} /></div>
        </div>
      </section>

      <section className="section-pad-tight">
        <div className="container-page">
          <Reveal><SectionHeader eyebrow="Order flow" title="Four steps from browsing to confirmation." description="The cart stays simple and local; the final order happens through WhatsApp for human confirmation." align="center" /></Reveal>
          <div className="mt-10"><StepFlow steps={storefront.orderSteps} /></div>
        </div>
      </section>

      <section id="products" className="section-pad">
        <div className="container-page">
          <Reveal><SectionHeader eyebrow="Product catalog" title="Browse EcoSuds soaps, soaks, fizz and aroma products." description="Use filters to narrow the range, open product details, or add items directly to cart." align="center" /></Reveal>
          <div className="mt-10"><ProductGrid products={products} /></div>
        </div>
      </section>
    </>
  );
}
