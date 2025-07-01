import Link from "next/link";
export const FooterLinks = ({
  links,
}: {
  links: { href: string; label: string }[];
}) => (
  <ul className="flex flex-col gap-2">
    {links.map(({ href, label }, index) => (
      <li key={index}>
        <Link
          href={href}
          className="text-base text-text/90 hover:text-accent transition font-medium"
        >
          {label}
        </Link>
      </li>
    ))}
  </ul>
);
