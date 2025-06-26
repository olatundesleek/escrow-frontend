import { getEscrowDetails } from '@/app/_lib/dashboardServices';
import { useQuery } from '@tanstack/react-query';

function useAdminEscrowDetails(id: string) {
  const {
    data: escrowDetail,
    isLoading: isLoadingEscrowDetail,
    error: escrowDetailError,
  } = useQuery({
    queryKey: ['escrowDetails', id],
    queryFn: () => getEscrowDetails(id as string),
    enabled: !!id,
  });

  return { escrowDetail, isLoadingEscrowDetail, escrowDetailError };
}

export default useAdminEscrowDetails;
