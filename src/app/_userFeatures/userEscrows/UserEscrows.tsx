'use client';

import UserDashboardPageTitle from '@/app/_components/UserDashboardPageTitle';
import UserEscrowTable from './UserEscrowTable';
import useAdminEscrows from './useUserEscrows';
import FullPageLoader from '@/app/_components/FullPageLoader';
import toast from 'react-hot-toast';

export default function AdminEscrows() {
  const { isUserEscrowLoading, userEscrowError, allUserEscrows } =
    useAdminEscrows();

  if (isUserEscrowLoading) return <FullPageLoader />;

  if (userEscrowError) return toast.error(userEscrowError.message);

  return (
    <div className='flex flex-col items-center justify-center'>
      <UserDashboardPageTitle />
      <UserEscrowTable escrowData={allUserEscrows?.escrows.data || []} />
    </div>
  );
}
