"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  type Transition,
  type MotionProps,
} from "framer-motion";
import { ShieldCheck, BadgeCheck, Clock, Users } from "lucide-react";

import bannerImage from "@/src/assets/images/home.png";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0): Pick<MotionProps, "initial" | "animate" | "transition"> => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE, delay } satisfies Transition,
});

const fadeIn = (delay = 0): Pick<MotionProps, "initial" | "animate" | "transition"> => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.55, ease: EASE, delay } satisfies Transition,
});

const TRUST_BADGES = [
  { label: "Verified listings",       Icon: BadgeCheck },
  { label: "Trusted platform",        Icon: ShieldCheck },
  { label: "45-day operator support", Icon: Clock       },
  { label: "Direct owner connection", Icon: Users       },
];

const CTA_LINKS = [
  { href: "/listings?intent=preleased", label: "PreLeased Property"     },
  { href: "/listings?intent=lease",     label: "Want to Lease"          },
  { href: "/listings?intent=sell",      label: "Sell / Lease / Operate" },
];

const STATS = [
  ["Monthly Rent", "₹5L"],
  ["Lock-in",      "9 years"],
  ["Deposit",      "6 months"],
  ["Escalation",   "15% / 3 yrs"],
] as const;

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden text-[var(--ink-900)]"
      style={{ minHeight: "calc(100vh - 80px)", display: "flex", alignItems: "center" }}
    >
      {/* ambient orbs */}
      <div aria-hidden className="pointer-events-none absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-[var(--brand-blue-400)]/10 blur-[90px]" />
      <div aria-hidden className="pointer-events-none absolute right-0 -top-20 h-[500px] w-[500px] rounded-full border border-[var(--brand-blue-400)]/8 opacity-50" />
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--brand-blue-200)]/40 to-transparent" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1680px] grid-cols-1 items-center gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[1fr_1.08fr] lg:gap-12 lg:px-14 lg:py-14 xl:px-20">

        {/* ═══ LEFT column ═══ */}
        <div className="flex flex-col justify-center">

          {/* eyebrow */}
          <motion.div {...fadeIn(0.05)} className="mb-4 flex items-center gap-2.5">
            <span className="h-px w-8 bg-[var(--brand-blue-400)]" />
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[var(--brand-blue-500)]">
              India's #1 hospitality real estate platform
            </span>
          </motion.div>

          {/* headline */}
          <motion.h1
            {...fadeUp(0.1)}
            className="font-display max-w-[20ch] text-[2.6rem] font-bold leading-[1.04] tracking-[-0.025em] text-[var(--ink-900)] sm:text-[3rem] lg:text-[3.25rem] xl:text-[3.6rem]"
          >
            Pre-leased, lease-ready &amp; income-generating hospitality assets.
          </motion.h1>

          {/* sub */}
          <motion.p
            {...fadeUp(0.18)}
            className="mt-5 max-w-[48ch] text-[1rem] leading-[1.78] text-[var(--ink-600)] lg:mt-6 lg:text-[1.0625rem]"
          >
            PreleaseHub connects verified owners, investors, and operators on one
            focused platform — making discovery, structuring, and direct deal closure
            faster and more trusted.
          </motion.p>

          {/* CTA row */}
          <motion.div {...fadeUp(0.26)} className="mt-8 flex flex-wrap gap-3">
            {CTA_LINKS.map(({ href, label }, i) => (
              <Link
                key={label}
                href={href}
                className={[
                  "inline-flex items-center justify-center rounded-full px-6 py-3 text-[0.875rem] font-semibold transition-all duration-200",
                  i === 0
                    ? "bg-[var(--ink-900)] text-white shadow-[0_8px_24px_rgba(13,15,20,0.22)] hover:bg-[var(--ink-700)] hover:shadow-[0_10px_28px_rgba(13,15,20,0.28)] active:scale-[0.98]"
                    : "border border-[var(--ink-200)] bg-white text-[var(--ink-800)] shadow-[0_2px_12px_rgba(13,15,20,0.07)] hover:border-[var(--ink-300)] hover:bg-[var(--brand-blue-50)] active:scale-[0.98]",
                ].join(" ")}
              >
                {label}
              </Link>
            ))}
          </motion.div>

          {/* trust badges */}
          <motion.div {...fadeUp(0.33)} className="mt-6 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
            {TRUST_BADGES.map(({ label, Icon }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--brand-blue-200)] bg-white/90 px-4 py-2 text-[0.8rem] font-medium text-[var(--ink-700)] shadow-[0_2px_12px_rgba(61,127,197,0.08)] backdrop-blur-sm"
              >
                <Icon className="h-[13px] w-[13px] shrink-0 text-[var(--brand-blue-500)]" />
                {label}
              </span>
            ))}
          </motion.div>

          {/* micro stats */}
          <motion.div
            {...fadeUp(0.4)}
            className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-[var(--ink-100)] pt-6"
          >
            {[
              ["500+",    "Verified assets"],
              ["₹200Cr+", "Deals closed"],
              ["12+",     "Cities"],
            ].map(([val, lbl]) => (
              <div key={lbl} className="flex flex-col">
                <span className="font-display text-[1.35rem] font-bold leading-none text-[var(--ink-900)]">{val}</span>
                <span className="mt-1 text-[11.5px] text-[var(--ink-500)]">{lbl}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ═══ RIGHT image column ═══ */}
        <motion.div
          initial={{ opacity: 0, x: 44 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.95, ease: EASE, delay: 0.12 }}
          className="relative"
        >
          {/* decorative offset frame */}
          <div className="absolute -right-2.5 -top-2.5 hidden h-full w-full rounded-[26px] border border-[var(--brand-blue-300)]/20 sm:block" />

          {/* card shell */}
          <div className="relative overflow-hidden rounded-[22px] border border-white/80 bg-white/60 shadow-[0_28px_72px_rgba(40,70,110,0.18)] backdrop-blur-sm">

            {/* image */}
            <div className="relative h-[300px] sm:h-[370px] lg:h-[440px] xl:h-[480px]">
              <motion.div style={{ y: imgY }} className="absolute inset-0 will-change-transform">
                <Image
                  src={bannerImage}
                  alt="Luxury hospitality asset"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </motion.div>
              {/* gradient — stronger at bottom to blend into dark panel */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f14] via-[#0d0f14]/20 to-transparent" />
            </div>

            {/* dark info panel — flush below image */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.62, duration: 0.65, ease: EASE }}
              className="bg-[#0d0f14] px-5 py-5"
            >
              {/* header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[9.5px] font-semibold uppercase tracking-[0.18em] text-white/35">
                    Structured Asset
                  </p>
                  <p className="mt-1.5 font-display text-[1.125rem] font-bold leading-snug text-white">
                    Running Hotel · Indore
                  </p>
                </div>
                <span className="shrink-0 rounded-full border border-emerald-400/30 bg-emerald-500/12 px-3.5 py-1.5 text-[10.5px] font-semibold text-emerald-300">
                  ● Secured
                </span>
              </div>

              <div className="my-4 h-px bg-white/[0.08]" />

              {/* stats grid */}
              <div className="grid grid-cols-4 gap-2.5">
                {STATS.map(([k, v]) => (
                  <div key={k} className="rounded-xl border border-white/[0.07] bg-white/[0.06] px-3 py-2.5">
                    <p className="text-[9px] font-medium uppercase tracking-wide text-white/35">{k}</p>
                    <p className="mt-1 text-[0.875rem] font-semibold text-white">{v}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}