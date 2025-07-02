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
    <section className="bg-gradient-to-br from-white via-blue-50 to-blue-100 border border-blue-100 p-10 rounded-xl shadow-xl max-w-xl mx-auto">
      <h2 className="text-3xl font-bold text-blue-900 mb-8 flex items-center gap-3">
        <FaUniversity className="text-blue-600" /> Add/Update Bank Account
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
        {/* Search Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Bank
          </label>
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Start typing bank name..."
              className="w-full pl-10 border border-blue-200 rounded-xl p-4 text-base focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              autoComplete="off"
            />
          </div>
        </div>

        {/* Bank Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bank
          </label>
          <div className="relative">
            <select
              {...register("bankCode", { required: "Bank is required" })}
              className="w-full border border-blue-200 rounded-xl p-4 pr-12 appearance-none focus:ring-2 focus:ring-blue-400 focus:outline-none text-base"
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
            {/* Show logo if selected */}
            {selectedBank?.logo ? (
              <Image
                src={selectedBank.logo}
                alt={selectedBank.name}
                width={32}
                height={32}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border bg-white object-contain"
              />
            ) : (
              selectedBankCode && (
                <span className="absolute inset-y-0 right-3 flex items-center text-gray-500 text-xs">
                  Selected
                </span>
              )
            )}
          </div>
          {errors.bankCode?.message && (
            <span className="text-red-600 text-xs mt-1 block">
              {errors.bankCode.message}
            </span>
          )}
        </div>

        {/* Account Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Account Number
          </label>
          <input
            type="text"
            {...register("accountNumber", {
              required: "Account number required",
              pattern: {
                value: /^\d{10}$/,
                message: "Account number must be 10 digits",
              },
            })}
            className="w-full border border-blue-200 rounded-xl p-4 text-base focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            placeholder="0123456789"
            maxLength={10}
          />
          {errors.accountNumber?.message && (
            <span className="text-red-600 text-xs mt-1 block">
              {errors.accountNumber.message}
            </span>
          )}
        </div>

        {/* Status Message */}
        {status.message && (
          <div
            className={`text-base font-medium mt-2 ${
              status.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {status.message}
          </div>
        )}

        <button
          type="submit"
          disabled={status.isSaving || !isDirty || !isValid}
          className="w-full bg-gradient-to-r from-blue-600 to-green-500 flex items-center justify-center text-white py-4 rounded-xl font-semibold text-lg shadow hover:from-blue-700 hover:to-green-600 transition duration-200 disabled:opacity-50"
        >
          {status.isSaving ? <SpinnerMini /> : "Save Bank Info"}
        </button>
      </form>
    </section>
  );
};
