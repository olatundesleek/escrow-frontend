import { userSidebarMenuList } from "@/app/_constants/sidebarMenuList";

import Logo from "./Logo";
import DashboardSearchBar from "./DashboardSearchBar";
import SidebarMenu from "./SidebarMenu";
import Image from "next/image";

export default function UserSidebar({
  isSidebarOpen,
  onCloseSidebar,
}: {
  isSidebarOpen: boolean;
  onCloseSidebar: () => void;
}) {
  return (
    <aside
      className={`lg:row-span-full border-r border-dashboard-border lg:flex lg:flex-col lg:relative lg:py-0 lg:transition-[width] bg-white lg:gap-2.5 z-100 fixed
      top-header-height left-0 lg:top-0
      w-4/5 max-w-[18rem]
      h-[calc(100vh-theme(spacing.header))] lg:h-auto
      transform transition-transform duration-300
      h-screen overflow-y-auto
      ${
        isSidebarOpen
          ? "translate-x-0 lg:w-[18rem]"
          : "-translate-x-full lg:translate-x-0 lg:w-[5rem]"
      }
      flex flex-col
    `}
    >
      <div className="w-full hidden relative lg:flex items-center justify-center py-4 border-b border-dashboard-border lh-header-height min-h-header-height max-h-header-height">
        <Image
          src={"/logo_dark.png"}
          alt="logo"
          width={52}
          height={52}
          className={`absolute transition-all duration-300  ${
            isSidebarOpen
              ? "opacity-0 scale-90 translate-x-4"
              : "opacity-100 scale-100"
          }`}
        />
        <div
          className={`transition-all duration-300 ${
            isSidebarOpen
              ? "opacity-100 scale-100"
              : "opacity-0 scale-90 -translate-x-4"
          }`}
        >
          <Logo />
        </div>
      </div>

      <div
        className={`w-full ${
          isSidebarOpen ? "px-5" : "px-0 scrollbar-hidden"
        }  flex flex-col gap-2 overflow-y-auto py-2.5`}
      >
        <DashboardSearchBar display="flex py-2.5 md:hidden" />
        <SidebarMenu
          sidebarMenu={userSidebarMenuList}
          isSidebarOpen={isSidebarOpen}
          onCloseSidebar={onCloseSidebar}
        />
      </div>
    </aside>
  );
}
