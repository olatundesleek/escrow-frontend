import React from "react";
// import { IoAdd, IoRemove } from "react-icons/io5";
import UserWalletDetailsCard from "./UserWalletDetailsCard";
import { UserEscrowItem } from "../_types/userDashboardServicesTypes";
import Button from './Button';

interface UserBalanceCardProps {
  wallet: {
    totalBalance: number;
    lockedBalance: number;
    availableBalance: number;
    currency: string;
    _id: string;
    user: string;
    createdAt: string;
    updatedAt: string;
  };
  escrows: UserEscrowItem[];
  transactions: string[];
  pendingEscrows: number;
  disputes: string[];
  onDeposit: () => void;
  onWithdraw: () => void;
}

export default function UserBalanceCard({
  wallet = {
    // Default wallet for demonstration
    totalBalance: 0,
    lockedBalance: 0,
    availableBalance: 0,
    currency: 'NGN',
    _id: 'mock_wallet_id',
    user: 'mock_user_id',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  onDeposit,
  onWithdraw,
}: UserBalanceCardProps) {
  return (
    // Outer wrapper for centering and background, ensuring full responsiveness
    // <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-inter">black
    <div className='relative overflow-hidden p-4 sm:p-8 text-black w-full'>
      <div className='relative z-10 flex flex-col justify-between h-full'>
        {/* Card Header and Balance */}

        <h2 className='text-xl sm:text-2xl md:text-3xl font-bold text-black mb-6 text-left'>
          Wallet
        </h2>

        <div className='w-full flex justify-end'>
          <div className='w-[160px] sm:w-[360px]'>
            {/* Transaction Buttons */}
            <div className='mb-8 grid grid-cols-1 min-[360px]:grid-cols-2 gap-2 sm:gap-6 cursor-pointer'>
              <Button //button to trigger deposit
                color={'bg-dashboard-secondary text-dashboard-primary'}
                style='flex items-center justify-center gap-2 rounded-xl p-1 text-xs sm:text-sm cursor-pointer font-semibold shadow-xl transition-all duration-300 hover:bg-black/25 hover:text-black active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-black/50 border border-black/20 transform hover:translate-y-[-2px]'
                onClick={onDeposit}
              >
                Deposit
              </Button>
              <Button
                color={'bg-dashboard-secondary text-dashboard-primary'}
                style='flex items-center justify-center gap-3 rounded-xl p-1 text-xs sm:text-sm cursor-pointer font-semibold shadow-xl transition-all duration-300 hover:bg-black/25 hover:text-black active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-black/50 border border-black/20 transform hover:translate-y-[-2px]'
                onClick={onWithdraw}
              >
                Withdraw
              </Button>
            </div>
          </div>
        </div>

        {/* Wallet Details Cards */}
        <UserWalletDetailsCard wallet={wallet} />

        {/* Footer */}
        <div className='pt-6 sm:pt-8 text-center text-sm sm:text-base text-black/60'>
          Your financial details at a glance. Secure and transparent.
        </div>
      </div>
    </div>
    // </div>
  );
}
