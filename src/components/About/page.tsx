"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, User, Mail } from "lucide-react";

// ─── Animation helpers ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger = (delay = 0.1) => ({
  hidden: {},
  show: { transition: { staggerChildren: delay } },
});

function InView({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────
const INFO_CARDS = [
  "PreleaseHub is built to make hospitality property transactions simpler, more trusted, and more direct for all three sides of the market.",
  "Sellers can list for sale or rent, investors can explore pre-leased assets, and operators can access direct owner opportunities.",
] as const;

const CONTACT_LINKS = [
  { icon: MessageCircle, label: "WhatsApp Support",           href: "#" },
  { icon: User,          label: "Instagram",                   href: "#" },
  { icon: Mail,          label: "connect@preleasehub.com",    href: "mailto:connect@preleasehub.com" },
] as const;

const WHO_IT_SERVES = [
  {
    title: "Verified Sellers",
    desc: "List hospitality assets for sale or rent on a trusted and focused marketplace.",
  },
  {
    title: "Buyers / Investors",
    desc: "Discover pre-leased hospitality assets designed for stronger confidence and day-one ROI potential.",
  },
  {
    title: "Operators",
    desc: "Access direct owner hospitality assets for lease, expansion, and long-term operating opportunities.",
  },
] as const;

// ─── Page ────────────────────────────────────────────────────────────────────
export default function About() {
  return (
    <main className="min-h-screen bg-[#f0f4fa] px-4 py-12 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">

          {/* ── LEFT COLUMN ── */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger(0.1)}
            className="flex flex-col gap-4 max-w-xl"
          >
            {/* About Us badge */}
            <motion.div variants={fadeUp}>
              <span className="inline-block rounded-full  bg-[#1a3357] px-4 py-1.5 text-xs font-semibold text-white">
                About Us
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              variants={fadeUp}
              className="text-3xl font-bold leading-tight text-[#1a3357] md:text-4xl lg:text-[2.6rem]"
            >
              India's only dedicated marketplace for hospitality real estate opportunities
            </motion.h1>

            {/* Subtext */}
            <motion.p variants={fadeUp} className="text-sm leading-tight text-[#4a5568] md:text-base">
              PreleaseHub is built to revolutionize how hospitality assets are discovered, verified, and connected across sellers, buyers, investors, and operators on one focused platform.
            </motion.p>

            {/* Info cards */}
            <motion.div variants={stagger(0.08)} className="mt-1 flex flex-col gap-3">
              {INFO_CARDS.map((text, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="rounded-2xl border border-gray-200 bg-white px-5 py-4 text-sm leading-relaxed text-[#4a5568] shadow-sm"
                >
                  {text}
                </motion.div>
              ))}
            </motion.div>

            {/* Contact links */}
            <motion.div variants={stagger(0.08)} className="mt-1 flex flex-col gap-3">
              {CONTACT_LINKS.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  variants={fadeUp}
                  whileHover={{ x: 3, transition: { duration: 0.2 } }}
                  className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-5 py-4 text-sm font-medium text-[#1a3357] shadow-sm transition hover:border-[#4a7fb5]/40 hover:shadow-md"
                >
                  <Icon size={17} className="shrink-0 text-[#4a7fb5]" />
                  <span>{label}</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT COLUMN — single tall card ── */}
          <InView delay={0.15}>
            <div className="rounded-3xl border border-gray-200 bg-gray-50 max-w-5xl shadow-sm overflow-hidden p-4">

              {/* What PreleaseHub represents */}
              <div className="border-b border-gray-100 px-7 py-7 bg-white rounded-2xl mb-4">
                <h2 className="text-base font-bold text-[#1a3357]">What PreleaseHub represents</h2>
                <p className="mt-3 text-sm leading-relaxed text-[#64748b]">
                  PreleaseHub is a revolutionary step in hospitality real estate — India's only dedicated marketplace focused on connecting potential hospitality assets with verified sellers, buyers, investors seeking day-one ROI, and operators looking for direct opportunities.
                </p>
              </div>

              {/* Why it matters */}
              <div className="border-b border-gray-100 px-7 py-7 bg-white rounded-2xl mb-4">
                <h2 className="text-base font-bold text-[#1a3357]">Why it matters</h2>
                <p className="mt-3 text-sm leading-relaxed text-[#64748b]">
                  Hospitality real estate is highly fragmented and often lacks trust, clarity, and direct connection between serious parties. PreleaseHub simplifies this gap by creating a professional marketplace where verified opportunities can move faster and with greater confidence.
                </p>
              </div>

              {/* Who it serves */}
              <div className="border-b border-gray-100 px-7 py-7 bg-white rounded-2xl">
                <h2 className="text-base font-bold text-[#1a3357]">Who it serves</h2>
                <motion.div
                  className="mt-4 grid grid-cols-3 gap-4"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={stagger(0.1)}
                >
                  {WHO_IT_SERVES.map((item) => (
                    <motion.div key={item.title} variants={fadeUp}>
                      <h3 className="text-sm font-bold text-[#1a3357]">{item.title}</h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-[#64748b]">{item.desc}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Our platform promise */}
              <div className="mx-4 mb-4 mt-4 rounded-2xl bg-[#1a3357] px-6 py-6">
                <h2 className="text-base font-bold text-white">Our platform promise</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#b8d4e8]">
                  To become the most trusted hospitality marketplace in India by simplifying discovery, verification, and direct connection between serious sellers, buyers, investors, and operators.
                </p>
              </div>

            </div>
          </InView>

        </div>
      </div>
    </main>
  );
}