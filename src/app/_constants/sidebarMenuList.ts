import { IconType } from "react-icons";
import {
  HiOutlineHome,
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
  HiOutlineDocumentText,
  HiOutlineAdjustments,
  HiOutlineBan,
  HiOutlineRefresh,
  HiOutlineInformationCircle,
} from "react-icons/hi";

import {HiOutlineLanguage } from 'react-icons/hi2';

export interface SidebarMenuItem {
  label: string;
  icon: IconType;
  href?: string;
  actionType?: string; // Optional, can be used for actions like 'logout', 'delete', etc.
}

export const adminSidebarMenuList: SidebarMenuItem[] = [
  { label: 'Dashboard', icon: HiOutlineHome, href: '/admin/dashboard' },
  { label: 'Escrows', icon: HiOutlineCash, href: '/admin/dashboard/escrows' },
  { label: 'Milestone Payments', icon: HiOutlineReceiptRefund },
  { label: 'Payment Methods', icon: HiOutlineCreditCard },
  { label: 'Users', icon: HiOutlineUsers },
  { label: 'Deposit', icon: HiOutlineArrowDown },
  { label: 'Withdrawals', icon: HiOutlineArrowUp },
  {
    label: 'Transactions',
    icon: HiOutlineCurrencyDollar,
    href: '/admin/dashboard/transactions',
  },
  { label: 'Contacts', icon: HiOutlineMail },
  { label: 'Subscribers', icon: HiOutlineUserAdd },
  {
    label: 'Basic Settings',
    icon: HiOutlineCog,
    href: '/admin/dashboard/basic-settings',
  },
  { label: 'Escrow Charge', icon: HiOutlineReceiptRefund },
  { label: 'Email & SMS', icon: HiOutlineChatAlt },
  { label: 'Language', icon: HiOutlineLanguage },
  { label: 'SEO', icon: HiOutlineGlobe },
  { label: 'KYC', icon: HiOutlineShieldCheck },
  { label: 'Site Content', icon: HiOutlineDocumentText },
  { label: 'GDPR Cookie', icon: HiOutlineAdjustments },
  {
    label: 'Maintenance',
    icon: HiOutlineBan,
    href: '/admin/dashboard/maintenance',
  },
  { label: 'Cache Clear', icon: HiOutlineRefresh },
  { label: 'System Info', icon: HiOutlineInformationCircle },
];

export const userSidebarMenuList: SidebarMenuItem[] = [
  { label: 'Dashboard', icon: HiOutlineHome, href: '/dashboard' },
  { label: 'Escrows', icon: HiOutlineCash, href: '/dashboard/escrows' },
  {
    label: 'Wallet',
    icon: HiOutlineCreditCard,
    href: '/dashboard/wallet',
  },
  // { label: 'Deposit', icon: HiOutlineArrowDown, href: '' },
  // { label: 'Withdrawals', icon: HiOutlineArrowUp, href: '' },uncomment in the nearest future
  {
    label: 'Transactions',
    icon: HiOutlineCurrencyDollar,
    href: '/dashboard/transactions',
  },
  { label: 'Profile Settings', icon: HiOutlineCog, href: '/dashboard/profile' },
  { label: 'KYC', icon: HiOutlineShieldCheck, href: '/dashboard/kyc' },
  // { label: 'Logout', icon: HiArrowRightOnRectangle },
];
