"use client";

import PropertyBrowser from "@/src/components/listings/PropertyBrowser";
import { investmentProperties } from "@/src/data/properties";

export default function InvestmentPage() {
  return (
    <PropertyBrowser
      properties={investmentProperties}
      source="investment"
    />
  );
}
