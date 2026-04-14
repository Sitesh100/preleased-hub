"use client";

import React from "react";
import Image from "next/image";
import { MapPin, Share2, Building2, Maximize2 } from "lucide-react";
import { formatCurrency, Property } from "@/src/types/property";

// ─── Component ────────────────────────────────────────────────────────────────

interface PropertyCardProps {
  property: Property;
  onViewDetails?: (property: Property) => void;
  onContact?: (property: Property) => void;
  onShare?: (property: Property) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onViewDetails,
  onContact,
  onShare,
}) => {
  const { id, title, city, propertyType, areaInSqFt, propertyPrice, monthlyRent, roi, imageUrl, currency } = property;

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl">

      {/* ── Image ── */}
      <div className="relative h-48 bg-slate-100 flex-shrink-0 overflow-hidden">
        <span className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-bold px-2 py-0.5 rounded-md tracking-wide">
          {id}
        </span>
        <button
          className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm text-slate-500 hover:text-blue-600 hover:bg-white w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200"
          onClick={() => onShare?.(property)}
          aria-label="Share property"
        >
          <Share2 size={15} />
        </button>
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* ── Body ── */}
      <div className="p-4 flex flex-col gap-2.5 flex-1">
        <h3 className="text-[1rem] font-bold text-slate-900 leading-snug">{title}</h3>

        <p className="flex items-center gap-1 text-sm text-slate-500">
          <MapPin size={13} />
          {city}
        </p>

        <div className="flex flex-col gap-2 text-xs text-slate-500 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
          <span className="flex items-center gap-1">
            <Building2 size={13} />
            {propertyType}
          </span>
          <span className="flex items-center gap-1">
            <Maximize2 size={13} />
            {areaInSqFt.toLocaleString()} sq ft
          </span>
        </div>

        {/* ── Pricing table ── */}
        <div className="bg-slate-50 border border-slate-100 rounded-lg px-3 py-2.5 flex flex-col gap-1.5 mt-1">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">Property Price</span>
            <span className="font-semibold text-blue-700">{formatCurrency(propertyPrice, currency)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">Monthly Rent</span>
            <span className="font-semibold text-blue-700">{formatCurrency(monthlyRent, currency)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">ROI</span>
            <span className="font-bold text-slate-800">{roi.toFixed(2)}%</span>
          </div>
        </div>

        {/* ── Actions ── */}
        <div className="mt-auto grid grid-cols-1 gap-2.5 pt-1 sm:grid-cols-2">
          <button
            className="py-2.5 px-4 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 hover:border-slate-800 hover:text-slate-900 transition-colors duration-200 cursor-pointer"
            onClick={() => onViewDetails?.(property)}
          >
            View Details
          </button>
          <button
            className="py-2.5 px-4 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-700 transition-colors duration-200 cursor-pointer"
            onClick={() => onContact?.(property)}
          >
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
