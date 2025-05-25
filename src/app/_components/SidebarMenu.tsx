import Link from 'next/link';
import { SidebarMenuItem } from '@/app/_constants/sidebarMenuList';
import ButtonIcon from './ButtonIcon';

export default function SidebarMenu({
  sidebarMenu,
  isSidebarOpen,
}: {
  sidebarMenu: SidebarMenuItem[];
  isSidebarOpen: boolean;
}) {
  return (
    <ul
      className={`w-full flex flex-col ${isSidebarOpen ? 'gap-2' : 'gap-0'} `}
    >
      {sidebarMenu.map((item) => (
        <li key={item.label}>
          <Link
            href={item.href}
            className={`${
              isSidebarOpen
                ? 'flex py-2.5 px-3 text-start gap-2 rounded hover:font-black bg-transparent transition-colors duration-500 items-center text-gray-700 text-base font-medium hover:bg-gray-300'
                : 'flex py-2.5 rounded-full hover:font-black bg-transparent transition-colors duration-500 items-center text-gray-700 text-base font-medium  w-full h-full justify-center'
            }`}
          >
            {isSidebarOpen ? (
              <>
                <div className='p-2 text-xl text-dashboard-secondary'>
                  <item.icon />
                </div>
                <span>{item.label}</span>
              </>
            ) : (
              <span className='hidden lg:block'>
                <ButtonIcon toolTip={item.label} tipPosition='-right-1/2'>
                  <item.icon className='text-xl' />
                </ButtonIcon>
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
