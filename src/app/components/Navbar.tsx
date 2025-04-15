'use client';

import { useState } from 'react';

import Logo from './Logo';
import MenuButton from './MenuButton';
import NavMenu from './NavMenu';

export default function Navbar() {
  const [isToggled, setIsToggled] = useState<boolean>(false);
  return (
    <nav
      className={`w-full absolute top-0 left-0 lg:relative lg:flex items-center justify-around bg-primary text-white px-4 py-2  lg:p-6 lg:px-32 border-b border-amber-100 gap-4`}
    >
      <div className='grow-8 flex justify-between items-center lg:mb-0'>
        <Logo />
        <MenuButton
          isToggled={isToggled}
          onClick={() => setIsToggled(!isToggled)}
        />
      </div>
      <NavMenu isToggled={isToggled} />
    </nav>
  );
}
