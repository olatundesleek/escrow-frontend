"use client";

import { usePathname, useRouter } from "next/navigation";
import { HiOutlineGlobeAlt } from "react-icons/hi2";
import { MdAdminPanelSettings } from "react-icons/md";
import { HeaderMenuItem } from "@/app/_constants/headerMenuList";

import Logout from "./Logout";
import UserAvatar from "./UserAvatar";
import ButtonIcon from "./ButtonIcon";
import SpinnerMini from "./SpinnerMini";
import { useState, useRef, useEffect } from "react";
import useGetCurrentUser from "../_hooks/useGetCurrentUser";

export default function DashboardHeaderMenuList({
  headerMenu,
}: {
  headerMenu: HeaderMenuItem[];
}) {
  const { push } = useRouter();
  const pathname = usePathname();
  const [dropdown, setDropdown] = useState<boolean>(false);
  const { currentUserData, isGetCurrentUserLoading } = useGetCurrentUser();

  // Ref for the UserAvatar dropdown
  const avatarRef = useRef<HTMLLIElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (avatarRef.current && !avatarRef.current.contains(event.target as Node)) {
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

  if (isGetCurrentUserLoading) return <SpinnerMini color="text-db-secondary" />;

  const role = currentUserData.role;

  return (
    <ul className="flex items-center gap-2 relative z-40">
      {/* Website Button */}
      <li>
        <ButtonIcon
          style="lg:text-2xl font-black"
          toolTip="View Website"
          tipPosition="bottom"
          onClick={() => push("/")}
        >
          <HiOutlineGlobeAlt />
        </ButtonIcon>
      </li>

      {/* Dynamic Header Menu */}
      {headerMenu.map((icon: HeaderMenuItem) => {
        const Icon = icon.icon;
        return (
          <li key={icon.label}>
            <ButtonIcon style="lg:text-2xl" toolTip={icon.label} tipPosition="bottom">
              <Icon />
            </ButtonIcon>
          </li>
        );
      })}

      {/* Admin Shortcut */}
      {role === "admin" && !pathname.startsWith("/admin") && (
        <li>
          <ButtonIcon
            style="lg:text-2xl"
            toolTip="Admin"
            tipPosition="bottom"
            onClick={() => push("/admin/dashboard")}
          >
            <MdAdminPanelSettings />
          </ButtonIcon>
        </li>
      )}

      {/* Logout (desktop only) */}
      <li className="hidden lg:block">
        <Logout />
      </li>

      {/* User Avatar w/ Dropdown */}
      <li ref={avatarRef}>
        <UserAvatar dropdown={dropdown} setDropdown={setDropdown} />
      </li>
    </ul>
  );
}
