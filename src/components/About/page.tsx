"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import aboutUsBg from "@/src/assets/images/about_bg.png";
import demo from "@/src/assets/images/female.jpg";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// ─── Brand palette (extracted from PrelaseHub logo) ─────────────────────────
// Deep navy:   #1a3357
// Mid blue:    #2d5a8e
// Steel blue:  #4a7fb5
// Light blue:  #7aadcf
// Pale blue:   #b8d4e8
// Accent gold: #c8a84b

const STATS = [
  { label: "Homes matched",    value: "12k+" },
  { label: "Client satisfaction", value: "4.9/5" },
  { label: "Avg. closing time", value: "18 days" },
  { label: "Markets served",   value: "35+" },
] as const;

const VALUES = [
  { title: "Trust, always",        desc: "Transparent guidance at every step — no hidden fees, no surprises." },
  { title: "Speed with quality",   desc: "Move fast with accurate listings, sharp negotiations, and crisp communication." },
  { title: "Human-first service",  desc: "Real people, real support. We optimise the process, not the relationship." },
  { title: "Local expertise",      desc: "Neighbourhood-level insight powered by data — decide with confidence." },
  { title: "Secure by default",    desc: "Privacy-forward workflows and careful handling of sensitive documents." },
  { title: "End-to-end care",      desc: "From discovery to keys-in-hand, we stay accountable throughout." },
] as const;

const TEAM = [
  { name: "John Doe",   role: "CEO & Founder",   bio: "20+ years in real estate operations, building customer-first teams.", img: demo },
  { name: "Jane Smith", role: "Lead Agent",       bio: "Expert negotiator focused on protecting client value and time.", img: demo },
  { name: "Ava Rahman", role: "Client Success",   bio: "Makes every step smooth — onboarding, tours, paperwork, and follow-through.", img: demo },
] as const;

// ─── Animation helpers ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger = (delay = 0.1) => ({
  hidden: {},
  show:   { transition: { staggerChildren: delay } },
});

function InView({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{ hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const } } }}
    >
      {children}
    </motion.div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────
function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      variants={fadeUp}
      className="rounded-2xl border border-[#4a7fb5]/30 bg-[#1e3f6e]/60 px-5 py-4 backdrop-blur-sm"
    >
      <div className="font-display text-2xl font-bold text-[#b8d4e8]">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-widest text-[#7aadcf]/80">{label}</div>
    </motion.div>
  );
}

function ValueCard({ title, desc, index }: { title: string; desc: string; index: number }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className="group relative overflow-hidden rounded-2xl border border-[#2d5a8e]/50 bg-gradient-to-br from-[#1a3357] via-[#1e3f6e] to-[#163050] p-6 shadow-lg"
    >
      {/* Radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(74,127,181,0.25),transparent_55%)]" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-[#2d5a8e]/40 blur-2xl transition-opacity duration-500 opacity-60 group-hover:opacity-100" />

      <div className="relative z-10 flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#4a7fb5]/40 bg-[#4a7fb5]/15 text-[#b8d4e8]">
          <span className="text-sm font-semibold">{String(index + 1).padStart(2, "0")}</span>
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold text-white">{title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-[#b8d4e8]/80">{desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

function TeamCard({ name, role, bio, img }: { name: string; role: string; bio: string; img: StaticImageData }) {
  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className="group relative overflow-hidden rounded-2xl border border-[#b8d4e8]/30 bg-white p-6 shadow-sm"
    >
      {/* Subtle blue tint on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-[#e8f2fb]/0 to-[#b8d4e8]/0 transition-all duration-500 group-hover:from-[#e8f2fb]/30 group-hover:to-[#daeaf7]/20" />

      <div className="flex items-center gap-4">
        <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-[#b8d4e8]/40">
          <Image src={img} alt={`${name} portrait`} fill className="object-cover" />
        </div>
        <div className="min-w-0">
          <h3 className="truncate font-display text-lg font-semibold text-[#1a3357]">{name}</h3>
          <p className="text-sm text-[#4a7fb5]">{role}</p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-[#4a5568]">{bio}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {["Negotiation", "Market Insights", "Client Care"].map((tag) => (
          <span key={tag} className="rounded-full border border-[#b8d4e8]/50 bg-[#e8f2fb] px-3 py-1 text-xs text-[#2d5a8e]">
            {tag}
          </span>
        ))}
      </div>

      {/* Corner glow */}
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-[#4a7fb5]/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </motion.article>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function About() {
  const heroRef = useRef(null);

  return (
    <main className="bg-[#f0f6fc] text-[#1a3357]">

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image src={aboutUsBg} alt="About background" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f2344]/90 via-[#1a3357]/80 to-[#f0f6fc]" />
          {/* Animated mesh blobs */}
          <motion.div
            animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.55, 0.35] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-[#2d5a8e]/40 blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.25, 0.4, 0.25] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute right-1/4 top-1/4 h-72 w-72 rounded-full bg-[#4a7fb5]/30 blur-3xl"
          />
        </div>

        <div className="mx-auto px-6 pb-14 pt-24 md:pb-20 md:pt-28">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial="hidden"
            animate="show"
            variants={stagger(0.12)}
          >
            <motion.p
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-[#7aadcf]/30 bg-[#1e3f6e]/50 px-4 py-1 text-sm text-[#b8d4e8] backdrop-blur-sm"
            >
              <span className="h-2 w-2 rounded-full bg-[#c8a84b]" />
              Built for clarity, speed, and confidence
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="mt-6 font-display text-balance text-4xl font-bold text-white md:text-6xl"
            >
              A smarter way to buy, sell, and rent properties.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-5 text-pretty text-lg leading-relaxed text-[#b8d4e8] md:text-xl"
            >
              We combine local expertise with modern tooling to make every decision easier — from shortlisting homes to closing the deal.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-gradient-to-r from-[#4a7fb5] to-[#2d5a8e] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#1a3357]/30 transition hover:from-[#5a8fc5] hover:to-[#3d6a9e]"
              >
                Talk to an expert
              </Link>
              <Link
                href="/listings"
                className="rounded-full border border-[#7aadcf]/30 bg-[#1e3f6e]/40 px-6 py-3 text-sm font-semibold text-[#b8d4e8] backdrop-blur-sm transition hover:bg-[#1e3f6e]/60"
              >
                Browse listings
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4"
              variants={stagger(0.1)}
            >
              {STATS.map((s) => (
                <StatCard key={s.label} value={s.value} label={s.label} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── STORY / MISSION ── */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <InView className="md:col-span-7" delay={0}>
            <h2 className="font-display text-3xl font-semibold text-[#1a3357] md:text-4xl">
              We are obsessed with removing friction.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#4a5568] md:text-lg">
              Real estate can feel confusing: too many options, inconsistent information, and slow communication. We built a workflow that stays transparent from day one — with experts who actually answer and tools that keep everything moving.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#b8d4e8]/60 bg-white p-6 shadow-sm">
                <div className="mb-3 h-1 w-10 rounded-full bg-gradient-to-r from-[#4a7fb5] to-[#7aadcf]" />
                <h3 className="font-display text-lg font-semibold text-[#1a3357]">Our Mission</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#64748b]">
                  Deliver seamless, transparent, customer-centred real estate services that make your property journey simple and enjoyable.
                </p>
              </div>
              <div className="rounded-2xl border border-[#b8d4e8]/60 bg-white p-6 shadow-sm">
                <div className="mb-3 h-1 w-10 rounded-full bg-gradient-to-r from-[#2d5a8e] to-[#4a7fb5]" />
                <h3 className="font-display text-lg font-semibold text-[#1a3357]">Our Vision</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#64748b]">
                  Become the most trusted agency in the region through integrity, professionalism, and consistent results.
                </p>
              </div>
            </div>
          </InView>

          <InView className="md:col-span-5" delay={0.15}>
            <div className="rounded-3xl border border-[#b8d4e8]/40 bg-white p-7 shadow-sm">
              <h3 className="font-display text-lg font-semibold text-[#1a3357]">How we work</h3>
              <ul className="mt-5 space-y-4 text-sm text-[#64748b]">
                {[
                  "Clear expectations: timelines, costs, and next steps.",
                  "Fast feedback: tours, offers, and updates without delays.",
                  "Data-backed guidance: pricing, neighbourhoods, and trends.",
                  "Respectful support: we listen first, then recommend.",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-b from-[#4a7fb5] to-[#2d5a8e]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-2xl border border-[#b8d4e8]/50 bg-gradient-to-br from-[#e8f2fb] to-[#daeaf7] p-5">
                <p className="text-sm text-[#4a5568]">
                  <span className="font-semibold text-[#1a3357]">Your goal is the product.</span>{" "}
                  We measure success by how confident you feel at every step.
                </p>
              </div>
            </div>
          </InView>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#e8f2fb] to-[#d6e8f5]">
        {/* Decorative background geometry */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#4a7fb5]/10 blur-3xl" />
          <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-[#2d5a8e]/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-20">
          <InView className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full border border-[#4a7fb5]/30 bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#2d5a8e]">
              What drives us
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold text-[#1a3357] md:text-4xl">
              Values that show up in the work
            </h2>
            <p className="mt-3 text-base text-[#4a7fb5] md:text-lg">
              Big promises are easy. Consistent execution is what matters.
            </p>
          </InView>

          <motion.div
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger(0.09)}
          >
            {VALUES.map((v, i) => (
              <ValueCard key={v.title} title={v.title} desc={v.desc} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <InView className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="inline-block rounded-full border border-[#b8d4e8]/60 bg-[#e8f2fb] px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#2d5a8e]">
              Our team
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-[#1a3357] md:text-4xl">
              Meet the people behind the process
            </h2>
            <p className="mt-2 text-[#4a7fb5]">Specialists who move quickly, communicate clearly, and care.</p>
          </div>

          <Link
            href="/contact"
            className="shrink-0 rounded-full border border-[#2d5a8e] px-6 py-3 text-sm font-semibold text-[#1a3357] transition hover:bg-[#1a3357] hover:text-white"
          >
            Work with us
          </Link>
        </InView>

        <motion.div
          className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger(0.12)}
        >
          {TEAM.map((m) => (
            <TeamCard key={m.name} name={m.name} role={m.role} bio={m.bio} img={m.img} />
          ))}
        </motion.div>
      </section>

      {/* ── CTA ── */}
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-4">
        <InView>
          <motion.div
            whileHover={{ scale: 1.005, transition: { duration: 0.3 } }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a3357] via-[#1e3f6e] to-[#0f2344] p-8 text-white shadow-xl shadow-[#0f2344]/30 md:p-12"
          >
            {/* Decorative glows */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#4a7fb5]/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 left-1/3 h-56 w-56 rounded-full bg-[#2d5a8e]/30 blur-2xl" />
            {/* Grid texture */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.04]"
              style={{ backgroundImage: "radial-gradient(circle, #7aadcf 1px, transparent 1px)", backgroundSize: "28px 28px" }}
            />

            <div className="relative z-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div className="max-w-xl">
                <h2 className="font-display text-3xl font-semibold text-white">
                  Ready to find your next home?
                </h2>
                <p className="mt-2 text-[#b8d4e8]/80">
                  Tell us what you need — we will shortlist options and guide you end-to-end.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="rounded-full bg-gradient-to-r from-[#4a7fb5] to-[#6a9fd5] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0f2344]/40 transition hover:from-[#5a8fc5] hover:to-[#7ab0e5]"
                >
                  Get in touch
                </Link>
                <Link
                  href="/listings"
                  className="rounded-full border border-[#4a7fb5]/40 bg-white/10 px-7 py-3 text-sm font-semibold text-[#b8d4e8] transition hover:bg-white/15"
                >
                  Explore listings
                </Link>
              </div>
            </div>
          </motion.div>
        </InView>
      </section>
    </main>
  );
}