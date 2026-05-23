import type { Metadata } from "next";
import { Geist, Geist_Mono, Hind_Siliguri } from "next/font/google";

import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import FloatingCartButton from "@/components/FloatingCartButton";

const hindSiliguri = Hind_Siliguri({
  variable: "--font-bangla",
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Peace Intn’l Online Islamic School",
    template: "%s | Peace Intn’l Online Islamic School",
  },
  description:
    "Peace Intn’l Online Islamic School offers online Islamic, Quran, Hifz, Spoken English, Nasheed, Bangla recitation and presentation courses for children worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      suppressHydrationWarning
      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        ${hindSiliguri.variable}
        scroll-smooth
      `}
    >
      <body className="min-h-screen overflow-x-hidden bg-[#eef6ff] text-slate-900 antialiased">
        <main>
          <Navbar />
          {children}
          <FloatingCartButton />
          <Footer />
        </main>
      </body>
    </html>
  );
}
