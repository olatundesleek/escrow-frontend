"use client";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaUniversity,
  FaUser,
  FaHashtag,
} from "react-icons/fa";
import SpinnerMini from "./SpinnerMini";

type BankFormProps = {
  userBankInfo: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  } | null;
  withdrawAmount: string;
  setWithdrawAmount: (value: string) => void;
  withdrawMessage: {
    text: string;
    type: "success" | "error";
  } | null;
  handleWithdraw: () => void;
  isWithdrawing: boolean;
};

export const BankForm = ({
  userBankInfo,
  withdrawAmount,
  setWithdrawAmount,
  withdrawMessage,
  handleWithdraw,
  isWithdrawing,
}: BankFormProps) => {
  return (
    <section className="relative overflow-hidden w-full bg-gradient-to-br from-indigo-50 to-purple-50 border border-blue-100 p-8 sm:p-10 rounded-3xl shadow-xl my-8">
      {/* Subtle background graphics for a dreamy effect */}
      <div className="absolute -top-10 -left-10 h-48 w-48 rounded-full bg-blue-200 opacity-20 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-purple-200 opacity-20 blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-60 w-60 rounded-full bg-white opacity-10 blur-3xl pointer-events-none"></div>

      <div className="relative z-10">
        <h2 className="lg:text-2xl text-xl font-extrabold text-blue-900 mb-8 flex items-center gap-3">
          <FaUniversity className="text-purple-600 text-3xl" />
          {/* Changed icon color to purple */}
          Withdraw to Bank
        </h2>

        <div className="space-y-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-base">
            {/* Bank Info Cards */}
            <div className="flex items-center gap-3 bg-white rounded-xl p-4 border border-blue-100 shadow-sm">
              <FaUniversity className="text-blue-500 text-xl" />
              {/* Larger icon */}
              <div>
                <span className="block text-xs text-gray-500">Bank Name</span>
                <span className="text-blue-700 font-semibold">
                  {userBankInfo?.bankName || "N/A"}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white rounded-xl p-4 border border-blue-100 shadow-sm">
              <FaHashtag className="text-blue-400 text-xl" />
              {/* Larger icon */}
              <div>
                <span className="block text-xs text-gray-500">
                  Account Number
                </span>
                <span className="text-gray-800 font-semibold">
                  {userBankInfo?.accountNumber || "N/A"}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white rounded-xl p-4 sm:col-span-2 border border-blue-100 shadow-sm">
              <FaUser className="text-blue-400 text-xl" /> {/* Larger icon */}
              <div>
                <span className="block text-xs text-gray-500">
                  Account Name
                </span>
                <span className="text-gray-800 font-semibold">
                  {userBankInfo?.accountName || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Withdraw Amount Input */}
          <div>
            <label
              htmlFor="withdrawAmount"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Withdraw Amount
            </label>
            <input
              id="withdrawAmount"
              type="text"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              placeholder="₦0.00"
              className="w-full border border-blue-200 rounded-xl p-4 text-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none transition-all duration-200 shadow-sm" // Adjusted border/focus color, added shadow
            />
          </div>

          {/* Withdraw Message */}
          {withdrawMessage && (
            <div
              className={`sm:text-base text-sm font-medium flex items-center gap-2 p-3 rounded-lg shadow-sm ${
                withdrawMessage.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {withdrawMessage.type === "success" ? (
                <FaCheckCircle className="text-xl" /> // Larger icon
              ) : (
                <FaTimesCircle className="text-xl" /> // Larger icon
              )}
              {withdrawMessage.text}
            </div>
          )}

          {/* Withdraw Button */}
          <button
            onClick={handleWithdraw}
            disabled={isWithdrawing || !withdrawAmount}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 flex justify-center items-center gap-2 text-white py-3.5 rounded-xl font-semibold text-lg shadow-lg hover:from-purple-700 hover:to-indigo-800 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-98 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2" // Enhanced button colors, shadow, and transition
          >
            {isWithdrawing && <SpinnerMini />}
            {isWithdrawing ? "Processing..." : "Withdraw to Bank"}
          </button>
        </div>
      </div>
    </section>
  );
};
