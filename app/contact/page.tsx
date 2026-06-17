import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { SocialLinks } from "@/components/SocialLinks";
import { getFaqs, getPage, getProducts, getSiteData, getStorefront } from "@/lib/content";
import { makeMetadata } from "@/lib/seo";

const page = getPage("contact");
const site = getSiteData();

export const metadata = makeMetadata({ title: page.seoTitle, description: page.seoDescription, path: "/contact/", image: page.hero.image });

type ContactCard = { label: string; value: string; href: string };

export default function ContactPage() {
  const cards = page.contactCards as ContactCard[];
  const faqs = getFaqs();
  const products = getProducts();
  const storefront = getStorefront();
  const icons = [MessageCircle, Mail, MapPin, Phone];
  const suggestedMessage = encodeURIComponent("Hello EcoSuds, I want to ask about product availability, delivery charges and payment method. My city is:");

  return (
    <>
      <Hero
        hero={page.hero}
        site={site}
        compactImage
        badges={storefront.heroBadges}
        stats={[
          { value: "WhatsApp", label: "fastest route for order confirmation" },
          { value: `${products.length}`, label: "products available in the catalog" },
          { value: "PK", label: "delivery details confirmed by city" }
        ]}
      />
      <section id="content" className="section-pad-tight">
        <div className="container-page grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <SectionHeader eyebrow="Contact options" title="Choose the fastest route for your order." description="Use WhatsApp for availability, delivery charges, payment method, bulk orders, gift boxes and product questions." />
              <div className="mt-6"><SocialLinks site={site} /></div>
            </div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {cards.map((card, index) => {
              const Icon = icons[index] || Phone;
              return (
                <Reveal key={card.label} delay={index * 0.05}>
                  <a href={card.href} target={card.href.startsWith("http") ? "_blank" : undefined} rel={card.href.startsWith("http") ? "noreferrer" : undefined} className="surface card-hover block h-full rounded-[2rem] p-6 focus-ring">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[color:var(--mint)] text-[color:var(--sage-strong)]"><Icon className="h-5 w-5" /></div>
                    <h3 className="mt-5 text-xl font-black tracking-[-0.03em]">{card.label}</h3>
                    <p className="mt-2 break-words text-sm font-bold leading-6 text-[color:var(--muted)]">{card.value}</p>
                  </a>
                </Reveal>
              );
            })}
            <Reveal delay={0.18}>
              <div className="surface rounded-[2rem] p-6 sm:col-span-2">
                <h3 className="font-display text-2xl font-black tracking-[-0.04em]">Suggested message format</h3>
                <p className="body-text mt-3">Mention the product names, quantity, delivery city and preferred payment method. EcoSuds will confirm stock and delivery charges before dispatch.</p>
                <a href={`${site.brand.whatsapp}?text=${suggestedMessage}`} target="_blank" rel="noreferrer" className="btn btn-primary mt-5 w-full sm:w-auto">Open WhatsApp</a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="section-pad">
        <div className="container-page">
          <Reveal><SectionHeader eyebrow="FAQ" title="Useful answers before you send a message." align="center" /></Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {faqs.map((faq, index) => (
              <Reveal key={faq.question} delay={index * 0.04}>
                <article className="surface rounded-[2rem] p-6">
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
