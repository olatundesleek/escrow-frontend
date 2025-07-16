"use client";

import { FaSearch, FaUniversity } from "react-icons/fa";
import Image from "next/image";
import type { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { type Bank, type PaymentFormData } from "../_hooks/useCardData";
import SpinnerMini from "./SpinnerMini";

type WithdrawFormProps = {
  handleSubmit: UseFormHandleSubmit<PaymentFormData, PaymentFormData>;
  onSubmit: (data: PaymentFormData) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  register: UseFormRegister<PaymentFormData>;
  selectedBankCode: string | null;
  setSelectedBankCode: (value: string) => void;
  filteredBanks: Bank[];
  selectedBank: Bank | undefined;
  errors: Record<string, { message?: string }>;
  isDirty: boolean;
  isValid: boolean;
  status: {
    isSaving: boolean;
    message: string;
    type: string;
  };
};

export const WithdrawForm = ({
  handleSubmit,
  onSubmit,
  searchTerm,
  setSearchTerm,
  register,
  selectedBankCode,
  setSelectedBankCode,
  filteredBanks,
  selectedBank,
  errors,
  isDirty,
  isValid,
  status,
}: WithdrawFormProps) => {
  return (
    <section className="relative overflow-hidden w-full bg-gradient-to-br from-indigo-50 to-purple-50 border border-blue-100 p-8 sm:p-10 rounded-3xl shadow-xl my-8">
      {/* Subtle background graphics for a dreamy effect */}
      <div className="absolute -top-10 -left-10 h-48 w-48 rounded-full bg-blue-200 opacity-20 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-purple-200 opacity-20 blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-60 w-60 rounded-full bg-white opacity-10 blur-3xl pointer-events-none"></div>

      <div className="relative z-10">
        {" "}
        {/* Ensure content is above the dreamy background */}
        <h2 className="lg:text-2xl text-xl font-extrabold text-blue-900 mb-8 flex items-center gap-3">
          <FaUniversity className="text-purple-600 text-3xl" />{" "}
          {/* Changed icon color to purple */}
          Add/Update Bank Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
          {" "}
          {/* Adjusted spacing for form fields */}
          {/* Search Field */}
          <div>
            <label
              htmlFor="bankSearch"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Search Bank
            </label>
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                id="bankSearch"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Start typing bank name..."
                className="w-full pl-10 pr-4 border border-blue-200 rounded-xl py-3 text-base focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none transition-all duration-200 shadow-sm" // Adjusted border/focus color, added shadow
                autoComplete="off"
              />
            </div>
          </div>
          {/* Bank Dropdown */}
          <div>
            <label
              htmlFor="bankSelect"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Bank
            </label>
            <div className="relative">
              <select
                id="bankSelect"
                {...register("bankCode", { required: "Bank is required" })}
                className={`w-full border ${
                  errors.bankCode ? "border-red-500" : "border-blue-200" // Adjusted border color
                } rounded-xl py-3 pr-12 appearance-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none text-base transition-all duration-200 shadow-sm`} // Adjusted border/focus color, added shadow
                value={selectedBankCode ?? ""}
                onChange={(e) => setSelectedBankCode(e.target.value)}
              >
                <option value="">-- Select a bank --</option>
                {filteredBanks.length === 0 && (
                  <option value="" disabled>
                    No banks found
                  </option>
                )}
                {filteredBanks.map((bank: Bank) => (
                  <option key={bank.id} value={bank.code}>
                    {bank.name}
                  </option>
                ))}
              </select>
              {/* Show logo or placeholder if selected */}
              {selectedBank?.logo ? (
                <Image
                  src={selectedBank.logo}
                  alt={selectedBank.name}
                  width={28}
                  height={28}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full border border-gray-100 bg-white object-contain shadow-sm"
                />
              ) : (
                selectedBankCode && (
                  <span className="absolute inset-y-0 right-3 flex items-center text-gray-500 text-xs">
                    Selected
                  </span>
                )
              )}
              {/* Custom arrow for dropdown for consistent styling */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.061 6.89l-1.414 1.414L9.293 12.95z" />
                </svg>
              </div>
            </div>
            {errors.bankCode?.message && (
              <span className="text-red-600 text-sm mt-1 block">
                {errors.bankCode.message}
              </span>
            )}
          </div>
          {/* Account Number */}
          <div>
            <label
              htmlFor="accountNumber"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Account Number
            </label>
            <input
              id="accountNumber"
              type="text"
              {...register("accountNumber", {
                required: "Account number is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Account number must be 10 digits",
                },
              })}
              className={`w-full border ${
                errors.accountNumber ? "border-red-500" : "border-blue-200" // Adjusted border color
              } rounded-xl py-3 px-4 text-base focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none transition-all duration-200 shadow-sm`} // Adjusted border/focus color, added shadow
              placeholder="e.g., 0123456789"
              maxLength={10}
            />
            {errors.accountNumber?.message && (
              <span className="text-red-600 text-sm mt-1 block">
                {errors.accountNumber.message}
              </span>
            )}
          </div>
          {/* Status Message */}
          {status.message && (
            <div
              className={`text-base font-medium p-3 rounded-lg ${
                status.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              } shadow-sm`}
            >
              {status.message}
            </div>
          )}
          <button
            type="submit"
            disabled={status.isSaving || !isDirty || !isValid}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 flex items-center justify-center gap-2 text-white py-3.5 rounded-xl font-semibold text-lg shadow-lg hover:from-purple-700 hover:to-indigo-800 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-98 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2" // Enhanced button colors, shadow, and transition
          >
            {status.isSaving && <SpinnerMini />}
            {status.isSaving ? "Saving..." : "Save Bank Info"}
          </button>
        </form>
      </div>
    </section>
  );
};
