"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  CircleOff,
  Heart,
  ShoppingCart,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { useCartStore } from "@/lib/cart-store";

const products = [
  {
    id: 1,
    title: "Domino 50 pcs",
    price: 200,
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1200&auto=format&fit=crop",
    stock: false,
  },
  {
    id: 2,
    title: "Flowers Building Blocks Puzzle",
    price: 590,
    image:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200&auto=format&fit=crop",
    stock: true,
  },
  {
    id: 3,
    title: "Little Home Manager",
    price: 3990,
    image:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1200&auto=format&fit=crop",
    stock: true,
  },
  {
    id: 4,
    title: "Duty and Glamour Combo",
    price: 2790,
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop",
    stock: true,
  },
  {
    id: 5,
    title: "The Classic and Challenge Set",
    price: 390,
    image:
      "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=1200&auto=format&fit=crop",
    stock: true,
    active: true,
  },
];

export default function FeaturedProducts() {
  return (
    <section className="bg-[#f7f7f7] px-4 py-14 md:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px]">
        {/* Header row: title (left) + view all link (right) */}
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end md:mb-12">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
              Our{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
                Featured
              </span>{" "}
              Products
            </h2>
            <p className="mt-2 text-sm text-slate-500 md:text-base">
              Hand-picked favorites from our collection.
            </p>
          </div>

          <Link
            href="/category"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-emerald-700 px-5 py-2.5 text-sm font-semibold text-emerald-700 transition-all hover:bg-emerald-700 hover:text-white md:text-base"
          >
            View All Products
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 md:size-5" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Card extracted so each card can read its own cart state ──────────
function ProductCard({ product }: { product: (typeof products)[number] }) {
  const addItem = useCartStore((s) => s.addItem);
  const itemInCart = useCartStore((s) =>
    s.items.find((i) => i.id === product.id),
  );

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <Card
      className={`group overflow-hidden rounded-3xl border bg-white p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        product.active
          ? "border-cyan-500"
          : "border-slate-200 hover:border-cyan-500"
      }`}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-slate-50">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 20vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <CardContent className="p-4 md:p-5">
        <h3 className="line-clamp-2 min-h-[48px] text-center text-lg font-black text-slate-900 md:text-2xl md:leading-8">
          {product.title}
        </h3>

        <div className="mt-3 flex items-center justify-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="size-4 fill-slate-300 text-slate-300" />
          ))}
          <span className="ml-1 text-sm font-semibold text-slate-400">
            (0.0)
          </span>
        </div>

        <div className="mt-4 text-center">
          <span className="text-3xl font-black text-emerald-600 md:text-4xl">
            ৳{product.price}
          </span>
        </div>

        <div className="mt-6 flex gap-2">
          {product.stock ? (
            <>
              <Button
                onClick={handleAddToCart}
                className="h-11 flex-1 rounded-xl bg-emerald-600 text-sm font-bold text-white hover:bg-emerald-700 md:h-12 md:text-base"
              >
                {itemInCart ? (
                  <>
                    <Check className="mr-2 size-4" />
                    In Cart ({itemInCart.quantity})
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 size-4" />
                    Add to Cart
                  </>
                )}
              </Button>

              <Button
                size="icon"
                variant="outline"
                aria-label="Add to wishlist"
                className="size-11 rounded-xl border-slate-200 md:size-12"
              >
                <Heart className="size-5" />
              </Button>
            </>
          ) : (
            <Button
              disabled
              variant="outline"
              className="h-11 w-full rounded-xl border-red-200 bg-red-50 font-bold text-red-500 hover:bg-red-100 hover:text-red-600 disabled:opacity-100 md:h-12"
            >
              <CircleOff className="mr-2 size-4" />
              Out of Stock
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
