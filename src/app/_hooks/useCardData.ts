import { useQuery } from '@tanstack/react-query';
import { getWallet as getWalletApi } from '../_lib/userDashboardServices';

export type Bank = {
  id: number;
  code: string;
  name: string;
  logo?: string;
  [key: string]: unknown;
};

export type PaymentFormData = {
  bankCode: string;
  accountNumber: string;
};

export function useWallet() {
  const {
    data: walletData,
    isLoading: isWalletLoading,
    error: walletError,
  } = useQuery({
    queryFn: getWalletApi,
    queryKey: ['wallet'],
  });

  return { walletData, isWalletLoading, walletError };
}
