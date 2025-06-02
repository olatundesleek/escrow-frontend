'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import UserDashboardHeader from '@/app/_components/UserDashboardHeader';
import UserSidebar from '@/app/_components/UserSidebar';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnReconnect: 'always',
      refetchOnWindowFocus: true,
      staleTime: 1000 * 60 * 1, // 1 minute
      gcTime: 1000 * 60 * 10, // 10 minutes
    },
    mutations: {
      retry: 1,
    },
  },
});

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <div
        className={`lg:grid lg:grid-cols-[auto_1fr] lg:grid-rows-[auto_1fr] lg:h-screen`}
      >
        <UserDashboardHeader
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <UserSidebar isSidebarOpen={isSidebarOpen} />
        <main>
          <div className='lg:max-w-[120rem] lg:my-0 lg:mx-auto lg:flex lg:flex-col lg:gap-4'>
            {children}
          </div>
        </main>
      </div>
    </QueryClientProvider>
  );
}

