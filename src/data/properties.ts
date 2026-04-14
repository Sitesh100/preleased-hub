import { Property, PropertySource } from "@/src/types/property";

export const listingProperties: Property[] = [
  {
    id: "LST-001",
    slug: "31-key-running-hotel-indore",
    source: "listings",
    title: "31-Key Running Hotel",
    city: "Indore",
    state: "Madhya Pradesh",
    country: "India",
    propertyType: "Hotel",
    areaInSqFt: 18500,
    propertyPrice: 510000,
    monthlyRent: 33150,
    roi: 4.1,
    imageUrl:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1400&q=80",
    statusLabel: "Operational Asset",
    description:
      "A stabilized hospitality asset in a growing commercial corridor, positioned for buyers looking for a ready-to-operate property with immediate revenue visibility and straightforward backend integration later.",
    highlights: [
      "31 operational keys with active hospitality use",
      "Strong city-center access for business and transit demand",
      "Configured for quick mapping to listing APIs later",
      "Revenue-oriented asset suitable for yield-led discovery",
    ],
    amenities: ["Parking", "Security", "Restaurant", "Reception"],
    leaseTerm: "9 years",
    occupancyStatus: "92% occupied",
    listedDate: "12 Jan 2026",
  },
  {
    id: "LST-002",
    slug: "service-apartment-block-gurugram",
    source: "listings",
    title: "Service Apartment Block",
    city: "Gurugram",
    state: "Haryana",
    country: "India",
    propertyType: "Service Apartment",
    areaInSqFt: 14200,
    propertyPrice: 670000,
    monthlyRent: 43550,
    roi: 4.11,
    imageUrl:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=80",
    statusLabel: "Managed Inventory",
    description:
      "A professionally managed service apartment block designed for urban long-stay demand, with a clean investment profile and enough detail fields to model real API responses later.",
    highlights: [
      "Established long-stay demand in a corporate micro-market",
      "Efficient unit layout across professionally managed floors",
      "Ideal candidate for listings search and compare flows",
      "Designed to scale into live API-driven property payloads",
    ],
    amenities: ["Gym", "Parking", "Security", "Housekeeping"],
    leaseTerm: "6 years",
    occupancyStatus: "88% occupied",
    listedDate: "08 Feb 2026",
  },
  {
    id: "LST-003",
    slug: "city-center-business-hotel-pune",
    source: "listings",
    title: "City Center Business Hotel",
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    propertyType: "Hotel",
    areaInSqFt: 16500,
    propertyPrice: 420000,
    monthlyRent: 27300,
    roi: 4.12,
    imageUrl:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1400&q=80",
    statusLabel: "Income Generating",
    description:
      "A centrally located hotel asset suited to users who need a polished listing experience today and an extensible property data structure for tomorrow's backend integration.",
    highlights: [
      "Core-city business catchment with repeat demand",
      "Revenue profile aligned to hospitality investors",
      "Balanced ticket size for marketplace discovery",
      "Ready to plug into future listing endpoints",
    ],
    amenities: ["Conference Room", "Parking", "Restaurant", "Security"],
    leaseTerm: "12 years",
    occupancyStatus: "90% occupied",
    listedDate: "19 Mar 2026",
  },
];

export const investmentProperties: Property[] = [
  {
    id: "INV-001",
    slug: "boutique-resort-goa-investment",
    source: "investment",
    title: "Boutique Beachfront Resort",
    city: "Goa",
    state: "Goa",
    country: "India",
    propertyType: "Resort",
    areaInSqFt: 22000,
    propertyPrice: 980000,
    monthlyRent: 62000,
    roi: 4.55,
    imageUrl:
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1400&q=80",
    statusLabel: "High-Yield Opportunity",
    description:
      "A boutique resort opportunity curated for the investment page, with a richer yield narrative and enough structured dummy fields to mirror how the backend response can later drive the same reusable UI.",
    highlights: [
      "Beachfront positioning with premium ADR potential",
      "Designed for investment discovery rather than standard browsing",
      "Distinct dataset from listings while sharing the same components",
      "Structured for clean future API mapping",
    ],
    amenities: ["Pool", "Spa", "Restaurant", "Parking", "Security"],
    leaseTerm: "15 years",
    occupancyStatus: "Seasonal 85%-95%",
    listedDate: "03 Apr 2026",
  },
  {
    id: "INV-002",
    slug: "luxury-villa-complex-udaipur-investment",
    source: "investment",
    title: "Luxury Villa Complex",
    city: "Udaipur",
    state: "Rajasthan",
    country: "India",
    propertyType: "Villa",
    areaInSqFt: 19800,
    propertyPrice: 1200000,
    monthlyRent: 78000,
    roi: 4.68,
    imageUrl:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1400&q=80",
    statusLabel: "Premium Portfolio Asset",
    description:
      "A premium villa cluster suited to buyers looking for lifestyle-led investment inventory, modeled as a separate investment dataset while continuing to use the same shared card, filters, and detail page.",
    highlights: [
      "Luxury inventory targeting destination demand",
      "Premium yield story with strong long-term positioning",
      "Supports the same detail UI as listings without duplication",
      "Clear placeholder schema for backend property enrichment",
    ],
    amenities: ["Pool", "Garden", "Security", "Parking"],
    leaseTerm: "10 years",
    occupancyStatus: "87% occupied",
    listedDate: "28 Mar 2026",
  },
  {
    id: "INV-003",
    slug: "commercial-hospitality-hub-mumbai-investment",
    source: "investment",
    title: "Commercial Hospitality Hub",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    propertyType: "Commercial",
    areaInSqFt: 31000,
    propertyPrice: 2400000,
    monthlyRent: 145000,
    roi: 4.38,
    imageUrl:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&q=80",
    statusLabel: "Institutional Grade",
    description:
      "A larger-format hospitality-led commercial asset built into the investment inventory to demonstrate how both sections can diverge in content while still sharing one polished frontend system.",
    highlights: [
      "Institutional-scale footprint in a major metro",
      "Suitable for investment-first exploration experiences",
      "Separate source tagging for cleaner API substitution later",
      "Flexible enough for richer backend-driven analytics",
    ],
    amenities: ["Parking", "Security", "Storage", "Retail Frontage"],
    leaseTerm: "18 years",
    occupancyStatus: "94% occupied",
    listedDate: "11 Apr 2026",
  },
];

export const allProperties = [...listingProperties, ...investmentProperties];

export function getPropertiesBySource(source: PropertySource) {
  return source === "investment" ? investmentProperties : listingProperties;
}

export function getPropertyBySlug(slug: string, source?: PropertySource) {
  if (source) {
    return getPropertiesBySource(source).find((property) => property.slug === slug);
  }

  return allProperties.find((property) => property.slug === slug);
}
