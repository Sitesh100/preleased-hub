"use client";

import ContactForm from "./Contactform";
import ContactFAQ from "./Contactfaq";

export default function ContactUsPage() {
  return (
    <main className="bg-[#f8fafc] text-[#0f1f4b]">
      {/* HERO */}
      <section className="bg-gradient-to-r from-[#4a7fb5] to-[#2d5a8e] pb-16 pt-20 md:pb-20 md:pt-28">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1 text-sm text-white/90 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-[#f0c040]" />
            We respond fast — usually within 24 hours
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold text-white md:text-5xl">
            Let owners, investors, and operators connect faster
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/80">
            Use this page for direct inquiries, partnerships, and guided hospitality transactions.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="#contact-form"
              className="rounded-full bg-[#f0c040] px-6 py-3 text-sm font-semibold text-[#0f1f4b] shadow-sm transition hover:bg-[#f5d060]"
            >
              Send a message
            </a>
            <a
              href="/listings"
              className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
            >
              Browse listings
            </a>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div id="contact-form" className="mx-auto max-w-7xl px-6 py-14 md:py-20">
        {/* Contact form section */}
        <ContactForm />

        {/* FAQ section */}
        <ContactFAQ />
      </div>
    </main>
  );
}