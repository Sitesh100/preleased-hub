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
    <div
      style={{
        background: "linear-gradient(120deg, #f0f6ff 0%, #e8f2fc 50%, #f5f9ff 100%)",
        border: "1px solid rgba(61,127,197,0.14)",
        borderRadius: "20px",
        padding: "20px 28px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
        flexWrap: "wrap",
        boxShadow: "0 8px 32px rgba(61,127,197,0.08), 0 1px 3px rgba(61,127,197,0.06)",
      }}
    >
      {/* label */}
      <div style={{ flex: "1 1 auto", minWidth: 0 }}>
        <p
          style={{
            margin: 0,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(15,30,60,0.45)",
          }}
          className="text-2xl"
        >
          Contact Us
        </p>
        <p
          style={{
            margin: "2px 0 0",
            fontWeight: 500,
            color: "#0f1e3c",
            whiteSpace: "nowrap",
          }}
          className="text-xl"
        >
          Let&apos;s connect we respond within 24 hrs
        </p>
      </div>

      {/* divider */}
      <div
        style={{
          width: "1px",
          height: "36px",
          background: "rgba(61,127,197,0.15)",
          flexShrink: 0,
        }}
        aria-hidden
      />

      {/* buttons */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {BUTTONS.map(({ label, href, icon: Icon, accent, bg, border }) => (
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              padding: "9px 18px",
              borderRadius: "50px",
              border: `1px solid ${border}`,
              background: bg,
              color: accent,
              fontSize: "13px",
              fontWeight: 600,
              textDecoration: "none",
              transition: "transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 6px 20px ${border}`;
              (e.currentTarget as HTMLAnchorElement).style.background = bg.replace("0.08", "0.14");
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
              (e.currentTarget as HTMLAnchorElement).style.background = bg;
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