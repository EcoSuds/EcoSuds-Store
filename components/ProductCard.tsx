import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { AddToCartButton } from "./StoreCart";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const productHref = `/store/${product.slug}/`;

  return (
    <article className="surface card-hover flex h-full flex-col overflow-hidden rounded-[2rem] p-3">
      <Link href={productHref} className="image-frame product-media block rounded-[1.55rem] focus-ring">
        <div className="relative aspect-square">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            className="object-contain"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-3">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <span className="pill">{product.category}</span>
          <span className="text-sm font-black text-[color:var(--sage-strong)]">
            {formatPrice(product.price, product.currency)}
          </span>
        </div>

        <div className="mb-3">
          <span className="pill">{product.badge}</span>
        </div>

        <h3 className="h3 line-clamp-2 font-display text-[color:var(--text)]">
          {product.name}
        </h3>
        <p className="body-text mt-3 line-clamp-3 flex-1">{product.shortDescription}</p>

        <div className="mt-5 grid gap-2 sm:grid-cols-[1fr_auto]">
          <AddToCartButton product={product} />
          <Link href={productHref} className="btn btn-secondary px-4" aria-label={`View ${product.name}`}>
            <Eye className="h-4 w-4" />
            <span className="hidden lg:inline">View</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
