import { getUserAllEscrows } from '@/app/_lib/userDashboardServices';
import { useQuery } from '@tanstack/react-query';

export default function useUserEscrows(
  query?: Record<string, string | number>,
) {
  const {
    data: allUserEscrows,
    isLoading: isUserEscrowLoading,
    error: userEscrowError,
  } = useQuery({
    queryKey: ['allUserEscrow', query],
    queryFn: () => getUserAllEscrows(query),
  });

  return { allUserEscrows, isUserEscrowLoading, userEscrowError };
}
