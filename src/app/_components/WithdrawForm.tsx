"use client";

import { FaSearch } from "react-icons/fa";
import Image from "next/image";
import type { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { type Bank, type PaymentFormData } from "../_hooks/useCardData";

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
    <section className="bg-white border-gray-400 p-8 rounded-2xl shadow-xl max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Add/Update Bank Account
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search Bank
          </label>
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Start typing bank name..."
              className="w-full pl-10 border rounded-lg p-3 focus:ring-2 focus:ring-blue-300 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bank
          </label>
          <div className="relative">
            <select
              {...register("bankCode", { required: "Bank is required" })}
              className="w-full border rounded-lg p-3 pr-10 appearance-none focus:ring-2 focus:ring-blue-300 focus:outline-none"
              value={selectedBankCode ?? ""}
              onChange={(e) => setSelectedBankCode(e.target.value)}
            >
              <option value="">-- Select a bank --</option>
              {filteredBanks.map((bank: Bank) => (
                <option key={bank.id} value={bank.code}>
                  {bank.name}
                </option>
              ))}
            </select>
            {selectedBank?.logo ? (
              <Image
                src={selectedBank.logo}
                alt={selectedBank.name}
                width={28}
                height={28}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-7 h-7 rounded-full border bg-white object-contain"
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Account Number
          </label>
          <input
            type="text"
            {...register("accountNumber", {
              required: "Account number required",
            })}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-300 focus:outline-none"
            placeholder="0123456789"
          />
          {errors.accountNumber?.message && (
            <span className="text-red-600 text-xs mt-1 block">
              {errors.accountNumber.message}
            </span>
          )}
        </div>

        {status.message && (
          <div
            className={`text-sm font-medium mt-2 ${
              status.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {status.message}
          </div>
        )}

        <button
          type="submit"
          disabled={status.isSaving || !isDirty || !isValid}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 disabled:opacity-50"
        >
          {status.isSaving ? "Saving..." : "Save Bank Info"}
        </button>
      </form>
    </section>
  );
};
