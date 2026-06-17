import fs from "node:fs";
import path from "node:path";
import type { Category, FAQ, NavigationData, PageData, Policy, Product, SiteData, StorefrontData, Testimonial } from "./types";

const root = process.cwd();
const contentDir = path.join(root, "content");

function readJson<T>(relativePath: string): T {
  const filePath = path.join(contentDir, relativePath);
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw) as T;
}

function readCollection<T>(folder: string): T[] {
  const folderPath = path.join(contentDir, folder);
  if (!fs.existsSync(folderPath)) return [];
  return fs
    .readdirSync(folderPath)
    .filter((file) => file.endsWith(".json"))
    .sort()
    .map((file) => readJson<T>(path.join(folder, file)));
}

function parseFrontmatterMarkdown(filePath: string): Policy {
  const raw = fs.readFileSync(filePath, "utf8");
  const slug = path.basename(filePath, ".md");
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    return { slug, title: slug, seoTitle: slug, seoDescription: "", body: raw.trim() };
  }
  const frontmatter = match[1];
  const body = match[2].trim();
  const data: Record<string, string> = {};
  frontmatter.split("\n").forEach((line) => {
    const index = line.indexOf(":");
    if (index === -1) return;
    const key = line.slice(0, index).trim();
    const value = line.slice(index + 1).trim().replace(/^"|"$/g, "");
    data[key] = value;
  });
  return {
    slug,
    title: data.title ?? slug,
    seoTitle: data.seoTitle ?? data.title ?? slug,
    seoDescription: data.seoDescription ?? "",
    body
  };
}

export function getSiteData(): SiteData {
  return readJson<SiteData>("site.json");
}

export function getNavigation(): NavigationData {
  return readJson<NavigationData>("navigation.json");
}

export function getStorefront(): StorefrontData {
  return readJson<StorefrontData>("storefront.json");
}

export function getPage(slug: string): PageData {
  return readJson<PageData>(`pages/${slug}.json`);
}

export function getCategories(): Category[] {
  return readCollection<Category>("categories").sort((a, b) => {
    const orderA = a.order ?? 999;
    const orderB = b.order ?? 999;
    return orderA - orderB || Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name);
  });
}

export function getCategory(slug: string): Category | undefined {
  return getCategories().find((category) => category.slug === slug);
}

export function getProducts(): Product[] {
  return readCollection<Product>("products").sort((a, b) => Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name));
}

export function getProduct(slug: string): Product | undefined {
  return getProducts().find((product) => product.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return getProducts().filter((product) => product.categorySlug === categorySlug);
}

export function getTestimonials(): Testimonial[] {
  return readCollection<Testimonial>("testimonials");
}

export function getFaqs(): FAQ[] {
  return readCollection<FAQ>("faqs");
}

export function getPolicies(): Policy[] {
  const folderPath = path.join(contentDir, "policies");
  if (!fs.existsSync(folderPath)) return [];
  return fs
    .readdirSync(folderPath)
    .filter((file) => file.endsWith(".md"))
    .sort()
    .map((file) => parseFrontmatterMarkdown(path.join(folderPath, file)));
}

export function getPolicy(slug: string): Policy | undefined {
  return getPolicies().find((policy) => policy.slug === slug);
}

export function siteUrl(pathname = ""): string {
  if (/^https?:\/\//i.test(pathname)) return pathname;
  const site = getSiteData();
  const base = process.env.NEXT_PUBLIC_SITE_URL || site.siteUrl;
  const normalizedBase = base.replace(/\/$/, "");
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${normalizedBase}${normalizedPath}`;
}
