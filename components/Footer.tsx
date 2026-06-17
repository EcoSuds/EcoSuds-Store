import Link from "next/link";
import type { NavigationData, SiteData } from "@/lib/types";
import { SocialLinks } from "./SocialLinks";

export function Footer({ site, navigation }: { site: SiteData; navigation: NavigationData }) {
  const policies = [
    { label: "Shipping", href: "/policies/shipping/" },
    { label: "Returns", href: "/policies/returns/" },
    { label: "Privacy", href: "/policies/privacy/" },
    { label: "Terms", href: "/policies/terms/" }
  ];

  return (
    <footer className="container-page pb-8 pt-8 md:pt-12">
      <div className="surface overflow-hidden rounded-[2rem] p-5 md:rounded-[2.6rem] md:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_.85fr_.7fr]">
          <div>
            <Link href="/" className="focus-ring inline-flex items-center gap-3 rounded-full">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-[color:var(--cream)] text-sm font-black text-[color:var(--sage-strong)] ring-1 ring-[color:var(--border)]">{site.brand.initials}</span>
              <span>
                <span className="block text-lg font-black tracking-[-0.03em]">{site.brand.name}</span>
                <span className="mt-1 block text-sm font-semibold text-[color:var(--muted)]">{site.brand.roleLine}</span>
              </span>
            </Link>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[color:var(--muted)]">
              Organic, mobile-first store for EcoSuds organic soaps, bath salts, bath bombs, aroma stones and shower steamers. Orders are reviewed on WhatsApp before payment or dispatch.
            </p>
            <div className="mt-5">
              <SocialLinks site={site} compact />
            </div>
          </div>

          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.18em] text-[color:var(--soft)]">Shop</h2>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {navigation.main.map((item) => (
                <Link key={item.href} href={item.href} className="focus-ring rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-elevated)] px-4 py-3 text-sm font-bold text-[color:var(--muted)] transition hover:border-[color:var(--sage)] hover:text-[color:var(--text)]">
                  {item.label}
                </Link>
              ))}
              {policies.map((policy) => (
                <Link key={policy.href} href={policy.href} className="focus-ring rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-elevated)] px-4 py-3 text-sm font-bold text-[color:var(--muted)] transition hover:border-[color:var(--sage)] hover:text-[color:var(--text)]">
                  {policy.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.18em] text-[color:var(--soft)]">Contact</h2>
            <div className="mt-4 space-y-3 text-sm text-[color:var(--muted)]">
              <p><span className="font-black text-[color:var(--text)]">Email:</span> {site.brand.email}</p>
              <p><span className="font-black text-[color:var(--text)]">Phone:</span> {site.brand.phone}</p>
              <p><span className="font-black text-[color:var(--text)]">Location:</span> {site.brand.location}</p>
            </div>
            <a href={site.brand.whatsapp} target="_blank" rel="noreferrer" className="btn btn-primary mt-5 w-full">Order on WhatsApp</a>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-[color:var(--border)] pt-5 text-sm font-semibold text-[color:var(--soft)] md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {site.brand.name}. All rights reserved.</p>
          </div>
      </div>
    </footer>
  );
}
