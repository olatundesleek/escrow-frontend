'use client';

import toast from 'react-hot-toast';

import AdminDashboardPageTitle from '@/app/_components/AdminDashboardPageTitle';
import DashboardUserDisplay from '@/app/_components/DashboardUserDisplay';
import DashboardEscrowDisplay from '@/app/_components/DashboardEscrowDisplay';
import DashboardWalletDisplay from '@/app/_components/DashboardWalletDisplay';
import TransactionTable from '@/app/_components/TransactionTable';
import TransactionChart from '@/app/_components/TransactionChart';
import FullPageLoader from '@/app/_components/FullPageLoader';
import useAdminDashboard from './useAdminDashboard';

export default function AdminDashboard() {
  const {
    isLoadindAdminDashboardData,
    adminDashboardError,
    adminDashboardData,
  } = useAdminDashboard();

  if (isLoadindAdminDashboardData) return <FullPageLoader />;

  if (adminDashboardError) return toast.error(adminDashboardError.message);

  if (!adminDashboardData)
    return (
      <div className='w-full h-screen flex justify-center items-center text-2xl text-dashboard-secondary'>
        No data was found!
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
  } = adminDashboardData;

  return (
    <div className='flex flex-col items-center justify-center '>
      <AdminDashboardPageTitle />
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
