import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import { Fragment, useRef, useState } from 'react';
import { IconType } from 'react-icons';
import { FaEllipsisV } from 'react-icons/fa';

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
    <Menu as='div' className='relative inline-block text-left'>
      <MenuButton
        ref={buttonRef}
        onClick={handleOpenMenu}
        className={({ active }) =>
          `p-2 border border-dashboard-border cursor-pointer hover:bg-dashboard-secondary hover:text-dashboard-primary rounded transition-colors duration-300 ease-in mx-0.5 ${
            active
              ? 'bg-dashboard-secondary text-dashboard-primary'
              : 'bg-transparent  text-dashboard-secondary'
          }`
        }
      >
        <FaEllipsisV />
      </MenuButton>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <MenuItems
          className={`absolute right-0 z-20 mt-1 w-40 origin-top-right rounded-md bg-white
                     shadow-lg ring-1 ring-black/5 focus:outline-none overflow-hidden ${
                       openUpward
                         ? `bottom-full mb-2 right-0`
                         : `top-full mt-1 right-0`
                     }`}
        >
          {actions.map(
            ({ label, onClick, danger, success, icon: Icon, disabled }) => (
              <MenuItem
                key={label}
                as='button'
                onClick={disabled ? undefined : onClick}
                className={({ active }) =>
                  `${
                    active
                      ? 'bg-dashboard-secondary text-dashboard-primary'
                      : ''
                  } ${
                    danger
                      ? 'text-red-600 hover:text-red-400  hover:font-black'
                      : success
                      ? 'text-green-600 hover:text-green-400 hover:font-black hover:bg-dashboard-border'
                      : 'text-gray-700'
                  } ${
                    disabled ? 'opacity-50 cursor-not-allowed' : ''
                  } flex w-full px-4 py-2 text-sm hover:bg-dashboard-secondary text-dashboard-primary cursor-pointer hover:text-dashboard-primary items-center gap-2`
                }
              >
                {Icon && <Icon className='w-4 h-4' />}
                {label}
              </MenuItem>
            ),
          )}
        </MenuItems>
      </Transition>
    </Menu>
  );
}
