import { IconType } from 'react-icons';
import {
  HiOutlineBell,
  HiOutlineGlobeAlt,
  HiOutlineViewGrid,
} from 'react-icons/hi';

export interface HeaderMenuItem {
  label: string;
  icon: IconType;
  actionType: string;
}

export const adminHeaderMenuList: HeaderMenuItem[] = [
  {
    label: 'View Website',
    icon: HiOutlineGlobeAlt,
    actionType: 'viewWebsite',
  },
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
    label: 'View Website',
    icon: HiOutlineGlobeAlt,
    actionType: 'viewWebsite',
  },

  {
    label: 'Notifications',
    icon: HiOutlineBell,
    actionType: 'openNotifications',
  },
];
