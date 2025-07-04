import React from 'react';

import { TbWallet, TbWalletOff } from 'react-icons/tb';
import WalletDetailsCard from './WalletDetailsCard';
import { LuPiggyBank } from 'react-icons/lu';
// import { BsDatabaseDash } from 'react-icons/bs';

const DashboardWalletDisplay = ({
  walletDetails,
}: {
  walletDetails: { total: number; totalLocked: number; totalAvailable: number };
}) => {
  const { total, totalLocked, totalAvailable } = walletDetails;

  return (
    <div className='w-full grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 overflow-hidden shadow-md rounded-lg m-7'>
      <WalletDetailsCard
        title='Total Wallet'
        value={total || 0}
        bg='bg-green-100 text-green-500 border-1 border-green-200'
        icon={<TbWallet />}
        border='border-r-1  border-gray-400'
      />
      <WalletDetailsCard
        title='Total Available'
        value={totalAvailable || 0}
        bg='bg-orange-100 text-orange-500 border-1 border-orange-200'
        icon={<LuPiggyBank />}
        border='border-r-1  border-gray-400'
      />
      <WalletDetailsCard
        title='Total Locked'
        value={totalLocked || 0}
        bg='bg-red-100 text-red-500 border-1 border-red-200'
        icon={<TbWalletOff />}
      />
      {/* <WalletDetailsCard
        title='Withdrawal Charges'
        value='$6.40'
        bg='bg-blue-100 text-blue-500 border-1 border-blue-200'
        icon={<BsDatabaseDash />}
      /> */}
    </div>
  );
};

export default DashboardWalletDisplay;
