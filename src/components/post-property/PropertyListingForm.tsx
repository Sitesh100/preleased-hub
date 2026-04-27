"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Upload } from "lucide-react";
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
  full_address?: string;
  expected_price_rent?: string | number;
  rooms_keys?: string | number;
  current_occupancy_percent?: string | number;
  current_monthly_income?: string | number;
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

const inputClass =
  "h-12 w-full rounded-[14px] border border-[#ced7e3] bg-[#f4f6f8] px-4 text-[17px] text-[#5c6f88] outline-none transition placeholder:text-[#5c6f88] focus:border-[#9fb1ca]";

const selectTriggerClass =
  "flex h-12 w-full items-center justify-between rounded-[14px] border border-[#ced7e3] bg-[#f4f6f8] px-4 text-[17px] text-[#223049]";

const selectMenuClass =
  "absolute left-0 right-0 top-[56px] z-20 rounded-[12px] border border-[#d3dce7] bg-[#f4f6f8] py-1 shadow-[0_8px_24px_rgba(21,30,58,0.12)]";

// Label → numeric value mappings expected by the API
const PROPERTY_TYPE_OPTIONS: { label: string; value: number }[] = [
  { label: "Hotel", value: 1 },
  { label: "Resort", value: 2 },
  { label: "Villa", value: 3 },
  { label: "Service Apartment", value: 4 },
  { label: "Holiday Home", value: 5 },
];

const INTENT_OPTIONS: { label: string; value: number }[] = [
  { label: "Sell", value: 1 },
  { label: "Lease", value: 2 },
  { label: "Both", value: 3 },
];

function SelectBox({
  label,
  placeholder,
  options,
  open,
  onToggle,
  onSelect,
}: {
  label: string;
  placeholder: string;
  options: { label: string; value: number }[];
  open: boolean;
  onToggle: () => void;
  onSelect: (label: string, value: number) => void;
}) {
  return (
    <div className="relative">
      <button type="button" className={selectTriggerClass} onClick={onToggle}>
        <span className={label ? "text-[#223049]" : "text-[#5c6f88]"}>{label || placeholder}</span>
        <ChevronDown className="h-5 w-5 text-[#7c8ea4]" />
      </button>

      {open && (
        <div className={selectMenuClass}>
          {options.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => onSelect(item.label, item.value)}
              className="block w-full px-8 py-2 text-left text-[17px] text-[#2b3a51] transition hover:bg-[#e8edf3]"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PropertyListingForm({
  submitLabel = "Submit Listing",
  className,
  initialValues = null,
  onSuccess,
  onCancel,
}: PropertyListingFormProps) {
  const [createProperty, { isLoading: isCreating }] = useCreatePropertyMutation();
  const [updateProperty, { isLoading: isUpdating }] = useUpdatePropertyMutation();

  // Text fields
  const [ownerCompanyName, setOwnerCompanyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [propertyName, setPropertyName] = useState("");
  const [city, setCity] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [expectedPriceRent, setExpectedPriceRent] = useState("");
  const [roomsKeys, setRoomsKeys] = useState("");
  const [currentOccupancyPercent, setCurrentOccupancyPercent] = useState("");
  const [currentMonthlyIncome, setCurrentMonthlyIncome] = useState("");

  // Select fields — store both display label and numeric value
  const [propertyTypeLabel, setPropertyTypeLabel] = useState("");
  const [propertyTypeValue, setPropertyTypeValue] = useState<number | null>(null);
  const [intentLabel, setIntentLabel] = useState("");
  const [intentValue, setIntentValue] = useState<number | null>(null);
  const [showTypeMenu, setShowTypeMenu] = useState(false);
  const [showIntentMenu, setShowIntentMenu] = useState(false);

  // File upload
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // Auth
  const [authOpen, setAuthOpen] = useState(false);

  // Error / success
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const isEditMode = Boolean(initialValues?.id);
  const isLoading = isCreating || isUpdating;

  const intentLabelFromValue = (value: string | number | undefined) => {
    const matched = INTENT_OPTIONS.find((option) => String(option.value) === String(value));
    return matched?.label ?? "";
  };

  const propertyTypeLabelFromValue = (value: string | number | undefined) => {
    const matched = PROPERTY_TYPE_OPTIONS.find((option) => String(option.value) === String(value));
    return matched?.label ?? "";
  };

  useEffect(() => {
    if (!initialValues) {
      setOwnerCompanyName("");
      setPhoneNumber("");
      setEmailAddress("");
      setPropertyName("");
      setCity("");
      setFullAddress("");
      setExpectedPriceRent("");
      setRoomsKeys("");
      setCurrentOccupancyPercent("");
      setCurrentMonthlyIncome("");
      setPropertyTypeLabel("");
      setPropertyTypeValue(null);
      setIntentLabel("");
      setIntentValue(null);
      setUploadedFiles([]);
      setError(null);
      setSuccessMessage(null);
      return;
    }

    setOwnerCompanyName(initialValues.owner_company_name ?? "");
    setPhoneNumber(initialValues.phone_number ?? "");
    setEmailAddress(initialValues.email_address ?? "");
    setPropertyName(initialValues.property_name ?? "");
    setCity(initialValues.city ?? "");
    setFullAddress(initialValues.full_address ?? "");
    setExpectedPriceRent(
      initialValues.expected_price_rent !== undefined ? String(initialValues.expected_price_rent) : ""
    );
    setRoomsKeys(initialValues.rooms_keys !== undefined ? String(initialValues.rooms_keys) : "");
    setCurrentOccupancyPercent(
      initialValues.current_occupancy_percent !== undefined
        ? String(initialValues.current_occupancy_percent)
        : ""
    );
    setCurrentMonthlyIncome(
      initialValues.current_monthly_income !== undefined
        ? String(initialValues.current_monthly_income)
        : ""
    );
    setPropertyTypeValue(
      initialValues.property_type !== undefined ? Number(initialValues.property_type) : null
    );
    setPropertyTypeLabel(propertyTypeLabelFromValue(initialValues.property_type));
    setIntentValue(initialValues.intent !== undefined ? Number(initialValues.intent) : null);
    setIntentLabel(intentLabelFromValue(initialValues.intent));
    setUploadedFiles([]);
    setError(null);
    setSuccessMessage(null);
  }, [initialValues]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setUploadedFiles(Array.from(e.target.files));
    }
  }

  async function handleSubmitToSourceQueue() {
    const isLoggedIn = localStorage.getItem("preleasehub:isLoggedIn") === "true";

    if (!isLoggedIn) {
      setAuthOpen(true);
      return;
    }

    setError(null);
    setSuccessMessage(null);

    const payloadBase = {
      owner_company_name: ownerCompanyName,
      phone_number: phoneNumber,
      email_address: emailAddress,
      property_name: propertyName,
      city,
      full_address: fullAddress,
      expected_price_rent: expectedPriceRent,
      rooms_keys: roomsKeys,
      current_occupancy_percent: currentOccupancyPercent,
      current_monthly_income: currentMonthlyIncome,
      intent: intentValue ?? "",
      property_type: propertyTypeValue ?? "",
    };

    try {
      if (isEditMode && initialValues?.id) {
        const updatePayload: IUpdatePropertyRequest = {
          id: initialValues.id,
          ...payloadBase,
        };

        if (uploadedFiles.length > 0) {
          updatePayload.uploaded_documents =
            uploadedFiles.length === 1 ? uploadedFiles[0] : uploadedFiles;
        }

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
      setError(
        apiError?.data?.message ?? apiError?.error ?? "Something went wrong. Please try again."
      );
    }
  }

  return (
    <>
      <form
        className={
          className ??
          "rounded-[30px] border border-[#d5dee9] bg-[#f5f6f8] p-5 shadow-[0_12px_30px_rgba(22,31,53,0.06)] sm:p-6"
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            className={inputClass}
            placeholder="Owner / Company Name"
            value={ownerCompanyName}
            onChange={(e) => setOwnerCompanyName(e.target.value)}
          />
          <input
            className={inputClass}
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <input
            className={inputClass}
            placeholder="Email Address"
            type="email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          />
          <input
            className={inputClass}
            placeholder="Property Name"
            value={propertyName}
            onChange={(e) => setPropertyName(e.target.value)}
          />

          <SelectBox
            label={propertyTypeLabel}
            placeholder="Property Type"
            open={showTypeMenu}
            onToggle={() => {
              setShowTypeMenu((prev) => !prev);
              setShowIntentMenu(false);
            }}
            onSelect={(lbl, val) => {
              setPropertyTypeLabel(lbl);
              setPropertyTypeValue(val);
              setShowTypeMenu(false);
            }}
            options={PROPERTY_TYPE_OPTIONS}
          />

          <input
            className={inputClass}
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <SelectBox
            label={intentLabel}
            placeholder="Intent"
            open={showIntentMenu}
            onToggle={() => {
              setShowIntentMenu((prev) => !prev);
              setShowTypeMenu(false);
            }}
            onSelect={(lbl, val) => {
              setIntentLabel(lbl);
              setIntentValue(val);
              setShowIntentMenu(false);
            }}
            options={INTENT_OPTIONS}
          />

          <input
            className={inputClass}
            placeholder="Expected Sale Price / Rent"
            value={expectedPriceRent}
            onChange={(e) => setExpectedPriceRent(e.target.value)}
          />
          <input
            className={inputClass}
            placeholder="Rooms / Keys"
            value={roomsKeys}
            onChange={(e) => setRoomsKeys(e.target.value)}
          />
          <input
            className={inputClass}
            placeholder="Current Occupancy %"
            value={currentOccupancyPercent}
            onChange={(e) => setCurrentOccupancyPercent(e.target.value)}
          />
          <input
            className={inputClass}
            placeholder="Current Monthly Income"
            value={currentMonthlyIncome}
            onChange={(e) => setCurrentMonthlyIncome(e.target.value)}
          />
          <input
            className={inputClass}
            placeholder="Full Address"
            value={fullAddress}
            onChange={(e) => setFullAddress(e.target.value)}
          />
        </div>

        <label className="mt-4 flex h-[126px] w-full cursor-pointer flex-col items-center justify-center rounded-[18px] border border-dashed border-[#c8d3e2] bg-[#f5f7fa] text-center">
          <Upload className="h-6 w-6 text-[#5e728c]" />
          <p className="mt-3 text-[17px] font-medium leading-none text-[#3a4f6b]">
            {uploadedFiles.length > 0
              ? `${uploadedFiles.length} file${uploadedFiles.length > 1 ? "s" : ""} selected`
              : "Upload property photos and documents"}
          </p>
          <p className="mt-2 text-[14px] text-[#7a8da7]">
            Images, lease copies, ownership proof, brochures
          </p>
          <input type="file" className="hidden" multiple onChange={handleFileChange} />
        </label>

        {error && (
          <p className="mt-3 text-[14px] text-red-500">{error}</p>
        )}
        {successMessage && (
          <p className="mt-3 text-[14px] text-green-600">{successMessage}</p>
        )}

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={handleSubmitToSourceQueue}
            disabled={isLoading}
            className="h-12 rounded-[18px] bg-[#020a25] text-[15px] font-medium text-white transition hover:opacity-95 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (isEditMode ? "Updating…" : "Submitting…") : submitLabel}
          </button>
          {isEditMode ? (
            <button
              type="button"
              onClick={onCancel}
              className="h-12 rounded-[18px] border border-[#c9d4e3] bg-[#f7f8fa] text-[15px] font-medium text-[#111827] transition hover:bg-white"
            >
              Cancel Update
            </button>
          ) : (
            <button
              type="button"
              className="h-12 rounded-[18px] border border-[#c9d4e3] bg-[#f7f8fa] text-[15px] font-medium text-[#111827] transition hover:bg-white"
            >
              WhatsApp Seller Desk
            </button>
          )}
        </div>
      </form>

      <AuthPopup
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        defaultTab="login"
        redirectToDashboard={false}
      />
    </>
  );
}
