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
      className="noise-overlay hero-mesh relative overflow-hidden text-white"
      style={{ minHeight: "100vh" }}
    >
      {/* decorative gold ring */}
      <div className="pointer-events-none absolute -right-48 -top-48 h-[600px] w-[600px] rounded-full border border-[var(--gold)]/10 opacity-60" />
      <div className="pointer-events-none absolute -right-32 -top-32 h-[400px] w-[400px] rounded-full border border-[var(--gold)]/8" />

      <div className="relative z-10 mx-auto grid max-w-[1650px] grid-cols-1 gap-10 px-4 pb-14 pt-14 sm:px-6 sm:pb-16 sm:pt-16 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-10 lg:px-16 lg:pb-28 lg:pt-28 xl:px-24">

        {/* ── LEFT copy column ── */}
        <div className="flex flex-col">
          {/* eyebrow */}
          <motion.div {...fadeUp(0)} className="mb-6 flex items-center gap-2">
            <span className="h-px w-8 bg-[var(--gold)]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--gold)]">
              India&apos;s Hospitality Asset Marketplace
            </span>
          </motion.div>

          {/* headline — 3 lines */}
          <motion.h1
            {...fadeUp(0.1)}
            className="font-display text-[2.8rem] font-bold leading-[0.98] tracking-[-0.02em] text-white sm:text-[3.3rem] lg:text-[3.6rem] xl:text-[4.2rem]"
          >
            Own Hospitality Assets<br />
            That{" "}<span className="italic text-[var(--gold-light)]">Generate</span><br />
            Income from Day One
          </motion.h1>

          {/* sub */}
          <motion.p
            {...fadeUp(0.2)}
            className="mt-5 max-w-lg text-base leading-7 text-white/70 lg:mt-6 lg:text-lg"
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
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-xs font-medium text-white/80 backdrop-blur"
              >
                <Icon className="h-3 w-3 text-[var(--gold)]" />
                {text}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div {...fadeUp(0.35)} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/listings"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--gold)] px-7 py-3 text-sm font-semibold text-[var(--navy)] transition hover:bg-[var(--gold-light)]"
            >
              Explore Investments
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/8 px-7 py-3 text-sm font-medium text-white backdrop-blur transition hover:bg-white/14"
            >
              List Your Property
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/8 px-7 py-3 text-sm font-medium text-white backdrop-blur transition hover:bg-white/14"
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
                <p className="font-display text-2xl font-semibold text-[var(--gold-light)]">{value}</p>
                <p className="mt-1 text-[10px] uppercase tracking-wide text-white/50">{label}</p>
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
          {/* gold border frame */}
          <div className="absolute -right-2 -top-2 hidden h-full w-full rounded-3xl border border-[var(--gold)]/30 sm:block" />

          <div className="relative overflow-hidden rounded-3xl shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
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
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/80 via-transparent to-transparent" />

            {/* featured card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute bottom-3 left-3 right-3 rounded-2xl border border-white/20 bg-[var(--navy-mid)]/90 p-4 backdrop-blur-md sm:bottom-5 sm:left-5 sm:right-5 sm:p-5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[var(--gold)]/80">Featured Asset</p>
                  <p className="mt-1 font-display text-lg font-semibold text-white">Running Hotel – Indore</p>
                  <p className="mt-0.5 text-xs text-white/55">Vijay Nagar, Indore · 31 keys</p>
                </div>
                <span className="rounded-full bg-[var(--gold)]/15 px-3 py-1 text-[10px] font-semibold text-[var(--gold)]">
                  Pre-Leased
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {[
                  ["Yield",     "8%+"],
                  ["Occupancy", "65–70%"],
                  ["Price",     "₹3.1 Cr"],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-xl bg-white/8 p-2.5 text-center">
                    <p className="text-[10px] text-white/50">{k}</p>
                    <p className="mt-0.5 text-sm font-semibold text-white">{v}</p>
                  </div>
                ))}
              </div>

              <button className="mt-4 w-full rounded-full bg-[var(--gold)] py-2.5 text-sm font-semibold text-[var(--navy)] transition hover:bg-[var(--gold-light)]">
                View Deal →
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 hidden h-24 bg-gradient-to-t from-[var(--slate-50)] to-transparent sm:block" />
    </section>
  );
}
