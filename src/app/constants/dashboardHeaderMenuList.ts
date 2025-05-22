import { IconType } from 'react-icons';
import {
  HiOutlineBell,
  HiOutlineGlobeAlt,
  HiOutlineViewGrid,
} from 'react-icons/hi';

export interface IconList {
  label: string;
  icon: IconType;
}

export const adminIconsList: IconList[] = [
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
