'use client';

import FullPageLoader from '@/app/_components/FullPageLoader';
import useGetUsersTransactions from './useGetUsersTransactions';
import toast from 'react-hot-toast';
import UserDashboardPageTitle from '@/app/_components/UserDashboardPageTitle';
import UserTransactionsTable from './UserTransactionsTable';
import { useSearchParams } from 'next/navigation';

export default function Transactions() {
  const searchParams = useSearchParams();
  const queryObject = Object.fromEntries(searchParams.entries());
  const {
    isLoadingUserTransactions,
    userTransactionsData,
    userTransactionsError,
  } = useGetUsersTransactions(queryObject);

  if (isLoadingUserTransactions) return <FullPageLoader />;

  if (userTransactionsError) return toast.error(userTransactionsError.message);

  return (
    <div className='flex flex-col items-center justify-center space-y-4'>
      <UserDashboardPageTitle />

      <UserTransactionsTable
        transactionsData={userTransactionsData?.data || []}
      />
    </div>
  );
}
