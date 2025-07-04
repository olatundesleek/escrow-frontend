import { acceptEscrowApi } from '@/app/_lib/userDashboardServices';
import {
  AcceptEscrowResponse,
  ApiError,
} from '@/app/_types/userDashboardServicesTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import toast from 'react-hot-toast';

export default function useAcceptEscrow() {
  const queryClient = useQueryClient();
  const toastId = useRef<string>('');

  const { mutate: acceptEscrow, isPending: isAcceptingEscrow } = useMutation<
    AcceptEscrowResponse,
    ApiError,
    { escrowId: string }
  >({
    mutationFn: acceptEscrowApi,
    onMutate: () => {
      toastId.current = toast.loading(
        'Accepting escrow. Please exercise patient...',
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

  return { acceptEscrow, isAcceptingEscrow };
}
