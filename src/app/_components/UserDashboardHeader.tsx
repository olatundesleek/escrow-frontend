import { HiOutlineMenu } from "react-icons/hi";
import ButtonIcon from "./ButtonIcon";
import DashBboardSearchBar from "./DashboardSearchBar";
import DashboardHeaderMenuList from "./DashboardHeaderMenuList";
import { userHeaderMenuList } from "@/app/_constants/headerMenuList";

export default function UserDashboardHeader({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<boolean>;
}) {
  return (
    <header className='w-full border-b border-db-border flex justify-between items-center px-5 py-1 h-header-height min-h-header-height max-h-header-height fixed lg:relative bg-dashboard-primary z-100'>
      <div className='flex gap-x-4 w-full'>
        <ButtonIcon
          style='lg:text-2xl'
          onClick={setIsSidebarOpen}
          isActive={isSidebarOpen}
          toolTip='Menu'
          tipPosition='bottom'
        >
          <HiOutlineMenu />
        </ButtonIcon>
        <DashBboardSearchBar display='hidden lg:flex md:flex' />
      </div>
      {/* header menulist here e.g for admins grid icon, notification, globe and avartar then user are different set of icons */}
      <DashboardHeaderMenuList headerMenu={userHeaderMenuList} />
    </header>
  );
}
