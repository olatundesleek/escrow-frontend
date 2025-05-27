import { HeaderMenuItem } from '@/app/_constants/headerMenuList';

import ButtonIcon from './ButtonIcon';
import UserAvatar from './UserAvatar';
import Logout from './Logout';
import { useRouter } from 'next/navigation';
import { HiOutlineGlobeAlt } from 'react-icons/hi2';

export default function DashboardHeaderMenuList({
  headerMenu,
}: {
  headerMenu: HeaderMenuItem[];
}) {
  const { push } = useRouter();
  return (
    <ul className='flex items-center gap-2'>
      <li onClick={() => push('/')} className='relative group'>
        <ButtonIcon style='lg:text-2xl font-black'>
          <HiOutlineGlobeAlt />
        </ButtonIcon>
        <div className='hidden group-hover:flex bg-dashboard-secondary text-white absolute top-11 -left-8 -translate-x-1/2  rounded shadow-md font-black z-50 text-xs transition-all duration-300 w-26 px-2 py-1 justify-center items-center'>
          View Website
        </div>
      </li>
      {headerMenu.map((icon: HeaderMenuItem) => {
        const Icon = icon.icon;
        return (
          <li key={icon.label} className='relative'>
            <ButtonIcon style='lg:text-2xl' toolTip={icon.label}>
              <Icon />
            </ButtonIcon>
          </li>
        );
      })}
      <li className='hidden lg:block'>
        <Logout />
      </li>
      <li>
        <UserAvatar />
      </li>
    </ul>
  );
}
