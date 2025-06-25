"use client";

import UserDashboardPageTitle from "./UserDashboardPageTitle";
import { WalletCard } from "./WalletCard";
import { BankForm } from "./BankForm";
import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { WithdrawForm } from "./WithdrawForm";
import { type Bank, type PaymentFormData } from "../_hooks/useCardData";
export default function PaymentDashboard() {
  const [status, setStatus] = useState({
    isSaving: false,
    message: "",
    type: "",
  });

  const [banks, setBanks] = useState<Bank[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedBankCode, setSelectedBankCode] = useState<string | null>(null);
  const [bankSet, setBankSet] = useState<boolean>(false);
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");
  const [isWithdrawing, setIsWithdrawing] = useState<boolean>(false);
  const [withdrawMessage, setWithdrawMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [userBankInfo, setUserBankInfo] = useState<{
    bankName: string;
    account: string;
  } | null>(null);

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

  const onSubmit = (data: PaymentFormData) => {
    setStatus({ isSaving: true, message: "", type: "" });

    setTimeout(() => {
      setBankSet(true);
      console.log(bankSet);
      setStatus({
        isSaving: false,
        message: "Payment method updated successfully",
        type: "success",
      });
      setUserBankInfo({
        bankName: banks.find((b) => b.code === data.bankCode)?.name || "",
        account: data.accountNumber,
      });
      setSelectedBankCode(null);
      reset();
    }, 1500);
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount || isNaN(Number(withdrawAmount))) {
      setWithdrawMessage({ text: "Enter a valid amount.", type: "error" });
      return;
    }
    setIsWithdrawing(true);
    setWithdrawMessage(null);
    await new Promise((res) => setTimeout(res, 1500));
    setIsWithdrawing(false);
    setWithdrawAmount("");
    setWithdrawMessage({
      text: "Withdrawal successful to your bank account.",
      type: "success",
    });
  };

  const selectedBank = banks.find((b) => b.code === selectedBankCode);

  const filteredBanks = useMemo(
    () =>
      searchTerm.trim() === ""
        ? banks
        : banks.filter((bank) =>
            bank.name.toLowerCase().includes(searchTerm.toLowerCase())
          ),
    [banks, searchTerm]
  );
  return (
    <>
      <UserDashboardPageTitle title="Wallet" />

      {/* Top Cards */}
      <WalletCard />

      {/* Conditional UI for Withdrawal or Bank Form */}
      {bankSet ? (
        <BankForm
          userBankInfo={userBankInfo}
          withdrawAmount={withdrawAmount}
          setWithdrawAmount={setWithdrawAmount}
          withdrawMessage={withdrawMessage}
          handleWithdraw={handleWithdraw}
          isWithdrawing={isWithdrawing}
        />
      ) : (
        <WithdrawForm
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          register={register}
          selectedBankCode={selectedBankCode}
          setSelectedBankCode={setSelectedBankCode}
          filteredBanks={filteredBanks}
          selectedBank={selectedBank}
          errors={errors}
          isDirty={isDirty}
          isValid={isValid}
          status={status}
        />
      )}
    </>
  );
}
