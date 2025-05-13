'use client';

import { usePathname } from 'next/navigation';

import Link from 'next/link';

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
    <li
      className={`border-b border-gray-500 text-lg py-2 lg:py-0 lg:border-0 relative group ${
        isActive ? 'text-secondary lg:text-secondary' : ''
      }`}
    >
      <Link href={href}>
        {label}
        <span
          className={`hidden lg:block absolute bottom-0 left-1/2 w-full h-[2px] bg-secondary transform -translate-x-1/2 scale-x-0 transition-transform duration-300 origin-center ${
            isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
          }`}
        ></span>
      </Link>
    </li>
  );
}
