import { formatDistance, parseISO } from "date-fns";

export type MenuItem = {
  label: string;
  href: string;
};

export function getPageTitleFromPathname(
  pathname: string,
  menuList: MenuItem[]
): string {
  const exactMatch = menuList.find((menuItem) => menuItem.href === pathname);
  if (exactMatch) return exactMatch.label;

  const startsWithMatch = menuList.find((menuItem) =>
    pathname.startsWith(menuItem.href)
  );
  if (startsWithMatch) return startsWithMatch.label;

  return formatFromPath(pathname);
}

export function formatFromPath(path: string): string {
  const segments = path.split("/").filter(Boolean);

  const lastPath = [...segments]
    .reverse()
    .find((segment) => isNaN(Number(segment)));

  if (!lastPath) return "";

  return lastPath.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export const formatDistanceFromNow = (dateStr: string) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");
