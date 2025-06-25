import { useState, useEffect } from "react";
import { FaMoneyBill, FaPiggyBank, FaChartLine } from "react-icons/fa";

export type Bank = {
  id: number;
  code: string;
  name: string;
  logo?: string;
  [key: string]: unknown;
};

export type PaymentFormData = {
  bankCode: string;
  accountNumber: string;
};
export const useCardData = () => {
  const [walletData, setWalletData] = useState({
    balance: 0,
    locked: 0,
  });

  useEffect(() => {
    fetch("/api/wallet/summary") //Fake API
      .then((res) => res.json())
      .then((data) => setWalletData(data))
      .catch(() => {
        // Optionally handle errors
      });
  }, []);

  const cardData = [
    {
      label: "Available Balance",
      value: walletData.balance,
      icon: FaMoneyBill,
      color: "green",
    },
    {
      label: "Locked Amount",
      value: walletData.locked,
      icon: FaPiggyBank,
      color: "blue",
    },
    {
      label: "Total Amount",
      value: walletData.balance + walletData.locked,
      icon: FaChartLine,
      color: "purple",
    },
  ];

  return { cardData };
};
