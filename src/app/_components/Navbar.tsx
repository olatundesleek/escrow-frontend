"use client";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import MenuButton from "./MenuButton";
import NavMenu from "./NavMenu";
import { usePathname } from "next/navigation";
import { useStickyContext } from "../_context/StickyContext";
import useNavbarHeight from "../_hooks/useNavbarHeight";

export default function Navbar() {
  const [isToggled, setIsToggled] = useState(false);
  const pathname = usePathname();
  const { isIntersecting } = useStickyContext();
  const navRef = useNavbarHeight();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle navbar show/hide on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowNav(currentScrollY < 100 || currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close menu on route change
  useEffect(() => setIsToggled(false), [pathname]);

  // Auth status check
  useEffect(() => {
    setIsAuthLoading(true);
    let isCanceled = false;
    (async () => {
      try {
        const res = await fetch("/api/auth/status");
        if (!isCanceled && res.ok) {
          const data = await res.json();
          setIsLoggedIn(data.isLoggedIn);
        }
      } catch {
        setIsLoggedIn(false);
      } finally {
        setIsAuthLoading(false);
      }
    })();
    return () => {
      isCanceled = true;
    };
  }, []);

  // Compose navbar classes
  const navPosition = !isIntersecting
    ? "fixed shadow-md text-accent bg-primary"
    : "absolute lg:relative bg-primary text-accent";
  const navVisibility = showNav
    ? "translate-y-0 opacity-100"
    : "-translate-y-full opacity-0 pointer-events-none";

  return (
    <nav
      ref={navRef}
      className={`${navPosition} transition-all duration-500 ease-in-out w-full top-0 left-0 lg:flex items-center justify-around px-4 py-2 lg:p-6 xl:px-32 lg:py-6 shadow-md gap-4 z-50 ${navVisibility}`}
    >
      <div className="grow-8 flex justify-between items-center lg:mb-0">
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
