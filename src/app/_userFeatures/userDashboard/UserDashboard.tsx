'use client';

import toast from 'react-hot-toast';

import UserDashboardPageTitle from '@/app/_components/UserDashboardPageTitle';
import DashboardUserDisplay from '@/app/_components/DashboardUserDisplay';
import DashboardEscrowDisplay from '@/app/_components/DashboardEscrowDisplay';
import DashboardWalletDisplay from '@/app/_components/DashboardWalletDisplay';
import TransactionTable from '@/app/_components/TransactionTable';
import TransactionChart from '@/app/_components/TransactionChart';
import FullPageLoader from '@/app/_components/FullPageLoader';
import useUserDashboard from './useUserDashboard';

export default function UserDashboard() {
  const { isLoadindUserDashboardData, userDashboardError } = useUserDashboard();

  const userDashboardData = null;

  if (isLoadindUserDashboardData) return <FullPageLoader />;

  if (userDashboardError) return toast.error(userDashboardError.message);

  console.log(userDashboardData);

  if (!userDashboardData)
    return (
      <div className='w-full h-screen flex flex-col items-center text-2xl text-dashboard-secondary'>
        <UserDashboardPageTitle />
        <p className='text-center mt-8'> No data was found!</p>
      </div>
    );

  const {
    dashboardDetails: {
      data: {
        totalDisputes,
        totalEscrows,
        totalTransactions,
        totalUsers,
        escrowStatus,
        wallet,
      },
    },
  } = userDashboardData;

  return (
    <div className='flex flex-col items-center justify-center '>
      <UserDashboardPageTitle />
      <DashboardUserDisplay
        totalDisputes={totalDisputes}
        totalEscrows={totalEscrows}
        totalTransactions={totalTransactions}
        totalUsers={totalUsers}
      />
      <DashboardEscrowDisplay escrowStatus={escrowStatus} />
      <DashboardWalletDisplay walletDetails={wallet} />
      <div className='w-full flex flex-col gap-4 items-center justify-between'>
        <TransactionChart />
        <TransactionTable />
      </div>
    </div>
  );
}
