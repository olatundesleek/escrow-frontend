'use client';


import { useQuery } from '@tanstack/react-query';
import AdminDashboardPageTitle from './AdminDashboardPageTitle';
import { getAdminAllEscrows } from '../_lib/dashboardServices';
import FullPageLoader from './FullPageLoader';
import toast from 'react-hot-toast';

export default function AdminEscrows() {
  const {
    data: allEscrows,
    isLoading: isEscrowLoading,
    error: escrowError,
  } = useQuery({
    queryKey: ['allAdminEscrow'],
    queryFn: getAdminAllEscrows,
  });

  if (isEscrowLoading) return <FullPageLoader />;

  if (escrowError) return toast.error(escrowError.message);

  if (!allEscrows) return null;

  console.log(allEscrows);

  return (
    <div className='flex flex-col items-center justify-center'>
      <AdminDashboardPageTitle />
    </div>
  );
}
