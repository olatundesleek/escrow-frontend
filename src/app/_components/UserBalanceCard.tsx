import React from "react";
import UserWalletDetailsCard from "./UserWalletDetailsCard";
import {
  UserBaseWallet,
  UserEscrowItem,
} from '../_types/userDashboardServicesTypes';
import { Button } from './DashboardBtn';

interface UserBalanceCardProps {
  wallet: UserBaseWallet;
  escrows?: UserEscrowItem[];
  onDeposit: () => void;
  onWithdraw: () => void;
}

export default function UserBalanceCard({
  wallet = {
    totalBalance: 0,
    lockedBalance: 0,
    availableBalance: 0,
    currency: 'NGN',
    _id: 'mock_wallet_id',
    user: 'mock_user_id',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    id: '',
    bankInfo: {
      accountName: null,
      accountNumber: null,
      bankName: null,
      bankCode: null,
      recipientCode: null,
    },
  },
  onDeposit,
  onWithdraw,
}: UserBalanceCardProps) {
  return (
    <div className='relative overflow-hidden p-4 sm:p-8 w-full bg-db-surface rounded-xl shadow-sm border border-db-border'>
      {/* Header */}
      <h2 className='text-xl sm:text-2xl md:text-3xl font-bold text-db-text-primary mb-6'>
        Wallet Overview
      </h2>

      {/* Deposit / Withdraw Buttons */}
      <div className='flex flex-col sm:flex-row justify-end gap-3 mb-8 w-full'>
        <Button
          // varient="outline"
          onClick={onDeposit}
          aria-label='Deposit funds'
        >
          Deposit
        </Button>
        <Button
          // varient="outline"
          onClick={onWithdraw}
          aria-label='Withdraw funds'
        >
          Withdraw
        </Button>
      </div>

      {/* Wallet Details */}
      <UserWalletDetailsCard wallet={wallet} />

      {/* Footer / Guidance */}
      <div className='pt-6 sm:pt-8 text-center text-sm sm:text-base text-db-text-secondary'>
        Your wallet summary shows your total, locked, and available balances.
        Use the buttons above to deposit or withdraw funds securely.
      </div>
    </div>
  );
}
