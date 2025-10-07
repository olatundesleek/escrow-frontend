import { toast } from 'react-hot-toast';
import { addUserBank as addUserBankApi } from '@/app/_lib/userDashboardServices';
import { useMutation } from '@tanstack/react-query';
import { useRef } from 'react';

export default function useAddUserBank() {
  const toastId = useRef<string>('');

  const {
    mutate: addUserBank,
    data: addUserBankData,
    isPending: isAddingUserBank,
    error: addUserBankError,
  } = useMutation({
    mutationFn: addUserBankApi,
    mutationKey: ['addUserBank'],

    onMutate: () => {
      toastId.current = toast.loading(
        'Adding bank. Please exersice patience...',
      );
    },

    onSuccess: (data) => {
      toast.success(data.message, { id: toastId.current });
      console.log('Bank added successfully');
    },

    onError: (error) => {
      toast.error(error.message, { id: toastId.current });
      console.error('Error adding bank:', error);
    },
  });

  return {
    addUserBank,
    addUserBankData,
    isAddingUserBank,
    addUserBankError,
  };
}
