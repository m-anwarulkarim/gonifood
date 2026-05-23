"use client";

import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";

import { useCartStore } from "@/lib/cart-store";

export default function FloatingCartButton() {
  // Hydration-safe: only render after client mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const itemCount = useCartStore((s) =>
    s.items.reduce((total, item) => total + item.quantity, 0),
  );
  const subtotal = useCartStore((s) =>
    s.items.reduce((total, item) => total + item.price * item.quantity, 0),
  );
  const openCart = useCartStore((s) => s.openCart);

  // Don't show before hydration OR when cart is empty
  if (!mounted || itemCount === 0) return null;

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`Open cart with ${itemCount} items`}
      className="group fixed right-0 top-1/2 z-40 flex -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-l-2xl bg-emerald-600 px-3 py-4 text-white shadow-lg transition-all hover:bg-emerald-700 hover:pr-4"
    >
      {/* Bag icon in a subtle circle */}
      <div className="flex size-9 items-center justify-center rounded-full bg-emerald-500/40 transition-colors group-hover:bg-emerald-500/60">
        <ShoppingBag className="size-5" strokeWidth={2.25} />
      </div>

      {/* Item count */}
      <span className="text-xs font-bold leading-tight">
        {itemCount} {itemCount === 1 ? "Item" : "Items"}
      </span>

      {/* Subtotal pill */}
      <span className="rounded-md bg-emerald-700/60 px-1.5 py-0.5 text-[11px] font-bold">
        ৳{subtotal.toLocaleString("en-US")}
      </span>
    </button>
  );
}
