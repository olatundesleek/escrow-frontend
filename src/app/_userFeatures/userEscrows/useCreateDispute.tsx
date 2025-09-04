import { createDisputeApi } from '@/app/_lib/userDashboardServices';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import toast from 'react-hot-toast';

export default function useCreateDispute(escrowId: string) {
  const toastRef = useRef<string>('');
  const queryClient = useQueryClient();

  const { mutate: createDispute, isPending: isCreatingDispute } = useMutation({
    mutationFn: createDisputeApi,
    mutationKey: ['dispute', escrowId],
    onMutate: () => {
      toastRef.current = toast.loading(
        'Creating dispute. Please exercise patience...',
      );
    },

    onSuccess: (data, variables) => {
      toastRef.current = toast.success(data.message, { id: toastRef.current });
      queryClient.invalidateQueries({
        queryKey: ['escrowDetails', variables.escrowId],
      });
      queryClient.invalidateQueries({
        queryKey: ['allUserEscrow'],
      });
    },

    onError: (err) => {
      toastRef.current = toast.error(err.message, { id: toastRef.current });
    },
  });

  return { createDispute, isCreatingDispute };
}
