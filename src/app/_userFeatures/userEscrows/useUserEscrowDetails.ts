import { useQuery } from '@tanstack/react-query';
import { getUserEscrowDetails } from '@/app/_lib/userDashboardServices';

function useUserEscrowDetails(id: string) {
  const {
    data: escrowDetail,
    isLoading: isLoadingEscrowDetail,
    error: escrowDetailError,
  } = useQuery({
    queryKey: ['escrowDetails', id],
    queryFn: () => getUserEscrowDetails(id as string),
    enabled: !!id,
  });

  return { escrowDetail, isLoadingEscrowDetail, escrowDetailError };
}

export default useUserEscrowDetails;
