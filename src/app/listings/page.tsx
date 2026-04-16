import ContactFAQ from '@/src/components/contact/Contactfaq';
import ListingPage from '@/src/components/listings/ListingPage';

type ListingProps = {
  searchParams: Promise<{ intent?: string | string[] }>;
};

const Listing = async ({ searchParams }: ListingProps) => {
  const resolvedSearchParams = await searchParams;
  const rawIntent = resolvedSearchParams.intent;
  const intent = Array.isArray(rawIntent) ? rawIntent[0] : rawIntent;

  return (
    <div>
        <ListingPage key={intent ?? "preleased"} initialIntent={intent ?? null} />
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
          <ContactFAQ />
        </div>
        
    </div>
  )
}

export default Listing;
