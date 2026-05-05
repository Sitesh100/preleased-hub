"use client";

import React, { useState } from "react";
import { SlidersHorizontal, Search } from "lucide-react";
import { PropertyStatus } from "@/src/types/property";

// ─── Types ────────────────────────────────────────────────────────────────────
export type ListingFilterType = "All" | PropertyStatus;

export interface FilterState {
  city: string;
  area: string;
  listingType: ListingFilterType;
  propertyType: string;
  propertyStatus: PropertyStatus;
}

export const defaultFilters: FilterState = {
  city: "",
  area: "",
  listingType: "All",
  propertyType: "",
  propertyStatus: "Pre-Leased",
};

// ─── Options ─────────────────────────────────────────────────────────────────

const PROPERTY_TYPE_OPTIONS = [
  { value: "", label: "Any type" },
  { value: "1", label: "Hotel" },
  { value: "2", label: "Resort" },
  { value: "3", label: "Villa" },
  { value: "4", label: "Service Apartment" },
  { value: "5", label: "Holiday Home" },
];
const STATUS_OPTIONS: ListingFilterType[] = ["All", "Pre-Leased", "Lease-Ready", "Sale"];

// ─── Shared input class ───────────────────────────────────────────────────────

const inputCls =
  "w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white text-slate-800 focus:outline-none focus:border-blue-500 transition-colors";

const selectCls =
  "w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white text-slate-800 focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer";

// ─── Component ────────────────────────────────────────────────────────────────

interface FilterBarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onApply: (filters: FilterState) => void;
  onReset: () => void;
  onStatusChange: (status: ListingFilterType) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onChange,
  onApply,
  onReset,
  onStatusChange,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  function set<K extends keyof FilterState>(key: K, value: FilterState[K]) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

      {/* ── Top row: location + buttons ── */}
      <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-800 focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="city"
            value={filters.city}
            onChange={(e) => set("city", e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onApply(filters)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 md:flex md:items-center">
          <button
            onClick={() => setShowAdvanced((v) => !v)}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg border transition-colors duration-200 cursor-pointer ${
              showAdvanced
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"
            }`}
          >
            <SlidersHorizontal size={15} />
            Filters
          </button>

          <button
            onClick={onReset}
            className="px-4 py-2.5 text-sm font-semibold text-slate-500 border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-slate-700 transition-colors duration-200 cursor-pointer"
          >
            Reset all
          </button>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-slate-100 p-1.5">
        <div className="grid grid-cols-4 gap-1.5">
          {STATUS_OPTIONS.map((status) => {
            const active = filters.listingType === status;

            return (
              <button
                key={status}
                onClick={() => {
                  onStatusChange(status);
                  set("listingType", status);
                }}
                className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                  active
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {status}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Advanced filters (collapsible) ── */}
      {showAdvanced && (
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Property size (area)</label>
              <input
                type="number"
                className={inputCls}
                placeholder="Area"
                value={filters.area}
                min={0}
                onChange={(e) => set("area", e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Property type</label>
              <select className={selectCls} value={filters.propertyType} onChange={(e) => set("propertyType", e.target.value)}>
                {PROPERTY_TYPE_OPTIONS.map((option) => (
                  <option key={option.value || "any"} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

          </div>

          <div className="flex justify-end">
            <button
              onClick={() => onApply(filters)}
              className="px-5 py-2 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-700 transition-colors duration-200 cursor-pointer"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
