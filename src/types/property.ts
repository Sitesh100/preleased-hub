export type PropertyType =
  | "Hotel"
  | "Resort"
  | "Villa"
  | "Service Apartment"
  | "Holiday Home"
  | "Commercial";

export type PropertySource = "listings";
export type PropertyStatus = "Pre-Leased" | "Lease-Ready" | "Sale";

export interface PropertyDocument {
  id: string;
  document_file: string;
}

export interface Property {
  id: string;
  slug: string;
  source: PropertySource;
  title: string;
  city: string;
  state: string;
  country: string;
  propertyType: PropertyType;
  areaInSqFt: number;
  rooms?: number;
  propertyPrice: number;
  expectedMonthlyRent?: number;
  monthlyRent: number;
  roi: number;
  imageUrl: string;
  currency?: string;
  propertyStatus: PropertyStatus;
  statusLabel: string;
  listingType: number;
  description: string;
  highlights: string[];
  amenities: string[];
  leaseTerm: string;
  occupancyStatus: string;
  listedDate: string;
  documents?: PropertyDocument[];
}

export function formatCurrency(amount: number, currency = "$"): string {
  return `${currency}${amount.toLocaleString("en-US")}`;
}

export function formatLocation(property: Pick<Property, "city" | "state" | "country">) {
  return [property.city, property.state, property.country].filter(Boolean).join(", ");
}
