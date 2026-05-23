"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Home,
  Package,
  Phone,
  ShoppingBag,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") ?? "ORD-00000000";
  const total = searchParams.get("total") ?? "0";

  return (
    <section className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 md:py-16">
      <div className="w-full max-w-xl">
        <Card className="overflow-hidden rounded-3xl border-slate-200 bg-white p-0 shadow-sm">
          {/* Success header */}
          <div className="relative bg-gradient-to-br from-emerald-600 to-emerald-700 px-6 pb-10 pt-12 text-center">
            {/* Decorative circles */}
            <div className="absolute -top-12 -right-12 size-40 rounded-full bg-emerald-500/20" />
            <div className="absolute -bottom-16 -left-16 size-48 rounded-full bg-emerald-500/20" />

            <div className="relative">
              <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-white shadow-lg">
                <CheckCircle2
                  className="size-12 text-emerald-600"
                  strokeWidth={2.5}
                />
              </div>

              <h1 className="mt-5 text-2xl font-black text-white md:text-3xl">
                Thank You for Your Order!
              </h1>
              <p className="mt-2 text-sm text-emerald-50 md:text-base">
                Your order has been placed successfully.
              </p>
            </div>
          </div>

          {/* Order details */}
          <CardContent className="p-6 md:p-8">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Order ID
                  </p>
                  <p className="mt-1 font-mono text-lg font-bold text-slate-900">
                    {orderId}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Total Paid
                  </p>
                  <p className="mt-1 text-lg font-black text-emerald-700">
                    ৳{Number(total).toLocaleString("en-US")}
                  </p>
                </div>
              </div>
            </div>

            {/* What's next */}
            <div className="mt-6 space-y-4">
              <h2 className="text-base font-bold text-slate-900">
                What happens next?
              </h2>

              <div className="flex gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <Phone className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Order Confirmation Call
                  </p>
                  <p className="text-xs text-slate-500">
                    Our team will call you shortly to confirm the order details.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <Package className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Packaging & Shipping
                  </p>
                  <p className="text-xs text-slate-500">
                    Your products will be carefully packed and shipped within 24
                    hours.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <ShoppingBag className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Delivery
                  </p>
                  <p className="text-xs text-slate-500">
                    Expect delivery within 2-5 business days based on your
                    location.
                  </p>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Actions */}
            <div className="grid gap-3 sm:grid-cols-2">
              <Button
                asChild
                variant="outline"
                className="h-11 rounded-xl border-slate-200 font-semibold"
              >
                <Link href="/">
                  <Package className="mr-2 size-4" />
                  Go To Home
                </Link>
              </Button>

              <Button
                asChild
                className="h-11 rounded-xl bg-emerald-700 font-semibold text-white hover:bg-emerald-800"
              >
                <Link href="/">
                  Continue Shopping
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>

            {/* <Link
              href="/"
              className="mt-4 flex items-center justify-center gap-1.5 text-xs font-medium text-slate-500 hover:text-emerald-700"
            >
              <Home className="size-3.5" />
              Back to Home
            </Link> */}
          </CardContent>
        </Card>

        {/* Support note */}
        <p className="mt-5 text-center text-xs text-slate-500">
          Need help with your order?{" "}
          <Link
            href="/contact"
            className="font-semibold text-emerald-700 hover:underline"
          >
            Contact Support
          </Link>
        </p>
      </div>
    </section>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
          <p className="text-slate-500">Loading...</p>
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
