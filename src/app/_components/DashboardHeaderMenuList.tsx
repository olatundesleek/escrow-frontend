"use client";

import { usePathname, useRouter } from "next/navigation";
import { HiOutlineGlobeAlt } from "react-icons/hi2";
import { MdAdminPanelSettings } from "react-icons/md";
import { HeaderMenuItem } from "@/app/_constants/headerMenuList";

import Logout from "./Logout";
import UserAvatar from "./UserAvatar";
import ButtonIcon from "./ButtonIcon";
import { useQuery } from "@tanstack/react-query";
import { getUserRole } from "../_lib/auth";

import SpinnerMini from "./SpinnerMini";
import { useState, useRef, useEffect } from "react";

export default function DashboardHeaderMenuList({
  headerMenu,
}: {
  headerMenu: HeaderMenuItem[];
}) {
  const { push } = useRouter();
  const pathname = usePathname();
  const [dropdown, setDropdown] = useState<boolean>(false);

  // Ref for the UserAvatar dropdown
  const avatarRef = useRef<HTMLLIElement>(null);

  // Close dropdown when clicking outside UserAvatar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        avatarRef.current &&
        !avatarRef.current.contains(event.target as Node)
      ) {
        setDropdown(false);
      }
    }
    if (dropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdown]);

  const { data, isLoading: isUserRoleLoading } = useQuery({
    queryKey: ["userRole"],
    queryFn: getUserRole,
  });

  if (isUserRoleLoading)
    return <SpinnerMini color="text-dashboard-secondary" />;

  const role = data.role;

  return (
    <ul className="flex items-center gap-2">
      <li onClick={() => push("/")} className="relative group">
        <ButtonIcon style="lg:text-2xl font-black">
          <HiOutlineGlobeAlt />
        </ButtonIcon>
        <div className="hidden group-hover:flex bg-dashboard-secondary text-white absolute top-11 -left-8 -translate-x-1/2 rounded shadow-md font-black z-50 text-xs transition-all duration-300 w-26 px-2 py-1 justify-center items-center">
          View Website
        </div>
      </li>
      {headerMenu.map((icon: HeaderMenuItem) => {
        const Icon = icon.icon;
        return (
          <li key={icon.label} className="relative">
            <ButtonIcon style="lg:text-2xl" toolTip={icon.label}>
              <Icon />
            </ButtonIcon>
          </li>
        );
      })}
      {role === "admin" && !pathname.startsWith("/admin") && (
        <li>
          <ButtonIcon
            style="lg:text-2xl"
            toolTip="Admin"
            tipPosition="-right-8"
            onClick={() => push("/admin/dashboard")}
          >
            <MdAdminPanelSettings />
          </ButtonIcon>
        </li>
      )}
      <li className="hidden lg:block">
        <Logout />
      </li>
      <li ref={avatarRef}>
        <UserAvatar dropdown={dropdown} setDropdown={setDropdown} />
      </li>
    </ul>
  );
}
