"use client";

import PropertyBrowser from "@/src/components/listings/PropertyBrowser";
import { listingProperties } from "@/src/data/properties";

export default function ListingPage() {
  return <PropertyBrowser properties={listingProperties} source="listings" />;
}
