"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

// Shared class strings
const INPUT_CLS =
  "h-10 rounded-[10px] border-[#b8d2e6] bg-white text-[#0f3557] placeholder:text-slate-400 focus:border-[#1a6db5] focus:ring-[#1a6db5]/10";
const SELECT_TRIGGER_CLS =
  "h-10 rounded-[10px] border-[#b8d2e6] bg-white text-[#0f3557] focus:border-[#1a6db5] focus:ring-[#1a6db5]/10";
const SELECT_CONTENT_CLS =
  "bg-white border border-[#d7e4ef] rounded-[10px] shadow-md p-1";
const SELECT_ITEM_CLS =
  "rounded-[6px] text-[14px] text-[#0f3557] focus:bg-[#f0f7ff] focus:text-[#0f3557] data-[highlighted]:bg-[#f0f7ff] data-[state=checked]:font-medium cursor-pointer";

const PROPERTY_TYPES = [
  { value: "hotel", label: "Hotel" },
  { value: "restaurant", label: "Restaurant" },
  { value: "flat", label: "Flat" },
  { value: "office", label: "Office" },
  { value: "showroom", label: "Showroom" },
];

const CITIES = [
  { value: "surat", label: "Surat" },
  { value: "ahmedabad", label: "Ahmedabad" },
  { value: "indore", label: "Indore" },
  { value: "gurugram", label: "Gurugram" },
];

const FLOORS = [
  { value: "ground", label: "Ground Floor" },
  { value: "1st", label: "1st Floor" },
  { value: "2nd", label: "2nd Floor" },
  { value: "3rd", label: "3rd Floor" },
];

const TENANT_TYPES = [
  { value: "luxury-retail", label: "Luxury Retail" },
  { value: "fnb", label: "F&B" },
  { value: "corporate", label: "Corporate" },
  { value: "co-working", label: "Co-working" },
];

const AGE_OPTIONS = [
  { value: "0-1", label: "0–1 years" },
  { value: "1-3", label: "1–3 years" },
  { value: "3-5", label: "3–5 years" },
  { value: "5+", label: "5+ years" },
];

const PRICE_UNITS = [
  { value: "crore", label: "Crore" },
  { value: "lakh", label: "Lakh" },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3.5 border-b border-[#dce9f5] pb-2 text-[11px] font-semibold uppercase tracking-widest text-[#1a6db5]">
      {children}
    </p>
  );
}

function FieldLabel({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <p className="mb-1.5 text-[13px] font-medium text-[#244e73]">
      {children}
      {required && <span className="ml-0.5 text-[#2b74b5]">*</span>}
    </p>
  );
}

// Simple InputField wrapper
function InputField({
  label,
  requiredMark,
  ...props
}: {
  label: string;
  requiredMark?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <FieldLabel required={requiredMark}>{label}</FieldLabel>
      <Input className={INPUT_CLS} {...props} />
    </div>
  );
}

// Calendar date picker wrapper
function CalendarField({
  label,
  requiredMark,
  value,
  onChange,
}: {
  label: string;
  requiredMark?: boolean;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <FieldLabel required={requiredMark}>{label}</FieldLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="flex h-10 w-full items-center justify-between rounded-[10px] border border-[#b8d2e6] bg-white px-3 text-[14px] text-[#0f3557] transition hover:border-[#1a6db5]"
          >
            <span className={value ? "text-[#0f3557]" : "text-slate-400"}>
              {value ? format(value, "dd MMM yyyy") : "Pick a date"}
            </span>
            <CalendarIcon className="h-4 w-4 text-[#1a6db5]" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto rounded-[12px] border border-[#d7e4ef] bg-white p-0 shadow-md">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date) => {
              onChange?.(date);
              setOpen(false);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default function PostPropertyPage() {
  const [propertyImages, setPropertyImages] = useState<File[]>([]);
  const [availableFrom, setAvailableFrom] = useState<Date | undefined>(
    new Date("2026-05-01")
  );

  const uploadSummary = useMemo(() => {
    if (!propertyImages.length) return "No images selected";
    if (propertyImages.length === 1) return propertyImages[0].name;
    return `${propertyImages.length} images selected`;
  }, [propertyImages]);

  function handleSubmit() {
    // handle form submission
  }

  return (
    <main id="main" className="min-h-screen bg-[#f5f9fd]">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Page Header */}
        <header className="mb-8 text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight text-[#0f3557]">
            Post Your Property
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-[17px] text-slate-500">
            Easily list your property and connect with verified buyers and investors.
          </p>
        </header>

        {/* Form Card */}
        <section className="rounded-[20px] border border-[#d7e4ef] bg-white p-6 shadow-[0_16px_32px_rgba(3,13,30,0.08)] md:p-8">

          {/* Progress Bar */}
          <div className="mb-7 flex items-center gap-3.5 rounded-2xl border border-[#d7e4ef] bg-[#f3f8fd] px-4 py-3.5">
            <span className="rounded-full bg-[#0f3557] px-4 py-1.5 text-xs font-medium text-white">
              Property Details
            </span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#dce9f5]">
              <div className="h-1.5 w-full rounded-full bg-[#1a6db5]" />
            </div>
            <span className="text-xs font-medium text-[#2b74b5]">Single Step Form</span>
          </div>

          <div className="space-y-5">

            {/* Location */}
            <div>
              <SectionLabel>Location</SectionLabel>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <FieldLabel required>City</FieldLabel>
                  <Select defaultValue="surat">
                    <SelectTrigger className={SELECT_TRIGGER_CLS}>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent className={SELECT_CONTENT_CLS}>
                      {CITIES.map((c) => (
                        <SelectItem key={c.value} value={c.value} className={SELECT_ITEM_CLS}>
                          {c.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <InputField
                  label="Locality"
                  requiredMark
                  placeholder="e.g. Sector 44"
                  defaultValue="sec-44"
                />
              </div>
            </div>

            {/* Property Info */}
            <div>
              <SectionLabel>Property Info</SectionLabel>
              <div className="grid gap-4 md:grid-cols-2">
                <InputField
                  label="Landmark"
                  placeholder="near delight"
                  defaultValue="near delight"
                />
                <div>
                  <FieldLabel required>Property Type</FieldLabel>
                  <Select defaultValue="hotel">
                    <SelectTrigger className={SELECT_TRIGGER_CLS}>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className={SELECT_CONTENT_CLS}>
                      {PROPERTY_TYPES.map((t) => (
                        <SelectItem key={t.value} value={t.value} className={SELECT_ITEM_CLS}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Floor & Tenant */}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <FieldLabel>Floor</FieldLabel>
                <Select defaultValue="1st">
                  <SelectTrigger className={SELECT_TRIGGER_CLS}>
                    <SelectValue placeholder="Select floor" />
                  </SelectTrigger>
                  <SelectContent className={SELECT_CONTENT_CLS}>
                    {FLOORS.map((f) => (
                      <SelectItem key={f.value} value={f.value} className={SELECT_ITEM_CLS}>
                        {f.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <FieldLabel required>Tenant Type</FieldLabel>
                <Select defaultValue="luxury-retail">
                  <SelectTrigger className={SELECT_TRIGGER_CLS}>
                    <SelectValue placeholder="Select tenant type" />
                  </SelectTrigger>
                  <SelectContent className={SELECT_CONTENT_CLS}>
                    {TENANT_TYPES.map((t) => (
                      <SelectItem key={t.value} value={t.value} className={SELECT_ITEM_CLS}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Area */}
            <div>
              <SectionLabel>Area &amp; Availability</SectionLabel>
              <div className="grid gap-4 md:grid-cols-2">
                <InputField
                  label="Carpet Area (sq ft)"
                  requiredMark
                  type="number"
                  placeholder="1000"
                  defaultValue="1000"
                />
                <InputField
                  label="Super Built-up Area (sq ft)"
                  requiredMark
                  type="number"
                  placeholder="1200"
                  defaultValue="1200"
                />
              </div>
            </div>

            {/* Age & Availability */}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <FieldLabel>Age of Property</FieldLabel>
                <Select defaultValue="3-5">
                  <SelectTrigger className={SELECT_TRIGGER_CLS}>
                    <SelectValue placeholder="Select age" />
                  </SelectTrigger>
                  <SelectContent className={SELECT_CONTENT_CLS}>
                    {AGE_OPTIONS.map((a) => (
                      <SelectItem key={a.value} value={a.value} className={SELECT_ITEM_CLS}>
                        {a.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <CalendarField
                label="Available From"
                requiredMark
                value={availableFrom}
                onChange={setAvailableFrom}
              />
            </div>

            {/* Pricing & Images */}
            <div>
              <SectionLabel>Pricing &amp; Images</SectionLabel>
              <div className="flex flex-col gap-4 md:flex-row md:items-end">
                <div className="flex-[7]">
                  <InputField
                    label="Basic Selling Price"
                    requiredMark
                    type="number"
                    defaultValue="10"
                  />
                </div>

                <div className="flex-[2]">
                  <FieldLabel>Unit</FieldLabel>
                  <Select defaultValue="crore">
                    <SelectTrigger className={SELECT_TRIGGER_CLS}>
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent className={SELECT_CONTENT_CLS}>
                      {PRICE_UNITS.map((u) => (
                        <SelectItem key={u.value} value={u.value} className={SELECT_ITEM_CLS}>
                          {u.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-[3]">
                  <FieldLabel required>Property Images</FieldLabel>
                  <label
                    htmlFor="property-images"
                    className="flex h-10 cursor-pointer items-center justify-center gap-1.5 rounded-[10px] border border-dashed border-[#b8d2e6] bg-[#f4f9fe] px-3 text-center text-[13px] font-medium text-[#1f5e8f] transition hover:bg-[#edf6ff]"
                  >
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 1v10M4 5l4-4 4 4M2 13h12" stroke="#1f5e8f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Upload images
                  </label>
                  <input
                    id="property-images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) =>
                      setPropertyImages(e.target.files ? Array.from(e.target.files) : [])
                    }
                    className="hidden"
                  />
                  <p className="mt-1.5 line-clamp-1 text-xs text-slate-500">{uploadSummary}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Footer */}
          <hr className="my-6 border-[#e8f0f8]" />
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="rounded-[10px] border border-[#b9d2e6] bg-white px-6 py-2.5 text-sm font-medium text-[#0f3557] transition hover:bg-[#eef6ff]"
            >
              ← Previous
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex items-center gap-2 rounded-[10px] bg-[#0f3557] px-7 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 8h12M10 4l4 4-4 4" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Submit Property
            </button>
          </div>

        </section>
      </div>
    </main>
  );
}