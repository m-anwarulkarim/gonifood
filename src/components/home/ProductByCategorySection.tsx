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

export type ProductItem = {
  id: string | number;
  title: string;
  price: number;
  image: string;
  href?: string;
  rating?: number;
  stock?: boolean;
};

type ProductSectionProps = {
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  products: ProductItem[];
};

export default function ProductSection({
  title,
  subtitle,
  viewAllHref = "/products",
  products,
}: ProductSectionProps) {
  return (
    <section className="bg-white px-4 py-12 md:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px]">
        {/* Header row: title (left) + view all link (right) */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 border-b pb-5 sm:flex-row sm:items-end md:mb-10">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-sm text-slate-500 md:text-base">
                {subtitle}
              </p>
            )}
          </div>

          <Link
            href={viewAllHref}
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-emerald-700 px-5 py-2.5 text-sm font-semibold text-emerald-700 transition-all hover:bg-emerald-700 hover:text-white md:text-base"
          >
            View All
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 md:size-5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: ProductItem }) {
  const isStock = product.stock ?? true;
  const productHref = product.href ?? `/products/${product.id}`;

  // ─── Cart store integration ──────────────────────────────────────────
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
    <Card className="group overflow-hidden rounded-3xl border border-slate-200 bg-white p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-600 hover:shadow-xl">
      <Link href={productHref} className="block">
        <div className="relative aspect-square w-full overflow-hidden bg-slate-50">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 20vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      <CardContent className="p-4 md:p-5">
        <Link href={productHref}>
          <h3 className="line-clamp-2 min-h-[48px] text-base font-black leading-6 text-slate-800 hover:text-emerald-700 md:text-xl md:leading-7">
            {product.title}
          </h3>
        </Link>

        <div className="mt-3 flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`size-4 ${
                star <= (product.rating ?? 0)
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-slate-300 text-slate-300"
              }`}
            />
          ))}
          <span className="ml-1 text-sm font-semibold text-slate-400">
            ({(product.rating ?? 0).toFixed(1)})
          </span>
        </div>

        <div className="mt-3">
          <span className="text-2xl font-black text-emerald-600 md:text-3xl">
            ৳{product.price.toLocaleString("en-US")}
          </span>
        </div>

        <div className="mt-6 flex gap-2">
          {isStock ? (
            <>
              <Button
                onClick={handleAddToCart}
                className="h-11 flex-1 rounded-xl bg-emerald-600 text-sm font-bold text-white hover:bg-emerald-700 md:text-base"
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
                className="size-11 rounded-xl border-slate-200 hover:bg-slate-50"
              >
                <Heart className="size-5" />
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              disabled
              className="h-11 w-full rounded-xl border-red-200 bg-red-50 font-bold text-red-500 hover:bg-red-100 hover:text-red-600 disabled:opacity-100"
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
