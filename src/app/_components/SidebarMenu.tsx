'use client';

import Link from 'next/link';
import { SidebarMenuItem } from '@/app/_constants/sidebarMenuList';
import ButtonIcon from './ButtonIcon';
// import Logout from './Logout';
import { usePathname } from 'next/navigation';
import { pickActiveHref } from '../_utils/helpers';
import { useEffect, useRef } from 'react';
import { useLogout } from '../_hooks/useLogout';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import SpinnerMini from './SpinnerMini';

export default function SidebarMenu({
  sidebarMenu,
  isSidebarOpen,
  onCloseSidebar,
}: {
  sidebarMenu: SidebarMenuItem[];
  isSidebarOpen: boolean;
  onCloseSidebar: () => void;
}) {
  const pathname = usePathname();
  const activeHref = pickActiveHref(sidebarMenu, pathname);

  const previousPathnameRef = useRef(pathname);

  useEffect(() => {
    // Only close if the pathname has actually changed AND the sidebar is open
    if (pathname !== previousPathnameRef.current && isSidebarOpen) {
      onCloseSidebar();
    }
    // Update the ref with the current pathname after the effect runs
    previousPathnameRef.current = pathname;
  }, [pathname, isSidebarOpen, onCloseSidebar]);

  const { handleLogout, isLoading } = useLogout();

  return (
    <ul
      className={`w-full flex flex-col ${
        isSidebarOpen ? 'gap-2' : 'gap-5'
      } h-full`}
    >
      {sidebarMenu.map((item) => {
        const active = item.href === activeHref;
        const Icon = item.icon;

        if (item.href) {
          return (
            <li key={item.label}>
              <Link
                href={item.href}
                className={`${
                  isSidebarOpen
                    ? `flex py-2.5 px-3 text-start gap-2 rounded hover:font-black transition-all duration-500 items-center text-gray-700 text-base  ${
                        active
                          ? 'bg-dashboard-secondary font-black text-white  hover:bg-dashboard-secondary'
                          : 'bg-transparent  hover:bg-dashboard-border'
                      }`
                    : 'flex rounded hover:font-black transition-colors duration-500 items-center text-gray-700 text-base font-medium w-full h-full justify-center'
                } `}
              >
                {isSidebarOpen ? (
                  <>
                    <div
                      className={`p-2 text-xl  ${
                        active ? 'text-white' : 'text-dashboard-secondary'
                      }`}
                    >
                      <Icon />
                    </div>
                    <span>{item.label}</span>
                  </>
                ) : (
                  <ButtonIcon
                    toolTip={item.label}
                    tipPosition='-right-1/2'
                    style='hidden lg:block'
                    isActive={active}
                  >
                    <Icon className='text-xl' />
                  </ButtonIcon>
                )}
              </Link>
            </li>
          );
        }

        return (
          <li key={item.label}>
            <div
              className={`cursor-pointer ${
                isSidebarOpen
                  ? 'flex py-2.5 px-3 text-start gap-2 rounded hover:font-black transition-colors duration-500 items-center text-gray-700 text-base font-medium hover:bg-dashboard-border'
                  : 'flex rounded hover:font-black transition-colors duration-500 items-center text-gray-700 text-base font-medium w-full h-full justify-center'
              }`}
            >
              {isSidebarOpen ? (
                <>
                  <div className='p-2 text-xl text-dashboard-secondary'>
                    <Icon />
                  </div>
                  <span>{item.label}</span>
                </>
              ) : (
                <ButtonIcon
                  toolTip={item.label}
                  tipPosition='-right-1/2'
                  style='hidden lg:block'
                >
                  <Icon className='text-xl' />
                </ButtonIcon>
              )}
            </div>
          </li>
        );
      })}
      <li
        className='flex cursor-pointer  py-2.5 px-3 text-start gap-2 rounded hover:font-black transition-colors duration-500 items-center text-gray-700 text-base font-medium hover:bg-dashboard-border lg:hidden '
        onClick={handleLogout}
      >
        <div className='p-2 text-xl text-dashboard-secondary'>
          {isLoading ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
        </div>
        <span>Logout</span>
      </li>
    </ul>
  );
}

//Please note that the above code is designed to handle both links and dropdowns in the sidebar menu.
// If an item has a `href`, it will render a link; if not, it will render a clickable div that toggles the dropdown.
// If you want to render the dropdown content without a link, you can use the commented-out code below.
//Render this in place else block for display without href for dropdown content in the future

/*
 <div key={item.label}>
            <div
              onClick={() => toggleDropdown(item.label)}
              className={`cursor-pointer ${
                isSidebarOpen
                  ? 'flex py-2.5 px-3 text-start gap-2 rounded hover:font-black transition-colors duration-500 items-center text-gray-700 text-base font-medium hover:bg-dashboard-border'
                  : 'flex py-2.5 rounded-full hover:font-black transition-colors duration-500 items-center text-gray-700 text-base font-medium w-full h-full justify-center'
              }`}
            >
              {isSidebarOpen ? (
                <>
                  <div className='p-2 text-xl text-dashboard-secondary'>
                    <Icon />
                  </div>
                  <span>{item.label}</span>
                </>
              ) : (
                <ButtonIcon
                  toolTip={item.label}
                  tipPosition='-right-1/2'
                  style='hidden lg:block'
                >
                  <Icon className='text-xl' />
                </ButtonIcon>
              )}
            </div>

         //Render dropdown content conditionally 
            {isDropdown && isOpen && (
              <div className=' text-sm text-gray-600'>
                {item.label === 'Milestone Payments' && (
                  <>
                    <div>Pending</div>
                    <div>Completed</div>
                    <div>Rejected</div>
                  </>
                )}
                {item.label === 'Users' && (
                  <>
                    <div>All Users</div>
                    <div>Banned Users</div>
                    <div>Verified Users</div>
                  </>
                )}
                // Add more custom dropdowns 
                {!['Milestone Payments', 'Users'].includes(item.label) && (
                  <>
                    <div>{item.label} Sub-item 1</div>
                    <div>{item.label} Sub-item 2</div>
                  </>
                )}
              </div>
            )}
          </div>
          */

// State and function to handle dropdown toggling
/* 
const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>(
    {},
  );

  const toggleDropdown = (label: string) => {
    setOpenDropdowns((prev) => {
      return {
        ...prev,
        [label]: !prev[label],
      };
    });
  };
  */
