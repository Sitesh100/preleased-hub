"use client";

import React, { useState } from "react";
import { SlidersHorizontal, Search } from "lucide-react";
import { PropertyStatus } from "@/src/types/property";

// ─── Types ────────────────────────────────────────────────────────────────────

export type SortField = "price" | "roi" | "area" | "rent";
export type SortOrder = "asc" | "desc";

export interface FilterState {
  search: string;
  propertyStatus: PropertyStatus;
  priceMin: number | "";
  priceMax: number | "";
  bedrooms: string;
  bathrooms: string;
  propertyType: string;
  amenities: string[];
  sortField: SortField;
  sortOrder: SortOrder;
}

export const defaultFilters: FilterState = {
  search: "",
  propertyStatus: "Pre-Leased",
  priceMin: "",
  priceMax: "",
  bedrooms: "Any bedrooms",
  bathrooms: "Any bathrooms",
  propertyType: "Any type",
  amenities: [],
  sortField: "price",
  sortOrder: "asc",
};

// ─── Options ─────────────────────────────────────────────────────────────────

const AMENITY_OPTIONS = ["Garden", "Storage", "Gym", "Pool", "Parking", "Security"];
const BEDROOM_OPTIONS = ["Any bedrooms", "1", "2", "3", "4", "5+"];
const BATHROOM_OPTIONS = ["Any bathrooms", "1", "2", "3", "4+"];
const PROPERTY_TYPE_OPTIONS = ["Any type", "Hotel", "Service Apartment", "Resort", "Villa", "Commercial"];
const SORT_FIELD_OPTIONS: { label: string; value: SortField }[] = [
  { label: "Price", value: "price" },
  { label: "ROI", value: "roi" },
  { label: "Area", value: "area" },
  { label: "Monthly Rent", value: "rent" },
];
const SORT_ORDER_OPTIONS: { label: string; value: SortOrder }[] = [
  { label: "Asc", value: "asc" },
  { label: "Desc", value: "desc" },
];
const STATUS_OPTIONS: PropertyStatus[] = ["Pre-Leased", "Lease-Ready", "Sale"];

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
  onStatusChange: (status: PropertyStatus) => void;
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

  function toggleAmenity(amenity: string) {
    const next = filters.amenities.includes(amenity)
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity];
    set("amenities", next);
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

      {/* ── Top row: search + buttons ── */}
      <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-800 focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="Search by city, country, or title"
            value={filters.search}
            onChange={(e) => set("search", e.target.value)}
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
        <div className="grid grid-cols-3 gap-1.5">
          {STATUS_OPTIONS.map((status) => {
            const active = filters.propertyStatus === status;

            return (
              <button
                key={status}
                onClick={() => onStatusChange(status)}
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

          {/* Row 1: inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Price range */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Price range</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  className={inputCls}
                  placeholder="Min"
                  value={filters.priceMin}
                  min={0}
                  onChange={(e) => set("priceMin", e.target.value === "" ? "" : Number(e.target.value))}
                />
                <span className="text-slate-400 font-bold">-</span>
                <input
                  type="number"
                  className={inputCls}
                  placeholder="Max"
                  value={filters.priceMax}
                  min={0}
                  onChange={(e) => set("priceMax", e.target.value === "" ? "" : Number(e.target.value))}
                />
              </div>
            </div>

            {/* Bedrooms */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Bedrooms</label>
              <select className={selectCls} value={filters.bedrooms} onChange={(e) => set("bedrooms", e.target.value)}>
                {BEDROOM_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>

            {/* Bathrooms */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Bathrooms</label>
              <select className={selectCls} value={filters.bathrooms} onChange={(e) => set("bathrooms", e.target.value)}>
                {BATHROOM_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>

            {/* Property type */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Property type</label>
              <select className={selectCls} value={filters.propertyType} onChange={(e) => set("propertyType", e.target.value)}>
                {PROPERTY_TYPE_OPTIONS.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>

          {/* Row 2: amenities + sort + apply */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            {/* Amenity chips */}
            <div className="flex flex-wrap gap-2">
              {AMENITY_OPTIONS.map((a) => (
                <button
                  key={a}
                  onClick={() => toggleAmenity(a)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors duration-200 cursor-pointer ${
                    filters.amenities.includes(a)
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-500 hover:text-slate-800"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>

            {/* Sort + Apply */}
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Sort</span>
              <select
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer sm:w-auto"
                value={filters.sortField}
                onChange={(e) => set("sortField", e.target.value as SortField)}
              >
                {SORT_FIELD_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <select
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer sm:w-auto"
                value={filters.sortOrder}
                onChange={(e) => set("sortOrder", e.target.value as SortOrder)}
              >
                {SORT_ORDER_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <button
                onClick={() => onApply(filters)}
                className="w-full px-5 py-2 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-700 transition-colors duration-200 cursor-pointer sm:w-auto"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
