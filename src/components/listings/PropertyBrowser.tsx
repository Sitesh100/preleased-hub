"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import FilterBar, {
  defaultFilters,
  FilterState,
} from "@/src/components/listings/FilterBar";
import PropertyCard from "@/src/components/listings/PropertyCard";
import AuthPopup from "@/src/components/auth/AuthPopup";
import { Property, PropertySource, PropertyStatus } from "@/src/types/property";

function applyFilters(properties: Property[], filters: FilterState): Property[] {
  let result = [...properties];

  result = result.filter(
    (property) => property.propertyStatus === filters.propertyStatus
  );

  if (filters.search.trim()) {
    const query = filters.search.toLowerCase();
    result = result.filter(
      (property) =>
        property.title.toLowerCase().includes(query) ||
        property.city.toLowerCase().includes(query) ||
        property.propertyType.toLowerCase().includes(query)
    );
  }

  if (filters.priceMin !== "") {
    result = result.filter(
      (property) => property.propertyPrice >= Number(filters.priceMin)
    );
  }

  if (filters.priceMax !== "") {
    result = result.filter(
      (property) => property.propertyPrice <= Number(filters.priceMax)
    );
  }

  if (filters.propertyType !== "Any type") {
    result = result.filter(
      (property) => property.propertyType === filters.propertyType
    );
  }

  result.sort((a, b) => {
    const sortDiffs: Record<string, number> = {
      price: a.propertyPrice - b.propertyPrice,
      roi: a.roi - b.roi,
      area: a.areaInSqFt - b.areaInSqFt,
      rent: a.monthlyRent - b.monthlyRent,
    };

    const difference = sortDiffs[filters.sortField] ?? 0;
    return filters.sortOrder === "asc" ? difference : -difference;
  });

  return result;
}

interface PropertyBrowserProps {
  properties: Property[];
  source: PropertySource;
  emptyMessage?: string;
  initialIntent?: string | null;
}

function getStatusFromIntent(intent?: string | null): PropertyStatus {
  const normalizedIntent = intent?.toLowerCase().trim();

  if (normalizedIntent === "lease") return "Lease-Ready";
  if (normalizedIntent === "sell" || normalizedIntent === "sale") return "Sale";
  return "Pre-Leased";
}

export default function PropertyBrowser({
  properties,
  source,
  emptyMessage = "No properties match your filters.",
  initialIntent = null,
}: PropertyBrowserProps) {
  const router = useRouter();
  const [authOpen, setAuthOpen] = useState(false);
  const [pendingDetailProperty, setPendingDetailProperty] = useState<Property | null>(null);
  const initialStatus = getStatusFromIntent(initialIntent);
  const initialFilters = { ...defaultFilters, propertyStatus: initialStatus };

  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [appliedFilters, setAppliedFilters] =
    useState<FilterState>(initialFilters);

  const filteredProperties = useMemo(
    () => applyFilters(properties, appliedFilters),
    [appliedFilters, properties]
  );

  function handleReset() {
    setFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
  }

  function handleStatusChange(status: PropertyStatus) {
    setFilters((prev) => ({ ...prev, propertyStatus: status }));
    setAppliedFilters((prev) => ({ ...prev, propertyStatus: status }));
  }

  function isLoggedIn(): boolean {
    return localStorage.getItem("preleasehub:isLoggedIn") === "true";
  }

  function openPropertyDetails(property: Property) {
    router.push(`/property/${property.slug}?source=${source}&id=${property.id}`);
  }

  function handleViewDetails(property: Property) {
    if (!isLoggedIn()) {
      setPendingDetailProperty(property);
      setAuthOpen(true);
      return;
    }

    openPropertyDetails(property);
  }

  function handleContact(property: Property) {
    const message = `Hi PreleaseHub, please share full structured details for ${property.title} in ${property.city}.`;
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=917566663242&text=${encodeURIComponent(
      message
    )}&type=phone_number&app_absent=0`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  function handleLoginSuccess() {
    if (!pendingDetailProperty) return;

    openPropertyDetails(pendingDetailProperty);
    setPendingDetailProperty(null);
  }

  function handleShare(property: Property) {
    const detailUrl = `${window.location.origin}/property/${property.slug}?source=${source}&id=${property.id}`;

    if (navigator.share) {
      navigator.share({ title: property.title, url: detailUrl });
      return;
    }

    navigator.clipboard.writeText(detailUrl);
  }

  return (
    <main className="max-w-[1240px] mx-auto px-4 sm:px-6 py-8 pb-16">
      <FilterBar
        filters={filters}
        onChange={setFilters}
        onApply={setAppliedFilters}
        onReset={handleReset}
        onStatusChange={handleStatusChange}
      />

      <p className="text-sm text-slate-500 mt-5 mb-4">
        {filteredProperties.length} propert
        {filteredProperties.length === 1 ? "y" : "ies"} found
      </p>

      {filteredProperties.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-slate-500">
          <p className="text-base">{emptyMessage}</p>
          <button
            onClick={handleReset}
            className="px-5 py-2.5 text-sm font-semibold border border-slate-200 rounded-lg hover:border-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onViewDetails={handleViewDetails}
              onContact={handleContact}
              onShare={handleShare}
            />
          ))}
        </div>
      )}

      <AuthPopup
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        defaultTab="login"
        onLoginSuccess={handleLoginSuccess}
        redirectToDashboard={false}
      />
    </main>
  );
}
