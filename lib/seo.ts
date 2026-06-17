import type { Metadata } from "next";
import { getSiteData, siteUrl } from "./content";

function absoluteImageUrl(image?: string) {
  const site = getSiteData();
  const source = image || site.seo.ogImage;
  return source.startsWith("http") ? source : siteUrl(source);
}

export function makeMetadata({
  title,
  description,
  path = "/",
  image
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}): Metadata {
  const site = getSiteData();
  const url = siteUrl(path);
  const imageUrl = absoluteImageUrl(image);

  return {
    title,
    description,
    keywords: site.keywords,
    metadataBase: new URL((process.env.NEXT_PUBLIC_SITE_URL || site.siteUrl).replace(/\/$/, "")),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: site.siteName,
      title,
      description,
      url,
      images: [{ url: imageUrl, width: 1200, height: 760, alt: title }]
    },
    manifest: "/site.webmanifest",
    icons: { icon: "/icon.svg" },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl]
    }
  };
}

export function organizationJsonLd() {
  const site = getSiteData();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.siteName,
    url: siteUrl("/"),
    logo: siteUrl(site.brand.logo),
    sameAs: [site.brand.facebook, site.brand.instagram, site.brand.youtube, site.brand.whatsapp].filter(Boolean),
    contactPoint: {
      "@type": "ContactPoint",
      email: site.brand.email,
      telephone: site.brand.phone,
      contactType: "customer support",
      areaServed: "PK",
      availableLanguage: ["English", "Urdu"]
    }
  };
}

export function storeJsonLd() {
  const site = getSiteData();
  return {
    "@context": "https://schema.org",
    "@type": "Store",
    name: site.siteName,
    url: siteUrl("/"),
    image: siteUrl(site.seo.ogImage),
    logo: siteUrl(site.brand.logo),
    description: site.defaultDescription,
    email: site.brand.email,
    telephone: site.brand.phone,
    priceRange: "PKR 450-2200",
    paymentAccepted: "Confirmed on WhatsApp",
    areaServed: {
      "@type": "Country",
      name: "Pakistan"
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.brand.location,
      addressCountry: "PK"
    },
    sameAs: [site.brand.facebook, site.brand.instagram, site.brand.youtube, site.brand.whatsapp].filter(Boolean)
  };
}
