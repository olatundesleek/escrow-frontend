import { usePathname } from 'next/navigation';
import { getPageTitleFromPathname, MenuItem } from '../_utils/helpers';
import { adminSidebarMenuList } from '../_constants/sidebarMenuList';

interface DashboardPageTitleProps {
  title?: string;
  padding?: string;
  children?: React.ReactNode;
}

export default function AdminDashboardPageTitle({
  title,
  children,
  padding = 'p-4',
}: DashboardPageTitleProps) {
  const pathname = usePathname();
  const pageTitle =
    title ||
    getPageTitleFromPathname(
      pathname,
      adminSidebarMenuList.filter((item) => item.href) as MenuItem[],
    );

  return (
    <div
      className={`w-full flex items-center justify-between ${padding} bg-transparent text-dashboard-secondary text-xl border border-dashboard-border rounded shadow-md `}
    >
      <h1>{pageTitle}</h1>
      {children}
    </div>
  );
}
