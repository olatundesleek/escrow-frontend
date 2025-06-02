'use client';

import { useEffect, useState } from 'react';

import Logo from './Logo';
import MenuButton from './MenuButton';
import NavMenu from './NavMenu';
import { usePathname } from 'next/navigation';
import { useStickyContext } from '../_context/StickyContext';
import useNavbarHeight from '../_hooks/useNavbarHeight';

export default function Navbar() {
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const pathname = usePathname();
  const { isIntersecting } = useStickyContext();
  const navRef = useNavbarHeight();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(false);

  useEffect(
    function () {
      setIsToggled(false);
    },

    [pathname],
  );

  useEffect(() => {
    setIsAuthLoading(true);
    let isCanceled = false;

    (async () => {
      try {
        const res = await fetch('/api/auth/status');

        if (!isCanceled && res.ok) {
          const data = await res.json();
          setIsLoggedIn(data.isLoggedIn);
        }
      } catch (error) {
        console.error('Error fetching auth status:', error);
        setIsLoggedIn(false);
      } finally {
        setIsAuthLoading(false);
      }
    })();

    return () => {
      isCanceled = true;
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className={`${
        !isIntersecting
          ? 'fixed shadow-md bg-amber-50 text-gray-600'
          : 'absolute lg:relative  bg-primary text-amber-100'
      } transition-all duration-500 ease-in-out w-full top-0 left-0 lg:flex items-center justify-around  px-4 py-2 lg:p-6 lg:px-32 lg:py-6 border-b border-secondary gap-4 z-50 `}
    >
      <div className='grow-8 flex justify-between items-center lg:mb-0'>
        <Logo />
        <MenuButton
          isToggled={isToggled}
          onClick={() => setIsToggled(!isToggled)}
        />
      </div>
      <NavMenu
        isToggled={isToggled}
        isLoggedIn={isLoggedIn}
        isAuthLoading={isAuthLoading}
      />
    </nav>
  );
}

