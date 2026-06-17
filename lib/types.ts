export type ButtonLink = {
  label: string;
  href: string;
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  lead: string;
  primaryCta: ButtonLink;
  secondaryCta?: ButtonLink;
  image: string;
};

export type SiteData = {
  siteName: string;
  siteUrl: string;
  defaultTitle: string;
  defaultDescription: string;
  keywords: string[];
  brand: {
    name: string;
    initials: string;
    tagline: string;
    roleLine: string;
    email: string;
    phone: string;
    location: string;
    whatsapp: string;
    instagram: string;
    facebook: string;
    youtube?: string;
    github?: string;
    profileImage: string;
    logo: string;
  };
  seo: {
    ogImage: string;
    twitterHandle?: string;
    themeColorLight: string;
    themeColorDark: string;
  };
  business: Record<string, string>;
};

export type NavigationData = {
  main: ButtonLink[];
  cta: ButtonLink;
};

export type PageData = {
  title: string;
  slug: string;
  seoTitle: string;
  seoDescription: string;
  hero: HeroContent;
  [key: string]: unknown;
};

export type Category = {
  name: string;
  slug: string;
  description: string;
  image: string;
  href: string;
  featured: boolean;
  order?: number;
};

export type StorefrontData = {
  announcement: string[];
  heroBadges: string[];
  trustCues: { title: string; description: string; icon: string }[];
  orderSteps: { title: string; description: string }[];
  careNotes: { title: string; description: string }[];
};

export type Product = {
  name: string;
  slug: string;
  sku: string;
  price: number;
  currency: string;
  category: string;
  categorySlug: string;
  badge: string;
  featured: boolean;
  shortDescription: string;
  description: string;
  image: string;
  gallery: string[];
  details: string[];
  stockLabel: string;
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  rating: number;
};

export type FAQ = {
  question: string;
  answer: string;
};

export type Policy = {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  body: string;
};
