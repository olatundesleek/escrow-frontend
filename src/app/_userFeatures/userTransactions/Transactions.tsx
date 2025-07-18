'use client';

import FullPageLoader from '@/app/_components/FullPageLoader';
import useGetUsersTransactions from './useGetUsersTransactions';
import toast from 'react-hot-toast';
import UserDashboardPageTitle from '@/app/_components/UserDashboardPageTitle';
import UserTransactionsTable from './UserTransactionsTable';

export default function Transactions() {
  const {
    isLoadingUserTransactions,
    userTransactionsData,
    userTransactionsError,
  } = useGetUsersTransactions();

  if (isLoadingUserTransactions) return <FullPageLoader />;

  if (userTransactionsError) return toast.error(userTransactionsError.message);

  return (
    <div className='flex flex-col items-center justify-center'>
      <UserDashboardPageTitle />

      <UserTransactionsTable
        transactionsData={userTransactionsData?.data || []}
      />
    </div>
  );
}
