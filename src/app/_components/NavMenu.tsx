import Link from 'next/link';
import { TbUser, TbUserPlus } from 'react-icons/tb';

import { navLinks } from '../_constants/navLinks';

import Button from './Button';
import NavItem from './NavItem';

export default function NavMenu({
  isToggled,
  isLoggedIn,
  redirectRole = 'user',
}: {
  isToggled: boolean;
  isLoggedIn: boolean;
  redirectRole?: string;
}) {
  const href = redirectRole
    ? redirectRole === 'admin'
      ? '/admin/dashboard'
      : '/dashboard'
    : '/login';

  return (
    <div
      className={`grow-1 flex flex-col-reverse lg:flex-row lg:items-center lg:mt-0 gap-2 transition-all duration-500 ease-in-out overflow-auto ${
        isToggled ? 'h-58 mt-4 lg:h-full' : 'h-0 lg:h-full '
      } `}
    >
      <ul className={'grow-8 lg:flex lg:mt-0 lg:justify-end gap-4 '}>
        {navLinks.map((link) => (
          <NavItem key={link.href} href={link.href} label={link.label} />
        ))}
      </ul>
      <div className='grow-1 flex justify-end'>
        <Link href={href}>
          <Button
            padding='px-2 py-2'
            style='flex justify-center items-center flex-row gap-2'
            color='bg-secondary text-white'
          >
            {isLoggedIn ? (
              <>
                <span>
                  <TbUser fontSize={'1.2rem'} />
                </span>
                <span>Dashboard</span>
              </>
            ) : (
              <>
                <span>
                  <TbUserPlus fontSize='1.2rem' />
                </span>
                <span>Log In</span>
              </>
            )}
          </Button>
        </Link>
      </div>
    </div>
  );
}
