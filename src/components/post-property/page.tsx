"use client";

import PropertyListingForm from "@/src/components/post-property/PropertyListingForm";

function Pill({ text }: { text: string }) {
  return (
    <div className="rounded-[16px] border border-[#d0dae6] bg-[#eef2f6] px-4 py-4 text-[17px] leading-[1.2] text-[#334b69]">
      {text}
    </div>
  );
}

export default function PostPropertyPage() {
  return (
    <main id="main" className="min-h-screen bg-[#f5f5f5]">
      <div className="mx-auto w-full max-w-[1260px] px-5 pb-16 pt-16 lg:px-8">
        <section className="grid gap-10 lg:grid-cols-[1fr_560px] lg:items-start">
          <div className="pt-1">
            <span className="inline-flex rounded-full bg-[#020a25] px-3 py-1 text-[16px] font-semibold leading-none text-white">
              List Property
            </span>

            <h1 className="mt-6 max-w-[680px] text-4xl font-semibold leading-[1.1] tracking-[-0.02em] text-[#020a25] sm:text-5xl lg:text-[54px]">
              List verified hospitality assets for sale or rent
            </h1>

            <p className="mt-5 max-w-[760px] text-[18px] leading-[1.45] text-[#4b607d]">
              This seller flow is built for owners who want a trusted platform and strong
              operator closure support within 45 days for suitable assets.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Pill text="Intent: Sell / Lease / Both" />
              <Pill text="Verification-ready field capture" />
              <Pill text="Investor-facing commercial data" />
              <Pill text="Operator-fit asset screening" />
            </div>
          </div>

          <PropertyListingForm />
        </section>
      </div>
    </main>
  );
}
