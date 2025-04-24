import Link from "next/link";
export const FooterLinks = ({
  links,
}: {
  links: { href: string; label: string }[];
}) => (
  <ul>
    {links.map(({ href, label }, index) => (
      <li key={index}>
        <Link href={href}>{label}</Link>
      </li>
    ))}
  </ul>
);
