type MenuItem = {
  label: string;
  href?: string;
};

export function getPageTitleFromPathname(
  pathname: string,
  menuList: MenuItem[],
): string {
  const exactMatch = menuList.find((menuItem) => menuItem.href === pathname);
  return exactMatch ? exactMatch.label : 'Page';
}
