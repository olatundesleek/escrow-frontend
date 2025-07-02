"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function NavItem({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <div className="relative group list-none">
      <Link
        href={href}
        className={`
          inline-block px-2 py-2 text-base transition-colors duration-300
          ${
            isActive
              ? "text-secondary font-semibold"
              : "text-accent hover:text-secondary"
          }
        `}
        aria-current={isActive ? "page" : undefined}
      >
        {label}
        {/* Animated underline */}
        <span
          className={`
            hidden lg:block absolute bottom-1 left-0 w-full h-[2px] bg-secondary
            transform scale-x-0 group-hover:scale-x-100
            transition-transform duration-300 origin-center
            ${isActive ? "scale-x-100" : ""}
          `}
        />
      </Link>
    </div>
  );
}
