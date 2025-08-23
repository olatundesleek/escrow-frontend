"use client";

import { useEffect, useRef, useState } from "react";
import SpinnerMini from "./SpinnerMini";
import { CountryData, CustomCountrySelectProps } from "../_types/authTypes";
import { FiChevronDown } from "react-icons/fi"; // React Icon
import Image from "next/image";

export const CustomCountrySelect: React.FC<CustomCountrySelectProps> = ({
  countries,
  loading,
  register,
  setValue,
  errors,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(
    null
  );
  const [phone, setPhone] = useState(""); // track phone separately
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Default country
  useEffect(() => {
    if (countries.length > 0 && !selectedCountry) {
      const defaultCountry =
        countries.find((country) => country.code === "+234") || countries[0];
      setSelectedCountry(defaultCountry);
      setValue("countryCode", defaultCountry.code);
    }
  }, [countries, selectedCountry, setValue]);

  // Combine country code + phone
  useEffect(() => {
    if (selectedCountry && phone) {
      setValue("phone", `${selectedCountry.code}${phone}`, {
        shouldValidate: true,
      });
    }
  }, [phone, selectedCountry, setValue]);

  const handleSelect = (country: CountryData) => {
    setSelectedCountry(country);
    setValue("countryCode", country.code, { shouldValidate: true });
    if (phone) {
      setValue("phone", `${country.code}${phone}`, { shouldValidate: true });
    }
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      {loading ? (
        <div className="flex items-center justify-center p-2 rounded-sm bg-gray-200">
          <SpinnerMini />
        </div>
      ) : (
        <div className="flex gap-2 w-full items-center">
          {/* Country dropdown */}
          <div
            className={`flex items-center gap-2 p-2 rounded-md border border-background cursor-pointer bg-white transition-all duration-200 hover:shadow-md ${
              isOpen ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {selectedCountry && (
              <Image
                src={`https://flagcdn.com/w20/${selectedCountry.cca2.toLowerCase()}.png`}
                alt={`${selectedCountry.name} flag`}
                width={20}
                height={25}
                className="rounded-sm"
              />
            )}
            <span className="text-gray-700">{selectedCountry?.code}</span>
            <FiChevronDown
              className={`w-4 h-4 text-gray-400 transform transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          {/* Phone input */}
          <input
            type="tel"
            id="phone"
            autoComplete="tel"
            className={`outline-0 focus:ring-1 focus:ring-secondary w-full md:p-4 p-2 pr-12 border border-background rounded-sm bg-white ${
              errors.phone ? "border-red-500" : ""
            }`}
            value={phone}
            placeholder="8012345678"
            {...register("phone", {
              required: { value: true, message: "Phone Number is required" },
              pattern: {
                value: /^[0-9+\-\s()]{7,20}$/,
                message: "Invalid phone number format",
              },
            })}
            onChange={(e) => {
              setPhone(e.target.value.replace(/\s+/g, "")); // remove spaces
            }}
          />
        </div>
      )}

      {/* Dropdown list */}
      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg py-1">
          {countries.map((country, index) => (
            <li
              key={index}
              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(country)}
            >
              <Image
                src={`https://flagcdn.com/w20/${country.cca2.toLowerCase()}.png`}
                alt={`${country.name} flag`}
                width={20}
                height={20}
                className="rounded-sm"
              />
              <span className="text-sm font-medium">{country.name}</span>
              <span className="ml-auto text-gray-500 text-sm">
                {country.code}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Error */}
      {errors.phone && (
        <span className="text-red-500 text-sm">
          {String(errors.phone.message)}
        </span>
      )}
    </div>
  );
};
