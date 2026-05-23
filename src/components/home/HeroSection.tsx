"use client";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const slides = [
  {
    id: 1,
    title: "প্রাকৃতিক ও স্বাস্থ্যকর উপাদানের সমাহার",
    subtitle:
      "খামার থেকে সরাসরি আপনার খাবার টেবিলে, শতভাগ খাঁটি ও অর্গানিক পণ্যের স্বাদ নিন।",
    button: "এখনই কিনুন",
    href: "/shop",
    image:
      "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2400&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "ঐতিহ্যবাহী খাঁটি খেজুর গুড়",
    subtitle:
      "আমাদের গ্রামীণ ঐতিহ্য ও আদি পদ্ধতিতে তৈরি, কেমিক্যালমুক্ত প্রিমিয়াম কোয়ালিটির খেজুর গুড়।",
    button: "অর্ডার করুন",
    href: "/shop",
    image:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=2400&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "খাঁটি গ্রামীণ স্বাদের ছোঁয়া",
    subtitle:
      "গ্রামের মাঠ ও গৃহিণীদের হাতে তৈরি বিশুদ্ধ, প্রিজারভেটিভ-মুক্ত পণ্য এখন আপনার দোরগোড়ায়।",
    button: "ঘুরে দেখুন",
    href: "/shop",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2400&auto=format&fit=crop",
  },
];

export default function HeroSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const autoplayPlugin = useMemo(
    () =>
      Autoplay({
        delay: 4000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    [],
  );

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    onSelect();
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section className="relative overflow-hidden">
      <Carousel
        setApi={setApi}
        plugins={[autoplayPlugin]}
        opts={{ loop: true }}
        className="w-full"
      >
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative h-[340px] w-full md:h-[520px] lg:h-[760px]">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={slide.id === 1}
                  className="object-cover"
                  sizes="100vw"
                />

                {/* Smoky / atmospheric overlays — matches the foggy rural vibe */}
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

                <div className="relative z-10 flex h-full items-center justify-center px-5 text-center">
                  <div className="mx-auto max-w-[1100px]">
                    <h1 className="text-4xl font-black leading-tight tracking-tight text-white drop-shadow-2xl md:text-6xl lg:text-7xl">
                      {slide.title}
                    </h1>

                    <p className="mx-auto mt-5 max-w-[760px] text-base font-medium text-white/90 drop-shadow-lg md:text-2xl">
                      {slide.subtitle}
                    </p>

                    <Button
                      asChild
                      size="sm"
                      className="mx-auto mt-6 h-10 rounded-full bg-emerald-700 px-6 text-sm font-semibold text-white shadow-md hover:bg-teal-700"
                    >
                      <Link href={slide.href}>{slide.button}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-4 size-12 rounded-full border-white/40 bg-white/20 text-white backdrop-blur-md hover:bg-white/30 md:left-8 md:size-14">
          <ChevronLeft className="size-7" />
        </CarouselPrevious>

        <CarouselNext className="right-4 size-12 rounded-full border-white/40 bg-white/20 text-white backdrop-blur-md hover:bg-white/30 md:right-8 md:size-14">
          <ChevronRight className="size-7" />
        </CarouselNext>
      </Carousel>

      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`h-3 rounded-full transition-all ${
              current === index ? "w-10 bg-teal-500" : "w-3 bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
