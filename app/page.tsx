import { ButtonLink } from "@/components/ButtonLink";
import { CategoryTiles } from "@/components/CategoryTiles";
import { FeatureBento } from "@/components/FeatureBento";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { getCategories, getFaqs, getPage, getProducts, getSiteData, getStorefront, getTestimonials } from "@/lib/content";
import { makeMetadata } from "@/lib/seo";

const page = getPage("home");
const site = getSiteData();

export const metadata = makeMetadata({ title: page.seoTitle, description: page.seoDescription, path: "/", image: page.hero.image });

type Intro = { eyebrow: string; title: string; description: string };

export default function HomePage() {
  const categories = getCategories();
  const products = getProducts();
  const storefront = getStorefront();
  const testimonials = getTestimonials();
  const faqs = getFaqs().slice(0, 4);
  const intro = page.intro as Intro;
  const featuredIntro = page.featuredIntro as Intro;
  const featured = products.filter((product) => product.featured).slice(0, 8);

  return (
    <>
      <Hero
        hero={page.hero}
        site={site}
        badges={storefront.heroBadges}
      />

      <section id="content" className="section-pad-tight">
        <div className="container-page">
          <Reveal><SectionHeader eyebrow={intro.eyebrow} title={intro.title} description={intro.description} align="center" /></Reveal>
          <div id="categories" className="mt-10"><CategoryTiles categories={categories} products={products} /></div>
        </div>
      </section>

      <section className="section-pad-tight">
        <div className="container-page">
          <Reveal><SectionHeader eyebrow="Why shop here" title="Clear trust cues for a small store that still feels polished." description="The storefront keeps customers oriented with category navigation, mobile quick actions, product details, and a real-person checkout path." align="center" /></Reveal>
          <div className="mt-10"><FeatureBento features={storefront.trustCues} /></div>
        </div>
      </section>

      <section className="section-pad-tight">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <Reveal><SectionHeader eyebrow={featuredIntro.eyebrow} title={featuredIntro.title} description={featuredIntro.description} /></Reveal>
            <ButtonLink href="/store/#products" variant="secondary" className="w-full sm:w-auto">View full catalog</ButtonLink>
          </div>
          <div className="mt-10"><ProductGrid products={featured} showFilters={false} /></div>
        </div>
      </section>

     <section className="section-pad">
  <div className="container-page">
    <Reveal>
      <p className="eyebrow mb-6 text-xs font-black uppercase tracking-widest text-[color:var(--muted)]">
        Customer reviews
      </p>
    </Reveal>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {testimonials.map((item, index) => (
        <Reveal key={item.name} delay={index * 0.04}>
          <article className="surface h-full rounded-[2rem] p-6">
            <div className="text-xl text-[color:var(--gold)]">{"★".repeat(item.rating)}</div>
            <p className="mt-4 text-base font-semibold leading-7 text-[color:var(--text)]">"{item.quote}"</p>
            <p className="mt-5 text-sm font-black text-[color:var(--sage-strong)]">{item.name}</p>
            <p className="text-sm font-bold text-[color:var(--muted)]">{item.role}</p>
          </article>
        </Reveal>
      ))}
      {faqs.map((faq, index) => (
        <Reveal key={faq.question} delay={(index + testimonials.length) * 0.04}>
          <article className="surface h-full rounded-[2rem] p-6">
            <h3 className="text-lg font-black tracking-[-0.03em]">{faq.question}</h3>
            <p className="body-text mt-3">{faq.answer}</p>
          </article>
        </Reveal>
      ))}
    </div>
  </div>
</section>
    </>
  );
}
