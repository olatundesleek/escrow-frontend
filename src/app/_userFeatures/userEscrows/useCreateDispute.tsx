import { createDisputeApi } from '@/app/_lib/userDashboardServices';
import { useMutation } from '@tanstack/react-query';
import { useRef } from 'react';
import toast from 'react-hot-toast';

export default function useCreateDispute() {
  const toastRef = useRef<string>('');

  const { mutate: createDispute, isPending: isCreatingDispute } = useMutation({
    mutationFn: createDisputeApi,

    onMutate: () => {
      toastRef.current = toast.loading(
        'Creating dispute. Please exercise patience...',
      );
    },

    onSuccess: (data) => {
      toastRef.current = toast.success(data.message, { id: toastRef.current });
    },

    onError: (err) => {
      toastRef.current = toast.error(err.message, { id: toastRef.current });
    },
  });

  return { createDispute, isCreatingDispute };
}
