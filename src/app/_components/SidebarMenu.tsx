"use client";

import Link from "next/link";
import { SidebarMenuItem } from "@/app/_constants/sidebarMenuList";
import ButtonIcon from "./ButtonIcon";
import { usePathname } from "next/navigation";
import { pickActiveHref } from "../_utils/helpers";
import { useEffect, useRef } from "react";
import { useLogout } from "../_hooks/useLogout";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import SpinnerMini from "./SpinnerMini";

export default function SidebarMenu({
  sidebarMenu,
  isSidebarOpen,
  onCloseSidebar,
}: {
  sidebarMenu: SidebarMenuItem[];
  isSidebarOpen: boolean;
  onCloseSidebar: () => void;
}) {
  const pathname = usePathname();
  const activeHref = pickActiveHref(sidebarMenu, pathname);

  const previousPathnameRef = useRef(pathname);

  useEffect(() => {
    if (pathname !== previousPathnameRef.current && isSidebarOpen) {
      onCloseSidebar();
    }
    previousPathnameRef.current = pathname;
  }, [pathname, isSidebarOpen, onCloseSidebar]);

  const { handleLogout, isLoading } = useLogout();

  return (
    <ul
      className={`w-full flex flex-col ${
        isSidebarOpen ? "gap-2" : "gap-5"
      } h-full relative z-40 overflow-visible`}
    >
      {sidebarMenu.map((item) => {
        const active = item.href === activeHref;
        const Icon = item.icon;

        if (item.href) {
          return (
            <li key={item.label} className="relative overflow-visible">
              <Link
                href={item.href}
                className={`flex rounded-md text-sm relative overflow-visible ${
                  isSidebarOpen
                    ? `border border-db-border p-2 text-start gap-2 hover:font-black transition-all duration-500 items-center text-db-text-primary  ${
                        active
                          ? "bg-db-primary font-black text-white hover:bg-db-primary/50"
                          : "bg-db-background hover:bg-db-primary/20"
                      }`
                    : "hover:font-black transition-colors duration-500 items-center text-db-text-primary font-medium w-full h-full justify-center"
                }`}
              >
                {isSidebarOpen ? (
                  <>
                    <div
                      className={`p-2 text-xl ${
                        active ? "text-white" : "text-db-primary"
                      }`}
                    >
                      <Icon />
                    </div>
                    <span>{item.label}</span>
                  </>
                ) : (
                  <ButtonIcon
                    toolTip={item.label}
                   tipPosition="bottom"
                    style="hidden lg:block"
                    isActive={active}
                  >
                    <Icon className="text-xl" />
                  </ButtonIcon>
                )}
              </Link>
            </li>
          );
        }

        return (
          <li key={item.label} className="relative overflow-visible">
            <div
              className={`cursor-pointer rounded-xl ${
                isSidebarOpen
                  ? "flex p-2 text-start gap-2 hover:font-black transition-colors duration-500 items-center text-db-text-primary text-base font-medium hover:bg-db-border"
                  : "flex hover:font-black transition-colors duration-500 items-center text-db-text-primary text-base font-medium w-full h-full justify-center"
              }`}
            >
              {isSidebarOpen ? (
                <>
                  <div className="p-2 text-xl text-db-primary">
                    <Icon />
                  </div>
                  <span>{item.label}</span>
                </>
              ) : (
                <ButtonIcon toolTip={item.label} tipPosition="bottom" style="hidden lg:block">
                  <Icon className="text-xl" />
                </ButtonIcon>
              )}
            </div>
          </li>
        );
      })}

      {/* Logout */}
      <li
        className="bg-db-background flex cursor-pointer p-2 text-start gap-2 rounded hover:font-black transition-colors duration-500 items-center text-error border border-db-border text-base font-medium hover:bg-db-border lg:hidden relative overflow-visible"
        onClick={handleLogout}
      >
        <div className="p-2">
          {isLoading ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
        </div>
        <span>Logout</span>
      </li>
    </ul>
  );
}
