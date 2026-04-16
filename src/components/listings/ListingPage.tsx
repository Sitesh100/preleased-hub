"use client";

import PropertyBrowser from "@/src/components/listings/PropertyBrowser";
import { listingProperties } from "@/src/data/properties";

interface ListingPageProps {
  initialIntent?: string | null;
}

export default function ListingPage({ initialIntent = null }: ListingPageProps) {
  return (
    <PropertyBrowser
      properties={listingProperties}
      source="listings"
      initialIntent={initialIntent}
    />
  );
}
