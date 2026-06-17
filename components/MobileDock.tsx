"use client";

import Link from "next/link";
import { Home, MessageCircle, ShoppingBag, Sparkles, Store } from "lucide-react";
import type { SiteData } from "@/lib/types";
import { useCart } from "./StoreCart";

export function MobileDock({ site }: { site: SiteData }) {
  const { count, openCart } = useCart();
  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] md:hidden">
      <nav className="mx-auto grid max-w-md grid-cols-5 gap-1 rounded-[1.6rem] border border-[color:var(--border)] bg-[color:var(--bg-strong)]/94 p-2 shadow-lift backdrop-blur-2xl" aria-label="Mobile quick actions">
        <Link href="/" className="mobile-dock-link focus-ring touch-manipulation"><Home className="h-4 w-4" /><span>Home</span></Link>
        <Link href="/ecosuds/" className="mobile-dock-link focus-ring touch-manipulation"><Sparkles className="h-4 w-4" /><span>EcoSuds</span></Link>
        <Link href="/store/#products" className="mobile-dock-link focus-ring touch-manipulation"><Store className="h-4 w-4" /><span>Store</span></Link>
        <button type="button" onClick={openCart} className="mobile-dock-link focus-ring relative touch-manipulation" aria-label="Open cart">
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
