"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Apple,
  Beef,
  Candy,
  ChevronRight,
  Grid2X2,
  Heart,
  Home,
  LogIn,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingCart,
  Trash2,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

import { useCartStore } from "@/lib/cart-store";

const navItems = [
  { label: "খেজুর গুড়", href: "/category", icon: Candy },
  { label: "আমলকি বাইস", href: "/category", icon: Apple },
  { label: "কুমড়ো বড়ি", href: "/category", icon: Beef },
  { label: "Dates (খেজুর)", href: "/category", icon: Grid2X2 },
];

// Hydration-safe cart count
function useHydratedCartCount() {
  const [mounted, setMounted] = useState(false);
  const count = useCartStore((s) =>
    s.items.reduce((total, item) => total + item.quantity, 0),
  );
  useEffect(() => setMounted(true), []);
  return mounted ? count : 0;
}

export default function Navbar() {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  // Cart open state now comes from the store
  const openCart = useCartStore((s) => s.openCart);

  const cartCount = useHydratedCartCount();

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="mx-auto flex h-[65px] max-w-[1500px] items-center justify-between px-4 md:h-[88px] md:px-6 lg:px-8">
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/logo.webp"
              alt="Goni Food"
              width={145}
              height={70}
              priority
              className="h-auto w-[92px] md:w-[145px]"
            />
          </Link>

          <div className="hidden w-full max-w-[720px] px-8 lg:block">
            <SearchBox />
          </div>

          <div className="hidden items-center gap-6 lg:flex">
            <Button variant="ghost" size="icon">
              <Heart className="size-7" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={openCart}
              aria-label="Open cart"
            >
              <ShoppingCart className="size-7" />
              {cartCount > 0 && (
                <Badge className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-emerald-600 p-0 text-xs">
                  {cartCount}
                </Badge>
              )}
            </Button>

            <Link
              href="/login"
              className="flex items-center gap-2 text-lg font-semibold text-slate-800"
            >
              <LogIn className="size-6" />
              Login
            </Link>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowMobileSearch((prev) => !prev)}
            >
              {showMobileSearch ? (
                <X className="size-6" />
              ) : (
                <Search className="size-6" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpenSidebar(true)}
            >
              <Menu className="size-7" />
            </Button>
          </div>
        </div>

        <nav className="hidden h-[54px] items-center justify-center bg-[#16823b] lg:flex">
          <div className="flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-lg font-semibold text-white hover:text-emerald-100"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {showMobileSearch && (
          <div className="border-t bg-white px-4 pb-4 lg:hidden">
            <SearchBox />
          </div>
        )}
      </header>

      <MobileSidebar open={openSidebar} onOpenChange={setOpenSidebar} />

      {/* Cart sidebar — controlled by store */}
      <CartSidebar />

      <MobileBottomNav
        cartCount={cartCount}
        onMenuClick={() => setOpenSidebar(true)}
        onCartClick={openCart}
      />
    </>
  );
}

// #############################

function SearchBox() {
  return (
    <form className="relative w-full">
      <Input
        type="search"
        placeholder="Search for products..."
        className="h-12 rounded-full border-slate-300 pl-6 pr-12 text-base shadow-none focus-visible:ring-1 focus-visible:ring-emerald-600"
      />
      <button
        type="submit"
        aria-label="Search"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600"
      >
        <Search className="size-6" />
      </button>
    </form>
  );
}

// ##################################

function MobileSidebar({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[300px] px-5">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-3">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => onOpenChange(false)}
                className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-4 py-4 text-base font-semibold text-slate-800 transition hover:bg-emerald-50 hover:text-emerald-700"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                    <Icon className="size-5" />
                  </div>
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="size-5 text-slate-400" />
              </Link>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}

// #############################

function CartSidebar() {
  // Everything comes from the store now
  const isCartOpen = useCartStore((s) => s.isCartOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const incrementQuantity = useCartStore((s) => s.incrementQuantity);
  const decrementQuantity = useCartStore((s) => s.decrementQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  // Avoid SSR/CSR mismatch on items rendering
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const displayedItems = mounted ? items : [];

  const subtotal = displayedItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <Sheet open={isCartOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent
        side="right"
        className="flex w-[340px] flex-col p-0 sm:w-[420px]"
      >
        <SheetHeader className="border-b px-5 py-4">
          <SheetTitle className="flex items-center gap-2 text-left">
            <ShoppingCart className="size-5 text-emerald-600" />
            Shopping Cart
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {displayedItems.length > 0 ? (
            <div className="space-y-4">
              {displayedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 rounded-2xl border bg-white p-3"
                >
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-3">
                      <h4 className="line-clamp-2 text-sm font-semibold text-slate-900">
                        {item.name}
                      </h4>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="shrink-0 text-slate-400 hover:text-red-500"
                        aria-label="Remove item"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>

                    <p className="mt-1 text-sm font-semibold text-emerald-600">
                      ৳{item.price}
                    </p>

                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center rounded-full border">
                        <button
                          onClick={() => decrementQuantity(item.id)}
                          className="flex size-7 items-center justify-center transition-colors hover:bg-slate-50"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="size-3" />
                        </button>

                        <span className="w-8 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => incrementQuantity(item.id)}
                          className="flex size-7 items-center justify-center transition-colors hover:bg-slate-50"
                          aria-label="Increase quantity"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>

                      <p className="text-sm font-bold text-slate-900">
                        ৳{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingCart className="mb-3 size-12 text-slate-300" />
              <h3 className="font-semibold text-slate-900">Cart is empty</h3>
              <p className="mt-1 text-sm text-slate-500">
                Add products to your cart first.
              </p>
            </div>
          )}
        </div>

        {displayedItems.length > 0 && (
          <div className="border-t p-5">
            <div className="mb-4 space-y-3">
              <div className="flex justify-between text-sm text-slate-600">
                <span>Subtotal</span>
                <span>৳{subtotal}</span>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold text-slate-900">
                <span>Total</span>
                <span>৳{subtotal}</span>
              </div>
            </div>

            <div className="grid gap-3">
              <Button
                asChild
                className="h-11 rounded-full bg-emerald-600 hover:bg-emerald-700"
              >
                <Link href="/checkout" onClick={closeCart}>
                  Checkout
                </Link>
              </Button>

              <Button asChild variant="outline" className="h-11 rounded-full">
                <Link href="/cart" onClick={closeCart}>
                  View Cart
                </Link>
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

// ##################################

function MobileBottomNav({
  onMenuClick,
  onCartClick,
  cartCount,
}: {
  onMenuClick: () => void;
  onCartClick: () => void;
  cartCount: number;
}) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white lg:hidden">
      <div className="grid h-[68px] grid-cols-5 items-center">
        <BottomLink href="/" icon={<Home className="size-5" />} label="Home" />

        <button
          type="button"
          onClick={onMenuClick}
          className="flex flex-col items-center justify-center gap-1 text-xs font-medium text-slate-700"
        >
          <Grid2X2 className="size-5" />
          Menu
        </button>

        <button
          type="button"
          onClick={onCartClick}
          className="flex flex-col items-center justify-center gap-1 text-xs font-medium text-emerald-600"
        >
          <span className="relative">
            <ShoppingCart className="size-5" />
            {cartCount > 0 && (
              <Badge className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-red-500 p-0 text-[10px]">
                {cartCount}
              </Badge>
            )}
          </span>
          Cart
        </button>

        <BottomLink
          href="/wishlist"
          icon={<Heart className="size-5" />}
          label="Wishlist"
        />

        <BottomLink
          href="/login"
          icon={<LogIn className="size-5" />}
          label="Login"
        />
      </div>
    </nav>
  );
}

// #############################################

function BottomLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center gap-1 text-xs font-medium text-slate-700"
    >
      {icon}
      {label}
    </Link>
  );
}
