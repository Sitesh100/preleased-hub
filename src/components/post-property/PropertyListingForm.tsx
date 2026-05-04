"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Upload, X, FileText } from "lucide-react";
import AuthPopup from "@/src/components/auth/AuthPopup";
import {
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
  type ICreatePropertyRequest,
  type IUpdatePropertyRequest,
} from "@/src/redux/features/property/propertyApi";

export interface PropertyFormInitialValues {
  id?: string;
  owner_company_name?: string;
  phone_number?: string;
  email_address?: string;
  property_name?: string;
  city?: string;
  location?: string;
  location_area?: string;
  full_address?: string;
  selling_price?: string | number;
  expected_monthly_rent?: string | number;
  rooms?: string | number;
  listing_type?: string | number;
  expected_price_rent?: string | number;
  rooms_keys?: string | number;
  built_up_area?: string | number;
  current_occupancy_percent?: string | number;
  current_monthly_income?: string | number;
  security_deposit?: string | number;
  annual_rental_income?: string | number;
  lock_in_period?: string | number;
  property_description?: string;
  intent?: string | number;
  property_type?: string | number;
}

interface PropertyListingFormProps {
  submitLabel?: string;
  className?: string;
  initialValues?: PropertyFormInitialValues | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const PROPERTY_TYPE_OPTIONS: { label: string; value: number }[] = [
  { label: "Hotel", value: 1 },
  { label: "Resort", value: 2 },
  { label: "Villa", value: 3 },
  { label: "Service Apartment", value: 4 },
  { label: "Holiday Home", value: 5 },
];

const LISTING_TYPES = [
  { key: "sell", label: "Sell", desc: "Outright property sale", value: 1 },
  { key: "lease", label: "Lease", desc: "Monthly rental income", value: 2 },
  { key: "preleased", label: "Pre-Leased Sale", desc: "Income generating asset", value: 3 },
] as const;

type ListingKey = (typeof LISTING_TYPES)[number]["key"];

// h-11 = 44px, text-[15px] — comfortable readable size
const inputClass =
  "h-11 w-full rounded-[10px] border border-[#d1d5db] bg-white px-4 text-[15px] text-[#1f2937] outline-none placeholder:text-[#9ca3af] focus:border-[#4f46e5] transition-colors";

// ─── SelectBox ────────────────────────────────────────────────────────────────
function SelectBox({
  label,
  placeholder,
  options,
  onSelect,
}: {
  label: string;
  placeholder: string;
  options: { label: string; value: number }[];
  onSelect: (label: string, value: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(label);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => { setSelected(label); }, [label]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className={`flex h-11 w-full items-center justify-between rounded-[10px] border px-4 text-[15px] transition-colors ${
          open ? "border-[#4f46e5]" : "border-[#d1d5db]"
        } bg-white ${selected ? "text-[#1f2937]" : "text-[#9ca3af]"}`}
      >
        <span className="truncate">{selected || placeholder}</span>
        <ChevronDown
          className={`ml-2 h-4 w-4 flex-shrink-0 text-[#9ca3af] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-[46px] z-30 overflow-hidden rounded-[10px] border border-[#e5e7eb] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.10)]">
          {options.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => { setSelected(item.label); onSelect(item.label, item.value); setOpen(false); }}
              className="block w-full px-4 py-2.5 text-left text-[15px] text-[#374151] transition-colors hover:bg-[#f3f4f6]"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-[#9ca3af]">
        {title}
      </h2>
      {children}
    </div>
  );
}

// ─── Main form ────────────────────────────────────────────────────────────────
export default function PropertyListingForm({
  submitLabel = "Submit Listing",
  className,
  initialValues = null,
  onSuccess,
  onCancel,
}: PropertyListingFormProps) {
  const [createProperty, { isLoading: isCreating }] = useCreatePropertyMutation();
  const [updateProperty, { isLoading: isUpdating }] = useUpdatePropertyMutation();

  const [propertyName, setPropertyName] = useState("");
  const [city, setCity] = useState("");
  const [locationArea, setLocationArea] = useState("");
  const [propertyTypeLabel, setPropertyTypeLabel] = useState("");
  const [propertyTypeValue, setPropertyTypeValue] = useState<number | null>(null);
  const [totalRooms, setTotalRooms] = useState("");
  const [builtUpArea, setBuiltUpArea] = useState("");

  const [listingKey, setListingKey] = useState<ListingKey>("sell");
  const [sellingPrice, setSellingPrice] = useState("");
  const [expectedMonthlyRent, setExpectedMonthlyRent] = useState("");
  const [securityDeposit, setSecurityDeposit] = useState("");
  const [annualRentalIncome, setAnnualRentalIncome] = useState("");
  const [lockInPeriod, setLockInPeriod] = useState("");

  const [ownerName, setOwnerName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [description, setDescription] = useState("");

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<{ file: File; url: string }[]>([]);

  const [authOpen, setAuthOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isEditMode = Boolean(initialValues?.id);
  const isLoading = isCreating || isUpdating;

  const intentValueFromKey = (key: ListingKey) =>
    LISTING_TYPES.find((t) => t.key === key)?.value ?? 1;

  const listingKeyFromValue = (value: string | number | undefined): ListingKey => {
    const matched = LISTING_TYPES.find((t) => String(t.value) === String(value));
    return (matched?.key ?? "sell") as ListingKey;
  };

  const propertyTypeLabelFromValue = (value: string | number | undefined) =>
    PROPERTY_TYPE_OPTIONS.find((o) => String(o.value) === String(value))?.label ?? "";

  useEffect(() => {
    if (!initialValues) {
      setPropertyName(""); setCity(""); setLocationArea("");
      setPropertyTypeLabel(""); setPropertyTypeValue(null);
      setTotalRooms(""); setBuiltUpArea("");
      setListingKey("sell"); setSellingPrice("");
      setExpectedMonthlyRent(""); setSecurityDeposit("");
      setAnnualRentalIncome(""); setLockInPeriod("");
      setOwnerName(""); setContactNumber(""); setEmailAddress("");
      setDescription(""); setUploadedFiles([]); setPreviewUrls([]);
      setError(null); setSuccessMessage(null);
      return;
    }
    setPropertyName(initialValues.property_name ?? "");
    setCity(initialValues.city ?? "");
    setLocationArea(initialValues.location ?? initialValues.location_area ?? initialValues.full_address ?? "");
    setPropertyTypeLabel(propertyTypeLabelFromValue(initialValues.property_type));
    setPropertyTypeValue(initialValues.property_type !== undefined ? Number(initialValues.property_type) : null);
    setTotalRooms(
      initialValues.rooms !== undefined
        ? String(initialValues.rooms)
        : initialValues.rooms_keys !== undefined
          ? String(initialValues.rooms_keys)
          : ""
    );
    setBuiltUpArea(initialValues.built_up_area !== undefined ? String(initialValues.built_up_area) : "");
    setListingKey(listingKeyFromValue(initialValues.listing_type ?? initialValues.intent));
    setSellingPrice(
      initialValues.selling_price !== undefined
        ? String(initialValues.selling_price)
        : initialValues.expected_price_rent !== undefined
          ? String(initialValues.expected_price_rent)
          : ""
    );
    setExpectedMonthlyRent(
      initialValues.expected_monthly_rent !== undefined
        ? String(initialValues.expected_monthly_rent)
        : initialValues.current_monthly_income !== undefined
          ? String(initialValues.current_monthly_income)
          : ""
    );
    setSecurityDeposit(initialValues.security_deposit !== undefined ? String(initialValues.security_deposit) : "");
    setAnnualRentalIncome(initialValues.annual_rental_income !== undefined ? String(initialValues.annual_rental_income) : "");
    setLockInPeriod(initialValues.lock_in_period !== undefined ? String(initialValues.lock_in_period) : "");
    setOwnerName(initialValues.owner_company_name ?? "");
    setContactNumber(initialValues.phone_number ?? "");
    setEmailAddress(initialValues.email_address ?? "");
    setDescription(initialValues.property_description ?? "");
    setUploadedFiles([]); setPreviewUrls([]);
    setError(null); setSuccessMessage(null);
  }, [initialValues]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    setUploadedFiles((prev) => [...prev, ...newFiles]);
    newFiles.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        setPreviewUrls((prev) => [...prev, { file, url }]);
      }
    });
  }

  function removeFile(file: File) {
    setUploadedFiles((prev) => prev.filter((f) => f !== file));
    setPreviewUrls((prev) => {
      const entry = prev.find((p) => p.file === file);
      if (entry) URL.revokeObjectURL(entry.url);
      return prev.filter((p) => p.file !== file);
    });
  }

  async function handleSubmit() {
    const isLoggedIn = localStorage.getItem("preleasehub:isLoggedIn") === "true";
    if (!isLoggedIn) { setAuthOpen(true); return; }
    setError(null); setSuccessMessage(null);

    const listingType = intentValueFromKey(listingKey);

    const payloadBase = {
      property_name: propertyName,
      city,
      location: locationArea,
      property_type: propertyTypeValue ?? "",
      rooms: totalRooms,
      built_up_area: builtUpArea,
      listing_type: listingType,
      selling_price: listingKey === "sell" ? sellingPrice : "",
      expected_monthly_rent: listingKey === "lease" ? expectedMonthlyRent : "",
      security_deposit: listingKey === "lease" ? securityDeposit : "",
      annual_rental_income: listingKey === "preleased" ? annualRentalIncome : "",
      lock_in_period: listingKey === "preleased" ? lockInPeriod : "",
      owner_company_name: ownerName,
      phone_number: contactNumber,
      email_address: emailAddress,
      property_description: description,
    };

    try {
      if (isEditMode && initialValues?.id) {
        const updatePayload: IUpdatePropertyRequest = { id: initialValues.id, ...payloadBase };
        if (uploadedFiles.length > 0)
          updatePayload.uploaded_documents =
            uploadedFiles.length === 1 ? uploadedFiles[0] : uploadedFiles;
        const result = await updateProperty(updatePayload).unwrap();
        setSuccessMessage(result.message ?? "Property updated successfully.");
      } else {
        const createPayload: ICreatePropertyRequest = {
          ...payloadBase,
          uploaded_documents: uploadedFiles.length === 1 ? uploadedFiles[0] : uploadedFiles,
        };
        const result = await createProperty(createPayload).unwrap();
        setSuccessMessage(result.message ?? "Property submitted successfully.");
      }
      onSuccess?.();
    } catch (err: unknown) {
      const apiError = err as { data?: { message?: string }; error?: string };
      setError(apiError?.data?.message ?? apiError?.error ?? "Something went wrong. Please try again.");
    }
  }

  return (
    <>
      <div className={className ?? "flex flex-col gap-4"}>

        {/* ── Property Details ── */}
        <Section title="Property Details">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <input className={inputClass} placeholder="Property Name" value={propertyName} onChange={(e) => setPropertyName(e.target.value)} />
            <input className={inputClass} placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
            <input className={inputClass} placeholder="Location / Area" value={locationArea} onChange={(e) => setLocationArea(e.target.value)} />
            <SelectBox
              label={propertyTypeLabel}
              placeholder="Property Type"
              options={PROPERTY_TYPE_OPTIONS}
              onSelect={(lbl, val) => { setPropertyTypeLabel(lbl); setPropertyTypeValue(val); }}
            />
            <input className={inputClass} placeholder="Total Rooms" type="number" value={totalRooms} onChange={(e) => setTotalRooms(e.target.value)} />
            <input className={inputClass} placeholder="Built-up Area (sq ft)" value={builtUpArea} onChange={(e) => setBuiltUpArea(e.target.value)} />
          </div>
        </Section>

        <Section title="Listing Type">
  <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
    {LISTING_TYPES.map((type) => {
      const active = listingKey === type.key;
      return (
        <button
          key={type.key}
          type="button"
          onClick={() => setListingKey(type.key)}
          className={`flex flex-row items-center gap-3 rounded-[12px] border-[1.5px] px-4 py-3.5 text-left transition-colors sm:flex-col sm:gap-1 ${
            active ? "border-[#4f46e5] bg-[#eef2ff]" : "border-[#e5e7eb] bg-white hover:border-[#a5b4fc]"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-[1.5px] ${active ? "border-[#4f46e5]" : "border-[#d1d5db]"}`}>
              {active && <span className="h-2 w-2 rounded-full bg-[#4f46e5]" />}
            </span>
            <span className="text-[15px] font-semibold text-[#111827]">{type.label}</span>
          </div>
          <span className="text-[13px] leading-tight text-[#6b7280] sm:pl-6">{type.desc}</span>
        </button>
      );
    })}
  </div>

  {listingKey === "sell" && (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <input className={inputClass} placeholder="Selling Price" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} />
    </div>
  )}
  {listingKey === "lease" && (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <input className={inputClass} placeholder="Expected Monthly Rent" value={expectedMonthlyRent} onChange={(e) => setExpectedMonthlyRent(e.target.value)} />
      <input className={inputClass} placeholder="Security Deposit" value={securityDeposit} onChange={(e) => setSecurityDeposit(e.target.value)} />
    </div>
  )}
  {listingKey === "preleased" && (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <input className={inputClass} placeholder="Annual Rental Income" value={annualRentalIncome} onChange={(e) => setAnnualRentalIncome(e.target.value)} />
      <input className={inputClass} placeholder="Lock-in Period" value={lockInPeriod} onChange={(e) => setLockInPeriod(e.target.value)} />
    </div>
  )}
</Section>

        {/* ── Owner Details ── */}
        <Section title="Owner Details">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <input className={inputClass} placeholder="Owner Name" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} />
            <input className={inputClass} placeholder="Contact Number" type="tel" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
            <input className={inputClass} placeholder="Email Address" type="email" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
          </div>
        </Section>

        {/* ── Description + Upload side by side ── */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Section title="Property Description">
            <textarea
              className="h-[110px] w-full resize-none rounded-[10px] border border-[#d1d5db] bg-white px-4 py-3 text-[15px] text-[#1f2937] outline-none placeholder:text-[#9ca3af] focus:border-[#4f46e5] transition-colors"
              placeholder="Write a detailed description of your property…"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Section>

          <Section title="Photos & Documents">
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-[10px] border-[1.5px] border-dashed border-[#d1d5db] bg-[#fafafa] py-6 text-center transition-colors hover:border-[#4f46e5] hover:bg-[#f5f3ff]">
              <Upload className="mb-2 h-6 w-6 text-[#9ca3af]" />
              <p className="text-[14px] font-medium text-[#374151]">
                {uploadedFiles.length > 0
                  ? `${uploadedFiles.length} file${uploadedFiles.length > 1 ? "s" : ""} — add more`
                  : "Upload photos & documents"}
              </p>
              <p className="mt-1 text-[12px] text-[#9ca3af]">Images, PDFs, brochures</p>
              <input type="file" className="hidden" multiple accept="image/*,.pdf,.doc,.docx" onChange={handleFileChange} />
            </label>

            {previewUrls.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {previewUrls.map(({ file, url }) => (
                  <div key={url} className="relative h-16 w-16 overflow-hidden rounded-[8px] border border-[#e5e7eb]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt={file.name} className="h-full w-full object-cover" />
                    <button type="button" onClick={() => removeFile(file)}
                      className="absolute right-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[rgba(17,24,39,0.70)] text-white">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {uploadedFiles.filter((f) => !f.type.startsWith("image/")).map((file) => (
              <div key={file.name + file.size} className="mt-2 flex items-center gap-2 rounded-[8px] border border-[#e5e7eb] bg-[#f9fafb] px-3 py-2">
                <FileText className="h-4 w-4 flex-shrink-0 text-[#6b7280]" />
                <span className="flex-1 truncate text-[13px] text-[#374151]">{file.name}</span>
                <button type="button" onClick={() => removeFile(file)} className="text-[#9ca3af] hover:text-[#374151]">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </Section>
        </div>

        {error && <p className="rounded-[10px] bg-red-50 px-4 py-3 text-[14px] text-red-600">{error}</p>}
        {successMessage && <p className="rounded-[10px] bg-green-50 px-4 py-3 text-[14px] text-green-700">{successMessage}</p>}

        {/* ── Buttons ── */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="h-12 rounded-[12px] bg-[#111827] text-[15px] font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? (isEditMode ? "Updating…" : "Submitting…") : submitLabel}
          </button>
          {isEditMode && (
            <button type="button" onClick={onCancel}
              className="h-12 rounded-[12px] border border-[#d1d5db] bg-white text-[15px] font-medium text-[#111827] transition-colors hover:bg-[#f9fafb]">
              Cancel Update
            </button>
          ) }
        </div>
      </div>

      <AuthPopup isOpen={authOpen} onClose={() => setAuthOpen(false)} defaultTab="login" redirectToDashboard={false} />
    </>
  );
}
