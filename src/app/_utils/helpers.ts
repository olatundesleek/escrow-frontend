import { formatDistance, parseISO } from 'date-fns';
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