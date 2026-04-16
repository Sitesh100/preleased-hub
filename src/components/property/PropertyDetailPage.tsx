import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
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
} from "lucide-react";
import { formatCurrency, formatLocation, Property } from "@/src/types/property";

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

export default function PropertyDetailPage({
  property,
  backHref,
  backLabel,
}: PropertyDetailPageProps) {
  const location = formatLocation(property);

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
          <Image
            src={property.imageUrl}
            alt={property.title}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1240px"
            className="object-cover"
          />
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

              <div className="max-w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-md sm:px-5 sm:py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">
                  Property ID
                </p>
                <p className="mt-1 break-all text-lg font-bold text-white sm:text-xl">{property.id}</p>
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
            value={formatCurrency(property.propertyPrice, property.currency)}
            icon={<CircleDollarSign size={18} />}
          />
          <DetailMetric
            label="Monthly Rent"
            value={formatCurrency(property.monthlyRent, property.currency)}
            icon={<Percent size={18} />}
          />
          <DetailMetric
            label="Estimated ROI"
            value={`${property.roi.toFixed(2)}%`}
            icon={<Sparkles size={18} />}
          />
          <DetailMetric
            label="Occupancy"
            value={property.occupancyStatus}
            icon={<ShieldCheck size={18} />}
          />
          <DetailMetric
            label="Lease Term"
            value={property.leaseTerm}
            icon={<CalendarDays size={18} />}
          />
          <DetailMetric
            label="Last Updated"
            value={property.listedDate}
            icon={<CalendarDays size={18} />}
          />
        </div>

        <div className="grid gap-6 p-4 sm:p-6 lg:grid-cols-[1.45fr_0.85fr]">
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
              Property Overview
            </p>
            <h2 className="mt-3 text-xl font-bold text-slate-900 sm:text-2xl">
              Built for clear backend mapping later
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              {property.description}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {property.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium leading-6 text-slate-700"
                >
                  {highlight}
                </div>
              ))}
            </div>
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
                <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4 text-sm">
                  <span className="text-slate-500">Rental Income</span>
                  <span className="font-semibold text-blue-700">
                    {formatCurrency(property.monthlyRent, property.currency)}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4 text-sm">
                  <span className="text-slate-500">Expected Yield</span>
                  <span className="font-semibold text-slate-900">
                    {property.roi.toFixed(2)}%
                  </span>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                Amenities
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {property.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}
