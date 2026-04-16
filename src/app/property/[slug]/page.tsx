import { notFound } from "next/navigation";
import PropertyDetailPage from "@/src/components/property/PropertyDetailPage";
import { getPropertyBySlug } from "@/src/data/properties";
import { PropertySource } from "@/src/types/property";

interface PropertyPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ source?: string | string[] }>;
}

function getSourceFromSearchParam(
  source: string | string[] | undefined
): PropertySource | undefined {
  const value = Array.isArray(source) ? source[0] : source;

  if (value === "listings") {
    return value;
  }

  return undefined;
}

export default async function PropertyPage({
  params,
  searchParams,
}: PropertyPageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const source = getSourceFromSearchParam(resolvedSearchParams.source);
  const property = getPropertyBySlug(slug, source);

  if (!property) {
    notFound();
  }

  return (
    <PropertyDetailPage
      property={property}
      backHref="/listings"
      backLabel="Listings"
    />
  );
}
