import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BadgeCheck } from "lucide-react";
import { CategoryTiles } from "@/components/CategoryTiles";
import { JsonLd } from "@/components/JsonLd";
import { ProductGrid } from "@/components/ProductGrid";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { getCategories, getCategory, getProducts, getProductsByCategory, siteUrl } from "@/lib/content";
import { makeMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getCategories().map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return makeMetadata({ title: "Category not found", description: "EcoSuds store category", path: "/store/" });
  return makeMetadata({
    title: `${category.name} | EcoSuds Store`,
    description: `${category.description} Shop EcoSuds ${category.name.toLowerCase()} with WhatsApp order confirmation.`,
    path: `/store/category/${category.slug}/`,
    image: category.image
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const products = getProductsByCategory(category.slug);
  const allProducts = getProducts();
  const otherCategories = getCategories().filter((item) => item.slug !== category.slug);
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${category.name} by EcoSuds`,
    url: siteUrl(category.href),
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: siteUrl(`/store/${product.slug}/`),
      name: product.name
    }))
  };

  return (
    <>
      <JsonLd data={itemListJsonLd} />
      <section className="pt-[calc(var(--nav-h)+1rem)] md:pt-[calc(var(--nav-h)+1.4rem)]">
        <div className="container-page">
          <Link href="/store/#products" className="focus-ring pill mb-6"><ArrowLeft className="h-4 w-4" /> Back to store</Link>
          <div className="relative isolate overflow-hidden rounded-[2.4rem] border border-[color:var(--border)] shadow-lift md:rounded-[3rem]">
            <div className="relative min-h-[min(70svh,40rem)]">
              <Image src={category.image} alt={category.name} fill priority sizes="100vw" className="hero-banner-image object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,30,19,0.05)_0%,rgba(20,30,19,0.16)_35%,rgba(20,30,19,0.62)_100%)]" aria-hidden="true" />
              <div className="relative z-10 flex min-h-[inherit] items-end p-4 sm:p-6 lg:p-8">
                <div className="max-w-3xl rounded-[2rem] border border-white/40 bg-[color:var(--bg-strong)]/84 p-5 shadow-lift backdrop-blur-2xl dark:border-white/10 dark:bg-[color:var(--bg-strong)]/78 sm:p-7 lg:p-9">
                  <span className="eyebrow"><BadgeCheck className="h-3.5 w-3.5" /> EcoSuds category</span>
                  <h1 className="h1 mt-5 font-display text-[color:var(--text)]">{category.name}</h1>
                  <p className="lead mt-5">{category.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className="pill">{products.length} products</span>
                    <span className="pill">WhatsApp confirmation</span>
                    <span className="pill">PKR pricing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="content" className="section-pad">
        <div className="container-page">
          <Reveal><SectionHeader eyebrow="Category products" title={`Shop ${category.name}`} description="Open product details for the full description or add items directly to the cart." align="center" /></Reveal>
          <div className="mt-10"><ProductGrid products={products} showFilters={false} /></div>
        </div>
      </section>

      <section className="section-pad-tight">
        <div className="container-page">
          <Reveal><SectionHeader eyebrow="More categories" title="Explore the rest of the EcoSuds range." description="Move between the five main self-care categories without returning to the home page." /></Reveal>
          <div className="mt-10"><CategoryTiles categories={otherCategories} products={allProducts} /></div>
        </div>
      </section>
    </>
  );
}
