import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { IconType } from "react-icons";
import { FaEllipsisV } from "react-icons/fa";

type Action = {
  label: string;
  onClick: () => void;
  danger?: boolean;
  success?: boolean;
  icon?: IconType;
  disabled?: boolean;
};

export default function RowActionMenu({ actions }: { actions: Action[] }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [openUpward, setOpenUpward] = useState(false);

  function handleOpenMenu() {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      const spaceBelow = window.innerHeight - rect.bottom;
      setOpenUpward(spaceBelow < 150);
    }
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      {/* Trigger Button */}
      <MenuButton
        ref={buttonRef}
        onClick={handleOpenMenu}
        className={({ active }) =>
          `p-2 rounded-md border border-db-border transition-colors duration-200 cursor-pointer
          ${active ? "bg-db-primary text-white" : "text-db-text-secondary hover:bg-db-surface"}`
        }
      >
        <FaEllipsisV />
      </MenuButton>

      {/* Dropdown */}
      <Transition
        as={Fragment}
        enter="transition ease-out duration-150"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems
          className={`absolute z-20 w-44 rounded-lg bg-db-surface border border-db-border shadow-md focus:outline-none overflow-hidden
            ${openUpward ? "bottom-full mb-2 right-0" : "top-full mt-1 right-0"}`}
        >
          {actions.map(({ label, onClick, danger, success, icon: Icon, disabled }) => (
            <MenuItem
              key={label}
              as="button"
              onClick={disabled ? undefined : onClick}
              disabled={disabled}
              className={({ active }) =>
                `flex w-full items-center gap-2 px-4 py-2 text-sm transition
                ${active ? "bg-db-primary text-white" : "text-db-text-secondary"}
                ${danger ? "text-red-600 hover:bg-red-50 hover:text-red-700" : ""}
                ${success ? "text-green-600 hover:bg-green-50 hover:text-green-700" : ""}
                ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`
              }
            >
              {Icon && <Icon className="w-4 h-4" />}
              {label}
            </MenuItem>
          ))}
        </MenuItems>
      </Transition>
    </Menu>
  );
}
