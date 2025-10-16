import { getUserAllEscrows } from '@/app/_lib/userDashboardServices';
import { useQuery } from '@tanstack/react-query';

export default function useUserEscrows(
  query?: Record<string, string | number>,
) {
  const {
    data,
    isLoading: isUserEscrowLoading,
    error: userEscrowError,
  } = useQuery({
    queryKey: ['allUserEscrow', query],
    queryFn: () => getUserAllEscrows(query),
  });

  const allUserEscrows = data?.escrows
    ? data
    : {
        escrows: data?.escrows || [], // fallback if it's data: []
        pagination: { currentPage: 1, totalPages: 1, total: 0 },
        message: data?.message || 'No escrows found',
        success: data?.success ?? false,
      };

  return { allUserEscrows, isUserEscrowLoading, userEscrowError };
}
