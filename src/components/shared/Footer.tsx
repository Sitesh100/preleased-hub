import Link from "next/link";
import Image from "next/image";
import logo from "@/src/assets/logo/logo.png";

const FOOTER_COLS = [
  {
    label: "Platform",
    links: [
      { label: "Home",                    href: "/" },
      { label: "Investment Opportunities", href: "/investor/offering" },
      { label: "Lease Properties",         href: "/listings?intent=lease" },
      { label: "List Property",            href: "/listings" },
    ],
  },
  {
    label: "Audience",
    links: [
      { label: "Owners",   href: "/account/become-seller" },
      { label: "Investors", href: "/investor/offering" },
      { label: "Hoteliers", href: "/listings?intent=lease" },
      { label: "Dashboard", href: "https://dashboard-tau-eight-29.vercel.app/seller" },
    ],
  },
  {
    label: "Contact",
    links: [
      { label: "+91 79966 62242", href: "tel:+917996662242" },
      { label: "contact@preleasehub.com", href: "mailto:contact@preleasehub.com" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--slate-200)] bg-[var(--navy)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-12 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* brand */}
          <div className="md:col-span-1">
            <Image src={logo} alt="PreleaseHub" width={160} height={42} className="h-auto w-[150px] brightness-0 invert" />
            <p className="mt-4 text-sm leading-7 text-white/55">
              India&apos;s Hospitality Asset Marketplace for income-backed investors.
            </p>
          </div>

          {/* cols */}
          {FOOTER_COLS.map((col) => (
            <div key={col.label}>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-[var(--gold)]">{col.label}</p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-white/55 transition hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-8 text-xs text-white/35 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} PreleaseHub. All rights reserved.</p>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            {["Privacy Policy", "Terms of Use", "Disclaimer"].map((t) => (
              <Link key={t} href="#" className="transition hover:text-white/70">{t}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
