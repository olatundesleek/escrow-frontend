import { usePathname } from 'next/navigation';
import { getPageTitleFromPathname, MenuItem } from '../_utils/helpers';
import { userSidebarMenuList } from '../_constants/sidebarMenuList';

interface DashboardPageTitleProps {
  title?: string;
  padding?: string;
  children?: React.ReactNode;
}

export default function UserDashboardPageTitle({
  title,
  children,
  padding = 'p-4',
}: DashboardPageTitleProps) {
  const pathname = usePathname();
  const pageTitle =
    title ||
    getPageTitleFromPathname(
      pathname,
      userSidebarMenuList.filter((item) => item.href) as MenuItem[],
    );

  return (
    <div
      className={`w-full flex items-center justify-between ${padding} lg:top-0  text-dashboard-secondary text-xl border border-dashboard-border rounded shadow-md fixed top-header-height lg:relative bg-dashboard-primary z-[60] lg:z-0`}
    >
      <h1>{pageTitle}</h1>
      {children}
    </div>
  );
}
