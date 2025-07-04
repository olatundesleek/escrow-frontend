import { rejectEscrowApi } from '@/app/_lib/userDashboardServices';
import {
  ApiError,
  RejectEscrowResponse,
} from '@/app/_types/userDashboardServicesTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import toast from 'react-hot-toast';

export default function useRejectEscrow() {
  const queryClient = useQueryClient();
  const toastId = useRef<string>('');

  const { mutate: rejectEscrow, isPending: isRejectingEscrow } = useMutation<
    RejectEscrowResponse,
    ApiError,
    { escrowId: string }
  >({
    mutationFn: rejectEscrowApi,
    onMutate: () => {
      toastId.current = toast.loading(
        'Rejecting escrow. Please exercise patient...',
      );
    },
    onSuccess: (data) => {
      toast.success(data.message, { id: toastId.current });
      queryClient.invalidateQueries({ queryKey: ['allUserEscrow'] });
    },
    onError: (err) => {
      toast.error(err.message, { id: toastId.current });
    },
  });

  return { rejectEscrow, isRejectingEscrow };
}
