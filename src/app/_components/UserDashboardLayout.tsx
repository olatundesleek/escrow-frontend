'use client';

import { useState } from 'react';

import UserDashboardHeader from '@/app/_components/UserDashboardHeader';
import UserSidebar from '@/app/_components/UserSidebar';

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
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
  );
}
