import { getAllBanksList } from '@/app/_lib/userDashboardServices';
import { getAllBanksListResponse } from '@/app/_types/userDashboardServicesTypes';
import { useQuery } from '@tanstack/react-query';

export default function useBankList() {
  const {
    data: allBanksList,
    error: allBanksListError,
    isLoading: isAllBanksListLoading,
  } = useQuery<getAllBanksListResponse | Error>({
    queryKey: ['banks'],
    queryFn: getAllBanksList,
    staleTime: 1000 * 60 * 10,
  });

  return {
    allBanksList:
      allBanksList && 'data' in allBanksList
        ? (allBanksList as getAllBanksListResponse).data
        : [],
    allBanksListError,
    isAllBanksListLoading,
  };
}
