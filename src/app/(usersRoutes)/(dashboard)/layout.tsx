'use client';
import UserDashboardLayout from '@/app/_components/UserDashboardLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnReconnect: 'always',
      refetchOnWindowFocus: true,
      staleTime: 1000 * 60 * 1, // 1 minute
      // gcTime: 1000 * 60 * 10, // 10 minutes
    },
    mutations: {
      retry: 1,
    },
  },
});
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <UserDashboardLayout>{children}</UserDashboardLayout>
    </QueryClientProvider>
  );
}
