import React from 'react';
import AccountDetailscard from './AccountDetailsCard';
import { TbBuildingBank } from 'react-icons/tb';
import { IoReload } from 'react-icons/io5';
import { MdOutlineCancel } from 'react-icons/md';
import { BsDatabaseDash } from 'react-icons/bs';

const DashboardAccountDisplay = () => {
  return (
    <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 overflow-hidden shadow-lg  border-2 border-black rounded-lg m-7'>
      <AccountDetailscard
        title='Withdraw Amount'
        value='$540.00'
        bg='bg-green-100 text-green-500 border-1 border-green-200'
        icon={<TbBuildingBank />}
      />
      <AccountDetailscard
        title='Pending Withdrawals'
        value='2'
        bg='bg-orange-100 text-orange-500 border-1 border-orange-200'
        icon={<IoReload />}
      />
      <AccountDetailscard
        title='Cancel Withdrawals'
        value='$540.00'
        bg='bg-red-100 text-red-500 border-1 border-red-200'
        icon={<MdOutlineCancel />}
      />
      <AccountDetailscard
        title='Withdrawal Charges'
        value='$6.40'
        bg='bg-blue-100 text-blue-500 border-1 border-blue-200'
        icon={<BsDatabaseDash />}
      />
    </div>
  );
};

export default DashboardAccountDisplay;
