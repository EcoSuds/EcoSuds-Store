"use client";

import Link from "next/link";
import { Home, MessageCircle, ShoppingBag, Sparkles, Store } from "lucide-react";
import { usePathname } from "next/navigation";
import type { SiteData } from "@/lib/types";
import { useCart } from "./StoreCart";

function dockLinkClasses(isActive: boolean) {
  return `mobile-dock-link focus-ring touch-manipulation ${isActive ? "mobile-dock-link-active" : ""}`;
}

export function MobileDock({ site }: { site: SiteData }) {
  const { count, openCart, isOpen } = useCart();
  const pathname = usePathname() ?? "/";
  const isHome = pathname === "/";
  const isAbout = pathname.startsWith("/ecosuds");
  const isStore = pathname.startsWith("/store");

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] md:hidden">
      <nav className="mx-auto grid max-w-md grid-cols-5 gap-1 rounded-[1.6rem] border border-[color:var(--border)] bg-[color:var(--bg-strong)]/94 p-2 shadow-lift backdrop-blur-2xl" aria-label="Mobile quick actions">
        <Link href="/" className={dockLinkClasses(isHome)} aria-current={isHome ? "page" : undefined}><Home className="h-4 w-4" /><span>Home</span></Link>
        <Link href="/ecosuds/" className={dockLinkClasses(isAbout)} aria-current={isAbout ? "page" : undefined}><Sparkles className="h-4 w-4" /><span>About</span></Link>
        <Link href="/store/#products" className={dockLinkClasses(isStore)} aria-current={isStore ? "page" : undefined}><Store className="h-4 w-4" /><span>Store</span></Link>
        <button type="button" onClick={openCart} className={`${dockLinkClasses(isOpen)} relative`} aria-label="Open cart" aria-pressed={isOpen}>
          <ShoppingBag className="h-4 w-4" /><span>Cart</span>
          {count > 0 ? <span className="absolute right-2 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-[color:var(--sage-strong)] px-1 text-[0.58rem] font-black text-[color:var(--bg)]">{count}</span> : null}
        </button>
        <a href={site.brand.whatsapp} target="_blank" rel="noreferrer" className="mobile-dock-link focus-ring touch-manipulation" aria-label="Open WhatsApp">
          <MessageCircle className="h-4 w-4" /><span>Chat</span>
        </a>
      </nav>
    </div>
  );
}
