"use client";

import PropertyListingForm from "@/src/components/post-property/PropertyListingForm";

function Pill({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-[10px] border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-[14px] text-[#334b69]">
      <span className="h-2 w-2 flex-shrink-0 rounded-full bg-[#4f46e5]" />
      {text}
    </div>
  );
}

export default function PostPropertyPage() {
  return (
    <main id="main" className="min-h-screen bg-[#f0f2f5]">
      <div className="mx-auto w-full max-w-[1300px] px-5 pb-20 pt-10 lg:px-10">

        {/* ── Page header ── */}
        <div className="mb-8">
          <span className="inline-flex rounded-full bg-[#020a25] px-3 py-1 text-[12px] font-semibold leading-none text-white">
            List Property
          </span>
          <h1 className="mt-3 text-[28px] font-bold leading-[1.15] tracking-[-0.02em] text-[#020a25] sm:text-[32px]">
            List verified hospitality assets for sale or rent
          </h1>
          <p className="mt-2 max-w-[520px] text-[14px] leading-[1.55] text-[#4b607d]">
            Built for owners who want a trusted platform and strong operator closure support
            within 45 days for suitable assets.
          </p>
        </div>

        {/* ── 35 / 65 two-column layout ── */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">

          {/* Left — 35% */}
          <aside className="w-full lg:w-[35%] lg:flex-shrink-0">
            <div className="flex flex-col gap-4">

              {/* What you get */}
              <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-[#9ca3af]">
                  What you get
                </p>
                <div className="flex flex-col gap-3">
                  <Pill text="Intent: Sell / Lease / Both" />
                  <Pill text="Verification-ready field capture" />
                  <Pill text="Investor-facing commercial data" />
                  <Pill text="Operator-fit asset screening" />
                </div>
              </div>

              {/* Why list with us */}
              <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
                <p className="mb-3 text-[15px] font-semibold text-[#111827]">
                  Why list with PreleasHub?
                </p>
                <ul className="flex flex-col gap-2.5">
                  {[
                    "Reach 2,000+ verified hospitality investors",
                    "Dedicated relationship manager assigned",
                    "Closure support within 45 days",
                    "Zero listing fee — pay only on success",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[13px] text-[#4b607d]">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#4f46e5]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Need help */}
              <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
                <p className="text-[15px] font-semibold text-[#111827]">Need help?</p>
                <p className="mt-1.5 text-[13px] leading-[1.55] text-[#6b7280]">
                  Our seller desk is available Mon–Sat, 10am–7pm IST. Reach us on WhatsApp for
                  quick assistance.
                </p>
                <a
                  href="https://wa.me/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 flex h-10 items-center justify-center rounded-[10px] bg-[#25d366] text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
                >
                  WhatsApp Us
                </a>
              </div>

            </div>
          </aside>

          {/* Right — 65% */}
          <div className="w-full lg:w-[65%]">
            <PropertyListingForm />
          </div>

        </div>
      </div>
    </main>
  );
}