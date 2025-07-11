import { payEscrowBillApi } from '@/app/_lib/userDashboardServices';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import toast from 'react-hot-toast';

export default function usePayEscrowBill(close: () => void) {
  const queryClient = useQueryClient();
  const toastId = useRef<string>('');

  const {
    mutate: payEscrowBill,
    isPending: isPayingEscrowBill,
    isSuccess,
  } = useMutation({
    mutationFn: payEscrowBillApi,
    onMutate: () => {
      toastId.current = toast.loading(
        'Initiating payment, Please exercise patience.',
      );
    },
    onSuccess: (data, variables) => {
      if (variables.method === 'gateway') {
        toast.success('Payment Initiated', { id: toastId.current });
        const url = data?.paymentDetails?.data?.authorization_url;

        if (url) {
          close();
          setTimeout(() => {
            window.open(url);
          }, 1000);
        }
      } else {
        toast.success('Wallet payment successful 🎉', { id: toastId.current });
        close();
        queryClient.invalidateQueries({ queryKey: ['allUserEscrow'] });
        queryClient.invalidateQueries({
          queryKey: ['escrowDetails', variables.escrowId],
        });
      }
    },
    onError: (err) => {
      toast.error(err.message, { id: toastId.current });
    },
  });

  return { payEscrowBill, isPayingEscrowBill, isSuccess };
}
