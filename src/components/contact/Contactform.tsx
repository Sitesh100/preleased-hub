"use client";

import { useMemo, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  name: string;
  email: string;
  phone: string;
  userType: "owner" | "investor" | "operator" | "advisor" | "other";
  message: string;
}

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com" },
  { label: "Instagram", href: "https://instagram.com/preleasehub" },
  { label: "WhatsApp", href: "https://wa.me/917566663242" },
] as const;

const CONTACT_DETAILS = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    label: "Email",
    value: "connect@preleasehub.com",
    sub: "Best for documents & detailed questions",
    href: "mailto:connect@preleasehub.com",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    label: "Phone",
    value: "+91 75666 63242",
    sub: "Available Sun–Thu, 10:00–18:00",
    href: "tel:+917566663242",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: "Service",
    value: "Hospitality Asset Advisory",
    sub: "Listing, leasing & investor support",
    href: null,
  },
];

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IFormInput>({
    mode: "onBlur",
    defaultValues: { name: "", email: "", phone: "", userType: "investor", message: "" },
  });

  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const statusText = useMemo(() => {
    if (formStatus === "sending") return "Sending…";
    if (formStatus === "success") return "Message sent! We'll reply soon.";
    if (formStatus === "error") return "Something went wrong. Try again.";
    return "";
  }, [formStatus]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setFormStatus("sending");
    try {
      await new Promise((r) => setTimeout(r, 1100));
      console.log("contact payload:", data);
      setFormStatus("success");
      reset();
    } catch {
      setFormStatus("error");
    }
  };

  const inputCls = (hasError?: boolean) =>
    [
      "mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#0f1f4b] outline-none transition",
      "placeholder:text-[#94a3b8]",
      hasError
        ? "border-red-400 ring-1 ring-red-300 focus:border-red-400"
        : "border-[#cbd5e1] focus:border-[#2f6bbf] focus:ring-2 focus:ring-[#2f6bbf]/15",
    ].join(" ");

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      {/* LEFT: contact details */}
      <aside className="lg:col-span-4 space-y-4">
        {/* Header */}
        <div>
          <span className="inline-block rounded-full bg-[#e8f0fb] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#2f6bbf]">
            Contact Us
          </span>
          <h2 className="mt-3 font-display text-2xl font-bold text-[#0f1f4b] leading-snug">
            Let owners, investors, and operators connect faster
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#64748b]">
            Prefer a direct channel? Use any option below — we'll route you to the right person.
          </p>
        </div>

        {/* Contact cards */}
        <div className="space-y-3">
          {CONTACT_DETAILS.map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-4 rounded-2xl border border-[#e2eaf6] bg-white p-4 shadow-sm"
            >
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e8f0fb] text-[#2f6bbf]">
                {item.icon}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">{item.label}</p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="mt-0.5 block text-sm font-semibold text-[#0f1f4b] hover:text-[#2f6bbf] transition-colors"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="mt-0.5 text-sm font-semibold text-[#0f1f4b]">{item.value}</p>
                )}
                <p className="mt-0.5 text-xs text-[#94a3b8]">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Social links */}
        <div className="rounded-2xl border border-[#e2eaf6] bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">Follow us</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[#cbd5e1] bg-[#f8fafc] px-4 py-1.5 text-sm font-medium text-[#0f1f4b] transition hover:border-[#2f6bbf] hover:bg-[#e8f0fb] hover:text-[#2f6bbf]"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Response time note */}
        <div className="flex items-center gap-2 rounded-2xl border border-[#e2eaf6] bg-[#f8fafc] px-4 py-3">
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#22c55e]" />
          <p className="text-xs text-[#64748b]">We respond fast — usually within 24 hours</p>
        </div>
      </aside>

      {/* RIGHT: form */}
      <div className="lg:col-span-8">
        <div className="rounded-3xl border border-[#e2eaf6] bg-white p-7 shadow-sm md:p-10">
          <h3 className="font-display text-xl font-bold text-[#0f1f4b]">Send us a message</h3>
          <p className="mt-1 text-sm text-[#64748b]">
            Share a bit about what you're looking for. The more context, the better we can help.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-7 space-y-5">
            {/* Name + Email */}
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-sm font-medium text-[#0f1f4b]">
                  Full name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="e.g., Alex Rahman"
                  className={inputCls(!!errors.name)}
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="email" className="text-sm font-medium text-[#0f1f4b]">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className={inputCls(!!errors.email)}
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
                  })}
                />
                {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>}
              </div>
            </div>

            {/* Phone + User type */}
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="phone" className="text-sm font-medium text-[#0f1f4b]">
                  Phone number
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="+91 98XXXXXX"
                  className={inputCls(!!errors.phone)}
                  {...register("phone", { required: "Phone number is required" })}
                />
                {errors.phone && <p className="mt-1.5 text-xs text-red-500">{errors.phone.message}</p>}
              </div>

              <div>
                <label htmlFor="userType" className="text-sm font-medium text-[#0f1f4b]">
                  I am a
                </label>
                <select
                  id="userType"
                  className={inputCls()}
                  {...register("userType")}
                >
                  <option value="owner">Owner / Seller</option>
                  <option value="investor">Investor / Buyer</option>
                  <option value="operator">Hotelier / Lessee</option>
                  <option value="advisor">Hospitality Advisor</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="text-sm font-medium text-[#0f1f4b]">
                Message / Requirement
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Tell us your preferred area, budget, and timeline…"
                className={inputCls(!!errors.message) + " resize-none"}
                {...register("message", {
                  required: "Message is required",
                  minLength: { value: 10, message: "Please write at least 10 characters" },
                })}
              />
              {errors.message && <p className="mt-1.5 text-xs text-red-500">{errors.message.message}</p>}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 pt-1 md:flex-row md:items-center md:justify-between">
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting || formStatus === "sending"}
                  className="rounded-full bg-[#0f1f4b] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1a337a] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {formStatus === "sending" ? "Sending…" : "Send Inquiry"}
                </button>

                <a
                  href="https://wa.me/917566663242"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[#cbd5e1] bg-white px-6 py-3 text-sm font-semibold text-[#0f1f4b] transition hover:border-[#2f6bbf] hover:bg-[#e8f0fb] hover:text-[#2f6bbf]"
                >
                  WhatsApp Now
                </a>
              </div>

              {statusText && (
                <p
                  aria-live="polite"
                  className={
                    formStatus === "success"
                      ? "text-sm text-green-600"
                      : formStatus === "error"
                        ? "text-sm text-red-500"
                        : "text-sm text-[#64748b]"
                  }
                >
                  {statusText}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}