"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  CircleDollarSign,
  MapPin,
  Percent,
  Sparkles,
  Maximize2,
  ShieldCheck,
  MessageCircle,
  Send,
} from "lucide-react";
import { toast } from "sonner";
import AuthPopup from "@/src/components/auth/AuthPopup";
import { useCreateInquiryMutation } from "@/src/redux/features/property/propertyApi";
import { formatCurrency, formatLocation, Property, PropertyDocument } from "@/src/types/property";

interface PropertyDetailPageProps {
  property: Property;
  backHref: string;
  backLabel: string;
}

function DetailMetric({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/80 px-5 py-4 shadow-sm">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-700 shadow-sm">
        {icon}
      </div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

function isPreLeased(listingType: number): boolean {
  return listingType === 3;
}

export default function PropertyDetailPage({
  property,
  backHref,
  backLabel,
}: PropertyDetailPageProps) {
  const router = useRouter();
  const [createInquiry, { isLoading: isInquirySubmitting }] = useCreateInquiryMutation();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("preleasehub:isLoggedIn") === "true";
  });

  if (!isLoggedIn) {
    return (
      <>
        <AuthPopup
          isOpen
          onClose={() => router.push(backHref)}
          defaultTab="login"
          onLoginSuccess={() => setIsLoggedIn(true)}
          redirectToDashboard={false}
        />
        <main className="mx-auto max-w-[1240px] px-4 py-16 sm:px-6">
          <p className="text-sm text-slate-500">Login required to view property details.</p>
        </main>
      </>
    );
  }

  const location = formatLocation(property);
  const preLeased = isPreLeased(property.listingType);

  // Prefer API-provided price/rent fields when present (handles snake_case)
  const displayPrice = (() => {
    const p = getFirstDefined(property as any, "selling_price", "propertyPrice");
    if (p === null) return null;
    const n = Number(p);
    return isNaN(n) ? String(p) : formatCurrency(n, property.currency);
  })();

  const displayMonthly = (() => {
    const m = getFirstDefined(property as any, "expected_monthly_rent", "monthlyRent");
    if (m === null) return null;
    const n = Number(m);
    return isNaN(n) ? String(m) : formatCurrency(n, property.currency);
  })();

  function getFirstDefined(obj: any, ...keys: string[]) {
    for (const k of keys) {
      const v = obj?.[k];
      if (v !== undefined && v !== null && String(v).trim() !== "") return v;
    }
    return null;
  }

  function buildDetails(prop: any) {
    const listingType = getFirstDefined(prop, "listingType", "listing_type");
    const details: { label: string; value: ReactNode }[] = [];

    // Common fields
    const city = getFirstDefined(prop, "city", "cityName");
    const location = getFirstDefined(prop, "location");
    const builtUp = getFirstDefined(prop, "built_up_area", "areaInSqFt");
    const rooms = getFirstDefined(prop, "rooms");
    const owner = getFirstDefined(prop, "owner_company_name", "ownerCompanyName");
    const phone = getFirstDefined(prop, "phone_number", "phone");
    const email = getFirstDefined(prop, "email_address", "email");

    if (city) details.push({ label: "City", value: city });
    if (location) details.push({ label: "Location", value: location });
    if (builtUp) details.push({ label: "Built-up Area", value: String(builtUp) });
    if (rooms) details.push({ label: "Rooms", value: String(rooms) });
    if (owner) details.push({ label: "Owner / Company", value: owner });
    if (phone) details.push({ label: "Phone", value: phone });
    if (email) details.push({ label: "Email", value: email });

    // Listing-type specific
    if (Number(listingType) === 1) {
      const sellPrice = getFirstDefined(prop, "selling_price", "propertyPrice");
      if (sellPrice) {
        const num = Number(sellPrice);
        details.push({ label: "Selling Price", value: isNaN(num) ? sellPrice : formatCurrency(num, prop.currency) });
      }
    }

    if (Number(listingType) === 2) {
      const monthly = getFirstDefined(prop, "expected_monthly_rent", "monthlyRent");
      const security = getFirstDefined(prop, "security_deposit");
      if (monthly) {
        const num = Number(monthly);
        details.push({ label: "Expected Monthly Rent", value: isNaN(num) ? monthly : formatCurrency(num, prop.currency) });
      }
      if (security) details.push({ label: "Security Deposit", value: String(security) });
    }

    if (Number(listingType) === 3) {
      const annual = getFirstDefined(prop, "annual_rental_income");
      const lock = getFirstDefined(prop, "lock_in_period");
      if (annual) details.push({ label: "Annual Rental Income", value: String(annual) });
      if (lock) details.push({ label: "Lock-in Period", value: String(lock) });
    }

    return details;
  }
  async function handleSendInquiry() {
    try {
      const result = await createInquiry({ property: property.id }).unwrap();
      toast.success(result.message ?? "Inquiry submitted successfully.");
    } catch (error) {
      const apiError = error as { data?: { message?: string }; error?: string };
      toast.error(
        apiError?.data?.message ??
          apiError?.error ??
          "Unable to submit inquiry right now. Please try again."
      );
    }
  }

  return (
    <main className="mx-auto max-w-[1240px] px-4 py-6 pb-12 sm:px-6 sm:py-8 sm:pb-16">
      <Link
        href={backHref}
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-900"
      >
        <ArrowLeft size={16} />
        Back to {backLabel}
      </Link>

      <section className="mt-6 overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_25px_80px_-45px_rgba(15,23,42,0.4)] sm:rounded-[32px]">
        <div className="relative min-h-[320px] overflow-hidden bg-slate-100 sm:min-h-[420px]">
          {property.imageUrl ? (
            <Image
              src={property.imageUrl}
              alt={property.title}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1240px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-200 text-sm font-medium text-slate-500">
              No image available
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-900/20 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-8">
            <div className="mb-4 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-slate-800 backdrop-blur">
              Listing Property
            </div>
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-200">
                  {property.statusLabel}
                </p>
                <h1 className="mt-2 text-2xl font-bold text-white sm:text-5xl">
                  {property.title}
                </h1>
                <p className="mt-3 flex items-start gap-2 text-sm text-slate-200 sm:text-lg">
                  <MapPin size={18} />
                  {location}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 border-b border-slate-200 bg-white p-4 sm:grid-cols-2 sm:p-6 xl:grid-cols-4">
          <DetailMetric
            label="Property Type"
            value={property.propertyType}
            icon={<Building2 size={18} />}
          />
          <DetailMetric
            label="Total Area"
            value={`${property.areaInSqFt.toLocaleString()} sq ft`}
            icon={<Maximize2 size={18} />}
          />
          <DetailMetric
            label="Property Price"
            value={displayPrice ?? "N/A"}
            icon={<CircleDollarSign size={18} />}
          />
          {preLeased && (
            <DetailMetric
              label="Monthly Rental"
              value={displayMonthly ?? "N/A"}
              icon={<Percent size={18} />}
            />
          )}
          {preLeased && (
            <DetailMetric
              label="Estimated ROI"
              value={property.roi > 0 ? `${property.roi.toFixed(2)}%` : "N/A"}
              icon={<Sparkles size={18} />}
            />
          )}
          <DetailMetric
            label="Last Updated"
            value={property.listedDate}
            icon={<CalendarDays size={18} />}
          />
        </div>

        <div className="grid gap-6 p-4 sm:p-6 lg:grid-cols-[1.45fr_0.85fr]">
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <p className="text-md font-semibold uppercase tracking-[0.2em] text-blue-700">
              Property Overview
            </p>
            
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              {property.description}
            </p>

            {property.highlights && property.highlights.length > 0 && (
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {property.highlights.map((highlight: string) => (
                  <div
                    key={highlight}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium leading-6 text-slate-700"
                  >
                    {highlight}
                  </div>
                ))}
              </div>
            )}

            {/* Render API-driven details based on listing type, show only non-empty fields */}
            {(() => {
              const details = buildDetails(property as any);
              if (!details || details.length === 0) return null;
              return (
                <div className="mt-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Property Details</p>
                  <div className="mt-3 grid gap-3">
                    {details.map((d) => (
                      <div key={String(d.label)} className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
                        <span className="text-slate-500">{d.label}</span>
                        <span className="font-semibold text-slate-900">{d.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

              {/* Documents (show thumbnails or links) */}
              {property.documents && property.documents.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Documents</p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {property.documents!.map((doc: PropertyDocument) => (
                      <a
                        key={doc.id}
                        href={doc.document_file}
                        target="_blank"
                        rel="noreferrer"
                        className="block h-24 w-32 overflow-hidden rounded-md border border-slate-200 bg-white"
                      >
                        <img src={doc.document_file} alt={doc.id} className="h-full w-full object-cover" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
          </section>

          <aside className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                Investment Snapshot
              </p>
              <div className="mt-5 space-y-4">
                <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4 text-sm">
                  <span className="text-slate-500">Asset Class</span>
                  <span className="font-semibold text-slate-900">{property.propertyType}</span>
                </div>
                <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4 text-sm">
                  <span className="text-slate-500">Market</span>
                  <span className="font-semibold text-slate-900">{location}</span>
                </div>
                {preLeased && (
                  <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4 text-sm">
                    <span className="text-slate-500">Monthly Rental</span>
                    <span className="font-semibold text-blue-700">
                      {formatCurrency(property.monthlyRent, property.currency)}
                    </span>
                  </div>
                )}
                {preLeased && (
                  <div className="flex items-start justify-between gap-4 text-sm">
                    <span className="text-slate-500">Expected Yield</span>
                    <span className="font-semibold text-slate-900">
                      {property.roi > 0 ? `${property.roi.toFixed(2)}%` : "N/A"}
                    </span>
                  </div>
                )}
              </div>
            </section>

             <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                Inquiry For This Deal
              </p>
              <p className="mt-3 text-sm text-slate-500 leading-relaxed">
                Interested in this property? Reach out to our team directly via WhatsApp or send a formal inquiry.
              </p>

              <div className="mt-5 flex flex-col gap-3">
                {/* WhatsApp Button */}
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `Hi, I'm interested in the property: ${property.title} (ID: ${property.id}). Please share more details.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 rounded-2xl bg-[#25D366] px-5 py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#1ebe5d] hover:shadow-md active:scale-[0.98]"
                >
                  <MessageCircle size={18} />
                  Chat on WhatsApp
                </a>

                {/* Send Inquiry Button */}
                <button
                  type="button"
                  onClick={handleSendInquiry}
                  disabled={isInquirySubmitting}
                  className="flex items-center justify-center gap-2.5 rounded-2xl border border-blue-600 bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-blue-700 hover:border-blue-700 hover:shadow-md active:scale-[0.98]"
                >
                  <Send size={17} />
                  {isInquirySubmitting ? "Sending..." : "Send Inquiry"}
                </button>
              </div>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}
