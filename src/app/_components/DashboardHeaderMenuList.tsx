import { HeaderMenuItem } from '@/app/_constants/headerMenuList';

import ButtonIcon from './ButtonIcon';
import UserAvatar from './UserAvatar';
import Logout from './Logout';

export default function DashboardHeaderMenuList({
  headerMenu,
}: {
  headerMenu: HeaderMenuItem[];
}) {
  return (
    <ul className='flex items-center gap-2'>
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
