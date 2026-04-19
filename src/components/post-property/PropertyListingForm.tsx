"use client";

import { useState } from "react";
import { ChevronDown, Upload } from "lucide-react";
import AuthPopup from "@/src/components/auth/AuthPopup";

interface PropertyListingFormProps {
  submitLabel?: string;
  className?: string;
}

const inputClass =
  "h-12 w-full rounded-[14px] border border-[#ced7e3] bg-[#f4f6f8] px-4 text-[17px] text-[#5c6f88] outline-none transition placeholder:text-[#5c6f88] focus:border-[#9fb1ca]";

const selectTriggerClass =
  "flex h-12 w-full items-center justify-between rounded-[14px] border border-[#ced7e3] bg-[#f4f6f8] px-4 text-[17px] text-[#223049]";

const selectMenuClass =
  "absolute left-0 right-0 top-[56px] z-20 rounded-[12px] border border-[#d3dce7] bg-[#f4f6f8] py-1 shadow-[0_8px_24px_rgba(21,30,58,0.12)]";

function SelectBox({
  value,
  placeholder,
  options,
  open,
  onToggle,
  onSelect,
}: {
  value: string;
  placeholder: string;
  options: string[];
  open: boolean;
  onToggle: () => void;
  onSelect: (item: string) => void;
}) {
  return (
    <div className="relative">
      <button type="button" className={selectTriggerClass} onClick={onToggle}>
        <span className={value ? "text-[#223049]" : "text-[#5c6f88]"}>{value || placeholder}</span>
        <ChevronDown className="h-5 w-5 text-[#7c8ea4]" />
      </button>

      {open && (
        <div className={selectMenuClass}>
          {options.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onSelect(item)}
              className="block w-full px-8 py-2 text-left text-[17px] text-[#2b3a51] transition hover:bg-[#e8edf3]"
            >
              {item}
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
}: PropertyListingFormProps) {
  const [propertyType, setPropertyType] = useState("");
  const [intent, setIntent] = useState("");
  const [showTypeMenu, setShowTypeMenu] = useState(false);
  const [showIntentMenu, setShowIntentMenu] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  function handleSubmitToSourceQueue() {
    const isLoggedIn = localStorage.getItem("preleasehub:isLoggedIn") === "true";

    if (!isLoggedIn) {
      setAuthOpen(true);
      return;
    }

    console.log("Property submitted to source queue.");
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
          <input className={inputClass} placeholder="Owner / Company Name" />
          <input className={inputClass} placeholder="Phone Number" />
          <input className={inputClass} placeholder="Email Address" />
          <input className={inputClass} placeholder="Property Name" />

          <SelectBox
            value={propertyType}
            placeholder="Property Type"
            open={showTypeMenu}
            onToggle={() => {
              setShowTypeMenu((prev) => !prev);
              setShowIntentMenu(false);
            }}
            onSelect={(item) => {
              setPropertyType(item);
              setShowTypeMenu(false);
            }}
            options={["Hotel", "Resort", "Villa", "Service Apartment", "Holiday Home"]}
          />

          <input className={inputClass} placeholder="City" />

          <SelectBox
            value={intent}
            placeholder="Intent"
            open={showIntentMenu}
            onToggle={() => {
              setShowIntentMenu((prev) => !prev);
              setShowTypeMenu(false);
            }}
            onSelect={(item) => {
              setIntent(item);
              setShowIntentMenu(false);
            }}
            options={["Sell", "Lease", "Both"]}
          />

          <input className={inputClass} placeholder="Expected Sale Price / Rent" />
          <input className={inputClass} placeholder="Rooms / Keys" />
          <input className={inputClass} placeholder="Current Occupancy %" />
          <input className={inputClass} placeholder="Current Monthly Income" />
          <input className={inputClass} placeholder="Full Address" />
        </div>

        <label className="mt-4 flex h-[126px] w-full cursor-pointer flex-col items-center justify-center rounded-[18px] border border-dashed border-[#c8d3e2] bg-[#f5f7fa] text-center">
          <Upload className="h-6 w-6 text-[#5e728c]" />
          <p className="mt-3 text-[17px] font-medium leading-none text-[#3a4f6b]">
            Upload property photos and documents
          </p>
          <p className="mt-2 text-[14px] text-[#7a8da7]">
            Images, lease copies, ownership proof, brochures
          </p>
          <input type="file" className="hidden" multiple />
        </label>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={handleSubmitToSourceQueue}
            className="h-12 rounded-[18px] bg-[#020a25] text-[15px] font-medium text-white transition hover:opacity-95"
          >
            {submitLabel}
          </button>
          <button
            type="button"
            className="h-12 rounded-[18px] border border-[#c9d4e3] bg-[#f7f8fa] text-[15px] font-medium text-[#111827] transition hover:bg-white"
          >
            WhatsApp Seller Desk
          </button>
        </div>
      </form>

      <AuthPopup isOpen={authOpen} onClose={() => setAuthOpen(false)} defaultTab="login" />
    </>
  );
}
