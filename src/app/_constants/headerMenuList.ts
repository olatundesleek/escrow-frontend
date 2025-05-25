import { IconType } from 'react-icons';
import {
  HiOutlineBell,
  HiOutlineGlobeAlt,
  HiOutlineViewGrid,
} from 'react-icons/hi';

export interface HeaderMenuItem {
  label: string;
  icon: IconType;
}

export const adminHeaderMenuList: HeaderMenuItem[] = [
  {
    label: 'View Website',
    icon: HiOutlineGlobeAlt,
  },
  {
    label: 'Menu',
    icon: HiOutlineViewGrid,
  },
  {
    label: 'Notifications',
    icon: HiOutlineBell,
  },
];

export const userHeaderMenuList: HeaderMenuItem[] = [
  {
    label: 'View Website',
    icon: HiOutlineGlobeAlt,
  },

  {
    label: 'Notifications',
    icon: HiOutlineBell,
  },
];
