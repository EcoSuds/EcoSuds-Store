"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/classes";
import { ProductCard } from "./ProductCard";

type FilterOption = {
  name: string;
  slug: string;
};

type ProductGridProps = {
  products: Product[];
  initialCategory?: string;
  showFilters?: boolean;
};

const categoryOrder = [
  "organic-soaps",
  "bath-salts",
  "bath-bombs",
  "aroma-stones",
  "shower-steamers"
];

function getCategoryRank(slug: string): number {
  const rank = categoryOrder.indexOf(slug);
  return rank === -1 ? 999 : rank;
}

function buildFilters(products: Product[]): FilterOption[] {
  const categoryMap = new Map<string, string>();

  products.forEach((product) => {
    categoryMap.set(product.categorySlug, product.category);
  });

  const categories = Array.from(categoryMap, ([slug, name]) => ({ slug, name })).sort((a, b) => {
    return getCategoryRank(a.slug) - getCategoryRank(b.slug) || a.name.localeCompare(b.name);
  });

  return [{ name: "All", slug: "all" }, ...categories];
}

export function ProductGrid({ products, initialCategory = "all", showFilters = true }: ProductGridProps) {
  const filters = useMemo(() => buildFilters(products), [products]);
  const validInitialCategory = filters.some((item) => item.slug === initialCategory) ? initialCategory : "all";
  const [category, setCategory] = useState(validInitialCategory);

  const visibleProducts = category === "all"
    ? products
    : products.filter((product) => product.categorySlug === category);

  return (
    <div>
      {showFilters ? (
        <div
          className="marquee-mask -mx-2 flex gap-2 overflow-x-auto px-2 pb-4 no-scrollbar"
          role="tablist"
          aria-label="Product categories"
        >
          {filters.map((filter) => {
            const active = category === filter.slug;

            return (
              <button
                key={filter.slug}
                type="button"
                onClick={() => setCategory(filter.slug)}
                className={cn(
                  "focus-ring touch-manipulation whitespace-nowrap rounded-full border px-4 py-2 text-sm font-black transition",
                  active
                    ? "border-transparent bg-[#203321] text-white shadow-sm dark:bg-[#f4ead3] dark:text-[#172018]"
                    : "border-[color:var(--border)] bg-[color:var(--bg-elevated)] text-[color:var(--muted)] hover:text-[color:var(--text)]"
                )}
                role="tab"
                aria-selected={active}
              >
                {filter.name}
              </button>
            );
          })}
        </div>
      ) : null}

      {visibleProducts.length ? (
        <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div className="surface rounded-[2rem] p-8 text-center">
          <p className="font-bold text-[color:var(--muted)]">No products are listed in this category yet.</p>
        </div>
      )}
    </div>
  );
}
