import { useEffect, useRef } from 'react';

export default function useNavbarHeight() {
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(function () {
    const setNavbarHeight = () => {
      if (navRef.current) {
        const height = navRef.current.offsetHeight;
        document.documentElement.style.setProperty(
          '--navbar-height',
          `${height}px`,
        );
      }
    };

    setNavbarHeight();

    window.addEventListener('resize', setNavbarHeight);
    return () => {
      window.removeEventListener('resize', setNavbarHeight);
    };
  });

  return navRef;
}
