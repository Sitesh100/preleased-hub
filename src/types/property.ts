export type PropertyType =
  | "Hotel"
  | "Service Apartment"
  | "Resort"
  | "Villa"
  | "Commercial";

export type PropertySource = "listings" | "investment";

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
  propertyPrice: number;
  monthlyRent: number;
  roi: number;
  imageUrl: string;
  currency?: string;
  statusLabel: string;
  description: string;
  highlights: string[];
  amenities: string[];
  leaseTerm: string;
  occupancyStatus: string;
  listedDate: string;
}

export function formatCurrency(amount: number, currency = "$"): string {
  return `${currency}${amount.toLocaleString("en-US")}`;
}

export function formatLocation(property: Pick<Property, "city" | "state" | "country">) {
  return [property.city, property.state, property.country].filter(Boolean).join(", ");
}
