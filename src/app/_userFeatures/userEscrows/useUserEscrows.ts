import { getUserAllEscrows } from '@/app/_lib/userDashboardServices';
import { useQuery } from '@tanstack/react-query';

export default function useAdminEscrows() {
  const {
    data: allUserEscrows,
    isLoading: isUserEscrowLoading,
    error: userEscrowError,
  } = useQuery({
    queryKey: ['allUserEscrow'],
    queryFn: getUserAllEscrows,
  });

  return { allUserEscrows, isUserEscrowLoading, userEscrowError };
}
