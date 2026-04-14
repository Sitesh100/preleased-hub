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
  ArrowUpRight,
  Building2,
  CircleCheck,
  Landmark,
  ShieldCheck,
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
    title: "For Property Owners",
    text: "List hotels, resorts, villas, and serviced apartments to reach serious buyers and investors.",
    cta: "Seller Journey",
    href: "/about",
    icon: Building2,
  },
  {
    title: "For Investors",
    text: "Explore income-led opportunities built around occupancy, yield, and capital appreciation.",
    cta: "Investor Journey",
    href: "/investor/offering",
    icon: Landmark,
  },
  {
    title: "For Hoteliers / Lessees",
    text: "Lease ready hospitality spaces and operate with minimal setup friction.",
    cta: "Operator Journey",
    href: "/listings?intent=lease",
    icon: CircleCheck,
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

const TRUST = [
  "Verified hospitality assets",
  "Transparent occupancy positioning",
  "Income investment scoring",
  "Income-backed opportunity discovery",
  "Premium lead capture experience",
  "Investor-friendly property presentation",
];

const FAQ = [
  {
    q: "What is a pre-leased hospitality asset?",
    a: "A hospitality asset with existing income or operator-backed agreements, making yield visibility stronger for investors.",
  },
  {
    q: "Who can use PreleaseHub?",
    a: "Owners, operators, investors, and lessees who want a focused marketplace for hospitality-led opportunities.",
  },
  {
    q: "What property types can be listed?",
    a: "Hotels, resorts, villas, serviced apartments, and mixed-use hospitality projects with clear revenue context.",
  },
  {
    q: "How does valuation quality stay investor-ready?",
    a: "Listings include contextual occupancy, market notes, and structured opportunity data so decisions are better informed.",
  },
];

/* ── Section label ── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-2">
      <span className="h-px w-6 bg-(--gold)" />
      <span className="text-[11px] font-semibold uppercase tracking-widest text-(--gold)">
        {children}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════ */
export default function FeaturesSection() {

  /* ── 1. INFO GRID ── */
  const { ref: gridRef, inView: gridIn } = useFadeIn();

  /* ── 2. AUDIENCE CARDS ── */
  const { ref: audRef, inView: audIn } = useFadeIn();

  /* ── 3. FEATURED DEALS ── */
  const { ref: dealRef, inView: dealIn } = useFadeIn();

  /* ── 4. WHY PRELEASEHUB ── */
  const { ref: whyRef, inView: whyIn } = useFadeIn();

  /* ── 5. TRUST + FAQ ── */
  const { ref: trustRef, inView: trustIn } = useFadeIn();

  return (
    <>
      {/* ─── INFO STRIP ────────────────────────────────────── */}
      <div ref={gridRef} className="bg-(--slate-50)">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 px-4 py-8 sm:grid-cols-2 sm:px-6 md:grid-cols-4 lg:px-12">
          {[
            ["How We Support", "Buyers / Investors / Operators"],
            ["Asset Classes", "Hotels · Resorts · Villas · Service Apts"],
            ["Built For", "Owners · Investors · Operators"],
            ["Core Promise", "Income-led property discovery"],
          ].map(([label, value], i) => (
            <motion.article
              key={label}
              variants={cardVariants}
              initial="hidden"
              animate={gridIn ? "visible" : "hidden"}
              custom={i}
              className="rounded-2xl border border-(--slate-200) bg-white p-5 shadow-sm"
            >
              <p className="text-[10px] font-semibold uppercase tracking-widest text-(--slate-400)">{label}</p>
              <p className="mt-2 text-sm font-medium text-(--navy)">{value}</p>
            </motion.article>
          ))}
        </div>
      </div>

      {/* ─── AUDIENCE CARDS ────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-12 lg:py-20">
        <div ref={audRef}>
          <SectionLabel>Owner · Investor · Operator</SectionLabel>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={audIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl font-bold tracking-tight text-(--navy) sm:text-4xl md:text-5xl lg:text-[3.2rem]">
              Designed around sellers,<br />
              <span className="italic text-(--gold)">investors</span>, and operators
            </h2>
            <p className="mt-4 max-w-2xl text-base text-(--slate-500)">
              Instead of a generic property portal, PreleaseHub speaks each stakeholder&apos;s language
              with clear utility paths based on intent.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {AUDIENCE.map((item, i) => (
              <motion.article
                key={item.title}
                variants={cardVariants}
                initial="hidden"
                animate={audIn ? "visible" : "hidden"}
                custom={i}
                className="group relative overflow-hidden rounded-3xl border border-(--slate-200) bg-white p-8 shadow-sm transition hover:shadow-xl"
              >
                {/* hover tint */}
                <div className="absolute inset-0 bg-linear-to-br from-(--navy)/0 to-(--navy)/0 opacity-0 transition duration-500 group-hover:opacity-[0.03]" />

                <div className="inline-flex rounded-2xl bg-(--navy) p-3 text-white">
                  <item.icon className="h-5 w-5" />
                </div>

                <h3 className="mt-5 font-display text-xl font-semibold text-(--navy)">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-(--slate-500)">{item.text}</p>

                <Link
                  href={item.href}
                  className="mt-7 inline-flex items-center gap-2 rounded-full border border-(--navy) px-5 py-2.5 text-xs font-semibold text-(--navy) transition hover:bg-(--navy) hover:text-white"
                >
                  {item.cta}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED DEALS ────────────────────────────────── */}
      <section className="bg-(--slate-100) py-14 sm:py-16 lg:py-20">
        <div ref={dealRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <SectionLabel>Featured Opportunities</SectionLabel>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={dealIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl font-bold tracking-tight text-(--navy) sm:text-4xl md:text-5xl">
              Hospitality assets built for<br />
              <span className="italic text-(--gold)">income</span> and growth
            </h2>
            <p className="mt-4 max-w-2xl text-base text-(--slate-500)">
              Surface rent, yield, lease status, and operating context like a true investment platform.
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
                className="group overflow-hidden rounded-3xl border border-(--slate-200) bg-white shadow-sm transition hover:shadow-xl"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={prop.image}
                    alt={prop.title}
                    className="h-56 w-full object-cover transition duration-700 group-hover:scale-105 sm:h-64 lg:h-72"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-(--gold) px-3 py-1 text-xs font-semibold text-(--navy)">
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
                      <div key={k} className="rounded-xl bg-(--slate-100) p-3.5">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-(--slate-400)">{k}</p>
                        <p className="mt-1 text-sm font-medium text-(--navy)">{v}</p>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/investor/offering"
                    className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-(--navy) py-3 text-sm font-semibold text-white transition hover:bg-(--navy-light)"
                  >
                    View Deal →
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY PRELEASEHUB ───────────────────────────────── */}
      <section
        ref={whyRef}
        className="noise-overlay relative overflow-hidden bg-(--navy) py-16 text-white sm:py-20 lg:py-24"
      >
        <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-(--gold)/8 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-blue-900/30 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            {/* left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={whyIn ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <SectionLabel>Why PreleaseHub</SectionLabel>
              <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
                Not just property.<br />
                <span className="italic text-(--gold-light)">Structured</span> income assets.
              </h2>
              <p className="mt-5 text-base text-white/65">
                Position hospitality assets with verified narratives, transparent occupancy insights,
                and investor-led opportunity framing.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  { title: "Investor-friendly presentation", text: "Highlight yield potential, tenancy moat, lease terms, and operating indicators to improve decision velocity." },
                  { title: "Income-led positioning", text: "Shift from generic property search to discovery anchored by hospitality asset economics." },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl border border-white/12 bg-white/6 p-5 backdrop-blur">
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="mt-1.5 text-sm text-white/60">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* right: trust grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={whyIn ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              {TRUST.map((point, i) => (
                <motion.div
                  key={point}
                  variants={cardVariants}
                  initial="hidden"
                  animate={whyIn ? "visible" : "hidden"}
                  custom={i}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/6 p-4 text-sm text-white/85"
                >
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-(--gold)" />
                  {point}
                </motion.div>
              ))}
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
            <h2 className="font-display text-3xl font-bold text-(--navy) sm:text-4xl md:text-5xl">
              Built to feel<br />
              <span className="italic text-(--gold)">credible</span>, focused,<br />
              and premium
            </h2>

            <div className="mt-10 space-y-3">
              {[
                "Verified hospitality assets",
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
                  className="flex items-center gap-3 rounded-2xl border border-(--slate-200) bg-white px-5 py-4 text-sm font-medium text-(--navy) shadow-sm"
                >
                  <ShieldCheck className="h-4 w-4 text-(--gold)" />
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
            <h2 className="font-display text-3xl font-bold text-(--navy) sm:text-4xl md:text-5xl">
              Frequently asked<br />questions
            </h2>

            <div className="mt-10 space-y-3">
              {FAQ.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-2xl border border-(--slate-200) bg-white px-5 py-4 shadow-sm open:shadow-md"
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
