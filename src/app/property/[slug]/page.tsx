import PropertyDetailApiLoader from "@/src/components/property/PropertyDetailApiLoader";
import { getPropertyBySlug } from "@/src/data/properties";
import { PropertySource } from "@/src/types/property";

interface PropertyPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ source?: string | string[]; id?: string | string[] }>;
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
  const rawId = resolvedSearchParams.id;
  const propertyId = Array.isArray(rawId) ? rawId[0] : rawId;
  const fallbackProperty = getPropertyBySlug(slug, source);

  return (
    <PropertyDetailApiLoader
      slug={slug}
      propertyId={propertyId}
      source={source}
      fallbackProperty={fallbackProperty ?? null}
    />
  );
}
