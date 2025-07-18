import { getUserTransactions } from '@/app/_lib/userDashboardServices';
import { useQuery } from '@tanstack/react-query';

export default function useGetUsersTransactions(
  query?: Record<string, string | number>,
) {
  const {
    data: userTransactionsData,
    isLoading: isLoadingUserTransactions,
    error: userTransactionsError,
  } = useQuery({
    queryKey: ['userTransactions', query],
    queryFn: () => getUserTransactions(query),
  });
  return {
    userTransactionsData,
    isLoadingUserTransactions,
    userTransactionsError,
  };
}
