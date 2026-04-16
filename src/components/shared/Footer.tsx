import Link from "next/link";
import Image from "next/image";
import logo from "@/src/assets/logo/logo.png";

const FOOTER_COLS = [
  {
    label: "QUICK LINKS",
    links: [
      { label: "Preleased Property", href: "/listings" },
      { label: "Want to Sell/Lease/Operator", href: "/post-property" },
      { label: "About Us", href: "/about" },
    ],
  },
  {
    label: "CONNECT US",
    links: [
      { label: "WhatsApp", href: "https://wa.me/917566663242?text=Hi%20PreleaseHub", external: true },
      { label: "Instagram", href: "https://instagram.com/preleasehub", external: true },
      { label: "Email", href: "mailto:connect@preleasehub.com" },
    ],
  },
];
export default function Footer() {
  return (
    <footer className="bg-[#0A1A2E]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-12 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* brand */}
          <div className="md:col-span-1">
            <Image src={logo} alt="PreleaseHub" width={160} height={42} className="h-auto w-[180px] brightness-0 invert" />
            <p className="mt-4 text-xs uppercase tracking-wider text-white/50">
              PRE-LEASED HOSPITALITY MARKETPLACE
            </p>
            <p className="mt-2 text-sm leading-6 text-white/40">
              Verified hospitality marketplace for sellers, investors, and operators.
            </p>
          </div>

          {/* cols */}
          {FOOTER_COLS.map((col) => (
            <div key={col.label}>
              <p className="mb-4 text-xs font-semibold tracking-wider text-[#C5A028]">
                {col.label}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.external ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-white/55 transition hover:text-white"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link href={l.href} className="text-sm text-white/55 transition hover:text-white">
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* empty spacer to maintain 4-col layout */}
          <div className="hidden lg:block" />
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