"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export type Product = {
  id: string | number;
  name: string;
  slug?: string;
  image: string;
  price: number;
  rating?: number;
  reviewCount?: number;
};

type ProductCardProps = {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  isWishlisted?: boolean;
};

function StarRating({ rating = 0 }: { rating?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < Math.round(rating);
        return (
          <Star
            key={i}
            className={`size-3.5 ${
              filled
                ? "fill-yellow-400 text-yellow-400"
                : "fill-transparent text-gray-300"
            }`}
            strokeWidth={1.5}
          />
        );
      })}
    </div>
  );
}

export default function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
}: ProductCardProps) {
  const productHref = `/shop/${product.slug ?? product.id}`;

  return (
    <Card className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white p-0 shadow-sm transition-shadow hover:shadow-md">
      {/* Image */}
      <Link href={productHref} className="block">
        <div className="relative aspect-square w-full overflow-hidden bg-[#f5ecd9]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 20vw"
            className=" transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Body */}
      <CardContent className="flex flex-1 flex-col gap-1.5 px-3 pt-3 pb-2 sm:gap-2 sm:px-4 sm:pt-4">
        <Link
          href={productHref}
          className="line-clamp-2 min-h-[2.5rem] sm:min-h-[2.75rem]"
        >
          <h3 className="text-center text-[13px] font-semibold leading-snug text-gray-900 hover:text-green-700 sm:text-[15px]">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-center gap-1.5">
          <StarRating rating={product.rating ?? 0} />
          <span className="text-[11px] text-gray-500 sm:text-xs">
            ({(product.rating ?? 0).toFixed(1)})
          </span>
        </div>

        <p className="text-center text-base font-bold text-green-700 sm:text-lg">
          ৳{product.price.toLocaleString("en-US")}
        </p>
      </CardContent>

      {/* Footer actions */}
      <CardFooter className="flex items-center gap-1.5 px-3 pb-3 pt-0 sm:gap-2 sm:px-4 sm:pb-4">
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => onToggleWishlist?.(product)}
          className="size-9 shrink-0 rounded-md border-gray-200 bg-white hover:bg-gray-50 sm:size-10"
        >
          <Heart
            className={`size-4 sm:size-5 ${
              isWishlisted ? "fill-red-500 text-red-500" : "text-gray-500"
            }`}
          />
        </Button>

        <Button
          type="button"
          onClick={() => onAddToCart?.(product)}
          className="h-9 flex-1 rounded-md bg-green-700 px-2 text-xs font-semibold text-white shadow-none hover:bg-green-800 sm:h-10 sm:text-sm"
        >
          <ShoppingCart className="mr-1 size-3.5 sm:mr-1.5 sm:size-4" />
          Add To Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
