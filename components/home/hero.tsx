"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

type Banner = {
  title: string;
  desc: string;
  img: string;
  cta: string;
  ctaLink: string;
};

const banners: Banner[] = [
  {
    title: "Express Home Loan: Fast, Flexible, Yours.",
    desc: "Get approved in as little as 24 hours. Enjoy competitive rates, flexible repayments, and a dedicated team to guide you home.",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
    cta: "Apply now",
    ctaLink: "/login",
  },
  {
    title: "Your Dream Home Awaits.",
    desc: "Unlock exclusive member rates and personalized support. Start your journey with Zenus Bank today.",
    img: "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?auto=format&fit=crop&w=1200&q=80",
    cta: "Start now",
    ctaLink: "/signup",
  },
  {
    title: "Refinance & Save Big.",
    desc: "Switch your home loan and save with our low rates and zero application fees. See how much you could save in minutes.",
    img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
    cta: "See savings",
    ctaLink: "/login",
  },
];

export function Hero() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const banner = banners[index];

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % banners.length), 7000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_80%_0%,var(--primary-muted),transparent_70%)]"
      />

      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-12 px-6 py-20 md:px-12 md:py-28 lg:grid-cols-[3fr_2fr] lg:px-16 lg:py-32">
        <div className="flex flex-col items-start gap-8">
          {/* Rolling headline + description */}
          <div className="relative w-full min-h-[16rem] overflow-hidden md:min-h-[18rem]">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={index}
                initial={reduce ? { opacity: 0 } : { y: "100%" }}
                animate={reduce ? { opacity: 1 } : { y: "0%" }}
                exit={reduce ? { opacity: 0 } : { y: "-100%" }}
                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                className="flex flex-col gap-6"
              >
                <h1 className="text-balance text-5xl leading-[0.95] font-extralight tracking-[-0.04em] text-foreground sm:text-6xl md:text-7xl">
                  {banner.title}
                </h1>
                <p className="max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                  {banner.desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Static CTA */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={banner.ctaLink}
              className={buttonVariants({
                className: "h-12 rounded-full px-7 text-base",
              })}
            >
              {banner.cta}
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/personal"
              className={buttonVariants({
                variant: "outline",
                className: "h-12 rounded-full px-7 text-base",
              })}
            >
              Explore products
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl ring-1 ring-border shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]">
            <AnimatePresence initial={false}>
              <motion.div
                key={index}
                className="absolute inset-0"
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              >
                <Image
                  src={banner.img}
                  alt={banner.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-5 flex items-center gap-2">
            {banners.map((_, i) => (
              <button
                key={i}
                aria-label={`Show banner ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-8 bg-primary"
                    : "w-3 bg-border hover:bg-muted-foreground"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
