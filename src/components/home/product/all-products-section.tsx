"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import FilterSidebar, { DEFAULT_FILTERS, type Filters } from "./filter-sidebar";
import ProductCard, { type Product } from "./product-card";

// Sample products — replace with real data from your API / DB
const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "মাবরুম খেজুর / Mabroom Dates 1 kg",
    slug: "mabroom-dates-1kg",
    image:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=2400&auto=format&fit=crop",
    price: 1550,
    rating: 0,
  },
  {
    id: 2,
    name: "মেডজুল খেজুর / Medjool Dates 1kg",
    slug: "medjool-dates-1kg",
    image:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=2400&auto=format&fit=crop",
    price: 1950,
    rating: 0,
  },
  {
    id: 3,
    name: "মেডজুল খেজুর / Medjool Dates 500gm",
    slug: "medjool-dates-500gm",
    image:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=2400&auto=format&fit=crop",
    price: 1020,
    rating: 0,
  },
  {
    id: 4,
    name: "দাব্বাস খেজুর / Dabbas Dates 1 kg",
    slug: "dabbas-dates-1kg",
    image:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=2400&auto=format&fit=crop",
    price: 950,
    rating: 0,
  },
  {
    id: 5,
    name: "আজওয়া খেজুর / Ajwa Dates 1 kg",
    slug: "ajwa-dates-1kg",
    image:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=2400&auto=format&fit=crop",
    price: 2200,
    rating: 4.5,
  },
  {
    id: 6,
    name: "সাফাওয়ি খেজুর / Safawi Dates 1 kg",
    slug: "safawi-dates-1kg",
    image:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=2400&auto=format&fit=crop",
    price: 1450,
    rating: 0,
  },
  {
    id: 7,
    name: "খেজুর গুড় / Khejur Gur 500gm",
    slug: "khejur-gur-500gm",
    image:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=2400&auto=format&fit=crop",
    price: 380,
    rating: 5,
  },
  {
    id: 8,
    name: "আমলকি বাইটস / Amlaki Bites 250gm",
    slug: "amlaki-bites-250gm",
    image:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=2400&auto=format&fit=crop",
    price: 320,
    rating: 0,
  },
];

type SortValue = "newest" | "price_low" | "price_high" | "popular";

export default function AllProductsSection() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortValue>("newest");
  const [wishlist, setWishlist] = useState<Set<string | number>>(new Set());
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const products = SAMPLE_PRODUCTS;
  const totalCount = products.length;

  const handleAddToCart = (product: Product) => {
    console.log("Add to cart:", product);
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) next.delete(product.id);
      else next.add(product.id);
      return next;
    });
  };

  // Reusable Sort By select — used in both mobile & desktop
  const sortSelect = (mobile = false) => (
    <Select value={sort} onValueChange={(v) => setSort(v as SortValue)}>
      <SelectTrigger
        className={
          mobile
            ? "h-11 w-full rounded-md border-gray-200 bg-white font-semibold text-gray-800"
            : "h-10 w-[180px] rounded-md border-gray-200 font-semibold text-green-700"
        }
      >
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="newest">Newest</SelectItem>
        <SelectItem value="price_low">Price: Low to High</SelectItem>
        <SelectItem value="price_high">Price: High to Low</SelectItem>
        <SelectItem value="popular">Most Popular</SelectItem>
      </SelectContent>
    </Select>
  );

  return (
    <section className="bg-gray-50">
      {/* ===== MOBILE TOP HEADER ===== */}
      <div className="border-b border-gray-200 bg-white lg:hidden">
        <div className="px-4 py-4">
          <h1 className="text-center text-xl font-extrabold text-gray-900">
            All Products
          </h1>

          <div className="mt-3 grid grid-cols-2 gap-3">
            {/* Filter trigger */}
            <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="h-11 w-full rounded-md border-gray-200 bg-white font-semibold text-green-700 hover:bg-gray-50 hover:text-green-800"
                >
                  <SlidersHorizontal className="mr-2 size-4" />
                  Filter
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[88%] max-w-sm overflow-y-auto bg-gray-50 p-0 sm:max-w-md"
              >
                <SheetHeader className="sr-only">
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>
                    Filter products by availability, price, category and brand.
                  </SheetDescription>
                </SheetHeader>
                <div className="p-4">
                  <FilterSidebar
                    filters={filters}
                    onChange={setFilters}
                    onClearAll={() => setFilters(DEFAULT_FILTERS)}
                  />

                  {/* Apply button at the bottom for mobile UX */}
                  <Button
                    type="button"
                    onClick={() => setMobileFilterOpen(false)}
                    className="mt-4 h-11 w-full rounded-md bg-green-700 font-semibold text-white hover:bg-green-800"
                  >
                    Show {totalCount} Results
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            {/* Sort trigger */}
            {sortSelect(true)}
          </div>
        </div>
      </div>

      {/* ===== DESKTOP TOP HEADER ===== */}
      <div className="hidden border-b border-gray-200 bg-white lg:block">
        <div className="container mx-auto flex items-center justify-between px-6 py-6">
          <h1 className="text-3xl font-extrabold text-gray-900">
            All Products
          </h1>

          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-700">
              Sort By:
            </span>
            {sortSelect(false)}
          </div>
        </div>
      </div>

      {/* ===== BODY ===== */}
      <div className="container mx-auto px-4 py-5 md:px-6 md:py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
          {/* Sidebar — desktop only */}
          <div className="hidden lg:block">
            <FilterSidebar
              filters={filters}
              onChange={setFilters}
              onClearAll={() => setFilters(DEFAULT_FILTERS)}
            />
          </div>

          {/* Grid area */}
          <div>
            <p className="mb-4 text-sm text-gray-600 lg:mb-5">
              Showing{" "}
              <span className="font-bold text-gray-900">{totalCount}</span>{" "}
              products
            </p>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-5 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  isWishlisted={wishlist.has(product.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
