interface NavLink {
  href: string;
  label: string;
}

export const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/aboutus', label: 'About Us' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];
