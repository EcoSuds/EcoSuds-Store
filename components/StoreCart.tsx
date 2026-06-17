"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Send, ShoppingBag, Trash2, X } from "lucide-react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product, SiteData } from "@/lib/types";

type CartItem = Pick<Product, "slug" | "name" | "price" | "currency" | "image"> & { quantity: number };
type CartContextValue = {
  items: CartItem[];
  count: number;
  total: number;
  addItem: (product: Product) => void;
  removeItem: (slug: string) => void;
  updateQty: (slug: string, quantity: number) => void;
  openCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function format(price: number, currency: string) {
  return new Intl.NumberFormat("en-PK", { style: "currency", currency, maximumFractionDigits: 0 }).format(price);
}

export function CartProvider({ children, brand }: { children: React.ReactNode; brand: SiteData["brand"] }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("ecosuds-cart");
      if (stored) setItems(JSON.parse(stored) as CartItem[]);
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem("ecosuds-cart", JSON.stringify(items)); } catch {}
  }, [items]);

  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  function addItem(product: Product) {
    setItems((current) => {
      const existing = current.find((item) => item.slug === product.slug);
      if (existing) {
        return current.map((item) => item.slug === product.slug ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...current, { slug: product.slug, name: product.name, price: product.price, currency: product.currency, image: product.image, quantity: 1 }];
    });
    setOpen(true);
  }

  function removeItem(slug: string) {
    setItems((current) => current.filter((item) => item.slug !== slug));
  }

  function updateQty(slug: string, quantity: number) {
    if (quantity <= 0) return removeItem(slug);
    setItems((current) => current.map((item) => item.slug === slug ? { ...item, quantity } : item));
  }

  const message = useMemo(() => {
    const lines = ["Hello EcoSuds, I want to order these products:", ""];
    items.forEach((item) => lines.push(`- ${item.name} x ${item.quantity} (${format(item.price * item.quantity, item.currency)})`));
    lines.push("", `Estimated total: ${items[0] ? format(total, items[0].currency) : "PKR 0"}`, "", "Please confirm availability, delivery charges, and payment method.");
    return encodeURIComponent(lines.join("\n"));
  }, [items, total]);

  const value: CartContextValue = { items, count, total, addItem, removeItem, updateQty, openCart: () => setOpen(true) };
  const checkoutHref = `${brand.whatsapp}?text=${message}`;

  return (
    <CartContext.Provider value={value}>
      {children}
      {open ? (
        <div className="fixed inset-0 z-[130]" role="dialog" aria-modal="true" aria-label="EcoSuds cart">
          <button type="button" className="absolute inset-0 bg-black/35 backdrop-blur-sm" aria-label="Close cart" onClick={() => setOpen(false)} />
          <aside className="absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto border-l border-[color:var(--border)] bg-[color:var(--bg-strong)] p-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] shadow-lift sm:p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[color:var(--sage-strong)]">EcoSuds cart</p>
                <h2 className="mt-1 text-2xl font-black tracking-[-0.04em]">Your selected products</h2>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="focus-ring grid h-10 w-10 touch-manipulation place-items-center rounded-full border border-[color:var(--border)]" aria-label="Close cart"><X className="h-5 w-5" /></button>
            </div>

            {items.length === 0 ? (
              <div className="mt-10 rounded-[2rem] border border-dashed border-[color:var(--border)] p-8 text-center">
                <ShoppingBag className="mx-auto h-10 w-10 text-[color:var(--soft)]" />
                <p className="mt-4 font-bold text-[color:var(--muted)]">Your cart is empty.</p>
                <Link href="/store/" onClick={() => setOpen(false)} className="btn btn-secondary mt-5">Browse products</Link>
              </div>
            ) : (
              <>
                <div className="mt-6 space-y-3">
                  {items.map((item) => (
                    <div key={item.slug} className="grid grid-cols-[72px_1fr] gap-3 rounded-[1.4rem] border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-3">
                      <div className="relative aspect-square overflow-hidden rounded-2xl bg-[color:var(--cream)]">
                        <Image src={item.image} alt="" fill sizes="72px" className="object-contain p-1" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="line-clamp-2 text-sm font-black leading-5">{item.name}</h3>
                        <p className="mt-1 text-sm font-bold text-[color:var(--sage-strong)]">{format(item.price, item.currency)}</p>
                        <div className="mt-3 flex items-center justify-between gap-3">
                          <div className="inline-flex items-center rounded-full border border-[color:var(--border)] bg-[color:var(--bg-strong)]">
                            <button type="button" className="focus-ring grid h-8 w-8 touch-manipulation place-items-center rounded-full" onClick={() => updateQty(item.slug, item.quantity - 1)} aria-label="Decrease quantity"><Minus className="h-3.5 w-3.5" /></button>
                            <span className="min-w-8 text-center text-sm font-black">{item.quantity}</span>
                            <button type="button" className="focus-ring grid h-8 w-8 touch-manipulation place-items-center rounded-full" onClick={() => updateQty(item.slug, item.quantity + 1)} aria-label="Increase quantity"><Plus className="h-3.5 w-3.5" /></button>
                          </div>
                          <button type="button" onClick={() => removeItem(item.slug)} className="focus-ring grid h-8 w-8 touch-manipulation place-items-center rounded-full text-[color:var(--danger)]" aria-label="Remove product"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-[1.6rem] border border-[color:var(--border)] bg-[color:var(--mint)] p-4">
                  <div className="flex items-center justify-between gap-4 text-lg font-black">
                    <span>Total</span>
                    <span>{format(total, items[0].currency)}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">Final delivery charges, availability, and payment method are confirmed manually through WhatsApp.</p>
                </div>
                <a href={checkoutHref} target="_blank" rel="noreferrer" className="btn btn-primary mt-4 w-full"><Send className="h-4 w-4" /> Send order on WhatsApp</a>
              </>
            )}
          </aside>
        </div>
      ) : null}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  return (
    <button type="button" onClick={() => addItem(product)} className="btn btn-primary w-full">
      <ShoppingBag className="h-4 w-4" /> Add to cart
    </button>
  );
}
