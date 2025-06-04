'use client';

import { useQuery } from '@tanstack/react-query';
import AdminDashboardPageTitle from './AdminDashboardPageTitle';
import { getAdminDashboardData } from '../_lib/dashboardServices';
import toast from 'react-hot-toast';
import DashboardUserDisplay from './DashboardUserDisplay';
import DashboardEscrowDisplay from './DashboardEscrowDisplay';
import DashboardWalletDisplay from './DashboardWalletDisplay';
import TransactionTable from './TransactionTable';
import TransactionChart from './TransactionChart';
import FullPageLoader from './FullPageLoader';

export default function AdminDashboard() {
  const {
    data: adminDashboardData,
    isLoading: isLoadindAdminDashboardData,
    error: adminDashboardError,
  } = useQuery({
    queryKey: ['adminDashboard'],
    queryFn: getAdminDashboardData,
  });

  if (isLoadindAdminDashboardData) return <FullPageLoader />;

  if (adminDashboardError) return toast.error(adminDashboardError.message);

  console.log(adminDashboardData);

  if (!adminDashboardData) return null;

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
  // const { data} = dashboardDetails;

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
