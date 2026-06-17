import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Category, Product } from "@/lib/types";

type CategoryTilesProps = {
  categories: Category[];
  products?: Product[];
};

function getProductCounts(products: Product[]): Record<string, number> {
  return products.reduce<Record<string, number>>((counts, product) => {
    counts[product.categorySlug] = (counts[product.categorySlug] || 0) + 1;
    return counts;
  }, {});
}

export function CategoryTiles({ categories, products = [] }: CategoryTilesProps) {
  const productCounts = getProductCounts(products);

  return (
    <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {categories.map((category) => {
        const count = productCounts[category.slug] || 0;
        const countLabel = count ? `${count} item${count === 1 ? "" : "s"}` : "Shop";

        return (
          <Link
            key={category.slug}
            href={category.href}
            className="surface card-hover group flex h-full flex-col overflow-hidden rounded-[2rem] p-3 focus-ring"
          >
            <div className="image-frame rounded-[1.45rem]">
              <div className="relative aspect-[4/5] lg:aspect-[3/4]">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(min-width: 1280px) 18vw, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.035]"
                />
                <div className="absolute left-3 top-3 rounded-full border border-white/45 bg-white/82 px-3 py-1.5 text-[0.68rem] font-black uppercase tracking-[0.12em] text-[#203321] shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-black/42 dark:text-[#f4ead3]">
                  {countLabel}
                </div>
              </div>
            </div>

            <div className="flex flex-1 flex-col p-3">
              <h3 className="font-display text-2xl font-black tracking-[-0.04em] text-[color:var(--text)]">
                {category.name}
              </h3>
              <p className="body-text mt-2 line-clamp-3 flex-1">{category.description}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[color:var(--sage-strong)]">
                View category <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
