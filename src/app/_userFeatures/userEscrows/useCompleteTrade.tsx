import { completeTradeApi } from '@/app/_lib/userDashboardServices';
import { useMutation } from '@tanstack/react-query';
import { useRef } from 'react';
import toast from 'react-hot-toast';

export default function useCompleteTrade() {
  const toastRef = useRef<string>('');

  const { mutate: completeTrade, isPending: isCompletingTrade } = useMutation({
    mutationFn: completeTradeApi,
    onMutate: () => {
      toastRef.current = toast.loading(
        'Completing trade. Please exercise patience...',
      );
    },
    onSuccess: (data) => {
      toastRef.current = toast.success(data.message, { id: toastRef.current });
    },
    onError: (err) => {
      toastRef.current = toast.error(err.message, { id: toastRef.current });
    },
  });

  return { completeTrade, isCompletingTrade };
}
