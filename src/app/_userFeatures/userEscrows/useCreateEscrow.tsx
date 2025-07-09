import { createEscrowApi } from '@/app/_lib/userDashboardServices';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError } from 'next/dist/server/api-utils';
import { useRef } from 'react';
import toast from 'react-hot-toast';

export default function useCreateEscrow() {
  const queryClient = useQueryClient();
  const toastId = useRef<string>('');

  const { mutate: createEscrow, isPending: isCreatingEscrow } = useMutation({
    mutationFn: createEscrowApi,
    onMutate: () => {
      toastId.current = toast.loading(
        'Creating Escrow! Please exercise patience...',
      );
    },
    onSuccess: () => {
      toast.success('Escrow created successfully 😇', { id: toastId.current });
      queryClient.invalidateQueries({ queryKey: ['allUserEscrow'] });
    },
    onError: (err: ApiError) => {
      toast.error(err.message, { id: toastId.current });
    },
  });

  return { createEscrow, isCreatingEscrow };
}
