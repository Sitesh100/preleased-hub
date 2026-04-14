"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import FilterBar, {
  defaultFilters,
  FilterState,
} from "@/src/components/listings/FilterBar";
import PropertyCard from "@/src/components/listings/PropertyCard";
import { Property, PropertySource } from "@/src/types/property";

function applyFilters(properties: Property[], filters: FilterState): Property[] {
  let result = [...properties];

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
}

export default function PropertyBrowser({
  properties,
  source,
  emptyMessage = "No properties match your filters.",
}: PropertyBrowserProps) {
  const router = useRouter();
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [appliedFilters, setAppliedFilters] =
    useState<FilterState>(defaultFilters);

  const filteredProperties = useMemo(
    () => applyFilters(properties, appliedFilters),
    [appliedFilters, properties]
  );

  function handleReset() {
    setFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
  }

  function handleViewDetails(property: Property) {
    router.push(`/property/${property.slug}?source=${source}`);
  }

  function handleContact(property: Property) {
    console.log("Contact for:", property.id);
  }

  function handleShare(property: Property) {
    const detailUrl = `${window.location.origin}/property/${property.slug}?source=${source}`;

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
    </main>
  );
}
