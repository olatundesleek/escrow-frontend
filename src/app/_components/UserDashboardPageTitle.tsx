import { usePathname } from "next/navigation";
import { getPageTitleFromPathname, MenuItem } from "../_utils/helpers";
import { userSidebarMenuList } from "../_constants/sidebarMenuList";

interface DashboardPageTitleProps {
  title?: string | React.ReactNode;
  padding?: string;
  children?: React.ReactNode;
}

export default function UserDashboardPageTitle({
  title,
  children,
  padding = "p-4",
}: DashboardPageTitleProps) {
  const pathname = usePathname();
  const pageTitle =
    title ||
    getPageTitleFromPathname(
      pathname,
      userSidebarMenuList.filter((item) => item.href) as MenuItem[]
    );

  return (
    <div
      className={`w-full left-0 absolute flex items-center justify-between ${padding} lg:top-0 font-bold text-db-text-primary text-xl border border-db-border rounded-md shadow-xs fixed top-header-height lg:relative bg-db-surface z-[60] lg:z-0`}
    >
      <h1>{pageTitle}</h1>
      {children}
    </div>
  );
}
