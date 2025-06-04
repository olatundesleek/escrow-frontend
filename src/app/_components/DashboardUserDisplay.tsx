import React from "react";
import UserDetailCard from "./UserDetailCard";
import { LuUsers } from 'react-icons/lu';

import {
  HiOutlineCash,
  HiOutlineCurrencyDollar,
  HiOutlineStatusOnline,
} from 'react-icons/hi';

const DashboardUserDisplay = ({
  totalUsers,
  totalDisputes,
  totalEscrows,
  totalTransactions,
}: {
  totalUsers: number;
  totalDisputes: number;
  totalEscrows: number;
  totalTransactions: number;
}) => {
  return (
    <div className='w-full grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6 m-7'>
      <UserDetailCard
        title='Total Users'
        value={totalUsers}
        bg='bg-purple-100 border-1 border-purple-200'
        icon={<LuUsers className=' text-purple-500' />}
      />

      <UserDetailCard
        title='Total Escrow'
        value={totalEscrows}
        bg='bg-green-100 border-1 border-green-200'
        icon={<HiOutlineCash className=' text-green-500' />}
      />

      <UserDetailCard
        title='Total Transactions'
        value={totalTransactions}
        bg='bg-orange-100 border-1 border-orange-200'
        icon={<HiOutlineCurrencyDollar className=' text-orange-500' />}
      />

      <UserDetailCard
        title='Online Users'
        value={totalDisputes}
        bg='bg-green-100 border-1 border-green-200'
        icon={<HiOutlineStatusOnline className='text-secondary' />}
      />
    </div>
  );
};

export default DashboardUserDisplay;
