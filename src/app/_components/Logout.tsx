import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';

import { logout } from '../_lib/auth';
import { handleApiError } from '../_lib/handleApiError';

import ButtonIcon from './ButtonIcon';
import SpinnerMini from './SpinnerMini';
import { useQueryClient } from '@tanstack/react-query';

export default function Logout() {
  const { replace } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleLogout = async function () {
    setIsLoading(true);
    const logOutToast = toast.loading('Logging out...');
    try {
      const result = await logout();

      const errorHandle = handleApiError(result);

      if (errorHandle.handled) {
        toast.error(errorHandle.message);
      }

      if (result.success) {
        queryClient.removeQueries({ queryKey: ['userRole'] });
        toast.success(result.message);
        const { userRole } = result;
        if (userRole === 'user') replace('/login');
        if (userRole === 'admin') replace('/admin/login');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoading(false);
      toast.dismiss(logOutToast);
    }
  };

  return (
    <ButtonIcon
      toolTip='Logout'
      style='lg:text-2xl'
      isLoading={isLoading}
      onClick={handleLogout}
    >
      {isLoading ? (
        <SpinnerMini color='text-dashboard-secondary' />
      ) : (
        <HiArrowRightOnRectangle />
      )}
    </ButtonIcon>
  );
}
