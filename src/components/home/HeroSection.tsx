"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
  animate,
  type Transition,
  type MotionProps,
} from "framer-motion";
import { ShieldCheck, BadgeCheck, Clock, Users } from "lucide-react";

import bannerImage from "@/src/assets/images/home.png";
import jaipurImage from "@/src/assets/images/jaipur.jpg";
import bannerWebp from "@/src/assets/images/banner.webp";
import bestDealsImage from "@/src/assets/images/best_deals.png";
import mumbaiImage from "@/src/assets/images/mumbai.webp";
import goaHotelImage from "@/src/assets/images/goa hotel.webp";

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

const SLIDES = [
  {
    image: bannerImage,
    badge: "Live Deal",
    badgeColor: "emerald" as const,
    label: "Structured Asset",
    title: "Running Hotel · Indore",
   
  },
  {
    image: jaipurImage,
    badge: "New Listing",
    badgeColor: "sky" as const,
    label: "Boutique Property",
    title: "Heritage Haveli · Jaipur",
    
  },
  {
    image: mumbaiImage,
    badge: "Hot Deal",
    badgeColor: "orange" as const,
    label: "Commercial Asset",
    title: "Business Hotel · Mumbai",
  
  },
  {
    image: bestDealsImage,
    badge: "Best Deal",
    badgeColor: "violet" as const,
    label: "Serviced Apartment",
    title: "Service Suites · Bangalore",
   
  },
  {
    image: goaHotelImage,
    badge: "Premium",
    badgeColor: "amber" as const,
    label: "Resort Property",
    title: "Boutique Resort · Goa",
   
  },
] as const;

const BADGE_DOT_COLORS = {
  emerald: "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]",
  sky:     "bg-sky-400 shadow-[0_0_6px_rgba(56,189,248,0.8)]",
  orange:  "bg-orange-400 shadow-[0_0_6px_rgba(251,146,60,0.8)]",
  violet:  "bg-violet-400 shadow-[0_0_6px_rgba(167,139,250,0.8)]",
  amber:   "bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)]",
};

// ── Animated counter ──────────────────────────────────────────────────────────
function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
  duration = 1.8,
  delay = 0,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const motionVal = useMotionValue(0);

  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => {
      const controls = animate(motionVal, target, {
        duration,
        ease: [0.22, 1, 0.36, 1],
      });
      return () => controls.stop();
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [isInView, target, duration, delay, motionVal]);

  useEffect(() => {
    return motionVal.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.round(v)}${suffix}`;
      }
    });
  }, [motionVal, prefix, suffix]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

// ── Mouse-tracking parallax hook ──────────────────────────────────────────────
function useMouseParallax(strength = 20) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 60, damping: 18 });
  const springY = useSpring(y, { stiffness: 60, damping: 18 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      x.set(((e.clientX - cx) / cx) * strength);
      y.set(((e.clientY - cy) / cy) * strength);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [strength, x, y]);

  return { springX, springY };
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // ── scroll-based parallax ──
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // image scrolls slower than page (classic parallax)
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  // left column drifts up faster than natural scroll
  const leftY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const leftOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  // right card floats up at its own pace
  const rightY = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);

  // ambient orbs scroll at different speeds
  const orbLeftY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const orbRightY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  // decorative ring scrolls slowly
  const ringY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const ringScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  // divider line fades out
  const dividerOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  // ── mouse parallax for floating decorative elements ──
  const { springX: mX, springY: mY } = useMouseParallax(14);
  const { springX: mX2, springY: mY2 } = useMouseParallax(7);

  // Floating dot grid parallax
  const dotX = useSpring(useMotionValue(0), { stiffness: 40, damping: 15 });
  const dotY = useSpring(useMotionValue(0), { stiffness: 40, damping: 15 });
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      dotX.set(((e.clientX / window.innerWidth) - 0.5) * -18);
      dotY.set(((e.clientY / window.innerHeight) - 0.5) * -18);
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [dotX, dotY]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden text-[var(--ink-900)]"
      style={{ minHeight: "calc(100vh - 80px)", display: "flex", alignItems: "center" }}
    >

      {/* ── Parallax ambient orb LEFT ── */}
      <motion.div
        aria-hidden
        style={{ y: orbLeftY, x: mX }}
        className="pointer-events-none absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-[var(--brand-blue-400)]/10 blur-[100px] will-change-transform"
      />

      {/* ── Parallax ambient orb RIGHT (top) ── */}
      <motion.div
        aria-hidden
        style={{ y: orbRightY, x: mX2 }}
        className="pointer-events-none absolute -right-20 top-0 h-[460px] w-[460px] rounded-full bg-[var(--brand-blue-300)]/6 blur-[80px] will-change-transform"
      />

      {/* ── Parallax decorative ring ── */}
      <motion.div
        aria-hidden
        style={{ y: ringY, scale: ringScale, x: mX2 }}
        className="pointer-events-none absolute right-0 -top-20 h-[500px] w-[500px] rounded-full border border-[var(--brand-blue-400)]/8 opacity-50 will-change-transform"
      />

      {/* ── Second decorative ring (deeper parallax) ── */}
      <motion.div
        aria-hidden
        style={{
          y: useTransform(scrollYProgress, [0, 1], ["0%", "22%"]),
          x: mX,
          scale: useTransform(scrollYProgress, [0, 1], [1, 0.92]),
        }}
        className="pointer-events-none absolute -left-48 bottom-10 h-[380px] w-[380px] rounded-full border border-[var(--brand-blue-200)]/12 opacity-40 will-change-transform"
      />

      {/* ── Floating dot grid ── */}
      <motion.div
        aria-hidden
        style={{ x: dotX, y: dotY }}
        className="pointer-events-none absolute inset-0 will-change-transform"
      >
        <svg
          className="absolute right-[8%] top-[12%] opacity-[0.07]"
          width="180"
          height="180"
          viewBox="0 0 180 180"
        >
          {Array.from({ length: 6 }).map((_, row) =>
            Array.from({ length: 6 }).map((_, col) => (
              <circle
                key={`${row}-${col}`}
                cx={col * 30 + 15}
                cy={row * 30 + 15}
                r="2"
                fill="var(--brand-blue-500)"
              />
            ))
          )}
        </svg>
        <svg
          className="absolute bottom-[18%] left-[2%] opacity-[0.05]"
          width="120"
          height="120"
          viewBox="0 0 120 120"
        >
          {Array.from({ length: 4 }).map((_, row) =>
            Array.from({ length: 4 }).map((_, col) => (
              <circle
                key={`${row}-${col}`}
                cx={col * 30 + 15}
                cy={row * 30 + 15}
                r="2.5"
                fill="var(--brand-blue-400)"
              />
            ))
          )}
        </svg>
      </motion.div>

      {/* ── Bottom divider line ── */}
      <motion.div
        aria-hidden
        style={{ opacity: dividerOpacity }}
        className="pointer-events-none absolute bottom-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--brand-blue-200)]/40 to-transparent"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1680px] grid-cols-1 items-center gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[1fr_1.08fr] lg:gap-12 lg:px-14 lg:py-14 xl:px-20">

        {/* ═══ LEFT column — scroll parallax ═══ */}
        <motion.div
          style={{ y: leftY, opacity: leftOpacity }}
          className="flex flex-col justify-center will-change-transform"
        >
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
            className="mt-5 max-w-[48ch] text-[1rem] leading-tight text-[var(--ink-600)] lg:mt-6 lg:text-[1.0625rem]"
          >
            PreleaseHub connects verified owners, investors, and operators on one
            focused platform making discovery, structuring, and direct deal closure
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
                    ? "bg-[var(--ink-900)] text-white shadow-[0_8px_24px_rgba(13,15,20,0.22)] hover:bg-[var(--ink-700)] hover:shadow-[0_14px_32px_rgba(13,15,20,0.32)] hover:-translate-y-0.5 active:scale-[0.97] active:translate-y-0"
                    : "border border-[var(--ink-200)] bg-white text-[var(--ink-800)] shadow-[0_2px_12px_rgba(13,15,20,0.07)] hover:border-[var(--brand-blue-300)] hover:bg-[var(--brand-blue-50)] hover:text-[var(--brand-blue-600)] hover:shadow-[0_6px_20px_rgba(61,127,197,0.14)] hover:-translate-y-0.5 active:scale-[0.97] active:translate-y-0",
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
                className="group inline-flex cursor-default items-center gap-2 rounded-full border border-[var(--brand-blue-200)] bg-white/90 px-4 py-2 text-[0.8rem] font-medium text-[var(--ink-700)] shadow-[0_2px_12px_rgba(61,127,197,0.08)] backdrop-blur-sm transition-all duration-200 hover:border-[var(--brand-blue-400)] hover:bg-[var(--brand-blue-50)] hover:shadow-[0_4px_18px_rgba(61,127,197,0.18)] hover:-translate-y-0.5"
              >
                <Icon className="h-[13px] w-[13px] shrink-0 text-[var(--brand-blue-400)] transition-colors duration-200 group-hover:text-[var(--brand-blue-600)]" />
                {label}
              </span>
            ))}
          </motion.div>

          {/* micro stats — animated counters */}
          <motion.div
            {...fadeUp(0.4)}
            className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-[var(--ink-100)] pt-6"
          >
            {[
              { val: 500, prefix: "",  suffix: "+",   label: "Verified assets" },
              { val: 20, prefix: "₹", suffix: "Cr+", label: "Deals closed"    },
              { val: 12,  prefix: "",  suffix: "+",   label: "Cities"          },
            ].map(({ val, prefix, suffix, label }, i) => (
              <motion.div
                key={label}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                className="group flex cursor-default flex-col"
              >
                <span className="font-display text-[1.35rem] font-bold leading-none text-[var(--ink-900)] transition-colors duration-200 group-hover:text-[var(--brand-blue-600)]">
                  <AnimatedCounter
                    target={val}
                    prefix={prefix}
                    suffix={suffix}
                    duration={1.6}
                    delay={0.5 + i * 0.12}
                  />
                </span>
                <span className="mt-1 text-[11.5px] text-[var(--ink-500)] transition-colors duration-200 group-hover:text-[var(--ink-700)]">
                  {label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ═══ RIGHT image column — scroll + mouse parallax ═══ */}
        <motion.div
          initial={{ opacity: 0, x: 44 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.95, ease: EASE, delay: 0.12 }}
          style={{ y: rightY, x: mX2 }}
          className="relative will-change-transform"
        >
          {/* decorative offset frame */}
          <motion.div
            style={{
              x: useTransform(scrollYProgress, [0, 1], ["0%", "3%"]),
              y: useTransform(scrollYProgress, [0, 1], ["0%", "-3%"]),
            }}
            className="absolute -right-2.5 -top-2.5 hidden h-full w-full rounded-[26px] border border-[var(--brand-blue-300)]/20 sm:block will-change-transform"
          />

          {/* card shell */}
          <motion.div
            whileHover={{ y: -6, boxShadow: "0 44px 90px rgba(40,70,110,0.26)" }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            className="relative overflow-hidden rounded-[22px] border border-white/80 bg-white/60 shadow-[0_28px_72px_rgba(40,70,110,0.18)] backdrop-blur-sm"
          >
            {/* ── SLIDER image area ── */}
            <div className="relative h-[300px] sm:h-[370px] lg:h-[440px] xl:h-[480px] overflow-hidden">
              <AnimatePresence initial={false} custom={direction} mode="sync">
                <motion.div
                  key={activeSlide}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -60 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="absolute inset-0 will-change-transform"
                >
                  <motion.div
                    style={{ y: imgY, scale: 1.08 }}
                    className="absolute inset-0 will-change-transform"
                  >
                    <Image
                      src={SLIDES[activeSlide].image}
                      alt={SLIDES[activeSlide].title}
                      fill
                      className="object-cover object-center"
                      priority={activeSlide === 0}
                    />
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f14] via-[#0d0f14]/20 to-transparent pointer-events-none z-10" />

              {/* floating badge */}
              <motion.div
                style={{
                  y: useTransform(scrollYProgress, [0, 1], ["0px", "-28px"]),
                  x: mX,
                }}
                className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3.5 py-1.5 backdrop-blur-md will-change-transform"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`h-1.5 w-1.5 rounded-full ${BADGE_DOT_COLORS[SLIDES[activeSlide].badgeColor]}`}
                  />
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeSlide}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="text-[10px] font-semibold uppercase tracking-widest text-white/80"
                  >
                    {SLIDES[activeSlide].badge}
                  </motion.span>
                </AnimatePresence>
              </motion.div>

              {/* slide counter */}
              <div className="absolute right-4 top-4 z-20 rounded-full border border-white/15 bg-black/25 px-2.5 py-1 text-[9.5px] font-semibold text-white/60 backdrop-blur-md tabular-nums">
                {activeSlide + 1} / {SLIDES.length}
              </div>

              {/* dot indicators */}
              <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setDirection(i > activeSlide ? 1 : -1); setActiveSlide(i); }}
                    aria-label={`Slide ${i + 1}`}
                    className={[
                      "h-1.5 rounded-full transition-all duration-300",
                      i === activeSlide
                        ? "w-6 bg-white"
                        : "w-1.5 bg-white/40 hover:bg-white/70",
                    ].join(" ")}
                  />
                ))}
              </div>
            </div>

            {/* dark info panel */}
            <div className="bg-[#0d0f14] px-5 py-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={`label-${activeSlide}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.3 }}
                      className="text-[9.5px] font-semibold uppercase tracking-[0.18em] text-white/35"
                    >
                      {SLIDES[activeSlide].label}
                    </motion.p>
                  </AnimatePresence>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={`title-${activeSlide}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35, delay: 0.05 }}
                      className="mt-1.5 font-display text-[1.125rem] font-bold leading-snug text-white"
                    >
                      {SLIDES[activeSlide].title}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}