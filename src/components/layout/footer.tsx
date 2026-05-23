import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-conditions" },
  {
    label: "Refund & Return Policy",
    href: "/refund-return-policy",
    active: true,
  },
];

const categories = [
  { label: "খেজুর গুড়", href: "/category/khejur-gur" },
  { label: "আমলকি বাইস", href: "/category/amloki-bites" },
  { label: "কুমড়ো বড়ি", href: "/category/kumro-bori" },
  { label: "Dates (খেজুর)", href: "/category/dates" },
];

const socials = [
  { icon: FaFacebookF, href: "https://facebook.com", label: "Facebook" },
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FaYoutube, href: "https://youtube.com", label: "YouTube" },
  { icon: FaWhatsapp, href: "https://wa.me/8801577433650", label: "WhatsApp" },
];

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-slate-300">
      <div className="mx-auto max-w-[1500px] px-5 py-14 md:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-20">
          {/* Logo */}
          <div>
            <Link href="/" className="inline-flex">
              <Image
                src="/logo.webp"
                alt="Goni Food"
                width={210}
                height={110}
                className="h-auto w-[165px] brightness-90"
              />
            </Link>

            <p className="mt-6 max-w-xs text-base leading-7 text-slate-300">
              Best Online Grocery Shop in Bangladesh
            </p>
          </div>

          {/* Quick Links */}
          <FooterColumn title="Quick Links">
            {quickLinks.map((item) => (
              <FooterListLink key={item.href} {...item} />
            ))}
          </FooterColumn>

          {/* Categories */}
          <FooterColumn title="Top Categories">
            {categories.map((item) => (
              <FooterListLink key={item.href} {...item} />
            ))}
          </FooterColumn>

          {/* Contact */}
          <div>
            <h3 className="mb-7 text-xl font-bold text-white">Contact Us</h3>

            <div className="space-y-5">
              <ContactItem icon={MapPin}>
                House/Flat #9143, Plot #2, Turag, Baunia, Uttara, Dhaka,
                Bangladesh
              </ContactItem>

              <ContactItem icon={Phone}>+88015000000000</ContactItem>

              <ContactItem icon={Mail}>info@icomah.com</ContactItem>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              {socials.map((item) => {
                const Icon = item.icon;

                return (
                  <Button
                    key={item.label}
                    asChild
                    variant="outline"
                    size="icon"
                    className="size-12 rounded-xl border-slate-200 bg-transparent text-white hover:bg-white hover:text-[#111827]"
                  >
                    <Link href={item.href} aria-label={item.label}>
                      <Icon className="size-5" />
                    </Link>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>

        <Separator className="my-12 bg-slate-700/70" />

        <div className="flex flex-col gap-4 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>© 2026 gonifood.com. All rights reserved.</p>

          <p>
            Powered by{" "}
            <Link
              href="#"
              className="font-bold text-emerald-600 hover:text-emerald-500"
            >
              ecomah
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-7 text-xl font-bold text-white">{title}</h3>
      <ul className="space-y-4">{children}</ul>
    </div>
  );
}

function FooterListLink({
  label,
  href,
  active = false,
}: {
  label: string;
  href: string;
  active?: boolean;
}) {
  return (
    <li className="flex items-center gap-3">
      <span className="size-2 rounded-full bg-slate-300" />
      <Link
        href={href}
        className={`text-base transition ${
          active
            ? "text-emerald-500 hover:text-emerald-400"
            : "text-slate-300 hover:text-white"
        }`}
      >
        {label}
      </Link>
    </li>
  );
}

function ContactItem({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-slate-500 text-slate-200">
        <Icon className="size-6" />
      </div>

      <p className="pt-2 text-base leading-7 text-slate-300">{children}</p>
    </div>
  );
}
