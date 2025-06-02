'use client';

import { usePathname } from 'next/navigation';

import { getPageTitleFromPathname } from '../_utils/helpers';
import { adminSidebarMenuList } from '../_constants/sidebarMenuList';

import DashboardPageTitle from './DashboardPageTitle';

export default function AdminDashboard() {
  const pathname = usePathname();

  return (
    <div className='flex flex-col items-center justify-center '>
      <DashboardPageTitle>
        <h1>{getPageTitleFromPathname(pathname, adminSidebarMenuList)}</h1>
      </DashboardPageTitle>
      <p className='mt-4 text-lg'>Welcome to the admin dashboard!</p>
    </div>
  );
}
