import Image from "next/image";
import { ArrowDown, BadgeCheck, Sparkles } from "lucide-react";
import type { HeroContent, SiteData } from "@/lib/types";
import { cn } from "@/lib/classes";
import { ButtonLink } from "./ButtonLink";
import { Reveal } from "./Reveal";

type HeroStat = {
  value: string;
  label: string;
};

type HeroProps = {
  hero: HeroContent;
  site: SiteData;
  stats?: HeroStat[];
  badges?: string[];
  compactImage?: boolean;
};

const badgeClasses =
  "inline-flex items-center gap-2 rounded-full border border-white/55 bg-white/82 px-3 py-2 text-[0.68rem] font-black uppercase tracking-[0.14em] text-[#203321] shadow-soft backdrop-blur-xl dark:border-white/15 dark:bg-black/42 dark:text-[#f4ead3]";

function HeroBadges({ badges, fallback }: { badges: string[]; fallback: string }) {
  const visibleBadges = badges.length ? badges : [fallback];

  return (
    <div className="absolute inset-x-0 top-0 z-20 flex flex-wrap gap-2 p-4 sm:p-5">
      {visibleBadges.map((badge) => (
        <span key={badge} className={badgeClasses}>
          <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
          {badge}
        </span>
      ))}
    </div>
  );
}

function HeroStats({ stats }: { stats: HeroStat[] }) {
  if (!stats.length) return null;

  return (
    <dl className="mt-6 grid gap-3 sm:grid-cols-3">
      {stats.slice(0, 3).map((stat) => (
        <div
          key={`${stat.value}-${stat.label}`}
          className="rounded-[1.25rem] border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-3"
        >
          <dt className="text-2xl font-black tracking-[-0.04em] text-[color:var(--sage-strong)]">
            {stat.value}
          </dt>
          <dd className="mt-1 text-xs font-bold leading-5 text-[color:var(--muted)]">
            {stat.label}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function Hero({ hero, site, stats = [], badges = [], compactImage = false }: HeroProps) {
  const safeBadges = badges.filter(Boolean).slice(0, 4);
  const bannerSizing = compactImage
  ? "min-h-[18rem] sm:min-h-[24rem] md:min-h-0 md:aspect-[16/10] lg:aspect-[16/9]"
  : "min-h-[22rem] sm:min-h-[30rem] md:min-h-0 md:aspect-[16/10] lg:aspect-[16/9]";
  return (
    <section className="page-gradient overflow-hidden pt-[calc(var(--nav-h)+1rem)] md:pt-[calc(var(--nav-h)+1.4rem)]">
      <div className="container-page">
        <Reveal>
          <div className="hero-banner relative isolate overflow-hidden rounded-[2.2rem] border border-[color:var(--border)] bg-[color:var(--bg-strong)] shadow-lift md:rounded-[3rem]">
            <div className={cn("relative", bannerSizing)}>
              <Image
                src={hero.image}
                alt=""
                fill
                priority
                sizes="(min-width: 1184px) 1184px, 100vw"
                className="hero-banner-image object-cover"
              />
              
            </div>
          </div>
        </Reveal>
      </div>

      <div className="container-page flex justify-center py-8">
        <a
          href="#content"
          className="focus-ring grid h-11 w-11 place-items-center rounded-full border border-[color:var(--border)] bg-[color:var(--bg-elevated)] text-[color:var(--muted)] shadow-sm transition hover:-translate-y-0.5 hover:border-[color:var(--sage)] hover:text-[color:var(--text)]"
          aria-label="Scroll to content"
        >
          <ArrowDown className="h-5 w-5" />
        </a>
      </div>
    </section>
  );
}