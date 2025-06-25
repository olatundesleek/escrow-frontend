"use client";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

type BankFormProps = {
  userBankInfo: {
    bankName: string;
    account: string;
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
    <section className="bg-white border-gray-400 p-8 rounded-2xl shadow-xl max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Withdraw to Bank
      </h2>
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700">Bank:</span>
          <span className="text-base font-semibold text-blue-600">
            {userBankInfo?.bankName || "Your Bank"}
          </span>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Withdraw Amount
          </label>
          <input
            type="text"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            placeholder="₦0.00"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-300 focus:outline-none"
          />
        </div>
        {withdrawMessage && (
          <div
            className={`text-sm font-medium flex items-center gap-2 ${
              withdrawMessage.type === "success"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {withdrawMessage.type === "success" ? (
              <FaCheckCircle />
            ) : (
              <FaTimesCircle />
            )}{" "}
            {withdrawMessage.text}
          </div>
        )}
        <button
          onClick={handleWithdraw}
          disabled={isWithdrawing || !withdrawAmount}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-200 disabled:opacity-50"
        >
          {isWithdrawing ? "Processing..." : "Withdraw to Bank"}
        </button>
      </div>
    </section>
  );
};
