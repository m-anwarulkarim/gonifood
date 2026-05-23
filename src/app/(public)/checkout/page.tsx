"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  FileText,
  Mail,
  MapPin,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Truck,
  User,
  Wallet,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

import { useCartStore } from "@/lib/cart-store";

const DELIVERY_AREAS = [
  { id: "inside_dhaka", label: "Inside Dhaka", charge: 60 },
  { id: "outside_dhaka", label: "Outside Dhaka", charge: 130 },
  { id: "sub_area", label: "Sub Area", charge: 100 },
];

export default function CheckoutPage() {
  const router = useRouter();

  // ─── Cart from global store ──────────────────────────────────────────────
  const items = useCartStore((s) => s.items);
  const incrementQuantity = useCartStore((s) => s.incrementQuantity);
  const decrementQuantity = useCartStore((s) => s.decrementQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);

  // Hydration-safe rendering
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const cart = mounted ? items : [];

  // ─── Form state ──────────────────────────────────────────────────────────
  // NOTE: For production, wire these inputs to TanStack Form + Zod validation.
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [deliveryArea, setDeliveryArea] = useState("inside_dhaka");
  const [address, setAddress] = useState("");
  const [orderNote, setOrderNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"digital" | "cod">("cod");
  const [coupon, setCoupon] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // ─── Totals ──────────────────────────────────────────────────────────────
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const deliveryCharge =
    DELIVERY_AREAS.find((a) => a.id === deliveryArea)?.charge ?? 0;
  const total = subtotal + deliveryCharge;

  // ─── Submit handler ──────────────────────────────────────────────────────
  const handleConfirmOrder = async () => {
    // Basic validation — replace with proper TanStack Form + Zod schema
    if (!fullName.trim() || !mobile.trim() || !address.trim()) {
      alert("Please fill in your name, mobile number, and address.");
      return;
    }

    setSubmitting(true);

    const orderPayload = {
      customer: { fullName, mobile: `+880${mobile}`, email },
      delivery: {
        area: deliveryArea,
        address,
        charge: deliveryCharge,
        note: orderNote,
      },
      paymentMethod,
      items: cart,
      subtotal,
      total,
      coupon: coupon || null,
      placedAt: new Date().toISOString(),
    };

    // TODO: send to your backend API
    // const res = await fetch("/api/orders", {
    //   method: "POST",
    //   body: JSON.stringify(orderPayload),
    // });
    console.log("Order placed:", orderPayload);

    // Generate a fake order ID for the demo
    const orderId = `ORD-${Date.now().toString().slice(-8)}`;

    // Clear cart & redirect to thank-you page
    clearCart();
    router.push(`/thank-you?orderId=${orderId}&total=${total}`);
  };

  // ─── Empty cart state ────────────────────────────────────────────────────
  if (mounted && cart.length === 0) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
        <Card className="w-full max-w-md rounded-2xl border-slate-200 p-0 shadow-sm">
          <CardContent className="flex flex-col items-center p-8 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-emerald-50">
              <ShoppingBag className="size-8 text-emerald-600" />
            </div>
            <h2 className="mt-4 text-xl font-bold text-slate-900">
              Your cart is empty
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Add some products to your cart before checking out.
            </p>
            <Button
              asChild
              className="mt-6 h-11 rounded-full bg-emerald-700 px-6 font-semibold text-white hover:bg-emerald-800"
            >
              <Link href="/">Browse Products</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xl font-bold text-slate-900 transition-colors hover:text-emerald-700 md:text-2xl"
        >
          <ArrowLeft className="size-5 md:size-6" />
          Checkout
        </Link>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_400px]">
          {/* ─── LEFT COLUMN ──────────────────────────────────────── */}
          <div className="space-y-6">
            {/* Delivery Details */}
            <Card className="rounded-2xl border border-slate-200 bg-white p-0 shadow-sm">
              <CardContent className="p-6">
                <div className="mb-5 flex items-center gap-2">
                  <MapPin className="size-5 text-emerald-700" />
                  <h2 className="text-lg font-bold text-slate-900 md:text-xl">
                    Delivery Details
                  </h2>
                </div>

                <div className="space-y-4">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="fullName"
                      className="text-sm font-medium text-slate-700"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                      <Input
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Rahim Uddin"
                        className="h-11 pl-9"
                      />
                    </div>
                  </div>

                  {/* Mobile + Email side by side */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="mobile"
                        className="text-sm font-medium text-slate-700"
                      >
                        Mobile Number <span className="text-red-500">*</span>
                      </Label>
                      <div className="flex h-11 overflow-hidden rounded-md border border-slate-200 focus-within:border-emerald-600 focus-within:ring-1 focus-within:ring-emerald-600">
                        <div className="flex shrink-0 items-center gap-1.5 border-r border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-700">
                          <span className="text-base leading-none">🇧🇩</span>
                          +880
                        </div>
                        <Input
                          id="mobile"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          type="tel"
                          placeholder="1XXXXXXXXX"
                          className="h-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label
                        htmlFor="email"
                        className="text-sm font-medium text-slate-700"
                      >
                        Email{" "}
                        <span className="font-normal text-slate-400">
                          (Optional)
                        </span>
                      </Label>
                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="h-11 pl-9"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Delivery Area */}
                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium text-slate-700">
                      Delivery Area <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={deliveryArea}
                      onValueChange={setDeliveryArea}
                    >
                      <SelectTrigger className="h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {DELIVERY_AREAS.map((area) => (
                          <SelectItem key={area.id} value={area.id}>
                            {area.label} - ৳{area.charge}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Full Address */}
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="address"
                      className="text-sm font-medium text-slate-700"
                    >
                      Full Address <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="House No, Road No, Area, Thana..."
                      rows={3}
                      className="resize-none"
                    />
                  </div>

                  {/* Order Note */}
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="orderNote"
                      className="text-sm font-medium text-slate-700"
                    >
                      Order Note{" "}
                      <span className="font-normal text-slate-400">
                        (Optional)
                      </span>
                    </Label>
                    <div className="relative">
                      <FileText className="pointer-events-none absolute left-3 top-3 size-4 text-slate-400" />
                      <Textarea
                        id="orderNote"
                        value={orderNote}
                        onChange={(e) => setOrderNote(e.target.value)}
                        placeholder="Any special instruction for delivery man?"
                        rows={2}
                        className="resize-none pl-9"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="rounded-2xl border border-slate-200 bg-white p-0 shadow-sm">
              <CardContent className="p-6">
                <div className="mb-5 flex items-center gap-2">
                  <CreditCard className="size-5 text-emerald-700" />
                  <h2 className="text-lg font-bold text-slate-900 md:text-xl">
                    Payment Method
                  </h2>
                </div>

                <RadioGroup
                  value={paymentMethod}
                  onValueChange={(v) =>
                    setPaymentMethod(v as "digital" | "cod")
                  }
                  className="grid grid-cols-1 gap-3 sm:grid-cols-2"
                >
                  {/* Digital */}
                  <Label
                    htmlFor="pm-digital"
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border-2 p-4 transition-all ${
                      paymentMethod === "digital"
                        ? "border-emerald-600 bg-emerald-50/50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <RadioGroupItem
                      id="pm-digital"
                      value="digital"
                      className="mt-0.5"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5">
                        <Wallet className="size-4 text-slate-600" />
                        <span className="font-bold text-slate-900">
                          Digital Payment
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-slate-500">
                        Bkash / Nagad / Card
                      </p>
                    </div>
                  </Label>

                  {/* COD */}
                  <Label
                    htmlFor="pm-cod"
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border-2 p-4 transition-all ${
                      paymentMethod === "cod"
                        ? "border-emerald-600 bg-emerald-50/50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <RadioGroupItem
                      id="pm-cod"
                      value="cod"
                      className="mt-0.5"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5">
                        <Truck className="size-4 text-slate-600" />
                        <span className="font-bold text-slate-900">
                          Cash On Delivery
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-slate-500">
                        Pay when you receive
                      </p>
                    </div>
                  </Label>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* ─── RIGHT COLUMN — ORDER SUMMARY ─────────────────────── */}
          <div className="lg:sticky lg:top-6 lg:self-start">
            <Card className="rounded-2xl border border-slate-200 bg-white p-0 shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-slate-900 md:text-xl">
                  Order Summary
                </h2>

                {/* Cart items */}
                <div className="mt-5 space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-start gap-3">
                      <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="line-clamp-1 text-sm font-semibold text-slate-900">
                          {item.name}
                        </p>

                        <div className="mt-2 flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => decrementQuantity(item.id)}
                            className="flex size-6 items-center justify-center rounded-md border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="w-7 text-center text-sm font-bold text-slate-900">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => incrementQuantity(item.id)}
                            className="flex size-6 items-center justify-center rounded-md border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50"
                            aria-label="Increase quantity"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-slate-400 transition-colors hover:text-red-500"
                          aria-label="Remove item"
                        >
                          <Trash2 className="size-4" />
                        </button>
                        <span className="text-sm font-bold text-slate-900">
                          ৳
                          {(item.price * item.quantity).toLocaleString("en-US")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-5" />

                {/* Coupon */}
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Have a coupon?
                  </p>
                  <div className="flex gap-2">
                    <Input
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="ENTER COUPON CODE"
                      className="h-10 uppercase placeholder:normal-case"
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      className="h-10 bg-slate-700 px-5 font-semibold text-white hover:bg-slate-800"
                    >
                      Apply
                    </Button>
                  </div>
                </div>

                <Separator className="my-5" />

                {/* Breakdown */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Subtotal</span>
                    <span className="font-semibold text-slate-900">
                      ৳ {subtotal.toLocaleString("en-US")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <Truck className="size-4" />
                      Delivery Charge
                    </span>
                    <span className="font-semibold text-slate-900">
                      ৳ {deliveryCharge}
                    </span>
                  </div>
                </div>

                <Separator className="my-5" />

                {/* Total */}
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-slate-900 md:text-lg">
                    Total Payable
                  </span>
                  <span className="text-xl font-black text-emerald-700 md:text-2xl">
                    ৳ {total.toLocaleString("en-US")}
                  </span>
                </div>

                {/* Confirm */}
                <Button
                  type="button"
                  onClick={handleConfirmOrder}
                  disabled={cart.length === 0 || submitting}
                  className="mt-5 h-12 w-full rounded-xl bg-emerald-700 text-base font-bold text-white shadow-md hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting ? (
                    "Placing Order..."
                  ) : (
                    <>
                      Confirm Order
                      <CheckCircle2 className="ml-2 size-5" />
                    </>
                  )}
                </Button>

                <p className="mt-3 text-center text-xs text-slate-500">
                  By placing this order, you agree to our{" "}
                  <Link
                    href="/terms"
                    className="font-semibold text-slate-700 underline underline-offset-2 hover:text-emerald-700"
                  >
                    Terms of Service
                  </Link>
                  .
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
