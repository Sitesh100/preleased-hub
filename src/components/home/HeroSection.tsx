"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, type Transition, type MotionProps } from "framer-motion";
import { CheckCircle } from "lucide-react";

import bannerImage from "@/src/assets/images/home.png";

/* ── animation helpers ── */
const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0): Pick<MotionProps, "initial" | "animate" | "transition"> => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE, delay } satisfies Transition,
});

const TRUST_BADGES = [
  "Verified listings",
  "Trusted platform",
  "45-day operator deal support",
  "Direct owner connection",
];

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section
      ref={ref}
      className="noise-overlay hero-mesh relative overflow-hidden text-[var(--ink-900)]"
      style={{ minHeight: "100vh" }}
    >
      {/* bg orbs */}
      <div className="pointer-events-none absolute -right-48 -top-48 h-[600px] w-[600px] rounded-full border border-[var(--brand-blue-400)]/10 opacity-60" />
      <div className="pointer-events-none absolute -left-28 top-20 h-[280px] w-[280px] rounded-full bg-[var(--brand-blue-400)]/10 blur-3xl" />

      <div className="relative z-10 mx-auto grid max-w-[1650px] grid-cols-1 gap-10 px-4 pb-14 pt-14 sm:px-6 sm:pb-16 sm:pt-16 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-10 lg:px-16 lg:pb-28 lg:pt-28 xl:px-24">

        {/* ── LEFT copy column ── */}
        <div className="flex flex-col">

       

          {/* headline */}
          <motion.h1
            {...fadeUp(0.1)}
            className="font-display text-[2.8rem] font-bold leading-[1.02] tracking-[-0.02em] text-[var(--ink-900)] sm:text-[3.3rem] lg:text-[3.8rem] xl:text-[4.4rem]"
          >
            Verified marketplace for sellers, investors, and hospitality operators.
          </motion.h1>

          {/* sub */}
          <motion.p
            {...fadeUp(0.2)}
            className="mt-5 max-w-xl text-base leading-7 text-[var(--ink-700)] lg:mt-6 lg:text-lg"
          >
            Sellers can list hospitality assets for sale or rent, investors can discover
            pre-leased opportunities, and operators can connect directly with verified
            owners — all on one trusted platform.
          </motion.p>

          {/* CTA buttons */}
          <motion.div {...fadeUp(0.3)} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/listings/preleased"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[var(--ink-900)] shadow-[0_18px_38px_rgba(13,15,20,0.14)] border border-[var(--ink-900)]/10 transition hover:bg-[var(--brand-blue-50)] hover:border-[var(--ink-900)]/20"
            >
              PreLeased Property
            </Link>
            <Link
              href="/lease"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[var(--ink-900)] shadow-[0_18px_38px_rgba(13,15,20,0.14)] border border-[var(--ink-900)]/10 transition hover:bg-[var(--brand-blue-50)] hover:border-[var(--ink-900)]/20"
            >
              Want to Lease
            </Link>
            <Link
              href="/sell"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[var(--ink-900)] shadow-[0_18px_38px_rgba(13,15,20,0.14)] border border-[var(--ink-900)]/10 transition hover:bg-[var(--brand-blue-50)] hover:border-[var(--ink-900)]/20"
            >
              Want to Sell / Lease / Operate
            </Link>
          </motion.div>

          {/* trust badges — 2×2 grid */}
          <motion.div {...fadeUp(0.4)} className="mt-7 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
            {TRUST_BADGES.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-blue-200)] bg-white/80 px-4 py-2 text-xs font-medium text-[var(--ink-700)] shadow-[0_10px_30px_rgba(61,127,197,0.08)] backdrop-blur"
              >
                <CheckCircle className="h-3.5 w-3.5 shrink-0 text-[var(--ink-900)]" />
                {badge}
              </span>
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

            {/* featured card — now matching screenshot layout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute bottom-3 left-3 right-3 rounded-2xl border border-white/20 bg-[var(--ink-900)]/88 p-5 shadow-[0_24px_48px_rgba(13,15,20,0.3)] backdrop-blur-md sm:bottom-5 sm:left-5 sm:right-5"
            >
              {/* card header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white/50">
                    Structured asset
                  </p>
                  <p className="mt-1 font-display text-xl font-bold text-white leading-tight">
                    Running Hotel •<br />Indore
                  </p>
                </div>
                <span className="shrink-0 rounded-full border border-white/30 bg-white/15 px-3.5 py-1.5 text-[11px] font-semibold text-white backdrop-blur">
                  Secured
                </span>
              </div>

              {/* 2×2 stats grid */}
              <div className="mt-4 grid grid-cols-2 gap-2.5">
                {[
                  ["Monthly Rent", "₹5L"],
                  ["Lock-in", "9 years"],
                  ["Deposit", "6 months"],
                  ["Escalation", "15% / 3 years"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="rounded-xl border border-white/10 bg-white/8 p-3"
                  >
                    <p className="text-[10px] font-medium text-white/45">{k}</p>
                    <p className="mt-1 text-sm font-semibold text-white">{v}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

      </div>

      {/* bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 hidden h-24 bg-gradient-to-t from-white to-transparent sm:block" />
    </section>
  );
}