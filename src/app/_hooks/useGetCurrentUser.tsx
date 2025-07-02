import { useQuery } from '@tanstack/react-query';
import { getUserRole } from '../_lib/auth';

export default function useGetCurrentUser() {
  const {
    data: currentUserData,
    isLoading: isGetCurrentUserLoading,
    isError,
  } = useQuery({
    queryKey: ['userRole'],
    queryFn: getUserRole,
  });
  return { currentUserData, isGetCurrentUserLoading, isError };
}
