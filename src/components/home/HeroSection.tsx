"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, type Transition, type MotionProps } from "framer-motion";
import { ArrowRight, BadgeCheck, TrendingUp, Building2 } from "lucide-react";

import bannerImage from "@/src/assets/images/home.png";

/* ── animation helpers ── */
const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0): Pick<MotionProps, "initial" | "animate" | "transition"> => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE, delay } satisfies Transition,
});

const STATS = [
  { value: "₹3.1Cr+", label: "Featured asset value" },
  { value: "8–9%",    label: "Avg. estimated yield" },
  { value: "65–72%",  label: "Occupancy range" },
  { value: "100%",    label: "Hospitality focused" },
];

const PILLS = [
  { icon: BadgeCheck,  text: "Verified Assets" },
  { icon: TrendingUp,  text: "Income-Backed Opportunities" },
  { icon: Building2,   text: "Hotels · Resorts · Villas" },
];

export default function HeroSection() {
  const ref  = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section
      ref={ref}
      className="noise-overlay hero-mesh relative overflow-hidden text-[var(--ink-900)]"
      style={{ minHeight: "100vh" }}
    >
      <div className="pointer-events-none absolute -right-48 -top-48 h-[600px] w-[600px] rounded-full border border-[var(--brand-blue-400)]/10 opacity-60" />
      <div className="pointer-events-none absolute -left-28 top-20 h-[280px] w-[280px] rounded-full bg-[var(--brand-blue-400)]/10 blur-3xl" />

      <div className="relative z-10 mx-auto grid max-w-[1650px] grid-cols-1 gap-10 px-4 pb-14 pt-14 sm:px-6 sm:pb-16 sm:pt-16 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-10 lg:px-16 lg:pb-28 lg:pt-28 xl:px-24">

        {/* ── LEFT copy column ── */}
        <div className="flex flex-col">
          {/* eyebrow */}
          <motion.div {...fadeUp(0)} className="mb-6 flex items-center gap-2">
            <span className="h-px w-8 bg-[var(--ink-900)]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--ink-900)]/70">
              India&apos;s Hospitality Asset Marketplace
            </span>
          </motion.div>

          {/* headline — 3 lines */}
          <motion.h1
            {...fadeUp(0.1)}
            className="font-display text-[2.8rem] font-bold leading-[0.98] tracking-[-0.02em] text-[var(--ink-900)] sm:text-[3.3rem] lg:text-[3.6rem] xl:text-[4.2rem]"
          >
            Own Hospitality Assets<br />
            That{" "}<span className="bg-gradient-to-r from-[var(--ink-900)] via-[var(--brand-blue-700)] to-[var(--brand-blue-500)] bg-clip-text italic text-transparent">Generate</span><br />
            Income from Day One
          </motion.h1>

          {/* sub */}
          <motion.p
            {...fadeUp(0.2)}
            className="mt-5 max-w-lg text-base leading-7 text-[var(--ink-700)] lg:mt-6 lg:text-lg"
          >
            Buy, lease, or list hotels, resorts, villas, and serviced apartments
            through a platform built around verified hospitality economics and
            investor confidence.
          </motion.p>

          {/* pills */}
          <motion.div {...fadeUp(0.28)} className="mt-7 flex flex-wrap gap-2">
            {PILLS.map(({ icon: Icon, text }) => (
              <span
                key={text}
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--brand-blue-200)] bg-white/80 px-4 py-1.5 text-xs font-medium text-[var(--ink-700)] shadow-[0_10px_30px_rgba(61,127,197,0.08)] backdrop-blur"
              >
                <Icon className="h-3 w-3 text-[var(--ink-900)]" />
                {text}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div {...fadeUp(0.35)} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/listings"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--ink-900)] px-7 py-3 text-sm font-semibold text-white shadow-[0_18px_38px_rgba(13,15,20,0.2)] transition hover:bg-[var(--ink-700)]"
            >
              Explore Investments
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--ink-900)]/12 bg-white/85 px-7 py-3 text-sm font-medium text-[var(--ink-900)] shadow-[0_12px_32px_rgba(61,127,197,0.08)] backdrop-blur transition hover:border-[var(--ink-900)]/20 hover:bg-white"
            >
              List Your Property
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--brand-blue-200)] bg-[var(--brand-blue-50)] px-7 py-3 text-sm font-medium text-[var(--ink-900)] transition hover:bg-white"
            >
              Lease a Space
            </Link>
          </motion.div>

          {/* stats row */}
          <motion.div
            {...fadeUp(0.44)}
            className="mt-10 grid grid-cols-2 gap-y-5 sm:grid-cols-4 sm:divide-x sm:divide-white/12"
          >
            {STATS.map(({ value, label }) => (
              <div key={label} className="pr-4 sm:px-4 sm:first:pl-0">
                <p className="font-display text-2xl font-semibold text-[var(--ink-900)]">{value}</p>
                <p className="mt-1 text-[10px] uppercase tracking-wide text-[var(--ink-900)]/45">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT image column ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="relative mt-2 lg:mt-0"
        >
          <div className="absolute -right-3 -top-3 hidden h-full w-full rounded-3xl border border-[var(--brand-blue-400)]/30 sm:block" />

          <div className="relative overflow-hidden rounded-3xl border border-white/80 bg-white/70 shadow-[0_36px_90px_rgba(50,90,140,0.22)] backdrop-blur">
            {/* parallax image */}
            <motion.div style={{ y: imgY }} className="will-change-transform">
              <Image
                src={bannerImage}
                alt="Luxury hospitality asset"
                className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[560px]"
                priority
              />
            </motion.div>

            {/* gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink-900)]/55 via-transparent to-transparent" />

            {/* featured card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute bottom-3 left-3 right-3 rounded-2xl border border-white/70 bg-white/88 p-4 shadow-[0_24px_48px_rgba(13,15,20,0.12)] backdrop-blur-md sm:bottom-5 sm:left-5 sm:right-5 sm:p-5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[var(--brand-blue-700)]">Featured Asset</p>
                  <p className="mt-1 font-display text-lg font-semibold text-[var(--ink-900)]">Running Hotel – Indore</p>
                  <p className="mt-0.5 text-xs text-[var(--ink-700)]">Vijay Nagar, Indore · 31 keys</p>
                </div>
                <span className="rounded-full bg-[var(--ink-900)] px-3 py-1 text-[10px] font-semibold text-white">
                  Pre-Leased
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {[
                  ["Yield",     "8%+"],
                  ["Occupancy", "65–70%"],
                  ["Price",     "₹3.1 Cr"],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-xl border border-[var(--brand-blue-100)] bg-[var(--brand-blue-50)] p-2.5 text-center">
                    <p className="text-[10px] text-[var(--ink-700)]/70">{k}</p>
                    <p className="mt-0.5 text-sm font-semibold text-[var(--ink-900)]">{v}</p>
                  </div>
                ))}
              </div>

              <button className="mt-4 w-full rounded-full bg-[var(--ink-900)] py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--ink-700)]">
                View Deal →
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 hidden h-24 bg-gradient-to-t from-white to-transparent sm:block" />
    </section>
  );
}
