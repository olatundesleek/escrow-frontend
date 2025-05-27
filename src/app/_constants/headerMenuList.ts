import { IconType } from 'react-icons';
import { HiOutlineBell, HiOutlineViewGrid } from 'react-icons/hi';

export interface HeaderMenuItem {
  label: string;
  icon: IconType;
  actionType: string;
}

export const adminHeaderMenuList: HeaderMenuItem[] = [
  {
    label: 'Menu',
    icon: HiOutlineViewGrid,
    actionType: 'openMenu',
  },
  {
    label: 'Notifications',
    icon: HiOutlineBell,
    actionType: 'openNotifications',
  },
];

export const userHeaderMenuList: HeaderMenuItem[] = [
  {
    label: 'Notifications',
    icon: HiOutlineBell,
    actionType: 'openNotifications',
  },
];
