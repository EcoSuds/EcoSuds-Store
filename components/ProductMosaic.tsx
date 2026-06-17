import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type MosaicItem = {
  title: string;
  description: string;
  image: string;
  href: string;
  badge?: string;
};

export function ProductMosaic({ items }: { items: MosaicItem[] }) {
  const selected = items.slice(0, 5);
  if (!selected.length) return null;

  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
      {selected[0] ? (
        <Link href={selected[0].href} className="surface card-hover group overflow-hidden rounded-[2.4rem] p-3 focus-ring">
          <div className="image-frame rounded-[1.9rem]">
            <div className="relative aspect-[4/5] min-h-[22rem] md:aspect-[16/11] lg:aspect-[4/5]">
              <Image src={selected[0].image} alt={selected[0].title} fill sizes="(min-width: 1024px) 50vw, 92vw" className="object-cover transition duration-500 group-hover:scale-[1.035]" />
              <div className="absolute inset-x-4 bottom-4 rounded-[1.4rem] border border-white/45 bg-white/78 p-4 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-black/35">
                {selected[0].badge ? <p className="text-xs font-black uppercase tracking-[0.16em] text-[color:var(--sage-strong)]">{selected[0].badge}</p> : null}
                <h3 className="mt-1 font-display text-3xl font-black tracking-[-0.045em] text-[color:var(--text)]">{selected[0].title}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-[color:var(--muted)]">{selected[0].description}</p>
              </div>
            </div>
          </div>
        </Link>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2">
        {selected.slice(1).map((item) => (
          <Link key={item.href} href={item.href} className="surface card-hover group overflow-hidden rounded-[2rem] p-3 focus-ring">
            <div className="image-frame rounded-[1.45rem]">
              <div className="relative aspect-[4/3]">
                <Image src={item.image} alt={item.title} fill sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 92vw" className="object-cover transition duration-500 group-hover:scale-[1.035]" />
              </div>
            </div>
            <div className="p-3">
              {item.badge ? <span className="pill">{item.badge}</span> : null}
              <h3 className="mt-3 text-lg font-black tracking-[-0.03em] text-[color:var(--text)]">{item.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm font-semibold leading-6 text-[color:var(--muted)]">{item.description}</p>
              <span className="mt-3 inline-flex items-center gap-2 text-sm font-black text-[color:var(--sage-strong)]">Shop <ArrowUpRight className="h-4 w-4" /></span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
