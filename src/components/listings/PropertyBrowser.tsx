"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import FilterBar, {
  defaultFilters,
  FilterState,
  ListingFilterType,
} from "@/src/components/listings/FilterBar";
import PropertyCard from "@/src/components/listings/PropertyCard";
import AuthPopup from "@/src/components/auth/AuthPopup";
import { Property, PropertySource, PropertyStatus } from "@/src/types/property";
import { useLazyFilterPropertiesQuery } from "@/src/redux/features/property/propertyApi";

function toNumber(value: unknown, fallback = 0): number {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : fallback;
}

function toText(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function toPropertyType(value: unknown): Property["propertyType"] {
  const normalized = typeof value === "string" ? value.toLowerCase().trim() : String(value);

  if (normalized === "hotel" || normalized === "1") return "Hotel";
  if (normalized === "resort" || normalized === "2") return "Resort";
  if (normalized === "villa" || normalized === "3") return "Villa";
  if (normalized === "service apartment" || normalized === "service_apartment" || normalized === "4") return "Service Apartment";
  if (normalized === "holiday home" || normalized === "holiday_home" || normalized === "5") return "Holiday Home";
  return "Commercial";
}

function toPropertyStatus(value: unknown): PropertyStatus {
  const normalized = typeof value === "string" ? value.toLowerCase().trim() : String(value);

  if (normalized === "lease" || normalized === "lease-ready" || normalized === "2") {
    return "Lease-Ready";
  }
  if (normalized === "sell" || normalized === "sale" || normalized === "1") {
    return "Sale";
  }
  return "Pre-Leased";
}

function toImageUrl(value: unknown): string {
  if (Array.isArray(value) && value.length > 0) {
    const first = value[0];
    if (first && typeof first === "object") {
      const filePath = (first as { document_file?: unknown }).document_file;
      if (typeof filePath === "string" && filePath.trim()) {
        if (filePath.startsWith("http://") || filePath.startsWith("https://")) return filePath;
        return `${process.env.NEXT_PUBLIC_MEDIA_BASE_URL || ""}${filePath}`;
      }
    }
  }
  if (typeof value === "string" && value.trim()) {
    return value;
  }
  return "";
}

function normalizeApiProperties(payload: unknown): Property[] {
  const responseData =
    payload && typeof payload === "object" && "data" in payload
      ? (payload as { data?: unknown }).data
      : payload;

  if (!Array.isArray(responseData)) {
    return [];
  }

  const normalizedProperties: Property[] = [];
  responseData.forEach((item, index) => {
    if (!item || typeof item !== "object") return;
    const property = item as Record<string, unknown>;
    const id = toText(property.id, `API-${index + 1}`);
    const listingType = toNumber(property.listing_type, 0);
    const propertyStatus = toPropertyStatus(listingType);
    const annualRentalIncome = toNumber(property.annual_rental_income, 0);
    const sellingPrice = toNumber(property.selling_price, 0);
    const expectedMonthlyRent = toNumber(property.expected_monthly_rent, 0);
    const monthlyRent = listingType === 3 ? annualRentalIncome / 12 : expectedMonthlyRent;
    const roi = listingType === 3 && sellingPrice > 0 ? (annualRentalIncome / sellingPrice) * 100 : 0;

    normalizedProperties.push({
      id,
      slug: toText(property.slug, `${id.toLowerCase().replace(/\s+/g, "-")}-${index + 1}`),
      source: "listings",
      title: toText(property.property_name, `Property ${index + 1}`),
      city: toText(property.city, "Unknown City"),
      state: toText(property.location, toText(property.state, "")),
      country: toText(property.country, "India"),
      propertyType: toPropertyType(property.property_type),
      areaInSqFt: toNumber(property.built_up_area, 0),
      propertyPrice: sellingPrice,
      monthlyRent,
      roi,
      imageUrl: toImageUrl(property.documents),
      currency: "₹",
      propertyStatus,
      statusLabel: toText(property.status, propertyStatus),
      listingType,
      description: toText(property.property_description, "No description available."),
      highlights: [],
      amenities: [],
      leaseTerm: toText(property.lock_in_period, "N/A"),
      occupancyStatus: "N/A",
      listedDate: toText(property.created_at, "Recently listed"),
    });
  });

  return normalizedProperties;
}

function listingTypeFromFilter(listingType: ListingFilterType): string | undefined {
  if (listingType === "All") return undefined;
  if (listingType === "Sale") return "1";
  if (listingType === "Lease-Ready") return "2";
  return "3";
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
  const [triggerFilterProperties, { data: filteredApiData, isFetching: isFiltering }] =
    useLazyFilterPropertiesQuery();
  const initialStatus = getStatusFromIntent(initialIntent);
  const initialFilters = {
    ...defaultFilters,
    propertyStatus: initialStatus,
    listingType: "All" as const,
  };

  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [appliedFilters, setAppliedFilters] =
    useState<FilterState>(initialFilters);

  const filteredProperties = useMemo(() => {
    if (filteredApiData !== undefined) {
      return normalizeApiProperties(filteredApiData);
    }
    if (appliedFilters.listingType === "All") {
      return properties;
    }
    return properties.filter((property) => property.propertyStatus === appliedFilters.listingType);
  }, [appliedFilters.listingType, filteredApiData, properties]);

  function applyServerFilter(nextFilters: FilterState) {
    void triggerFilterProperties({
      city: nextFilters.city || undefined,
      property_type: nextFilters.propertyType || undefined,
      listing_type: listingTypeFromFilter(nextFilters.listingType),
      area: nextFilters.area || undefined,
    });
  }

  useEffect(() => {
    applyServerFilter(initialFilters);
    // this should run once for initial page load filters
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleReset() {
    const nextFilters = {
      ...defaultFilters,
      propertyStatus: appliedFilters.propertyStatus,
      listingType: "All" as const,
    };
    setFilters(nextFilters);
    setAppliedFilters(nextFilters);
    applyServerFilter(nextFilters);
  }

  function handleStatusChange(status: ListingFilterType) {
    const nextFilters = {
      ...filters,
      listingType: status,
      propertyStatus: status === "All" ? filters.propertyStatus : status,
    };
    setFilters(nextFilters);
    setAppliedFilters(nextFilters);
    applyServerFilter(nextFilters);
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
        onApply={(nextFilters) => {
          setAppliedFilters(nextFilters);
          applyServerFilter(nextFilters);
        }}
        onReset={handleReset}
        onStatusChange={handleStatusChange}
      />

      <p className="text-sm text-slate-500 mt-5 mb-4">
        {isFiltering
          ? "Loading filtered properties..."
          : `${filteredProperties.length} ${
              filteredProperties.length === 1 ? "property" : "properties"
            } found`}
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
