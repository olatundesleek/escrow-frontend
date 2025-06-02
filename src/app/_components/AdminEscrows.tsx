'use client';

import { usePathname } from 'next/navigation';
import { getPageTitleFromPathname } from '../_utils/helpers';
import DashboardPageTitle from './DashboardPageTitle';
import { adminSidebarMenuList } from '../_constants/sidebarMenuList';

export default function AdminEscrows() {
  const pathname = usePathname();

  return (
    <div className='flex flex-col items-center justify-center'>
      <DashboardPageTitle>
        {getPageTitleFromPathname(pathname, adminSidebarMenuList)}
      </DashboardPageTitle>
    </div>
  );
}
