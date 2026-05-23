import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    title: "Mens Items",
    href: "/category",
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Organic Product",
    href: "/category",
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Cooking Oil",
    href: "/category",
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "খেজুর গুড়",
    href: "/category",
    image:
      "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function CategorySection() {
  return (
    <section className="bg-white px-4 py-12 md:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px]">
        {/* Header row: title (left) + view all link (right) */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end md:mb-10">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-950 md:text-5xl">
              Shop by <span className="text-emerald-700">Category</span>
            </h2>
            <p className="mt-2 text-sm text-slate-500 md:text-base">
              Find what you need across our curated categories.
            </p>
          </div>

          <Link
            href="/category"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-emerald-700 px-5 py-2.5 text-sm font-semibold text-emerald-700 transition-all hover:bg-emerald-700 hover:text-white md:text-base"
          >
            View All Categories
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 md:size-5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {categories.map((item) => (
            <Link key={item.title} href={item.href} className="group">
              <Card className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-600 hover:shadow-xl">
                <div className="relative aspect-[1.25/1] w-full overflow-hidden bg-slate-50">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <CardContent className="p-4 text-center md:p-6">
                  <h3 className="line-clamp-1 text-lg font-black text-slate-950 md:text-2xl">
                    {item.title}
                  </h3>

                  <div className="mt-4 inline-flex items-center justify-center gap-2 text-sm font-bold text-emerald-700 md:text-base">
                    Browse Items
                    <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
