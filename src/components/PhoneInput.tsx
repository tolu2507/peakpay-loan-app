"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Country {
  name: string;
  code: string;
  flag: string;
  dialCode: string;
  maxLength: number;
}

const countries: Country[] = [
  { name: "Nigeria", code: "NG", flag: "🇳🇬", dialCode: "+234", maxLength: 10 },
  {
    name: "United Kingdom",
    code: "GB",
    flag: "🇬🇧",
    dialCode: "+44",
    maxLength: 10,
  },
  {
    name: "United States",
    code: "US",
    flag: "🇺🇸",
    dialCode: "+1",
    maxLength: 10,
  },
  { name: "Ghana", code: "GH", flag: "🇬🇭", dialCode: "+233", maxLength: 9 },
  { name: "Kenya", code: "KE", flag: "🇰🇪", dialCode: "+254", maxLength: 9 },
  {
    name: "South Africa",
    code: "ZA",
    flag: "🇿🇦",
    dialCode: "+27",
    maxLength: 9,
  },
  { name: "Canada", code: "CA", flag: "🇨🇦", dialCode: "+1", maxLength: 10 },
];

interface PhoneInputProps {
  value: string;
  dialCode: string;
  onChange: (value: string) => void;
  onDialCodeChange: (dialCode: string) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  dialCode,
  onChange,
  onDialCodeChange,
}) => {
  const [selectedCountry, setSelectedCountry] = useState(
    countries.find((c) => c.dialCode === dialCode) || countries[0],
  );
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCountries = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.dialCode.includes(search),
  );

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, ""); // Remove non-digits

    // Remove leading zero if present
    if (val.startsWith("0")) {
      val = val.substring(1);
    }

    // Limit to country max length
    if (val.length <= selectedCountry.maxLength) {
      onChange(val);
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className={cn(
          "flex items-stretch border border-gray-200 rounded-xl overflow-hidden bg-white focus-within:ring-2 focus-within:ring-[#FF8A00] focus-within:border-transparent transition-all",
          isOpen && "ring-2 ring-[#FF8A00] border-transparent",
        )}>
        {/* Flag Selection Part (Only this has background) */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-3.5 bg-gray-100 hover:bg-gray-200 transition-colors border-r border-gray-200">
          <span className="text-2xl leading-none">{selectedCountry.flag}</span>
          <ChevronDown
            size={14}
            className={cn(
              "text-gray-500 transition-transform",
              isOpen && "rotate-180",
            )}
          />
        </button>

        {/* Input Part (White background) */}
        <div className="flex-1 flex items-center px-4">
          <span className="text-gray-700 font-semibold mr-2 flex-shrink-0">
            {selectedCountry.dialCode}
          </span>
          <input
            type="tel"
            placeholder="(000) 000-0000"
            value={value}
            onChange={handlePhoneChange}
            className="w-full py-3.5 outline-none bg-transparent placeholder:text-gray-300 text-gray-900 font-medium"
          />
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-gray-100 rounded-xl shadow-2xl z-[100] overflow-hidden animate-in fade-in zoom-in duration-200">
          <div className="p-3 border-b border-gray-50 bg-gray-50/50">
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search country..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-lg outline-none focus:border-[#FF8A00] transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
              />
            </div>
          </div>

          <div className="max-h-64 overflow-y-auto py-1">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => {
                    setSelectedCountry(c);
                    onDialCodeChange(c.dialCode);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 hover:bg-orange-50 transition-colors text-left",
                    selectedCountry.code === c.code && "bg-orange-50",
                  )}>
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{c.flag}</span>
                    <span className="text-sm font-medium text-gray-700">
                      {c.name}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-gray-400">
                    {c.dialCode}
                  </span>
                </button>
              ))
            ) : (
              <div className="px-4 py-6 text-center text-gray-400 text-sm italic">
                No countries found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhoneInput;
