import { getUserDashboardData } from '@/app/_lib/userDashboardServices';
import { useQuery } from '@tanstack/react-query';

export default function useUserDashboard() {
  const {
    data: userDashboardData,
    isLoading: isLoadindUserDashboardData,
    error: userDashboardError,
  } = useQuery({
    queryKey: ['userDashboard'],
    queryFn: getUserDashboardData,
  });

  return {
    userDashboardData,
    isLoadindUserDashboardData,
    userDashboardError,
  };
}
