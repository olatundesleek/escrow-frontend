import { toast } from 'react-hot-toast';
import { resolveUserBank as resolveUserBankApi } from '@/app/_lib/userDashboardServices';
import { useMutation } from '@tanstack/react-query';
import { useRef } from 'react';

export default function useResolveBank() {
  const toastId = useRef<string>('');

  const {
    mutate: resolveUserBank,
    data: resolvedUserBankData,
    isPending: isResolvingUserBank,
    error: resolveUserBankError,
  } = useMutation({
    mutationFn: resolveUserBankApi,

    mutationKey: ['resolveBank'],

    onMutate: () => {
      toastId.current = toast.loading('Resolving bank...');
    },

    onSuccess: (data) => {
      toast.success(data.message, { id: toastId.current });
      console.log('Bank resolved successfully');
    },

    onError: (error) => {
      toast.error(error.message, { id: toastId.current });
      console.error('Error resolving bank:', error);
    },
  });

  return {
    resolveUserBank,
    resolvedUserBankData,
    isResolvingUserBank,
    resolveUserBankError,
  };
}
