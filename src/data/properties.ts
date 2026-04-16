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
    propertyStatus: "Pre-Leased",
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
    propertyStatus: "Lease-Ready",
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
    propertyStatus: "Sale",
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

export const allProperties = [...listingProperties];

export function getPropertiesBySource(source: PropertySource) {
  return source === "listings" ? listingProperties : listingProperties;
}

export function getPropertyBySlug(slug: string, source?: PropertySource) {
  if (source) {
    return getPropertiesBySource(source).find((property) => property.slug === slug);
  }

  return allProperties.find((property) => property.slug === slug);
}
