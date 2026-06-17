import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, MessageCircle } from "lucide-react";
import { AddToCartButton } from "@/components/StoreCart";
import { JsonLd } from "@/components/JsonLd";
import { ProductGrid } from "@/components/ProductGrid";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { getCategory, getProduct, getProducts, getSiteData, siteUrl } from "@/lib/content";
import { formatPrice } from "@/lib/format";
import { makeMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return makeMetadata({ title: "Product not found", description: "EcoSuds product page", path: "/store/" });
  return makeMetadata({
    title: `${product.name} | EcoSuds Store`,
    description: product.shortDescription,
    path: `/store/${product.slug}/`,
    image: product.image
  });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  const site = getSiteData();
  if (!product) notFound();

  const category = getCategory(product.categorySlug);
  const related = getProducts()
    .filter((item) => item.slug !== product.slug && item.categorySlug === product.categorySlug)
    .slice(0, 3);
  const fallbackRelated = related.length ? related : getProducts().filter((item) => item.slug !== product.slug).slice(0, 3);
  const message = encodeURIComponent(`Hello EcoSuds, I want to ask about ${product.name} (${formatPrice(product.price, product.currency)}). Please confirm availability and delivery.`);
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.sku,
    image: product.gallery.map((img) => siteUrl(img)),
    description: product.description,
    category: product.category,
    brand: { "@type": "Brand", name: "EcoSuds" },
    offers: {
      "@type": "Offer",
      priceCurrency: product.currency,
      price: product.price,
      availability: "https://schema.org/InStock",
      url: siteUrl(`/store/${product.slug}/`)
    }
  };

  return (
    <>
      <JsonLd data={productJsonLd} />
      <section className="pt-[calc(var(--nav-h)+1rem)] md:pt-[calc(var(--nav-h)+1.4rem)]">
        <div className="container-page">
          <Link href="/store/#products" className="focus-ring pill mb-6"><ArrowLeft className="h-4 w-4" /> Back to store</Link>
          <div className="grid gap-8 lg:grid-cols-[1.02fr_.98fr] lg:items-start">
            <Reveal>
              <div className="grid gap-4">
                <div className="image-frame product-media rounded-[2.4rem] p-2">
                  <div className="relative aspect-square overflow-hidden rounded-[1.9rem]">
                    <Image src={product.image} alt={product.name} fill priority sizes="(min-width: 1024px) 48vw, 92vw" className="object-contain" />
                  </div>
                </div>
                {product.gallery.length > 1 ? (
                  <div className="grid grid-cols-3 gap-3">
                    {product.gallery.map((img) => (
                      <div key={img} className="image-frame product-media rounded-[1.4rem]"><div className="relative aspect-square"><Image src={img} alt="" fill sizes="160px" className="object-contain" /></div></div>
                    ))}
                  </div>
                ) : null}
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="surface rounded-[2.4rem] p-5 md:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  {category ? <Link href={category.href} className="focus-ring pill">{product.category}</Link> : <span className="pill">{product.category}</span>}
                  <span className="pill">{product.stockLabel}</span>
                  <span className="pill">SKU {product.sku}</span>
                </div>
                <h1 className="h1 mt-5 font-display text-[color:var(--text)]">{product.name}</h1>
                <p className="mt-5 text-2xl font-black text-[color:var(--sage-strong)]">{formatPrice(product.price, product.currency)}</p>
                <p className="lead mt-5">{product.description}</p>
                <div className="mt-6 grid gap-3">
                  {product.details.map((item) => (
                    <div key={item} className="flex gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--sage-strong)]" />
                      <span className="text-sm font-bold leading-6 text-[color:var(--muted)]">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-7 grid gap-3 md:grid-cols-2">
                  <AddToCartButton product={product} />
                  <a href={`${site.brand.whatsapp}?text=${message}`} target="_blank" rel="noreferrer" className="btn btn-secondary"><MessageCircle className="h-4 w-4" /> WhatsApp inquiry</a>
                </div>
                <p className="mt-5 text-xs font-bold leading-6 text-[color:var(--soft)]">Availability, delivery charges and payment method are confirmed on WhatsApp before dispatch.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="section-pad">
        <div className="container-page">
          <Reveal><SectionHeader eyebrow="Related products" title={category ? `More from ${category.name}` : "More EcoSuds products"} description="Explore similar products or return to the full catalog for the complete range." /></Reveal>
          <div className="mt-10"><ProductGrid products={fallbackRelated} showFilters={false} /></div>
        </div>
      </section>
    </>
  );
}
