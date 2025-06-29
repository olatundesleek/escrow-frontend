import Link from "next/link";
import { TbUser, TbUserPlus } from "react-icons/tb";
import { navLinks } from "../_constants/navLinks";
import Button from "./Button";
import NavItem from "./NavItem";
import SpinnerMini from "./SpinnerMini";

export default function NavMenu({
  isToggled,
  isLoggedIn,
  isAuthLoading,
}: {
  isToggled: boolean;
  isLoggedIn: boolean;
  isAuthLoading: boolean;
}) {
  const href = isLoggedIn ? "/dashboard" : "/login";

  return (
    <nav
      aria-label="Main Navigation"
      className={`
        transition-all duration-500 ease-in-out
        overflow-hidden lg:overflow-visible
        w-full lg:w-auto
        ${isToggled ? "max-h-[20rem] mt-4" : "max-h-0"}
        lg:max-h-none lg:flex lg:items-center lg:gap-8
      `}
    >
      <ul
        className={`
          flex flex-col lg:flex-row
          gap-2 lg:gap-6
          w-full lg:w-auto
          items-start lg:items-center
        `}
      >
        {navLinks.map((link) => (
          <li key={link.href}>
            <NavItem href={link.href} label={link.label} />
          </li>
        ))}
      </ul>

      <div className="mt-4 lg:mt-0 lg:ml-6 w-full lg:w-auto flex justify-start">
        <Link href={href}>
          <Button
            padding="px-4 py-2"
            style="flex items-center gap-2 rounded-md shadow-sm hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-accent"
            color="bg-secondary text-white"
          >
            {isAuthLoading ? (
              <SpinnerMini />
            ) : isLoggedIn ? (
              <>
                <TbUser fontSize="1.2rem" />
                <span>Dashboard</span>
              </>
            ) : (
              <>
                <TbUserPlus fontSize="1.2rem" />
                <span>Log In</span>
              </>
            )}
          </Button>
        </Link>
      </div>
    </nav>
  );
}
