'use client';

import { useState } from 'react';

import UserDashboardHeader from '@/app/_components/UserDashboardHeader';
import UserSidebar from '@/app/_components/UserSidebar';
import useGetCurrentUser from '../_hooks/useGetCurrentUser';
import FullPageLoader from './FullPageLoader';
import toast from 'react-hot-toast';

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const { isGetCurrentUserLoading, isError } = useGetCurrentUser();

  const handleCloseSidebar = function () {
    setIsSidebarOpen(false);
  };

  if (isGetCurrentUserLoading) {
    return (
      <div
        className={`lg:grid lg:grid-cols-[auto_1fr] lg:grid-rows-[auto_1fr] lg:h-screen bg-white`}
      >
        <UserDashboardHeader
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <UserSidebar
          isSidebarOpen={isSidebarOpen}
          onCloseSidebar={handleCloseSidebar}
        />
        <main className='lg:max-w-[120rem] lg:my-0 lg:flex lg:flex-col lg:gap-4 px-6 py-5 overflow-y-auto'>
          <FullPageLoader />
        </main>
      </div>
    );
  }

  if (isError) {
    toast.error('Error getting data. Please refresh!!!');
    return (
      <div
        className={`lg:grid lg:grid-cols-[auto_1fr] lg:grid-rows-[auto_1fr] lg:h-screen bg-white`}
      >
        <UserDashboardHeader
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <UserSidebar
          isSidebarOpen={isSidebarOpen}
          onCloseSidebar={handleCloseSidebar}
        />
        <main className='lg:max-w-[120rem] lg:my-0 lg:flex lg:flex-col lg:gap-4 px-6 py-5 overflow-y-auto'>
          <FullPageLoader />
        </main>
      </div>
    );
  }

  return (
    <div
      className={`lg:grid lg:grid-cols-[auto_1fr] lg:grid-rows-[auto_1fr] lg:h-screen bg-white`}
    >
      <UserDashboardHeader
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <UserSidebar
        isSidebarOpen={isSidebarOpen}
        onCloseSidebar={handleCloseSidebar}
      />
      <main className='w-full lg:max-w-[120rem] lg:my-0 lg:flex lg:flex-col lg:gap-4 px-6 overflow-y-auto pt-[calc(var(--header-height)+1rem)] lg:py-5'>
        {children}
      </main>
    </div>
  );
}
