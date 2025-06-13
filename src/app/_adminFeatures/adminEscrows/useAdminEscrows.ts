import { getAdminAllEscrows } from '@/app/_lib/dashboardServices';
import { useQuery } from '@tanstack/react-query';

export default function useAdminEscrows() {
  const {
    data: allEscrows,
    isLoading: isEscrowLoading,
    error: escrowError,
  } = useQuery({
    queryKey: ['allAdminEscrow'],
    queryFn: getAdminAllEscrows,
  });

  return { allEscrows, isEscrowLoading, escrowError };
}
