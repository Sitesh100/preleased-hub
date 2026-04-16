"use client";

import Link from "next/link";

/* ── icons as inline SVGs — no extra dep needed ── */
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12.004 2C6.48 2 2 6.478 2 12c0 1.85.502 3.58 1.38 5.065L2 22l5.085-1.333A9.955 9.955 0 0012.004 22C17.528 22 22 17.522 22 12S17.528 2 12.004 2zm0 18.18a8.174 8.174 0 01-4.17-1.14l-.299-.178-3.018.791.806-2.944-.195-.302A8.153 8.153 0 013.82 12c0-4.51 3.674-8.18 8.184-8.18 4.508 0 8.18 3.67 8.18 8.18 0 4.509-3.672 8.18-8.18 8.18z" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <rect x="2" y="4" width="20" height="16" rx="3" />
    <path d="m2 7 9.293 6.293a1 1 0 0 0 1.414 0L22 7" />
  </svg>
);

/* ── config — edit once here ── */
const CONTACT = {
  instagram: "https://instagram.com/preleasehub",
  whatsapp: "https://wa.me/917566663242",
  email: "mailto:connect@preleasehub.com",
};

/* ── button data ── */
const BUTTONS = [
  {
    label: "Instagram",
    href: CONTACT.instagram,
    icon: InstagramIcon,
    accent: "#E1306C",
    bg: "rgba(225,48,108,0.08)",
    border: "rgba(225,48,108,0.18)",
  },
  {
    label: "WhatsApp",
    href: CONTACT.whatsapp,
    icon: WhatsAppIcon,
    accent: "#25D366",
    bg: "rgba(37,211,102,0.08)",
    border: "rgba(37,211,102,0.2)",
  },
  {
    label: "Email Us",
    href: CONTACT.email,
    icon: MailIcon,
    accent: "#3D7FC5",
    bg: "rgba(61,127,197,0.08)",
    border: "rgba(61,127,197,0.2)",
  },
];

export default function ContactBar() {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50/50 to-blue-50/30 border border-blue-200/30 rounded-2xl p-4 sm:p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 shadow-[0_8px_32px_rgba(61,127,197,0.08),0_1px_3px_rgba(61,127,197,0.06)]">
      {/* label section */}
      <div className="flex-1 min-w-0">
        <p className="m-0 font-bold tracking-[0.1em] uppercase text-slate-400 text-xs sm:text-sm">
          Contact Us
        </p>
        <p className="mt-0.5 font-semibold text-slate-800 text-sm sm:text-base whitespace-nowrap sm:whitespace-normal">
          Let&apos;s connect we respond within 24 hrs
        </p>
      </div>

      {/* divider - hidden on mobile, visible on sm and up */}
      <div className="hidden sm:block w-px h-9 bg-blue-200/50 flex-shrink-0" aria-hidden />

      {/* buttons */}
      <div className="flex flex-wrap gap-2 sm:gap-2.5 w-full sm:w-auto">
        {BUTTONS.map(({ label, href, icon: Icon, accent, bg, border }) => (
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-95 whitespace-nowrap"
            style={{
              border: `1px solid ${border}`,
              background: bg,
              color: accent,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = bg.replace("0.08", "0.14");
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 6px 20px ${border}`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = bg;
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
            }}
          >
            <Icon />
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}