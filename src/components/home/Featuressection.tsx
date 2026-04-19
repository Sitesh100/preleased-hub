"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useInView,
  type Variants,
} from "framer-motion";
import { useRef } from "react";
import {
  Users,
  ShieldCheck,
  KeyRound,
  BadgeCheck,
  Zap
} from "lucide-react";

import featuredImage from "@/src/assets/images/best_deals.png";
import roomImage from "@/src/assets/images/home.png";

/* ─── shared animation factory ────────────────────────── */
function useFadeIn(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  return { ref, inView };
}

const EASE = [0.22, 1, 0.36, 1] as const;

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: EASE, delay: i * 0.1 },
  }),
};

/* ─── data ─────────────────────────────────────────────── */
const AUDIENCE = [
  {
    title: "Verified Asset Discovery",
    text: "Every listing is carefully vetted to ensure credibility, so users explore only high-trust hospitality opportunities instead of random, unverified properties.",
    icon: ShieldCheck,
  },
  {
    title: "Direct Owner Connection",
    text: "Connect directly with property owners, eliminating unnecessary intermediaries and enabling faster, more transparent deal conversations.",
    icon: Users,
  },
  {
    title: "Faster Closure Support",
    text: "Streamlined workflows and active support help investors, operators, and owners move from discovery to deal closure with greater efficiency.",
    icon: Zap,
  },
  {
    title: "Pre-Leased Opportunity Access",
    text: "Explore income-ready hospitality assets designed for investors seeking stable returns through pre-leased and operational properties.",
    icon: KeyRound,
  },
  {
    title: "Trusted Platform Experience",
    text: "Built to reduce friction, improve trust, and deliver a premium, professional experience across every stage of hospitality deal discovery.",
    icon: BadgeCheck,
  },
];

const FEATURED = [
  {
    title: "31-Key Running Hotel",
    location: "Vijay Nagar, Indore",
    pricing: "₹3.1 Cr · ready unit",
    yield: "8.4% est. yield",
    status: "Pre-leased / strong asset",
    market: "65–72% occupancy",
    image: featuredImage,
    badge: "Pre-Leased",
  },
  {
    title: "Service Apartment Block",
    location: "Gurgaon",
    pricing: "Income generating unit",
    yield: "9.1% est. yield",
    status: "LSA-backed structure",
    market: "Operator tied demand",
    image: roomImage,
    badge: "For Lease",
  },
];

const FAQ = [
  {
    q: "What is PreleaseHub?",
    a: "PreleaseHub is a verified hospitality marketplace where sellers can list assets for sale or lease, investors can discover preleased opportunities, and operators can connect directly with owners.",
  },
  {
    q: "What is the 45-day operator deal promise?",
    a: "For suitable hospitality assets, PreleaseHub aims to connect owners with qualified operators and support faster deal movement, with a strong focus on closure assistance within 45 days.",
  },
  {
    q: "Who uses the platform?",
    a: "Sellers use it to list verified hospitality assets, investors use it to discover pre-leased property opportunities, and operators use it to connect directly with verified owners.",
  },
  {
    q: "Why does the platform ask for role-based login?",
    a: "Because sellers, investors, and operators each receive a distinct workflow, dashboard, and deal experience after login.",
  },
];

const INFO_CARDS = [
  {
    label: "Asset Scope",
    title: "Hospitality property types",
    tags: ["Hotels", "Resorts", "Villas", "Service Apartments"],
    darkTag: "Boutique Stays",
  },
  {
    label: "Deal Focus",
    title: "Transaction structures we support",
    tags: ["Pre-leased", "Lease-ready", "Structured"],
    darkTag: "Monitored",
  },
  {
    label: "User Groups",
    title: "Who the platform is built for",
    tags: ["Owners", "Investors"],
    darkTag: "Operators",
  },
  {
    label: "Platform Goal",
    title: "Our primary mission",
    tags: ["Income-led discovery"],
    darkTag: "Hospitality asset clarity",
  },
];

const STAT_CARDS = [
  {
    num: "45",
    label: "Day operator deal promise",
    sub: "Targeted closure window for verified assets with qualified operators",
    from: "#0f1724",
    to: "#224a7d",
  },
  {
    num: "3",
    label: "Distinct user journeys",
    sub: "Owner · Investor · Operator — each with a dedicated workflow and dashboard",
    from: "#224a7d",
    to: "#4b86ca",
  },
  {
    num: "100%",
    label: "Verified listings only",
    sub: "Every asset is vetted before appearing on the platform",
    from: "#1a3a6b",
    to: "#2d5fa0",
  },
];

/* ── Section label ── */
function SectionLabel({
  children,
  invert = false,
}: {
  children: React.ReactNode;
  invert?: boolean;
}) {
  return (
    <div className="mb-5 flex items-center gap-2">
      <span className={invert ? "h-px w-6 bg-white/60" : "h-px w-6 bg-(--ink-900)"} />
      <span
        className={
          invert
            ? "text-[11px] font-semibold uppercase tracking-widest text-white/70"
            : "text-[11px] font-semibold uppercase tracking-widest text-(--ink-900)/70"
        }
      >
        {children}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════ */
export default function FeaturesSection() {

  /* ── 1. AUDIENCE CARDS ── */
  const { ref: audRef, inView: audIn } = useFadeIn();

  /* ── 2. INFO GRID ── */
  const { ref: gridRef, inView: gridIn } = useFadeIn();

  /* ── 3. FEATURED DEALS ── */
  const { ref: dealRef, inView: dealIn } = useFadeIn();

  /* ── 4. PLATFORM PATHS ── */
  const { ref: whyRef, inView: whyIn } = useFadeIn();

  /* ── 5. TRUST + FAQ ── */
  const { ref: trustRef, inView: trustIn } = useFadeIn();

  return (
    <>
      {/* ─── AUDIENCE CARDS ────────────────────────────────── */}
      <section className="mx-auto max-w-[1500px] px-4 py-14 sm:px-6 sm:py-16 lg:px-12 lg:py-20">
        <div ref={audRef}>
          <SectionLabel>Owner · Investor · Operator</SectionLabel>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={audIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl max-w-6xl font-bold tracking-tight text-(--navy) sm:text-4xl md:text-[2.5rem] lg:text-[3.0rem]">
              A trusted hospitality marketplace built for stronger, faster deal closure
            </h2>
            <p className="mt-4 max-w-2xl text-base text-(--slate-500)">
              PreleaseHub is designed to simplify hospitality transactions by giving sellers, investors, and operators one verified platform for discovery, connection, and closure.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {AUDIENCE.map((item, i) => (
              <motion.article
                key={item.title}
                variants={cardVariants}
                initial="hidden"
                animate={audIn ? "visible" : "hidden"}
                custom={i}
                className="group relative overflow-hidden rounded-3xl border border-(--brand-blue-100) bg-white/90 p-8 shadow-[0_20px_48px_rgba(61,127,197,0.09)] transition hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(61,127,197,0.14)]"
              >
                {/* hover tint */}
                <div className="absolute inset-0 bg-linear-to-br from-(--brand-blue-400)/0 to-(--brand-blue-500)/0 opacity-0 transition duration-500 group-hover:from-(--brand-blue-400)/10 group-hover:to-(--brand-blue-500)/5 group-hover:opacity-100" />

                <div className="inline-flex rounded-2xl bg-(--ink-900) p-3 text-white shadow-lg shadow-black/10">
                  <item.icon className="h-5 w-5" />
                </div>

                <h3 className="mt-5 font-display text-xl font-semibold text-(--navy)">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-(--slate-500)">{item.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INFO GRID ────────────────────────────────────── */}
      <section className="bg-[linear-gradient(180deg,#f7faff_0%,#edf3fa_100%)] py-4">
        <div ref={gridRef} className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-12">
          {/* 4 info cards */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {INFO_CARDS.map((card, i) => (
              <motion.div
                key={card.label}
                variants={cardVariants}
                initial="hidden"
                animate={gridIn ? "visible" : "hidden"}
                custom={i}
                className="relative overflow-hidden rounded-3xl border border-(--brand-blue-100) bg-white p-6 shadow-[0_12px_32px_rgba(61,127,197,0.08)] transition hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(61,127,197,0.13)]"
              >
                {/* top accent bar */}
                <div className="absolute inset-x-0 top-0 h-[3px] rounded-t-3xl bg-linear-to-r from-(--ink-900) to-(--brand-blue-500)" />

                <p className="text-[10px] font-semibold uppercase tracking-widest text-(--slate-400)">
                  {card.label}
                </p>
                <p className="mt-2 text-[15px] font-bold text-(--navy)">{card.title}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-(--brand-blue-200) bg-(--brand-blue-50) px-3 py-1 text-[11px] font-medium text-(--brand-blue-700)"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="rounded-full border border-(--ink-900) bg-(--ink-900) px-3 py-1 text-[11px] font-medium text-white">
                    {card.darkTag}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED DEALS ────────────────────────────────── */}
      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <div ref={dealRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <SectionLabel>Verified Opportunities</SectionLabel>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={dealIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl font-bold tracking-tight text-(--navy) sm:text-4xl md:text-5xl">
              Trusted hospitality deals on one focused platform
            </h2>
            <p className="mt-4 max-w-2xl text-base text-(--slate-500)">
              Continue as a Seller, Investor, or Operator to unlock the right workflow before viewing full deal details.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-7 lg:grid-cols-2">
            {FEATURED.map((prop, i) => (
              <motion.article
                key={prop.title}
                variants={cardVariants}
                initial="hidden"
                animate={dealIn ? "visible" : "hidden"}
                custom={i}
                className="group overflow-hidden rounded-3xl border border-(--brand-blue-100) bg-white shadow-[0_22px_52px_rgba(61,127,197,0.09)] transition hover:-translate-y-1 hover:shadow-[0_28px_62px_rgba(61,127,197,0.14)]"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={prop.image}
                    alt={prop.title}
                    className="h-56 w-full object-cover transition duration-700 group-hover:scale-105 sm:h-64 lg:h-72"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-(--ink-900) px-3 py-1 text-xs font-semibold text-white">
                    {prop.badge}
                  </span>
                </div>

                <div className="p-7">
                  <h3 className="font-display text-2xl font-semibold text-(--navy)">{prop.title}</h3>
                  <p className="mt-1 text-sm text-(--slate-500)">{prop.location}</p>

                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {[
                      ["Pricing", prop.pricing],
                      ["Yield / Model", prop.yield],
                      ["Market Signal", prop.market],
                      ["Status", prop.status],
                    ].map(([k, v]) => (
                      <div key={k} className="rounded-xl border border-(--brand-blue-100) bg-(--brand-blue-50) p-3.5">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-(--slate-400)">{k}</p>
                        <p className="mt-1 text-sm font-medium text-(--navy)">{v}</p>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/investor/offering"
                    className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-(--ink-900) py-3 text-sm font-semibold text-white transition hover:bg-(--ink-700)"
                  >
                    View Deal →
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PLATFORM PATHS (Owners · Investors · Operators) ── */}
      <section
        ref={whyRef}
        className="noise-overlay relative overflow-hidden bg-[linear-gradient(135deg,#0f1724_0%,#224a7d_52%,#4b86ca_100%)] py-16 text-white sm:py-20 lg:py-24"
      >
        <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-white/8 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[var(--brand-blue-500)]/35 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-start">

            {/* left: three distinct journeys */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={whyIn ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <SectionLabel invert>Built for owners, investors, and operators</SectionLabel>
              <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
                Three distinct journeys.<br />
                <span className="italic text-white/88">One unified platform.</span>
              </h2>
              <p className="mt-5 text-base text-white/65">
                PreleaseHub serves sellers who need asset packaging, investors who need rent visibility and yield clarity, and operators who need expansion-ready inventory.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  {
                    title: "Owners / Sellers",
                    text: "Submit raw assets, complete verification, enter structuring queue, and track lead quality.",
                  },
                  {
                    title: "Investors / Buyers",
                    text: "Access structured deal rooms with lock-in, deposit, yield, operator profile, and risk summary.",
                  },
                  {
                    title: "Operators / Lessees",
                    text: "Explore lease-ready inventory, submit interest, schedule site visits, and negotiate terms.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur"
                  >
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="mt-1.5 text-sm text-white/60">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* right: rent security + asset monitoring */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={whyIn ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="space-y-6"
            >
              <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur">
                <div className="flex items-center gap-2 text-white/90">
                  <ShieldCheck className="h-5 w-5" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Rent security structure</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  Every premium deal clearly shows the security deposit, lock-in period, escalation, payment mechanism, reserve logic, and replacement support.
                </p>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur">
                <div className="flex items-center gap-2 text-white/90">
                  <Zap className="h-5 w-5" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Asset monitoring layer</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  After closure, the platform extends value through rent tracking, renewal alerts, operator support, and resale assistance.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  "Security deposit clarity",
                  "Lock-in & escalation",
                  "Payment mechanism",
                  "Reserve logic",
                  "Replacement support",
                  "Renewal alerts",
                ].map((point, i) => (
                  <motion.div
                    key={point}
                    variants={cardVariants}
                    initial="hidden"
                    animate={whyIn ? "visible" : "hidden"}
                    custom={i}
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70 backdrop-blur"
                  >
                    <ShieldCheck className="h-3 w-3 shrink-0 text-white/50" />
                    {point}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── TRUST + FAQ ───────────────────────────────────── */}
      <section ref={trustRef} className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-12 lg:py-20">
        <div className="grid gap-16 lg:grid-cols-2">

          {/* Trust list */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={trustIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>Trust & FAQ</SectionLabel>
            <h2 className="font-display text-3xl font-bold text-(--navy) sm:text-4xl md:text-[2.5rem]">
              A marketplace built around trust, structure, and long-term value
            </h2>

            <div className="mt-10 space-y-3">
              {[
                "Transparent hospitality positioning",
                "Income investment modeling",
                "Premium buyer and operator activation",
              ].map((item, i) => (
                <motion.div
                  key={item}
                  variants={cardVariants}
                  initial="hidden"
                  animate={trustIn ? "visible" : "hidden"}
                  custom={i}
                  className="flex items-center gap-3 rounded-2xl border border-(--brand-blue-100) bg-white px-5 py-4 text-sm font-medium text-(--navy) shadow-[0_18px_40px_rgba(61,127,197,0.08)]"
                >
                  <ShieldCheck className="h-4 w-4 text-(--ink-900)" />
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={trustIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.12 }}
          >
            <SectionLabel>Frequently Asked Questions</SectionLabel>
            <h2 className="font-display text-3xl font-bold text-(--navy) sm:text-4xl md:text-[2.5rem]">
              Frequently asked<br />questions
            </h2>

            <div className="mt-10 space-y-3">
              {FAQ.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-2xl border border-(--brand-blue-100) bg-white px-5 py-4 shadow-[0_18px_40px_rgba(61,127,197,0.08)] open:shadow-[0_24px_54px_rgba(61,127,197,0.12)]"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-(--navy) marker:hidden">
                    {item.q}
                    <span className="text-lg font-light text-(--slate-400) transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-(--slate-500)">{item.a}</p>
                </details>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}