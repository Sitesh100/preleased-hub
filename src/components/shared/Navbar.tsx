'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import logo from '@/src/assets/logo/logo.png';
import AuthPopup from '@/src/components/auth/AuthPopup';

const LINKS = [
  { href: '/listings', label: 'Explore Property' },
  { href: '/post-property', label: 'List Property' },
  { href: '/about', label: 'About Us' },
];

const Navbar = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <>
      <nav className="sticky top-0 z-40 w-full border-b bg-white/70 shadow-sm">
        <div className="mx-auto flex h-[74px] max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center">
            <Image
              src={logo}
              alt="PrereleaseHub Logo"
              className="h-9 w-auto object-contain sm:h-10 lg:h-11"
              priority
            />
          </Link>

          <ul className="m-0 hidden list-none items-center gap-3 p-0 lg:flex">
            {LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`inline-flex rounded-[13px] px-6 py-2.5 text-sm font-normal leading-none whitespace-nowrap no-underline transition ${
                    isActive(href)
                      ? 'bg-[#0b1536] text-white'
                      : 'bg-[#f2f4f8] text-[#1f1f1f] hover:bg-white'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setAuthOpen(true)}
              className="hidden rounded-[13px] bg-[#020a25] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-95 lg:inline-flex"
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#2f3a62] text-black transition hover:bg-gray-50 lg:hidden"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[74px] z-40 border-b border-[#223055] bg-[#040b24] shadow-lg backdrop-blur lg:hidden">
          <div className="mx-auto flex max-h-[calc(100vh-74px)] max-w-screen-xl flex-col overflow-y-auto px-4 py-4 sm:px-6">
            <div className="grid gap-2">
              {LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive(href)
                      ? 'bg-[#0b1536] text-white'
                      : 'bg-[#f2f4f8] text-[#1f1f1f] hover:bg-white'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setAuthOpen(true);
              }}
              className="mt-3 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#020a25] transition hover:opacity-95"
            >
              Login
            </button>
          </div>
        </div>
      )}

      <AuthPopup
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        defaultTab="login"
      />
    </>
  );
};

export default Navbar;
