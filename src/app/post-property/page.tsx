import ContactFAQ from '@/src/components/contact/Contactfaq'
import PostPropertyPage from '@/src/components/post-property/page'
import React from 'react'

const Postpropertypage = () => {
  return (
    <div>
        <PostPropertyPage />
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
                   <ContactFAQ />
                </div>
    </div>
  )
}

export default Postpropertypage