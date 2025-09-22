"use client";

import { FaSearch, FaUniversity } from "react-icons/fa";
import Image from "next/image";
import type { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { type Bank, type PaymentFormData } from "../_hooks/useCardData";
import SpinnerMini from "./SpinnerMini";
import {Button} from "./DashboardBtn";

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
    <section className="relative overflow-hidden w-full bg-db-surface border border-db-border p-8 sm:p-10 rounded-2xl shadow-sm my-8">
  
      <div className="relative z-10">
        {" "}
        {/* Ensure content is above the dreamy background */}
        <h2 className="lg:text-2xl text-xl font-extrabold text-db-primary mb-8 flex items-center gap-3">
          <FaUniversity className="text-db-secondary text-3xl" />{" "}
          {/* Changed icon color to purple */}
          Add/Update Bank Account
        </h2>
       <form
  onSubmit={handleSubmit(onSubmit)}
  className="flex flex-col gap-y-6 sm:gap-y-7"
>
  {/* Search Field */}
  <div>
    <label
      htmlFor="bankSearch"
      className="block text-sm sm:text-base font-medium text-db-text-secondary mb-2"
    >
      Search Bank
    </label>
    <div className="relative">
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
      <input
        id="bankSearch"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Start typing bank name..."
        className="w-full pl-9 sm:pl-10 pr-4 bg-db-background border border-db-border rounded-xl py-2.5 sm:py-3 text-sm sm:text-base focus:ring-2 focus:ring-purple-400 focus:border-db-primary outline-none transition-all duration-200 text-db-text-primary"
        autoComplete="off"
      />
    </div>
  </div>

  {/* Bank Dropdown */}
  <div>
    <label
      htmlFor="bankSelect"
      className="block text-sm sm:text-base font-medium text-db-text-secondary mb-2"
    >
      Bank
    </label>
    <div className="relative">
      <select
        id="bankSelect"
        {...register("bankCode", { required: "Bank is required" })}
        className={`w-full bg-db-background border text-sm sm:text-base rounded-xl py-2.5 sm:py-3 pr-10 transition-all duration-200 ${
          errors.bankCode ? "border-red-500" : "border-db-border"
        } focus:ring-2 focus:ring-purple-400 focus:border-db-primary text-db-text-primary`}
        value={selectedBankCode ?? ""}
        onChange={(e) => setSelectedBankCode(e.target.value)}
      >
        <option value="">-- Select a bank --</option>
        {filteredBanks.length === 0 && (
          <option value="" disabled>No banks found</option>
        )}
        {filteredBanks.map((bank: Bank) => (
          <option key={bank.id} value={bank.code}>
            {bank.name}
          </option>
        ))}
      </select>

      {/* Bank logo */}
      {selectedBank?.logo && (
        <Image
          src={selectedBank.logo}
          alt={selectedBank.name}
          width={28}
          height={28}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 rounded-full border bg-white object-contain shadow-sm"
        />
      )}
 
    </div>
    {errors.bankCode?.message && (
      <span className="text-red-600 text-xs sm:text-sm mt-1 block">
        {errors.bankCode.message}
      </span>
    )}
  </div>

  {/* Account Number */}
  <div>
    <label
      htmlFor="accountNumber"
      className="block text-sm sm:text-base font-medium text-db-text-secondary mb-2"
    >
      Account Number
    </label>
    <input
      id="accountNumber"
      type="text"
      {...register("accountNumber", {
        required: "Account number is required",
        pattern: { value: /^\d{10}$/, message: "Must be 10 digits" },
      })}
      className={`w-full bg-db-background border ${
        errors.accountNumber ? "border-red-500" : "border-db-border"
      } rounded-xl py-2.5 sm:py-3 px-4 text-sm sm:text-base focus:ring-2 focus:ring-purple-400 focus:border-db-primary transition-all duration-200 text-db-text-primary`}
      placeholder="e.g., 0123456789"
      maxLength={10}
    />
    {errors.accountNumber?.message && (
      <span className="text-red-600 text-xs sm:text-sm mt-1 block">
        {errors.accountNumber.message}
      </span>
    )}
  </div>

  {/* Status Message */}
  {status.message && (
    <div
      className={`text-sm sm:text-base font-medium p-3 rounded-lg transition-opacity duration-300 ${
        status.type === "success"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {status.message}
    </div>
  )}

  {/* Submit Button */}
  <Button
    type="submit"
    disabled={status.isSaving || !isDirty || !isValid}
    className="w-full"
    variant="secondary"
    size="lg"
  >
    {status.isSaving && <SpinnerMini />}
    {status.isSaving ? "Saving..." : "Save Bank Info"}
  </Button>
</form>

      </div>
    </section>
  );
};
