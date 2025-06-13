import { getAdminDashboardData } from '@/app/_lib/dashboardServices';
import { useQuery } from '@tanstack/react-query';

export default function useAdminDashboard() {
  const {
    data: adminDashboardData,
    isLoading: isLoadindAdminDashboardData,
    error: adminDashboardError,
  } = useQuery({
    queryKey: ['adminDashboard'],
    queryFn: getAdminDashboardData,
  });

  return {
    adminDashboardData,
    isLoadindAdminDashboardData,
    adminDashboardError,
  };
}
