'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import logo from "@/src/assets/logo/logo.png";
import AuthPopup from '@/src/components/auth/AuthPopup';

const LINKS = [
  { href: '/',                label: 'Home' },
  { href: '/listings',        label: 'Listings' },
  { href: '/investment',      label: 'Investment' },
  { href: '/post-property',   label: 'Post Property' },
  { href: '/about',           label: 'What we do' },
  { href: '/contact',         label: 'Contact' },
];

const Navbar = () => {
  const pathname = usePathname();
  const [authOpen, setAuthOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={logo}
              alt="PrereleaseHub Logo"
              className="h-9 w-auto object-contain sm:h-10 lg:h-11"
            />
          </Link>

          {/* Desktop Nav Links */}
          <ul className="m-0 hidden list-none items-center gap-1 p-0 lg:flex">
            {LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`relative px-3 py-2 text-sm whitespace-nowrap transition-colors duration-200 no-underline
                    ${isActive(href)
                      ? 'text-gray-900 font-medium after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-gray-900 after:rounded-full'
                      : 'text-gray-600 hover:text-gray-900 font-normal'
                    }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setAuthOpen(true)}
              className="hidden rounded-md border-none bg-gray-900 px-5 py-2.5 text-sm font-medium whitespace-nowrap text-white transition-colors duration-200 cursor-pointer hover:bg-gray-800 lg:inline-flex"
            >
              Login / Register
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50 lg:hidden"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-16 z-40 border-b border-slate-200 bg-white/95 shadow-lg backdrop-blur lg:hidden">
          <div className="mx-auto flex max-h-[calc(100vh-4rem)] max-w-screen-xl flex-col overflow-y-auto px-4 py-4 sm:px-6">
            <div className="grid gap-1">
              {LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive(href)
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setAuthOpen(true);
              }}
              className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Login / Register
            </button>
          </div>
        </div>
      )}

      {/* Auth Popup */}
      <AuthPopup
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        defaultTab="login"
      />
    </>
  );
};

export default Navbar;
