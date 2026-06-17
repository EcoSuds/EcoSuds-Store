"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { NavigationData, SiteData } from "@/lib/types";
import { ThemeToggle } from "./ThemeToggle";
import { useCart } from "./StoreCart";

const iconButtonClasses =
  "focus-ring relative inline-flex h-10 w-10 shrink-0 touch-manipulation select-none items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--bg-elevated)] text-[color:var(--text)] shadow-sm transition hover:-translate-y-0.5 hover:border-[color:var(--sage)] active:translate-y-px";

export function Navbar({
  site,
  navigation,
  announcement = []
}: {
  site: SiteData;
  navigation: NavigationData;
  announcement?: string[];
}) {
  const [open, setOpen] = useState(false);
  const { count, openCart } = useCart();
  const announcementText = useMemo(() => announcement.filter(Boolean).join("  •  "), [announcement]);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  useEffect(() => {
    function closeOnResize() {
      if (window.innerWidth >= 1024) setOpen(false);
    }

    window.addEventListener("resize", closeOnResize);
    return () => window.removeEventListener("resize", closeOnResize);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-[110] pt-[calc(env(safe-area-inset-top)+0.55rem)]">
      {announcementText ? (
        <div className="container-page mb-2 hidden overflow-hidden rounded-full border border-[color:var(--border)] bg-[color:var(--bg-strong)]/82 px-4 py-2 text-center text-[0.72rem] font-black uppercase tracking-[0.14em] text-[color:var(--sage-strong)] shadow-soft backdrop-blur-2xl sm:block">
          <span className="block truncate">{announcementText}</span>
        </div>
      ) : null}

      <nav className="container-page surface relative z-20 flex h-[3.45rem] items-center justify-between gap-2 overflow-hidden rounded-full px-2.5 shadow-soft md:h-[3.85rem] md:px-4" aria-label="Main navigation">
        <Link href="/" className="focus-ring flex min-w-0 flex-1 items-center gap-2 overflow-hidden rounded-full pr-1 sm:pr-2" onClick={() => setOpen(false)}>
          <span className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[color:var(--cream)] text-sm font-black text-[color:var(--sage-strong)] ring-1 ring-[color:var(--border)]">
            {site.brand.logo ? <Image src={site.brand.logo} alt="" fill sizes="40px" className="object-cover" /> : site.brand.initials}
          </span>
          <span className="min-w-0 flex-1 leading-none">
            <span className="block max-w-[9.5rem] truncate text-sm font-black tracking-[-0.02em] text-[color:var(--text)] sm:max-w-none sm:text-base">{site.brand.name}</span>
            <span className="mt-1 hidden truncate text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[color:var(--soft)] sm:block">{site.brand.tagline}</span>
          </span>
        </Link>

        <div className="hidden shrink-0 items-center gap-1 lg:flex">
          {navigation.main.map((item) => (
            <Link key={item.href} href={item.href} className="focus-ring rounded-full px-3 py-2 text-sm font-bold text-[color:var(--muted)] transition hover:bg-[color:var(--mint)] hover:text-[color:var(--text)]">
              {item.label}
            </Link>
          ))}
        </div>

        <div className="relative z-30 flex shrink-0 items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={openCart}
            className={iconButtonClasses}
            aria-label="Open cart"
          >
            <ShoppingBag className="h-4 w-4" />
            {count > 0 ? <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[color:var(--sage-strong)] px-1 text-[0.65rem] font-black text-[color:var(--bg)]">{count}</span> : null}
          </button>
          <ThemeToggle />
<Link
  href={navigation.cta.href}
  className="focus-ring hidden shrink-0 touch-manipulation select-none rounded-full border border-[color:var(--border)] bg-[color:var(--sage-strong)/50] px-4 py-3 text-sm font-black text-[color:var(--text)] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[color:var(--sage)] active:translate-y-px dark:text-[#f4ead3] md:inline-flex"
  onClick={() => setOpen(false)}
>            {navigation.cta.label}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className={`${iconButtonClasses} lg:hidden`}
            aria-label="Toggle menu"
            aria-controls="mobile-menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div id="mobile-menu" className="container-page relative z-20 mt-3 max-h-[calc(100svh-var(--nav-h)-1rem)] overflow-y-auto rounded-[1.7rem] border border-[color:var(--border)] bg-[color:var(--bg-strong)] p-3 shadow-lift lg:hidden">
          <div className="grid gap-1">
            {navigation.main.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="focus-ring touch-manipulation rounded-2xl px-4 py-3 text-base font-black text-[color:var(--text)] transition hover:bg-[color:var(--mint)]">
                {item.label}
              </Link>
            ))}
            <Link href={navigation.cta.href} onClick={() => setOpen(false)} className="focus-ring mt-2 touch-manipulation rounded-2xl bg-[#203321] px-4 py-3 text-center text-base font-black text-white dark:bg-[#f4ead3] dark:text-[#172018]">
              {navigation.cta.label}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}