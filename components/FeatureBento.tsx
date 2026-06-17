import {
  Code2,
  Leaf,
  MessageCircle,
  MonitorSmartphone,
  Palette,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  type LucideIcon
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Leaf,
  MessageCircle,
  MonitorSmartphone,
  Palette,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store
};

export type BentoFeature = {
  title: string;
  description: string;
  icon?: string;
  accent?: string;
};

type FeatureBentoProps = {
  features: BentoFeature[];
};

function getIcon(icon?: string): LucideIcon {
  return icon ? iconMap[icon] || Sparkles : Sparkles;
}

export function FeatureBento({ features }: FeatureBentoProps) {
  return (
    <div className="grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-4">
      {features.map((feature) => {
        const Icon = getIcon(feature.icon);

        return (
          <article key={feature.title} className="surface card-hover h-full rounded-[2rem] p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[color:var(--mint)] text-[color:var(--sage-strong)] ring-1 ring-[color:var(--border)]">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              {feature.accent ? <span className="pill">{feature.accent}</span> : null}
            </div>
            <h3 className="mt-5 font-display text-2xl font-black tracking-[-0.04em] text-[color:var(--text)]">
              {feature.title}
            </h3>
            <p className="body-text mt-3">{feature.description}</p>
          </article>
        );
      })}
    </div>
  );
}
