import { parseISO } from 'date-fns/parseISO';
import { formatDistance } from 'date-fns/formatDistance';

import { SidebarMenuItem } from '../_constants/sidebarMenuList';

export type MenuItem = {
  label: string;
  href: string;
};

export function getPageTitleFromPathname(
  pathname: string,
  menuList: MenuItem[],
): string {
  const exactMatch = menuList.find((menuItem) => menuItem.href === pathname);
  if (exactMatch) return exactMatch.label;

  const startsWithMatch = menuList.find((menuItem) =>
    pathname.startsWith(menuItem.href),
  );
  if (startsWithMatch) return startsWithMatch.label;

  return formatFromPath(pathname);
}

export function formatFromPath(path: string): string {
  const segments = path.split('/').filter(Boolean);

  const lastPath = [...segments]
    .reverse()
    .find((segment) => isNaN(Number(segment)));

  if (!lastPath) return '';

  return lastPath.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export const formatDistanceFromNow = (dateStr: string) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace('about ', '')
    .replace('in', 'In');

export function pickActiveHref(menu: SidebarMenuItem[], current: string) {
  let winner = '';
  for (const m of menu) {
    if (!m.href) continue;

    // exact match or nested match
    const nested =
      current === m.href || current.startsWith(`${m.href.replace(/\/$/, '')}/`);

    if (nested && m.href.length > winner.length) {
      winner = m.href; // keep the longest match
    }
  }
  return winner;
}

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(
    value,
  );

export function formatCurrencyInput(value: string): string {
  // Remove non-digits and dots
  const clean = value.replace(/[^0-9.]/g, '');

  // Parse to float and reformat with commas
  const num = parseFloat(clean);

  if (isNaN(num)) return '';

  return num.toLocaleString('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
  });
}

export function parseCurrencyFormatted(value: string): number {
  // Remove commas and currency symbol (₦)
  const numeric = value.replace(/₦|,/g, '');

  return parseFloat(numeric) || 0;
}

interface Escrow {
  creatorRole: 'seller' | 'buyer';
  creator: string;
}

export function getEscrowTypeForUser<Tdata extends Escrow>(
  escrow: Tdata,
  currentUserId: string,
): 'Buy' | 'Sell' {
  const { creatorRole, creator } = escrow;

  if (currentUserId === creator) {
    return creatorRole === 'buyer' ? 'Buy' : 'Sell';
  }

  return creatorRole === 'buyer' ? 'Sell' : 'Buy';
}