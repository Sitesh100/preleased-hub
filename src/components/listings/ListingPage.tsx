"use client";

import { useMemo } from "react";
import PropertyBrowser from "@/src/components/listings/PropertyBrowser";
import { useViewPropertyQuery } from "@/src/redux/features/property/propertyApi";
import { Property, PropertyStatus, PropertyType } from "@/src/types/property";

interface ListingPageProps {
  initialIntent?: string | null;
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
    const title = toText(property.property_name, `Property ${index + 1}`);
    const city = toText(property.city, "Unknown City");
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
      title,
      city,
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

export default function ListingPage({ initialIntent = null }: ListingPageProps) {
  const { data, isLoading } = useViewPropertyQuery();

  const properties = useMemo(() => normalizeApiProperties(data), [data]);

  if (isLoading && properties.length === 0) {
    return (
      <main className="max-w-[1240px] mx-auto px-4 sm:px-6 py-8 pb-16">
        <p className="text-sm text-slate-500">Loading properties...</p>
      </main>
    );
  }

  return (
    <PropertyBrowser
      properties={properties}
      source="listings"
      initialIntent={initialIntent}
    />
  );
}
