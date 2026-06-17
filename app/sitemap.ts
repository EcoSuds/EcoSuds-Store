export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { getCategories, getPolicies, getProducts, siteUrl } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/ecosuds/", "/store/", "/contact/"];
  const categories = getCategories().map((category) => category.href);
  const products = getProducts().map((product) => `/store/${product.slug}/`);
  const policies = getPolicies().map((policy) => `/policies/${policy.slug}/`);
  return [...routes, ...categories, ...products, ...policies].map((route) => ({
    url: siteUrl(route),
    lastModified: new Date(),
    changeFrequency: route === "/" || route === "/store/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route.startsWith("/store/") ? 0.86 : 0.72
  }));
}
