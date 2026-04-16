import ContactFAQ from '@/src/components/contact/Contactfaq';
import ListingPage from '@/src/components/listings/ListingPage';

const Listing = () => {
  return (
    <div>
        <ListingPage />
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
          <ContactFAQ />
        </div>
        
    </div>
  )
}

export default Listing;