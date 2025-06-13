'use client';

import AdminDashboardPageTitle from '@/app/_components/AdminDashboardPageTitle';
import AdminEscrowTable from './AdminEscrowTable';
import useAdminEscrows from './useAdminEscrows';
import FullPageLoader from '@/app/_components/FullPageLoader';
import toast from 'react-hot-toast';

export default function AdminEscrows() {
  const { isEscrowLoading, escrowError, allEscrows } = useAdminEscrows();

  if (isEscrowLoading) return <FullPageLoader />;

  if (escrowError) return toast.error(escrowError.message);

  return (
    <div className='flex flex-col items-center justify-center'>
      <AdminDashboardPageTitle />
      <AdminEscrowTable
        escrowData={allEscrows?.escrowDetails.data.escrows || []}
      />
    </div>
  );
}
