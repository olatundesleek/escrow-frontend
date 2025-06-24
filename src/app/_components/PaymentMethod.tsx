"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaMoneyBill, FaPiggyBank, FaChartLine } from "react-icons/fa";
import UserDashboardPageTitle from "./UserDashboardPageTitle";
import Image from "next/image";

export default function PaymentDashboard() {
  const [status, setStatus] = useState({
    isSaving: false,
    message: "",
    type: "",
  });

  type Bank = {
    id: number;
    code: string;
    name: string;
    logo?: string;
    [key: string]: unknown;
  };

  const [banks, setBanks] = useState<Bank[]>([]);
  const [selectedBankCode, setSelectedBankCode] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<PaymentFormData>({ mode: "onChange" });

  useEffect(() => {
    fetch("https://api.paystack.co/bank?currency=NGN")
      .then((res) => res.json())
      .then((data) => {
        if (data.status) setBanks(data.data);
      });
  }, []);

  type PaymentFormData = {
    bankCode: string;
    accountNumber: string;
  };

  const onSubmit = (data: PaymentFormData) => {
    console.log("Submitted", data);
    setStatus({ isSaving: true, message: "", type: "" });

    setTimeout(() => {
      setStatus({
        isSaving: false,
        message: "Payment method updated successfully",
        type: "success",
      });
      reset();
      setSelectedBankCode(null);
    }, 1500);
  };

  const selectedBank = banks.find((b) => b.code === selectedBankCode);

  return (
    <>
      <UserDashboardPageTitle title="Payment Dashboard" />

      {/* Top Cards */}
      <section className="grid sm:grid-cols-3 gap-6 my-8">
        <div className="bg-gradient-to-tr from-green-100 to-green-50 shadow-md rounded-2xl p-6 flex items-center gap-4">
          <FaMoneyBill className="text-green-600 text-3xl" />
          <div>
            <h4 className="text-sm font-medium text-green-800">
              Total Payments
            </h4>
            <p className="text-xl font-bold text-green-900">₦1,200,000</p>
          </div>
        </div>
        <div className="bg-gradient-to-tr from-blue-100 to-blue-50 shadow-md rounded-2xl p-6 flex items-center gap-4">
          <FaPiggyBank className="text-blue-600 text-3xl" />
          <div>
            <h4 className="text-sm font-medium text-blue-800">Total Savings</h4>
            <p className="text-xl font-bold text-blue-900">₦300,000</p>
          </div>
        </div>
        <div className="bg-gradient-to-tr from-purple-100 to-purple-50 shadow-md rounded-2xl p-6 flex items-center gap-4">
          <FaChartLine className="text-purple-600 text-3xl" />
          <div>
            <h4 className="text-sm font-medium text-purple-800">
              Total Investments
            </h4>
            <p className="text-xl font-bold text-purple-900">₦500,000</p>
          </div>
        </div>
      </section>

      {/* Bank Dropdown */}
      <section className="bg-white border border-gray-300 p-8 rounded-2xl shadow-xl max-w-xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Add/Update Bank Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                disabled={selectedBankCode !== null}
              >
                <option value="">-- Select a bank --</option>
                {banks.map((bank: Bank) => (
                  <option key={bank.id} value={bank.code}>
                    {bank.name}
                  </option>
                ))}
              </select>
              {selectedBank && selectedBank.logo && (
                <Image
                  src={selectedBank.logo}
                  alt={selectedBank.name}
                  width={28}
                  height={28}
                  className="w-7 h-7 rounded-full border bg-white object-contain"
                />
              )}
              {selectedBankCode && !selectedBank?.logo && (
                <span className="absolute inset-y-0 right-3 flex items-center text-gray-500 text-xs">
                  Selected
                </span>
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
    </>
  );
}
