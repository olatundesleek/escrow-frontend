import Link from "next/link";
import { IconType } from "react-icons";

export const ContactInfo = ({
  Icon,
  text,
  href,
  link_text,
}: {
  Icon: IconType;
  text?: string;
  href?: string;
  link_text?: string;
}) => (
  <li className="flex items-center gap-3 text-base text-text/90 hover:text-accent">
    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/10">
      <Icon size={18} className="text-accent" />
    </span>
    {text && <span>{text}</span>}
    {href && (
      <Link
        href={href}
        className="hover:underline text-text/90 hover:text-accent font-medium transition"
        target={
          href.startsWith("mailto:") || href.startsWith("tel:")
            ? "_self"
            : "_blank"
        }
        rel="noopener noreferrer"
      >
        {link_text}
      </Link>
    )}
  </li>
);
