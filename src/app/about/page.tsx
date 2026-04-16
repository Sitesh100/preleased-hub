import About from '@/src/components/About/page'
import ContactBar from '@/src/components/contact/Contactbar'
import ContactFAQ from '@/src/components/contact/Contactfaq'
import React from 'react'

const Aboutpage = () => {
  return (
    <div>
        <About />
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
           <ContactFAQ />
           <ContactBar />
        </div>
        
    </div>
  )
}

export default Aboutpage