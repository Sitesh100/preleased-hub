"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const TRUST_FEATURES = [
  "Verified listing onboarding",
  "Transparent hospitality-only positioning",
  "Income investment storytelling",
  "Premium buyer and operator experience",
];

const FAQS: FAQItem[] = [
  {
    question: "What is a pre-leased hospitality asset?",
    answer:
      "A pre-leased hospitality asset is a hotel, resort, or hospitality property that already has a lease agreement in place with an operator before it is sold to an investor. This gives buyers immediate, predictable rental income from day one with a proven operator in place.",
  },
  {
    question: "Who can use PreleaseHub?",
    answer:
      "PreleaseHub is built for property owners and sellers, real estate investors and buyers, hotel operators and lessees, and hospitality advisors. Whether you are listing a property, looking to invest, or seeking a lease opportunity, this platform is designed for you.",
  },
  {
    question: "What property types can be listed?",
    answer:
      "We list hotels, boutique stays, resorts, serviced apartments, and other hospitality-focused properties across India. All listings go through our verified onboarding process to ensure quality and accuracy.",
  },
  {
    question: "Does PreleaseHub help with investor leads?",
    answer:
      "Yes. We actively connect verified investors with suitable opportunities. Our team assists with lead qualification, documentation guidance, and facilitating introductions between buyers, sellers, and operators.",
  },
  {
    question: "How soon will you reply?",
    answer:
      "We typically respond within 24 hours, often much faster during business hours (Sun–Thu, 10:00–18:00 IST).",
  },
  {
    question: "What should I include in my message?",
    answer:
      "For the fastest and most useful response, include your preferred location, budget range, investment or leasing timeline, and whether your intent is listing, leasing, or investing.",
  },
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mt-16 md:mt-20">
      {/* Section header */}
      <div className="mb-10 grid gap-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <span className="inline-block rounded-full bg-[#e8f0fb] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#2f6bbf]">
            Trust & FAQ
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-[#0f1f4b] leading-snug">
            Built to feel credible, focused, and premium
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#64748b]">
            Every feature on PreleaseHub is designed around the needs of hospitality real estate — not generic property listings.
          </p>

          {/* Trust features */}
          <div className="mt-6 space-y-3">
            {TRUST_FEATURES.map((feat) => (
              <div
                key={feat}
                className="flex items-center gap-3 rounded-2xl border border-[#e2eaf6] bg-white px-4 py-3 shadow-sm"
              >
                <span className="text-[#2f6bbf]">
                  <ShieldIcon />
                </span>
                <p className="text-sm font-medium text-[#0f1f4b]">{feat}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ accordion */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-[#e2eaf6] bg-white shadow-sm overflow-hidden">
            <div className="border-b border-[#e2eaf6] px-6 py-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">
                Frequently asked questions
              </p>
              <h3 className="mt-0.5 text-lg font-bold text-[#0f1f4b]">Common questions</h3>
            </div>

            <div className="divide-y divide-[#e2eaf6]">
              {FAQS.map((faq, i) => {
                const isOpen = openIndex === i;
                return (
                  <div key={i}>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition hover:bg-[#f8fafc]"
                      aria-expanded={isOpen}
                    >
                      <span className="text-sm font-semibold text-[#0f1f4b]">{faq.question}</span>
                      <span className="text-[#94a3b8]">
                        <ChevronIcon open={isOpen} />
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 pt-0">
                        <p className="text-sm leading-relaxed text-[#64748b]">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}