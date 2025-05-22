import { IconType } from 'react-icons';
import {
  HiOutlineHome,
  HiOutlineViewGrid,
  HiOutlineCollection,
  HiOutlineCash,
  HiOutlineCreditCard,
  HiOutlineUsers,
  HiOutlineArrowDown,
  HiOutlineArrowUp,
  HiOutlineCurrencyDollar,
  HiOutlineMail,
  HiOutlineUserAdd,
  HiOutlineCog,
  HiOutlineReceiptRefund,
  HiOutlineChatAlt,
  HiOutlineGlobe,
  HiOutlineShieldCheck,
  HiOutlineTemplate,
  HiOutlineDocumentText,
  HiOutlineAdjustments,
  HiOutlineBan,
  HiOutlineRefresh,
  HiOutlineInformationCircle,
} from 'react-icons/hi';

import { HiOutlineLanguage } from 'react-icons/hi2';

export interface SidebarMenuItem {
  label: string;
  icon: IconType;
  href: string;
}

export const sidebarMenuList: SidebarMenuItem[] = [
  { label: 'Dashboard', icon: HiOutlineHome, href: '/dashboard' },
  { label: 'Categories', icon: HiOutlineCollection, href: '' },
  { label: 'Escrows', icon: HiOutlineCash, href: '/dashboard/escrows' },
  { label: 'Milestone Payments', icon: HiOutlineReceiptRefund, href: '' },
  { label: 'Payment Methods', icon: HiOutlineCreditCard, href: '' },
  { label: 'Users', icon: HiOutlineUsers, href: '' },
  { label: 'Deposit', icon: HiOutlineArrowDown, href: '' },
  { label: 'Withdrawals', icon: HiOutlineArrowUp, href: '' },
  {
    label: 'Transactions',
    icon: HiOutlineCurrencyDollar,
    href: '/dashboard/transanctions',
  },
  { label: 'Contacts', icon: HiOutlineMail, href: '' },
  { label: 'Subscribers', icon: HiOutlineUserAdd, href: '' },
  { label: 'Basic Settings', icon: HiOutlineCog, href: '' },
  { label: 'Escrow Charge', icon: HiOutlineReceiptRefund, href: '' },
  { label: 'Email & SMS', icon: HiOutlineChatAlt, href: '' },
  { label: 'Plugins', icon: HiOutlineViewGrid, href: '' },
  { label: 'Language', icon: HiOutlineLanguage, href: '' },
  { label: 'SEO', icon: HiOutlineGlobe, href: '' },
  { label: 'KYC', icon: HiOutlineShieldCheck, href: '' },
  { label: 'Themes', icon: HiOutlineTemplate, href: '' },
  { label: 'Site Content', icon: HiOutlineDocumentText, href: '' },
  { label: 'GDPR Cookie', icon: HiOutlineAdjustments, href: '' },
  { label: 'Maintenance', icon: HiOutlineBan, href: '' },
  { label: 'Cache Clear', icon: HiOutlineRefresh, href: '' },
  { label: 'System Info', icon: HiOutlineInformationCircle, href: '' },
];
