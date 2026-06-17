import { Code2, Leaf, MonitorSmartphone, MousePointerClick, Search, Share2, Sparkles, Store, type LucideIcon } from "lucide-react";

const icons: Record<string, LucideIcon> = { Code2, Leaf, MonitorSmartphone, MousePointerClick, Search, Share2, Sparkles, Store };

export function IconCard({ icon, title, description }: { icon?: string; title: string; description: string }) {
  const Icon = icon ? icons[icon] || Sparkles : Sparkles;
  return (
    <article className="surface card-hover h-full rounded-[2rem] p-5">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[color:var(--mint)] text-[color:var(--sage-strong)] ring-1 ring-[color:var(--border)]">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-5 font-display text-2xl font-black tracking-[-0.035em]">{title}</h3>
      <p className="body-text mt-3">{description}</p>
    </article>
  );
}
