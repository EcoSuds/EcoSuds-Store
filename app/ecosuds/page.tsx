import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import { CategoryTiles } from "@/components/CategoryTiles";
import { FeatureBento } from "@/components/FeatureBento";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { ShowcaseCarousel } from "@/components/ShowcaseCarousel";
import { SocialLinks } from "@/components/SocialLinks";
import { StepFlow } from "@/components/StepFlow";
import { VideoFrame } from "@/components/VideoFrame";
import { getCategories, getPage, getProducts, getSiteData, getStorefront } from "@/lib/content";
import { makeMetadata } from "@/lib/seo";

const page = getPage("ecosuds");
const site = getSiteData();

export const metadata = makeMetadata({ title: page.seoTitle, description: page.seoDescription, path: "/ecosuds/", image: page.hero.image });

type BrandStory = { eyebrow: string; title: string; description: string };
type Benefit = { title: string; description: string };
type GalleryIntro = { eyebrow: string; title: string; description: string };

export default function EcoSudsPage() {
  const products = getProducts();
  const categories = getCategories();
  const storefront = getStorefront();
  const featured = products.filter((product) => product.featured).slice(0, 6);
  const story = page.brandStory as BrandStory;
  const benefits = page.benefits as Benefit[];
  const galleryIntro = page.galleryIntro as GalleryIntro;
  const gallery = [
    { title: "EcoSuds product range", description: "A wide collection visual for soaps, bundles and seasonal storytelling.", image: "/images/ecosuds/soap-range-wide.webp", badge: "Range" },
    { title: "Turmeric soap", description: "Warm golden product artwork used across store and detail pages.", image: "/images/ecosuds/soap-turmeric.webp", badge: "Organic soap" },
    { title: "Bath salts", description: "Spa-inspired category imagery that can be replaced later through the CMS.", image: categories.find((item) => item.slug === "bath-salts")?.image || "/images/ecosuds/soap-range-wide.webp", badge: "Bath ritual" },
    { title: "Bath bombs", description: "Organic fizz visuals for gifts and colorful self-care moments.", image: categories.find((item) => item.slug === "bath-bombs")?.image || "/images/ecosuds/soap-range-wide.webp", badge: "Fizz" },
    { title: "Aroma stones", description: "Decorative aroma product direction for desks, shelves and calm corners.", image: categories.find((item) => item.slug === "aroma-stones")?.image || "/images/ecosuds/soap-range-wide.webp", badge: "Aroma" },
    { title: "Shower steamers", description: "Fresh shower ritual visuals for customers without a bathtub.", image: categories.find((item) => item.slug === "shower-steamers")?.image || "/images/ecosuds/soap-range-wide.webp", badge: "Shower" }
  ];
  const bento = benefits.map((benefit, index) => ({
    ...benefit,
    icon: ["Store", "MonitorSmartphone", "MessageCircle", "Search"][index] || "Sparkles",
    accent: ["Range", "Mobile", "Support", "SEO"][index]
  }));

  return (
    <>
      <Hero
        hero={page.hero}
        site={site}
        badges={storefront.heroBadges}
        stats={[
          { value: `${categories.length}`, label: "self-care categories" },
          { value: `${products.length}`, label: "catalog products with detail pages" },
          { value: "CMS", label: "editable content for future updates" }
        ]}
      />

      <section id="content" className="section-pad-tight">
        <div className="container-page grid gap-8 lg:grid-cols-[.95fr_1.05fr] lg:items-center">
          <Reveal>
            <SectionHeader eyebrow={story.eyebrow} title={story.title} description={story.description} />
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href="/store/#products" className="w-full sm:w-auto">Shop collection</ButtonLink>
              <ButtonLink href={site.brand.whatsapp} variant="secondary" className="w-full sm:w-auto">Ask on WhatsApp</ButtonLink>
            </div>
            <div className="mt-6"><SocialLinks site={site} /></div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="image-frame rounded-[2rem]"><div className="relative aspect-[4/5]"><Image src="/images/ecosuds/soap-promotional-square.webp" alt="EcoSuds promotional product display" fill sizes="(min-width: 1024px) 32vw, 90vw" className="object-cover" /></div></div>
              <div className="grid gap-4">
                <div className="image-frame rounded-[2rem]"><div className="relative aspect-square"><Image src="/images/ecosuds/soap-range-shelf.webp" alt="EcoSuds soap shelf range" fill sizes="(min-width: 1024px) 22vw, 44vw" className="object-cover" /></div></div>
                <div className="image-frame rounded-[2rem]"><div className="relative aspect-square"><Image src="/images/ecosuds/soap-honey-olive.webp" alt="EcoSuds honey and olive soap" fill sizes="(min-width: 1024px) 22vw, 44vw" className="object-cover" /></div></div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad-tight">
        <div className="container-page">
          <Reveal><SectionHeader eyebrow="Brand strengths" title="A clean EcoSuds presentation with customer-friendly details." description="The brand page sells freshness, gifting and trust while keeping claims careful and product language concise." align="center" /></Reveal>
          <div className="mt-10"><FeatureBento features={bento} /></div>
        </div>
      </section>

      <section className="section-pad-tight">
        <div className="container-page">
          <Reveal><SectionHeader eyebrow="Shop the range" title="Five product families with room to grow." description="Each category is separately editable in the CMS and has its own SEO-friendly category page." align="center" /></Reveal>
          <div className="mt-10"><CategoryTiles categories={categories} products={products} /></div>
        </div>
      </section>

      <section className="section-pad-tight">
        <div className="container-page">
          <Reveal><SectionHeader eyebrow={galleryIntro.eyebrow} title={galleryIntro.title} description={galleryIntro.description} align="center" /></Reveal>
          <div className="mt-10"><ShowcaseCarousel slides={gallery} label="EcoSuds visual gallery" /></div>
        </div>
      </section>

      <section className="section-pad-tight">
        <div className="container-page">
          <Reveal><SectionHeader eyebrow="Care notes" title="Practical guidance without overstated product claims." description="Small care notes help customers use and store products better while avoiding unsupported medical wording." align="center" /></Reveal>
          <div className="mt-10"><StepFlow steps={storefront.careNotes} /></div>
        </div>
      </section>

      <section className="section-pad-tight">
        <div className="container-page grid gap-8 lg:grid-cols-[.82fr_1.18fr] lg:items-center">
          <Reveal>
            <SectionHeader eyebrow="Short-form product content" title="Video and product visuals give EcoSuds more movement." description="The soap clip remains lightweight and supports a social-first brand feel without making the page heavy." />
          </Reveal>
          <Reveal delay={0.1}>
            <VideoFrame src="/videos/turmeric-soap.mp4" poster="/images/ecosuds/soap-turmeric.webp" title="EcoSuds turmeric soap video" />
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <Reveal><SectionHeader eyebrow="Featured products" title="Clear product cards with direct order actions." description="Each card uses concise copy, price, category, image and direct add-to-cart behavior." /></Reveal>
            <ButtonLink href="/store/#products" variant="secondary" className="w-full sm:w-auto">Open full store</ButtonLink>
          </div>
          <div className="mt-10"><ProductGrid products={featured} showFilters={false} /></div>
        </div>
      </section>
    </>
  );
}
