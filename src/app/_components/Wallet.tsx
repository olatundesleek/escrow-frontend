"use client";

import UserDashboardPageTitle from "./UserDashboardPageTitle";
import { WalletCard } from "./WalletCard";
import { BankForm } from "./BankForm";
import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { WithdrawForm } from "./WithdrawForm";
import {
  useWallet,
  type Bank,
  type PaymentFormData,
} from '../_hooks/useCardData';
import FullPageLoader from './FullPageLoader';
import toast from 'react-hot-toast';
import Button from './Button';
import Modal from './Modal';
import Deposit from '../_userFeatures/userWalletManagement/Deposit';
import useConfirmModal from '../_hooks/useConfirmModal';
export default function Wallet() {
  const [status, setStatus] = useState({
    isSaving: false,
    message: '',
    type: '',
  });
  const {
    isOpen: isDepositOpen,
    close: closeDeposit,
    open: openDeposit,
  } = useConfirmModal();
  const { walletData, isWalletLoading, walletError } = useWallet();

  const [banks, setBanks] = useState<Bank[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedBankCode, setSelectedBankCode] = useState<string | null>(null);
  const [bankSet, setBankSet] = useState<boolean>(false);
  const [withdrawAmount, setWithdrawAmount] = useState<string>('');
  const [isWithdrawing, setIsWithdrawing] = useState<boolean>(false);
  const [withdrawMessage, setWithdrawMessage] = useState<{
    text: string;
    type: 'success' | 'error';
  } | null>(null);
  const [userBankInfo, setUserBankInfo] = useState<{
    bankName: string;
    accountNumber: string;
    accountName: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<PaymentFormData>({ mode: 'onChange' });

  useEffect(() => {
    fetch('https://api.paystack.co/bank?currency=NGN')
      .then((res) => res.json())
      .then((data) => {
        if (data.status) setBanks(data.data);
      });
  }, []);

  const onSubmit = async (data: PaymentFormData) => {
    setStatus({ isSaving: true, message: '', type: '' });

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulated resolved account name from backend
      const simulatedResult = {
        accountNumber: data.accountNumber,
        accountName: 'Stephen Reward', // Fake name for demo
      };

      setStatus({
        isSaving: false,
        message: 'Payment method updated successfully',
        type: 'success',
      });

      reset();
      setSelectedBankCode(null);
      setUserBankInfo({
        bankName: banks.find((b) => b.code === data.bankCode)?.name || '',
        accountNumber: simulatedResult.accountNumber,
        accountName: simulatedResult.accountName,
      });
      setBankSet(true);
    } catch {
      setStatus({
        isSaving: false,
        message: 'Failed to update bank info.',
        type: 'error',
      });
    }
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount || isNaN(Number(withdrawAmount))) {
      setWithdrawMessage({ text: 'Enter a valid amount.', type: 'error' });
      return;
    }
    setIsWithdrawing(true);
    setWithdrawMessage(null);
    await new Promise((res) => setTimeout(res, 1500));
    setIsWithdrawing(false);
    setWithdrawAmount('');
    setWithdrawMessage({
      text: 'Withdrawal successful to your bank account.',
      type: 'success',
    });
  };

  const selectedBank = banks.find((b) => b.code === selectedBankCode);

  const filteredBanks = useMemo(
    () =>
      searchTerm.trim() === ''
        ? banks
        : banks.filter((bank) =>
            bank.name.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
    [banks, searchTerm],
  );

  if (isWalletLoading) {
    return <FullPageLoader />;
  }

  if (!walletData || walletError) {
    toast.error(walletError?.message || 'Something went wrong!');
    return null;
  }

  const { walletDetails } = walletData || {
    totalBalance: 0,
    lockedBalance: 0,
    availableBalance: 0,
  };

  return (
    <>
      <Modal
        isOpen={isDepositOpen}
        title={'Deposit'}
        onClose={closeDeposit}
        width='w-md lg:max-w-3xl max-w-lg'
      >
        <Deposit wallet={walletDetails} />
      </Modal>
      <UserDashboardPageTitle title='Wallet'>
        <div className='w-[160px] sm:w-[360px]'>
          {/* Transaction Buttons */}
          <div className='grid grid-cols-1 min-[360px]:grid-cols-2 gap-2 sm:gap-6'>
            <Button //button to trigger deposit
              color={'bg-dashboard-secondary text-dashboard-primary'}
              style='flex items-center justify-center gap-2 rounded-xl p-1 text-xs sm:text-sm cursor-pointer font-semibold shadow-xl transition-all duration-300 hover:bg-black/25 hover:text-black active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-black/50 border border-black/20 transform hover:translate-y-[-2px]'
              onClick={openDeposit}
            >
              Deposit
            </Button>
            <Button
              color={'bg-dashboard-secondary text-dashboard-primary'}
              style='flex items-center justify-center gap-3 rounded-xl p-1 text-xs sm:text-sm cursor-pointer font-semibold shadow-xl transition-all duration-300 hover:bg-black/25 hover:text-black active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-black/50 border border-black/20 transform hover:translate-y-[-2px]'
              onClick={() => toast.success('Withdrawal feature coming soon')}
            >
              Withdraw
            </Button>
          </div>
        </div>
      </UserDashboardPageTitle>

      {/* Top Cards */}
      <WalletCard walletData={walletDetails} />

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
