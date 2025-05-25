import { adminSidebarMenuList } from '@/app/_constants/sidebarMenuList';

import Logo from './Logo';
import DashboardSearchBar from './DashboardSearchBar';
import SidebarMenu from './SidebarMenu';
import Image from 'next/image';

export default function AdminSidebar({
  isSidebarOpen,
}: {
  isSidebarOpen: boolean;
}) {
  return (
    <aside
      className={`lg:row-span-full border-r border-gray-300 flex flex-col gap-4 absolute lg:relative py-4 lg:py-0 ${
        isSidebarOpen ? 'lg:w-[18rem] w-full' : 'lg:w-[5rem] w-0'
      } transition-[width] duration-300 z-50 bg-white overflow-auto`}
    >
      <div className='w-full hidden relative lg:flex items-center justify-center py-4 border-b border-gray-300 '>
        <Image
          src={'/logo_dark.png'}
          alt='logo'
          width={52}
          height={52}
          className={`absolute transition-all duration-300  ${
            isSidebarOpen
              ? 'opacity-0 scale-90 translate-x-4'
              : 'opacity-100 scale-100'
          }`}
        />
        <div
          className={`transition-all duration-300 ${
            isSidebarOpen
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-90 -translate-x-4'
          }`}
        >
          <Logo />
        </div>
      </div>

      <div
        className={`w-full ${
          isSidebarOpen ? 'px-5' : 'px-0 scrollbar-hidden'
        }  flex flex-col gap-2 overflow-y-auto`}
      >
        <DashboardSearchBar display='flex py-2.5 md:hidden' />
        <SidebarMenu
          sidebarMenu={adminSidebarMenuList}
          isSidebarOpen={isSidebarOpen}
        />
      </div>
    </aside>
  );
}
