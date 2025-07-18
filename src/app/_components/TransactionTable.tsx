"use client";

import { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { CiNoWaitingSign } from "react-icons/ci";
import { MdOutlineErrorOutline } from "react-icons/md";

interface Transaction {
  user: string;
  trx: string;
  time: string;
  amount: number;
}

// Simulate API call with diverse user data
const fetchTransactions = (): Promise<Transaction[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const simulatedData: Transaction[] = [
        {
          user: "Alice Smith",
          trx: "TRX87654321A",
          time: "10-02-2025 05:48 AM",
          amount: -40.5,
        },
        {
          user: "Bob Johnson",
          trx: "TRX12345678B",
          time: "09-28-2025 03:20 PM",
          amount: 150.0,
        },
        {
          user: "Charlie Brown",
          trx: "TRX98765432C",
          time: "09-25-2025 10:00 AM",
          amount: 25.0,
        },
        {
          user: "Diana Prince",
          trx: "TRX11223344D",
          time: "09-22-2025 08:10 AM",
          amount: -75.0,
        },
        {
          user: "Eve Adams",
          trx: "TRX55667788E",
          time: "09-20-2025 01:45 PM",
          amount: 0,
        },
        {
          user: "Frank White",
          trx: "TRX99001122F",
          time: "09-18-2025 09:30 AM",
          amount: 300.0,
        },
        {
          user: "Grace Lee",
          trx: "TRX33445566G",
          time: "09-15-2025 11:55 AM",
          amount: -120.0,
        },
        {
          user: "Henry Wilson",
          trx: "TRX77889900H",
          time: "09-12-2025 06:00 PM",
          amount: 50.0,
        },
        {
          user: "Ivy Kim",
          trx: "TRX10101010I",
          time: "09-10-2025 02:10 AM",
          amount: -10.0,
        },
        {
          user: "Jack Davis",
          trx: "TRX20202020J",
          time: "09-08-2025 07:30 PM",
          amount: 0,
        },
        {
          user: "Karen Hall",
          trx: "TRX30303030K",
          time: "09-05-2025 04:00 AM",
          amount: 80.0,
        },
        {
          user: "Liam Green",
          trx: "TRX40404040L",
          time: "09-02-2025 10:15 AM",
          amount: -250.0,
        },
      ];
      resolve(simulatedData);
    }, 1500);
  });
};

const TransactionTable = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchTransactions();
        setTransactions(data);
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
        setError("Failed to load transactions. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  const formatAmount = (amount: number) => {
    const sign = amount >= 0 ? "+" : "-";
    const colorClass =
      amount < 0
        ? "text-red-600"
        : amount > 0
        ? "text-green-600"
        : "text-gray-500";
    return (
      <span className={`font-medium ${colorClass}`}>
        {sign} {Math.abs(amount).toFixed(2)} USD
      </span>
    );
  };

  // Keep time as is for simplicity, as per your request
  const formatTime = (timeString: string) => {
    return timeString;
  };

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="min-h-[300px] flex flex-col justify-center items-center rounded-xl border border-gray-200 bg-white shadow-lg text-gray-500">
          <FaSpinner className="animate-spin h-8 w-8 text-blue-500" />
          <p className="mt-3 text-base">Loading transactions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full">
        <div className="min-h-[300px] flex flex-col justify-center items-center rounded-xl border border-red-300 bg-red-50 shadow-lg text-red-700 p-4 text-center">
          <MdOutlineErrorOutline className="h-10 w-10 text-red-500 mb-2" />
          <p className="text-lg font-semibold mb-2">
            Error Loading Transactions
          </p>
          <p className="text-sm">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors shadow-sm"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="w-full">
        <div className="min-h-[300px] flex flex-col justify-center items-center rounded-xl border border-gray-200 bg-white shadow-lg text-gray-500 p-4">
          <CiNoWaitingSign className="h-12 w-12 text-gray-400 mb-2" />
          <p className="text-lg font-semibold mb-2">No Transactions Found</p>
          <p className="text-sm text-center">
            There are no transactions to display for this period.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Latest Transactions
        </h2>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  TRX ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Initiated Time
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((trx, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-4 py-3 whitespace-nowrap text-indigo-600 font-medium">
                    {trx.user}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-700">
                    {trx.trx}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-500">
                    {formatTime(trx.time)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    {formatAmount(trx.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
