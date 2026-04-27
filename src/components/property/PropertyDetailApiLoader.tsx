"use client";

import { useMemo } from "react";
import PropertyDetailPage from "@/src/components/property/PropertyDetailPage";
import { useViewPropertyQuery } from "@/src/redux/features/property/propertyApi";
import { Property, PropertySource, PropertyStatus, PropertyType } from "@/src/types/property";

interface PropertyDetailApiLoaderProps {
  slug: string;
  propertyId?: string;
  source?: PropertySource;
  fallbackProperty: Property | null;
}

function toNumber(value: unknown, fallback = 0): number {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : fallback;
}

function toText(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function toPropertyType(value: unknown): PropertyType {
  const normalized = typeof value === "string" ? value.toLowerCase().trim() : String(value);

  if (normalized === "hotel" || normalized === "1") return "Hotel";
  if (
    normalized === "service apartment" ||
    normalized === "service_apartment" ||
    normalized === "2"
  ) {
    return "Service Apartment";
  }
  if (normalized === "resort" || normalized === "3") return "Resort";
  if (normalized === "villa" || normalized === "4") return "Villa";
  return "Commercial";
}

function toPropertyStatus(value: unknown): PropertyStatus {
  const normalized = typeof value === "string" ? value.toLowerCase().trim() : String(value);

  if (normalized === "lease" || normalized === "lease-ready" || normalized === "2") {
    return "Lease-Ready";
  }
  if (normalized === "sell" || normalized === "sale" || normalized === "3") {
    return "Sale";
  }
  return "Pre-Leased";
}

function toImageUrl(value: unknown): string {
  if (typeof value === "string" && value.trim()) {
    return value;
  }

  return "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1400&q=80";
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
    const title = toText(property.property_name, `Property ${index + 1}`);
    const city = toText(property.city, "Unknown City");
    const propertyStatus = toPropertyStatus(property.intent);

    normalizedProperties.push({
      id,
      slug: toText(property.slug, `${id.toLowerCase().replace(/\s+/g, "-")}-${index + 1}`),
      source: "listings",
      title,
      city,
      state: toText(property.state, ""),
      country: toText(property.country, "India"),
      propertyType: toPropertyType(property.property_type),
      areaInSqFt: toNumber(property.area_in_sqft, 0),
      propertyPrice: toNumber(property.expected_price_rent, 0),
      monthlyRent: toNumber(property.current_monthly_income, 0),
      roi: toNumber(property.roi, 0),
      imageUrl: toImageUrl(property.uploaded_documents),
      currency: "₹",
      propertyStatus,
      statusLabel: propertyStatus,
      description: toText(property.full_address, "No description available."),
      highlights: [],
      amenities: [],
      leaseTerm: toText(property.lease_term, "N/A"),
      occupancyStatus: `${toNumber(property.current_occupancy_percent, 0)}% occupied`,
      listedDate: toText(property.created_at, "Recently listed"),
    });
  });

  return normalizedProperties;
}

export default function PropertyDetailApiLoader({
  slug,
  propertyId,
  source,
  fallbackProperty,
}: PropertyDetailApiLoaderProps) {
  const shouldFetchListings = source === "listings";
  const { data, isLoading } = useViewPropertyQuery(undefined, {
    skip: !shouldFetchListings,
  });

  const apiProperties = useMemo(() => normalizeApiProperties(data), [data]);

  const selectedFromApi = useMemo(() => {
    if (!shouldFetchListings) return null;

    if (propertyId) {
      const byId = apiProperties.find((item) => item.id === propertyId);
      if (byId) return byId;
    }

    return apiProperties.find((item) => item.slug === slug) ?? null;
  }, [apiProperties, propertyId, shouldFetchListings, slug]);

  const property = selectedFromApi ?? fallbackProperty;

  if (!property) {
    if (isLoading) {
      return (
        <main className="mx-auto max-w-[1240px] px-4 py-16 sm:px-6">
          <p className="text-sm text-slate-500">Loading property details...</p>
        </main>
      );
    }

    return (
      <main className="mx-auto max-w-[1240px] px-4 py-16 sm:px-6">
        <p className="text-sm text-slate-500">Property not found.</p>
      </main>
    );
  }

  return <PropertyDetailPage property={property} backHref="/listings" backLabel="Listings" />;
}
