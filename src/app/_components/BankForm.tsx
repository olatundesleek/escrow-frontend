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
    <section className="bg-gradient-to-br from-white via-blue-50 to-blue-100 border border-blue-100 p-8 rounded-xl shadow-xl max-w-xl mx-auto">
      <h2 className="text-3xl font-bold text-blue-900 mb-8 flex items-center gap-3">
        <FaUniversity className="text-blue-600" /> Withdraw to Bank
      </h2>

      <div className="space-y-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-base">
          <div className="flex items-center gap-3 bg-blue-50 rounded-xl p-4">
            <FaUniversity className="text-blue-500 text-lg" />
            <div>
              <span className="block text-xs text-gray-500">Bank Name</span>
              <span className="text-blue-700 font-semibold">
                {userBankInfo?.bankName || "N/A"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-blue-50 rounded-xl p-4">
            <FaHashtag className="text-blue-400 text-lg" />
            <div>
              <span className="block text-xs text-gray-500">
                Account Number
              </span>
              <span className="text-gray-800 font-semibold">
                {userBankInfo?.accountNumber || "N/A"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-blue-50 rounded-xl p-4 sm:col-span-2">
            <FaUser className="text-blue-400 text-lg" />
            <div>
              <span className="block text-xs text-gray-500">Account Name</span>
              <span className="text-gray-800 font-semibold">
                {userBankInfo?.accountName || "N/A"}
              </span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Withdraw Amount
          </label>
          <input
            type="text"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            placeholder="₦0.00"
            className="w-full border border-blue-200 rounded-xl p-4 text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          />
        </div>

        {withdrawMessage && (
          <div
            className={`text-base font-medium flex items-center gap-2 ${
              withdrawMessage.type === "success"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {withdrawMessage.type === "success" ? (
              <FaCheckCircle />
            ) : (
              <FaTimesCircle />
            )}
            {withdrawMessage.text}
          </div>
        )}

        <button
          onClick={handleWithdraw}
          disabled={isWithdrawing || !withdrawAmount}
          className="w-full bg-gradient-to-r from-blue-600 to-green-500 flex justify-center items-center text-white py-4 rounded-xl font-semibold text-lg shadow hover:from-blue-700 hover:to-green-600 transition duration-200 disabled:opacity-50"
        >
          {isWithdrawing ? <SpinnerMini /> : "Withdraw to Bank"}
        </button>
      </div>
    </section>
  );
};
